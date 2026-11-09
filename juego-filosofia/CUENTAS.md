# Inicio de sesión (Supabase) — puesta en marcha

El juego ya trae el código de cuentas (`src/06d-cuenta.js`). Solo falta crear el proyecto y pegar dos datos.

## 1. Crear el proyecto (gratis)
1. Entra en https://supabase.com → **Start your project** → inicia sesión (con GitHub es lo más rápido).
2. **New project**: nombre `odisea`, una contraseña de base de datos (guárdala, no hace falta dármela) y la región más cercana (por ejemplo *South America (São Paulo)*).

> Si tu web de Lovable ya usa Supabase, puedes usar ese mismo proyecto.

## 2. Crear la tabla del camino de cada jugador
En el proyecto: **SQL Editor** → **New query** → pega esto y pulsa **Run**:

```sql
create table if not exists public.progreso (
  user_id uuid primary key references auth.users on delete cascade,
  nombre text,
  datos jsonb not null default '{}'::jsonb,
  sabiduria integer not null default 0,
  actualizado timestamptz not null default now()
);
alter table public.progreso enable row level security;
create policy "cada jugador lee su camino" on public.progreso for select using (auth.uid() = user_id);
create policy "cada jugador crea su camino" on public.progreso for insert with check (auth.uid() = user_id);
create policy "cada jugador actualiza su camino" on public.progreso for update using (auth.uid() = user_id);
```

Las reglas (RLS) hacen que cada jugador solo pueda ver y cambiar **su propio** camino.

## 3. Permitir volver al juego después de iniciar sesión
**Authentication → URL Configuration**:
- *Site URL*: `https://filosofiaparasereshumanos-ux.github.io/sofos-gpu/juego-filosofia/index.html`
- *Redirect URLs*: añade `https://filosofiaparasereshumanos-ux.github.io/sofos-gpu/**` (y, si lo usas, `https://juego.filosofiaparasereshumanos.com/**`).

## 4. Activar Google (opcional, recomendado)
El enlace por correo funciona sin hacer nada más. Para el botón **Continuar con Google**:
1. En https://console.cloud.google.com → **APIs y servicios → Credenciales → Crear credenciales → ID de cliente de OAuth** (tipo *Aplicación web*). Si te lo pide, configura antes la *pantalla de consentimiento* (externa, con el nombre «Odisea de la Razón»).
2. En *URI de redireccionamiento autorizados* pega la que te muestra Supabase en **Authentication → Providers → Google** (termina en `/auth/v1/callback`).
3. Copia el *ID de cliente* y el *secreto* de Google en **Authentication → Providers → Google** de Supabase y activa el proveedor.

## 5. Pasarme los dos datos públicos
En **Project Settings → API**:
- **Project URL** (algo como `https://abcdxyz.supabase.co`)
- **anon public key** (una clave larga que empieza por `eyJ…`)

Son públicos por diseño (van dentro de la página); quien protege los datos son las reglas del paso 2. **No** me pases la *service_role key* ni la contraseña de la base de datos.

Con eso relleno `CUENTA_CFG` en `src/06d-cuenta.js` y aparece el botón **Iniciar sesión** en la pantalla de título.
