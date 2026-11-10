// Genera guia-docentes.html (para imprimir o guardar como PDF) con los datos reales del juego:
// épocas, pensadores, diálogos socráticos y experimentos.   node tools/guia-docentes.mjs
// El PDF se obtiene imprimiendo esa página (o con Playwright: page.pdf({ format: 'A4' })).
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = readdirSync(join(root, 'src')).filter((f) => /^01[a-z]?-.*\.js$/.test(f)).sort().concat(['02p-dialogos.js']);
const ctx = { console }; vm.createContext(ctx);
vm.runInContext(files.map((f) => readFileSync(join(root, 'src', f), 'utf8')).join('\n') + '\n;globalThis.__o = { ERAS, CHRONO, DIALOGOS };', ctx);
const { ERAS, CHRONO, DIALOGOS } = ctx.__o;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const era = (id) => ERAS.find((e) => e.id === id);
const nSages = ERAS.reduce((a, e) => a + e.sages.length, 0), nDlg = Object.keys(DIALOGOS).length;
const sageEra = {}; ERAS.forEach((e) => e.sages.forEach((s) => (sageEra[s.id] = { e, s })));
const XPS = [
  ['La caverna de Platón', 'atenas', 'Platón', 'Bajar por la caverna hasta los prisioneros y decidir si salir a la luz.', '¿Cómo sabemos que lo que vemos es la realidad? ¿Qué «sombras» nos rodean hoy (redes, publicidad)?'],
  ['El anillo de Giges', 'atenas', 'Platón', 'Volverse invisible y decidir qué hacer con una bolsa de monedas y con el palacio.', '¿Serías justo si nadie te viera? ¿Por qué ser justos?'],
  ['El barco de Teseo', 'atenas', 'Aristóteles', 'Cambiar las tablas del barco una a una y ver cómo el carpintero arma otro con las viejas.', '¿Qué nos hace ser la misma persona a lo largo de la vida?'],
  ['El río de Heráclito', 'presocraticos', 'Heráclito', 'Entrar tres veces al río: cada vez cambia de color y de corriente.', '¿Todo cambia? ¿Qué permanece en ti desde que eras niño?'],
  ['La máquina de experiencias', 'helenismo', 'Epicuro', 'Decidir si conectarse a una máquina que da la vida perfecta… y probarla.', '¿Basta con sentirse bien para ser feliz? ¿Por qué importa que las cosas sean reales?'],
  ['El sueño de la mariposa', 'china', 'Zhuangzi', 'Ser una mariposa que salta de flor en flor hasta despertar como Zhuangzi.', '¿Cómo sabemos que no estamos soñando?'],
  ['La habitación de Descartes', 'modernidad', 'Descartes', 'Dudar de todo lo que hay en la habitación hasta llegar a «pienso, luego existo».', '¿Hay algo de lo que no podamos dudar?'],
  ['El dilema del tranvía', 'xix', 'Mill', 'Decidir en la palanca y en el puente qué hacer con un tranvía sin frenos.', '¿Importan solo las consecuencias, o hay cosas que nunca se deben hacer?'],
  ['La roca de Sísifo', 'contemporanea', 'Camus', 'Empujar la roca hasta la cima… y verla caer.', '¿Puede tener sentido una tarea que se repite? ¿Dónde está el sentido de la vida?'],
  ['La escalera de Wittgenstein', 'contemporanea', 'Wittgenstein', 'Subir por proposiciones y tirar la escalera al llegar arriba.', '¿Qué no se puede decir con palabras? ¿Para qué sirve la filosofía?'],
  ['La habitación china', 'ciencia', 'Ada Lovelace', 'Responder tarjetas en chino siguiendo un libro de reglas, sin saber chino.', '¿Entiende una inteligencia artificial lo que dice?'],
];
const eraCell = (id) => { const e = era(id); return e ? `${esc(e.num)} · ${esc(e.name)}` : ''; };
const dlgRows = CHRONO.flatMap((ei) => ERAS[ei].sages.filter((s) => DIALOGOS[s.id]).map((s) => `<tr><td><b>${esc(s.short)}</b><br><small>${esc(ERAS[ei].num)} · ${esc(ERAS[ei].name)}</small></td><td>«${esc(DIALOGOS[s.id].tesis)}»</td></tr>`)).join('\n');
const eraRows = CHRONO.map((ei) => { const e = ERAS[ei]; return `<tr><td><b>${esc(e.num)}</b></td><td>${esc(e.name)}<br><small>${esc(e.years)}</small></td><td>${e.sages.map((s) => esc(s.short)).join(' · ')}</td></tr>`; }).join('\n');
const xpRows = XPS.map(([n, e, who, what, q]) => `<tr><td><b>${esc(n)}</b><br><small>${eraCell(e)} · junto a ${esc(who)}</small></td><td>${esc(what)}</td><td>${esc(q)}</td></tr>`).join('\n');
const URL = 'filosofiaparasereshumanos-ux.github.io/sofos-gpu';
const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Guía para docentes · Odisea de la Razón</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=Marcellus+SC&display=swap" rel="stylesheet">
<style>
:root { --ink: #2a1d10; --soft: #6a5232; --gold: #a8782a; --line: #e2d3b2; --bg: #fdf8ee; }
* { box-sizing: border-box; }
html { background: #e9e0cc; } body { margin: 0; color: var(--ink); font: 17px/1.5 "EB Garamond", Georgia, serif; }
main { max-width: 820px; margin: 0 auto; background: var(--bg); padding: 48px 56px; }
h1, h2, h3 { font-family: "Marcellus SC", Georgia, serif; font-weight: normal; color: #3a2610; line-height: 1.2; }
h1 { font-size: 2.4rem; margin: 0; text-align: center; } h2 { font-size: 1.45rem; border-bottom: 2px solid var(--gold); padding-bottom: 4px; margin: 34px 0 12px; break-after: avoid; }
h3 { font-size: 1.1rem; margin: 18px 0 6px; break-after: avoid; }
.cover { text-align: center; } .cover img { width: 110px; } .eyebrow { letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); font-size: 0.8rem; }
.lead { font-size: 1.15rem; text-align: center; color: var(--soft); max-width: 600px; margin: 10px auto; }
.nums { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 22px 0; }
.nums div { border: 1px solid var(--line); border-radius: 10px; padding: 10px 6px; text-align: center; background: #fff; }
.nums b { display: block; font-family: "Marcellus SC", serif; font-size: 1.8rem; color: var(--gold); line-height: 1.1; font-weight: normal; } .nums span { font-size: 0.85rem; color: var(--soft); }
table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; font-size: 0.92rem; } th, td { text-align: left; vertical-align: top; padding: 6px 8px; border-bottom: 1px solid var(--line); }
th { font-family: "Marcellus SC", serif; font-weight: normal; color: var(--gold); border-bottom: 2px solid var(--gold); } tr { break-inside: avoid; } small { color: var(--soft); }
.box { border: 1px solid var(--line); border-left: 4px solid var(--gold); background: #fff; border-radius: 8px; padding: 10px 14px; margin: 10px 0; break-inside: avoid; }
.steps { counter-reset: s; list-style: none; padding: 0; } .steps li { counter-increment: s; position: relative; padding-left: 38px; margin: 8px 0; }
.steps li::before { content: counter(s); position: absolute; left: 0; top: 0; width: 26px; height: 26px; border-radius: 50%; background: var(--gold); color: #fff; text-align: center; font-family: "Marcellus SC", serif; line-height: 26px; }
.modes { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; } .modes .box { margin: 0; }
.modes h3 { margin-top: 0; } .tag { display: inline-block; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; color: #fff; background: var(--gold); border-radius: 999px; padding: 1px 8px; }
code, .k { font-family: inherit; background: #f3e8cf; border-radius: 4px; padding: 0 4px; }
.foot { text-align: center; color: var(--soft); margin-top: 36px; font-size: 0.9rem; }
@media (max-width: 640px) { main { padding: 24px 16px; } .nums, .modes { grid-template-columns: 1fr 1fr; } .modes { grid-template-columns: 1fr; } }
@media print { html, body { background: #fff; } main { max-width: none; padding: 0; background: #fff; } .pb { break-before: page; } a { color: inherit; text-decoration: none; } }
@page { size: A4; margin: 16mm 15mm; }
</style></head><body><main>
<section class="cover">
  <img src="img/logo-fpsh.png" alt="Filosofía para Seres Humanos">
  <div class="eyebrow">Guía para docentes</div>
  <h1>Odisea de la Razón</h1>
  <p class="lead">Un videojuego gratuito para aprender filosofía, ciencia e historia dialogando con los grandes pensadores. Funciona en el navegador del celular o del computador, sin instalar nada.</p>
  <p><b>${URL}</b></p>
  <div class="nums"><div><b>${ERAS.length}</b><span>épocas</span></div><div><b>${nSages}</b><span>pensadoras y pensadores</span></div><div><b>${nDlg}</b><span>diálogos socráticos</span></div><div><b>${XPS.length}</b><span>experimentos mentales</span></div></div>
</section>

<h2>1. Qué es y para quién</h2>
<p>En Odisea de la Razón cada estudiante recorre ${ERAS.length} épocas, de Sumer a nuestros días, y además las sabidurías de África, la India, China, Japón, el islam, los vikingos, los mexicas, los incas y el pueblo mapuche. En cada época conversa con sus pensadores: les hace preguntas, escucha sus lecciones, encuentra sus libros y los vence en debates de preguntas. Al final de cada época cruza un portal hacia la siguiente.</p>
<p>Pero el juego no se queda en la memoria: en los <b>diálogos socráticos</b> cada estudiante toma postura frente a una tesis, da razones, responde a una objeción y recibe una devolución sobre la calidad de su argumento (razones buenas, débiles y falacias con su nombre). En los <b>experimentos mentales</b> vive situaciones como la caverna de Platón o el dilema del tranvía y decide qué haría. Con todo eso se dibuja su <b>mapa filosófico</b>: cómo piensa en seis grandes preguntas.</p>
<div class="box"><b>Edad recomendada:</b> desde los 11 o 12 años (6.º básico / 1.º de secundaria) hasta la educación media y los primeros años de universidad. Los textos son breves y el juego se adapta solo a celulares sencillos.</div>

<h2>2. Empezar en cinco minutos</h2>
<ol class="steps">
  <li>Abre <b>${URL}</b> en el celular o en el computador.</li>
  <li>Toca el gran botón <b>JUGAR</b> y elige <b>«Empezar en Sumer»</b> (el viaje completo, en orden) o cualquier otra época.</li>
  <li>Camina con el joystick (celular) o con las teclas <span class="k">W A S D</span> y el ratón (computador). Acércate a un pensador y toca <span class="k">Hablar</span> o pulsa <span class="k">E</span>.</li>
  <li>Elige <b>«Dialoguemos: ¿qué piensas tú?»</b> para el diálogo socrático, o <b>«Te desafío a un debate»</b> para las preguntas.</li>
  <li>El avance se guarda solo en el aparato. Con una cuenta (usuario y contraseña) se recupera en cualquier otro.</li>
</ol>

<h2>3. Seis maneras de usarlo en clase</h2>
<div class="modes">
  <div class="box"><span class="tag">15 min · toda la clase</span><h3>Trivia en vivo</h3><p><b>En vivo → Crear sala.</b> Proyecta la pantalla: aparece un código de 4 letras. Cada estudiante entra desde su celular con el código y un apodo. Las preguntas salen en el proyector, se responde desde el celular, hay puntos por acertar rápido y un podio al final. Ideal para abrir o cerrar una unidad.</p></div>
  <div class="box"><span class="tag">tarea · seguimiento</span><h3>Tarea con código de clase</h3><p><b>Modo aula → Soy docente.</b> Elige los pensadores (o épocas enteras) y qué deben hacer con cada uno. Obtienes un código de clase y las instrucciones para compartir. Cada estudiante entra con el código y, al terminar, te envía su entrega (o te llega sola si ambos tienen cuenta). Ves una tabla con el avance de cada uno.</p></div>
  <div class="box"><span class="tag">debate · pensamiento crítico</span><h3>Diálogo socrático y mapa de la clase</h3><p>Pide que dialoguen con ${nDlg > 3 ? 'tres' : 'los'} pensadores y entreguen. La entrega trae su mapa filosófico: en <b>📽 Proyectar en clase</b> ves el mapa de todo el curso y la pregunta que más los divide, lista para debatir en grupos.</p></div>
  <div class="box"><span class="tag">detonante · 10 min</span><h3>Experimento mental</h3><p>Antes de la clase, cada estudiante vive un experimento (por ejemplo el anillo de Giges) y escribe su respuesta en el <b>Cuaderno del filósofo</b>. En clase se comparan las decisiones. Ver la tabla del punto 5.</p></div>
  <div class="box"><span class="tag">sin celulares</span><h3>Debate en el proyector y fichas</h3><p><b>Modo aula → Proyector y fichas.</b> Proyecta preguntas para equipos que responden con tarjetas A-B-C-D, o imprime una ficha por pensador con su idea central, preguntas, una pregunta para debatir y el solucionario.</p></div>
  <div class="box"><span class="tag">casa · recreo</span><h3>Mundo abierto, grupos y retos</h3><p><b>Mundo abierto:</b> al entrar a una época se ven los avatares de quienes estén ahí; pueden saludarse con gestos y, al encontrarse, retarse a un duelo de tres preguntas o a un <b>debate filosófico</b> (misma tesis, cada uno da su razón y responde a la objeción; al final ven las razones del otro). <b>Para la clase, usen un grupo privado</b> (En vivo → Grupo privado): solo se ven quienes tengan el código. <b>Reta a un amigo</b> genera un enlace con las mismas diez preguntas.</p></div>
</div>

<h2>4. Una clase de 45 minutos: la caverna de Platón</h2>
<table><tr><th style="width:22%">Momento</th><th>Qué hacen</th></tr>
<tr><td><b>Inicio · 8 min</b></td><td>Trivia <b>En vivo</b> de 5 preguntas sobre «La Atenas clásica» para activar lo que saben.</td></tr>
<tr><td><b>Experiencia · 12 min</b></td><td>En parejas, entran a la época VI (Atenas), buscan la entrada de la caverna junto a Platón y bajan hasta los prisioneros. Deciden si liberarse y salir a la luz.</td></tr>
<tr><td><b>Diálogo · 10 min</b></td><td>Cada pareja dialoga con Platón (<i>«Dialoguemos»</i>): toma postura, da una razón y responde a su objeción. Leen juntos la devolución sobre sus argumentos.</td></tr>
<tr><td><b>Debate · 10 min</b></td><td>Proyecta el mapa de la clase o la pregunta: <i>¿qué «sombras» de la caverna vemos hoy?</i> (redes sociales, publicidad, prejuicios). Dos grupos con posturas distintas se responden.</td></tr>
<tr><td><b>Cierre · 5 min</b></td><td>Cada estudiante escribe en el <b>Cuaderno del filósofo</b> qué idea cambió o se reforzó, y entrega la tarea con el código de clase.</td></tr></table>

<h2>5. Los experimentos mentales</h2>
<p>Se entra por un portal de luz junto al pensador indicado. Las decisiones quedan en el Cuaderno y mueven el mapa filosófico.</p>
<table><tr><th style="width:28%">Experimento</th><th style="width:36%">Qué se vive</th><th>Pregunta para la clase</th></tr>
${xpRows}</table>

<h2 class="pb">6. Los ${nDlg} diálogos socráticos</h2>
<p>Cada diálogo propone una tesis con tres posturas posibles (de acuerdo, en desacuerdo, depende). No hay una única respuesta correcta: se valora la calidad de las razones. Se supera con una buena razón y una buena respuesta a la objeción.</p>
<table><tr><th style="width:26%">Pensador</th><th>Tesis que propone</th></tr>
${dlgRows}</table>

<h2>7. Qué evaluar</h2>
<table><tr><th style="width:26%">Criterio</th><th>Dónde se ve</th></tr>
<tr><td><b>Conocimiento</b></td><td>Pensadores vencidos en debate, lugares visitados y libros leídos: columnas de la tabla de entregas del Modo aula.</td></tr>
<tr><td><b>Argumentación</b></td><td>En el Cuaderno del filósofo: la postura de cada diálogo, la razón elegida (buena, débil o falacia) y la respuesta a la objeción.</td></tr>
<tr><td><b>Pensamiento propio</b></td><td>Lo que escriben en el Cuaderno después de cada diálogo y experimento (se puede copiar o descargar como texto).</td></tr>
<tr><td><b>Postura filosófica</b></td><td>El mapa filosófico: no se califica «bien» o «mal», sirve para conversar y para formar grupos de debate.</td></tr></table>
<div class="box"><b>Sugerencia:</b> pide que, en una posición donde eligieron una falacia, expliquen con sus palabras por qué esa razón no sirve. Reconocer una falacia propia es un gran aprendizaje.</div>

<h2>8. Privacidad y seguridad</h2>
<ul>
  <li>El progreso se guarda <b>en el aparato</b> de cada estudiante. No se piden correos ni datos personales.</li>
  <li>La cuenta es opcional: solo usuario y contraseña, para recuperar el avance en otro aparato y para el ranking.</li>
  <li><b>En vivo</b>, los <b>grupos privados</b> y el <b>mundo abierto</b> usan solo apodos (con filtro de palabras ofensivas), <b>no tienen chat</b> (solo gestos predefinidos) y no guardan nada: solo viajan las respuestas y las posiciones mientras se juega. El mundo abierto se activa solo si el estudiante acepta la primera vez y se desactiva en Ajustes; cualquiera puede <b>silenciar</b> a otro viajero. Quien crea una sala puede sacar a cualquier participante.</li>
  <li>Las entregas del Modo aula llevan un código de verificación: si alguien modifica su texto, el juego lo detecta.</li>
</ul>

<h2>9. Preguntas frecuentes</h2>
<h3>¿Funciona sin internet?</h3><p>Una vez abierto, sí: el juego se guarda en el aparato. Los modos <b>En vivo</b>, el <b>mundo abierto</b>, los grupos, las cuentas y el ranking necesitan conexión.</p>
<h3>¿Y en celulares antiguos?</h3><p>El juego baja la calidad gráfica solo si el aparato va lento. También se puede elegir calidad baja en «Ajustes».</p>
<h3>¿Se puede instalar como aplicación?</h3><p>Sí: en el menú, «Instalar» lo deja en la pantalla de inicio como una app, sin pasar por la tienda.</p>
<h3>¿Cuántos estudiantes pueden jugar En vivo a la vez?</h3><p>Una clase completa: lo probamos con 25 jugadores a la vez sin problemas.</p>

<h2 class="pb">Anexo · Las ${ERAS.length} épocas y sus pensadores</h2>
<table><tr><th style="width:8%">N.º</th><th style="width:32%">Época</th><th>Pensadoras y pensadores</th></tr>
${eraRows}</table>
<p class="foot">Odisea de la Razón es un proyecto de <b>Filosofía para Seres Humanos</b> · filosofiaparasereshumanos.com<br>Juego gratuito: ${URL}</p>
</main></body></html>
`;
writeFileSync(join(root, 'guia-docentes.html'), html);
console.log('guia-docentes.html:', ERAS.length, 'épocas,', nSages, 'pensadores,', nDlg, 'diálogos,', XPS.length, 'experimentos');
