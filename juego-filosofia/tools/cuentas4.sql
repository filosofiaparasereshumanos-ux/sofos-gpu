-- ============================================================================
--  ESTADÍSTICAS ANÓNIMAS DEL JUEGO
--  Pega este archivo completo en Supabase → SQL Editor → Run (una sola vez).
--  Sin esto el juego funciona igual y simplemente no envía nada.
--  Solo se guardan contadores por día, evento y época (por ejemplo: «el 14 de
--  noviembre se entró 120 veces en Atenas y se perdieron 30 debates allí»).
--  No se guarda ningún identificador de jugador, apodo, IP ni respuesta.
--  Los datos de más de 400 días se borran solos.
-- ============================================================================
create table if not exists public.odisea_metricas (
  dia date not null default (now() at time zone 'utc')::date,
  evento text not null, era text not null default '', n bigint not null default 0,
  primary key (dia, evento, era)
);
alter table public.odisea_metricas enable row level security;

-- suma un lote de contadores: [{"e": "entra", "era": "atenas", "n": 1}, ...]
create or replace function public.odisea_metricas_sumar(p_lote jsonb)
returns void language plpgsql security definer set search_path = public as $$
declare x jsonb; hoy date := (now() at time zone 'utc')::date;
begin
  if jsonb_typeof(p_lote) <> 'array' or jsonb_array_length(p_lote) > 60 then return; end if;
  for x in select * from jsonb_array_elements(p_lote) loop
    if (x->>'e') ~ '^[a-z_]{2,24}$' and coalesce(x->>'era', '') ~ '^[a-z0-9-]{0,24}$'
       and (x->>'n') ~ '^[0-9]{1,3}$' and (x->>'n')::int between 1 and 200 then
      insert into odisea_metricas (dia, evento, era, n) values (hoy, x->>'e', coalesce(x->>'era', ''), (x->>'n')::int)
      on conflict (dia, evento, era) do update set n = odisea_metricas.n + excluded.n;
    end if;
  end loop;
  if random() < 0.01 then delete from odisea_metricas where dia < hoy - 400; end if;
end $$;

-- resumen de los últimos días (solo totales, para la página de estadísticas)
create or replace function public.odisea_metricas_ver(p_dias integer default 30)
returns jsonb language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(r), '[]'::jsonb) from (
    select evento, era, sum(n)::bigint as n from odisea_metricas
    where dia >= (now() at time zone 'utc')::date - least(greatest(p_dias, 1), 400)
    group by evento, era order by evento, era) r;
$$;

grant execute on function public.odisea_metricas_sumar(jsonb) to anon, authenticated;
grant execute on function public.odisea_metricas_ver(integer) to anon, authenticated;
