-- ============================================================================
--  ÁGORA: los votos de «la pregunta del día» de cada época.
--  Pega este archivo completo en Supabase → SQL Editor → Run (una sola vez).
--  Sin esto el juego funciona igual, pero solo cuenta a los viajeros conectados.
--  Se guarda: día, época, identificador aleatorio del jugador, apodo, aspecto del
--  avatar y voto. Los votos de más de 3 días se borran solos.
-- ============================================================================
create table if not exists public.odisea_agora (
  dia text not null, era text not null, jugador text not null,
  apodo text not null default 'Viajero', aspecto text not null default '',
  voto smallint not null, creado timestamptz not null default now(),
  primary key (dia, era, jugador)
);
alter table public.odisea_agora enable row level security;

create or replace function public.odisea_agora_ver(p_dia text, p_era text)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'si', (select count(*) from odisea_agora where dia = p_dia and era = p_era and voto > 0),
    'no', (select count(*) from odisea_agora where dia = p_dia and era = p_era and voto < 0),
    'ultimos', coalesce((select jsonb_agg(r) from (
      select jugador, apodo, aspecto, voto from odisea_agora
      where dia = p_dia and era = p_era order by creado desc limit 12) r), '[]'::jsonb));
$$;

create or replace function public.odisea_agora_votar(p_dia text, p_era text, p_jugador text, p_apodo text, p_aspecto text, p_voto integer)
returns jsonb language plpgsql security definer set search_path = public as $$
begin
  if p_voto not in (-1, 1) or p_jugador !~ '^[A-Za-z0-9]{6,12}$' or length(p_era) > 24
     or p_dia not in (to_char(now() at time zone 'utc', 'YYYY-MM-DD'), to_char((now() - interval '1 day') at time zone 'utc', 'YYYY-MM-DD'), to_char((now() + interval '1 day') at time zone 'utc', 'YYYY-MM-DD')) then
    return odisea_agora_ver(p_dia, p_era);
  end if;
  delete from odisea_agora where creado < now() - interval '3 days';
  insert into odisea_agora (dia, era, jugador, apodo, aspecto, voto)
  values (p_dia, p_era, p_jugador, left(coalesce(nullif(trim(p_apodo), ''), 'Viajero'), 16), left(coalesce(p_aspecto, ''), 16), p_voto)
  on conflict (dia, era, jugador) do update set voto = excluded.voto, apodo = excluded.apodo, aspecto = excluded.aspecto, creado = now();
  return odisea_agora_ver(p_dia, p_era);
end $$;

grant execute on function public.odisea_agora_ver(text, text) to anon, authenticated;
grant execute on function public.odisea_agora_votar(text, text, text, text, text, integer) to anon, authenticated;
