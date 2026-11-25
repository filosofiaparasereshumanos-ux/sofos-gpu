-- Odisea de la Razón · ranking mundial y modo aula en línea
-- Pegar entero en Supabase → SQL Editor → Run (después de cuentas.sql). Solo añade cosas.

-- marcas públicas de cada viajero para el ranking
alter table public.odisea_viajeros
  add column if not exists alias text,
  add column if not exists vencidos integer not null default 0,
  add column if not exists mejor integer not null default 0,
  add column if not exists hoy_fecha text,
  add column if not exists hoy_puntos integer not null default 0,
  add column if not exists hoy_aciertos integer not null default 0,
  add column if not exists semana text,
  add column if not exists semana_puntos integer not null default 0,
  add column if not exists racha integer not null default 0;

-- comprobar la sesión de un viajero (uso interno)
create or replace function public.odisea_ok(p_usuario text, p_token text)
returns boolean language sql stable security definer set search_path = public, extensions as $$
  select exists (select 1 from odisea_viajeros where usuario = lower(trim(p_usuario)) and encode(digest(coalesce(p_token, ''), 'sha256'), 'hex') = any(tokens));
$$;
revoke all on function public.odisea_ok(text, text) from public, anon, authenticated;

-- guardar el camino y las marcas del ranking
create or replace function public.odisea_guardar_v2(p_usuario text, p_token text, p_datos jsonb, p_m jsonb)
returns boolean language plpgsql security definer set search_path = public, extensions as $$
begin
  if not odisea_ok(p_usuario, p_token) then return false; end if;
  update odisea_viajeros set
    datos = coalesce(p_datos, '{}'::jsonb), actualizado = now(),
    sabiduria = coalesce((p_m->>'sabiduria')::int, 0),
    alias = left(nullif(trim(coalesce(p_m->>'alias', '')), ''), 22),
    vencidos = least(coalesce((p_m->>'vencidos')::int, 0), 500),
    mejor = coalesce((p_m->>'mejor')::int, 0),
    hoy_fecha = left(p_m->>'hoy_fecha', 10), hoy_puntos = coalesce((p_m->>'hoy_puntos')::int, 0), hoy_aciertos = least(coalesce((p_m->>'hoy_aciertos')::int, 0), 10),
    semana = left(p_m->>'semana', 10), semana_puntos = coalesce((p_m->>'semana_puntos')::int, 0),
    racha = least(coalesce((p_m->>'racha')::int, 0), 3650)
  where usuario = lower(trim(p_usuario));
  return true;
end $$;

-- ranking: 'hoy' (oráculo del día), 'semana' u 'odisea' (pensadores vencidos)
create or replace function public.odisea_ranking(p_tipo text, p_clave text)
returns jsonb language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(r), '[]'::jsonb) from (
    select coalesce(alias, usuario) as nombre, usuario,
      case p_tipo when 'hoy' then hoy_puntos when 'semana' then semana_puntos else vencidos end as puntos,
      case p_tipo when 'hoy' then hoy_aciertos::text || '/10' when 'semana' then (case when racha > 1 then racha::text || ' días seguidos' else '' end) else mejor::text end as detalle
    from odisea_viajeros
    where case p_tipo when 'hoy' then hoy_fecha = p_clave and hoy_puntos > 0 when 'semana' then semana = p_clave and semana_puntos > 0 else vencidos > 0 end
    order by 3 desc, mejor desc, actualizado asc limit 30) r;
$$;

-- modo aula en línea
create table if not exists public.odisea_clases (
  codigo text primary key, docente text not null references public.odisea_viajeros(usuario) on delete cascade,
  titulo text, creado timestamptz not null default now());
create table if not exists public.odisea_entregas (
  codigo text not null, usuario text not null references public.odisea_viajeros(usuario) on delete cascade,
  linea text not null, actualizado timestamptz not null default now(), primary key (codigo, usuario));
alter table public.odisea_clases enable row level security;
alter table public.odisea_entregas enable row level security;
revoke all on public.odisea_clases, public.odisea_entregas from anon, authenticated;

-- el docente registra su clase (el primero que la registra es su dueño)
create or replace function public.odisea_clase_registrar(p_usuario text, p_token text, p_codigo text, p_titulo text)
returns boolean language plpgsql security definer set search_path = public as $$
declare d text;
begin
  if not odisea_ok(p_usuario, p_token) then raise exception 'sesion'; end if;
  insert into odisea_clases (codigo, docente, titulo) values (upper(p_codigo), lower(trim(p_usuario)), left(p_titulo, 60)) on conflict (codigo) do nothing;
  select docente into d from odisea_clases where codigo = upper(p_codigo);
  return d = lower(trim(p_usuario));
end $$;

-- el estudiante envía (y actualiza) su entrega firmada
create or replace function public.odisea_clase_entregar(p_usuario text, p_token text, p_codigo text, p_linea text)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if not odisea_ok(p_usuario, p_token) or length(p_linea) > 400 then return false; end if;
  insert into odisea_entregas (codigo, usuario, linea) values (upper(p_codigo), lower(trim(p_usuario)), p_linea)
  on conflict (codigo, usuario) do update set linea = excluded.linea, actualizado = now();
  return true;
end $$;

-- el docente ve las entregas de su clase
create or replace function public.odisea_clase_entregas(p_usuario text, p_token text, p_codigo text)
returns jsonb language plpgsql security definer set search_path = public as $$
begin
  if not odisea_ok(p_usuario, p_token) then raise exception 'sesion'; end if;
  if not exists (select 1 from odisea_clases where codigo = upper(p_codigo) and docente = lower(trim(p_usuario))) then raise exception 'no_es_tu_clase'; end if;
  return (select coalesce(jsonb_agg(jsonb_build_object('linea', linea, 'actualizado', actualizado)), '[]'::jsonb) from odisea_entregas where codigo = upper(p_codigo));
end $$;

grant execute on function public.odisea_guardar_v2(text, text, jsonb, jsonb), public.odisea_ranking(text, text),
  public.odisea_clase_registrar(text, text, text, text), public.odisea_clase_entregar(text, text, text, text),
  public.odisea_clase_entregas(text, text, text) to anon, authenticated;
