# Cuentas de jugador (usuario y contraseña)

Cada jugador puede **crear su cuenta** con un nombre de usuario y una contraseña, sin correo ni Google, y recuperar su odisea en cualquier aparato. Funciona en la versión web (GitHub Pages / dominio propio).

## Puesta en marcha (una vez)
1. Abre tu proyecto en https://supabase.com → **SQL Editor** → **New query**.
2. Pega **entero** el contenido de [`tools/cuentas.sql`](tools/cuentas.sql) y pulsa **Run**.

Eso crea la tabla `odisea_viajeros` y las funciones `odisea_registrar`, `odisea_entrar`, `odisea_guardar`, `odisea_cargar` y `odisea_salir`. No toca los usuarios ni las tablas de otras apps del proyecto.

## Cómo protege los datos
- Las contraseñas se guardan cifradas (bcrypt); nadie, ni siquiera desde el panel, puede leerlas.
- La tabla está cerrada: el juego solo puede usar las funciones, y para guardar hace falta la sesión del propio jugador.
- La clave del juego (`sb_publishable_…`) es pública por diseño. **Nunca** pongas la clave secreta (`sb_secret_…`) en el juego.

## Ver a los jugadores
En **Table Editor → odisea_viajeros** ves los usuarios, su sabiduría y cuándo jugaron por última vez.

## Límite actual
No hay recuperación de contraseña (no se pide correo). Si alguien la olvida, se puede crear otra cuenta.

## Ágora: los votos de la pregunta del día
Para que los votos de «la pregunta del día» se guarden durante el día y aparezcan las siluetas de quienes pasaron antes, pega una vez `tools/cuentas3.sql` en **SQL Editor → Run**. Crea la tabla `odisea_agora` y las funciones `odisea_agora_ver` y `odisea_agora_votar`. Sin este paso el ágora funciona igual, pero solo cuenta a los viajeros conectados en ese momento. Los votos de más de 3 días se borran solos.

## Estadísticas anónimas (opcional)

Para ver qué épocas cuestan más, pega una vez `tools/cuentas4.sql` en **SQL Editor → Run**. Crea la tabla `odisea_metricas` y las funciones `odisea_metricas_sumar` y `odisea_metricas_ver`. El juego envía cada minuto contadores por día, evento y época (entradas, debates ganados, derrotas, aciertos, fallos, guía inicial terminada o saltada, torneos), sin ningún identificador del jugador. Los resultados se ven en `estadisticas.html` (por ejemplo, https://filosofiaparasereshumanos-ux.github.io/sofos-gpu/juego-filosofia/estadisticas.html): la columna «Atasco» indica el porcentaje de debates perdidos en cada época. Los datos de más de 400 días se borran solos. Sin este paso el juego funciona igual y no envía nada.
