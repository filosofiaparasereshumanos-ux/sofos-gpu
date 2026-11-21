-- Odisea de la Razón · cuentas con usuario y contraseña (sin correo ni Google)
-- Pegar entero en Supabase → SQL Editor → Run. No toca los usuarios de otras apps del proyecto.
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.odisea_viajeros (
  usuario text primary key check (usuario ~ '^[a-z0-9_.ñáéíóúü-]{3,24}$'),
  clave text not null,                 -- contraseña cifrada con bcrypt
  tokens text[] not null default '{}', -- sesiones abiertas (huellas sha256)
  datos jsonb not null default '{}'::jsonb,
  sabiduria integer not null default 0,
  creado timestamptz not null default now(),
  actualizado timestamptz not null default now()
);
-- nadie lee ni escribe la tabla directamente: solo a través de las funciones de abajo
alter table public.odisea_viajeros enable row level security;
revoke all on public.odisea_viajeros from anon, authenticated;

create or replace function public.odisea_sesion(u text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare t text := encode(gen_random_bytes(24), 'hex');
begin
  update odisea_viajeros set tokens = (array[encode(digest(t, 'sha256'), 'hex')] || tokens)[1:6] where usuario = u;
  return jsonb_build_object('usuario', u, 'token', t, 'datos', (select datos from odisea_viajeros where usuario = u));
end $$;
revoke all on function public.odisea_sesion(text) from public, anon, authenticated;

create or replace function public.odisea_registrar(p_usuario text, p_clave text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare u text := lower(trim(p_usuario));
begin
  if u !~ '^[a-z0-9_.ñáéíóúü-]{3,24}$' then raise exception 'usuario_invalido'; end if;
  if length(coalesce(p_clave, '')) < 6 then raise exception 'clave_corta'; end if;
  if exists (select 1 from odisea_viajeros where usuario = u) then raise exception 'usuario_ocupado'; end if;
  insert into odisea_viajeros (usuario, clave) values (u, crypt(p_clave, gen_salt('bf', 10)));
  return odisea_sesion(u);
end $$;

create or replace function public.odisea_entrar(p_usuario text, p_clave text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare u text := lower(trim(p_usuario)); h text;
begin
  select clave into h from odisea_viajeros where usuario = u;
  if h is null or crypt(coalesce(p_clave, ''), h) <> h then perform pg_sleep(0.6); raise exception 'datos_incorrectos'; end if;
  return odisea_sesion(u);
end $$;

create or replace function public.odisea_guardar(p_usuario text, p_token text, p_datos jsonb, p_sabiduria integer)
returns boolean language plpgsql security definer set search_path = public, extensions as $$
begin
  update odisea_viajeros set datos = coalesce(p_datos, '{}'::jsonb), sabiduria = coalesce(p_sabiduria, 0), actualizado = now()
   where usuario = lower(trim(p_usuario)) and encode(digest(p_token, 'sha256'), 'hex') = any(tokens);
  return found;
end $$;

create or replace function public.odisea_cargar(p_usuario text, p_token text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  return (select datos from odisea_viajeros where usuario = lower(trim(p_usuario)) and encode(digest(p_token, 'sha256'), 'hex') = any(tokens));
end $$;

create or replace function public.odisea_salir(p_usuario text, p_token text)
returns void language plpgsql security definer set search_path = public, extensions as $$
begin
  update odisea_viajeros set tokens = array_remove(tokens, encode(digest(p_token, 'sha256'), 'hex')) where usuario = lower(trim(p_usuario));
end $$;

grant execute on function public.odisea_registrar(text, text), public.odisea_entrar(text, text),
  public.odisea_guardar(text, text, jsonb, integer), public.odisea_cargar(text, text), public.odisea_salir(text, text) to anon, authenticated;
