// ============================================================================
//  CARTAS
//  tipo: atk (ataque, si aciertas) · def (defensa, si fallas) · ing (ingenio, efecto inmediato) · cur (cura)
//  efectos: dmg, mult, heal, block, epoje (anula el golpe), elim (quita falsas), time (+s), reroll (otra pregunta),
//           draw (roba), weaken (debilita su próximo golpe), risk (×3 o daño doble), streak (+1 por racha), healHit (cura si aciertas)
// ============================================================================
const STARTER = [
  { id: 'argumento', name: 'Argumento', type: 'atk', art: 'quill', fx: { dmg: 2 }, text: 'Si aciertas: +2 de daño.' },
  { id: 'argumento', name: 'Argumento', type: 'atk', art: 'quill', fx: { dmg: 2 }, text: 'Si aciertas: +2 de daño.' },
  { id: 'prudencia', name: 'Prudencia', type: 'def', art: 'shield', fx: { block: 3 }, text: 'Si fallas: recibes 3 menos.' },
  { id: 'prudencia', name: 'Prudencia', type: 'def', art: 'shield', fx: { block: 3 }, text: 'Si fallas: recibes 3 menos.' },
  { id: 'pregunta', name: 'Buena pregunta', type: 'ing', art: 'question', fx: { elim: 1 }, text: 'Elimina 1 respuesta falsa.' },
  { id: 'pausa', name: 'Pausa', type: 'ing', art: 'hourglass', fx: { time: 12, draw: 1 }, text: '+12 segundos y robas 1 carta.' },
];
// Una carta por concepto: se gana al vencer a su filósofo
const CONCEPT_CARDS = {
  tales: { type: 'cur', art: 'water', fx: { dmg: 2, healHit: 3 }, text: 'Si aciertas: +2 de daño y recuperas 3.' },
  pitagoras: { type: 'atk', art: 'tetractys', fx: { mult: 2 }, text: 'Si aciertas: daño ×2.' },
  heraclito: { type: 'atk', art: 'flame', fx: { dmg: 4 }, text: 'Si aciertas: +4 de daño.' },
  parmenides: { type: 'def', art: 'sphere', fx: { block: 7 }, text: 'Si fallas: recibes 7 menos. El Ser no se mueve.' },
  protagoras: { type: 'ing', art: 'scales', fx: { reroll: 1, draw: 1 }, text: 'Cambia la pregunta por otra y robas 1 carta.' },
  socrates: { type: 'ing', art: 'maieutic', fx: { elim: 2 }, text: 'Elimina 2 respuestas falsas.' },
  platon: { type: 'atk', art: 'cave', fx: { dmg: 3, draw: 1 }, text: 'Robas 1 carta. Si aciertas: +3 de daño.' },
  aristoteles: { type: 'atk', art: 'seed', fx: { dmg: 5 }, text: 'Si aciertas: +5 de daño. La potencia se hace acto.' },
  diogenes: { type: 'cur', art: 'lamp', fx: { heal: 5 }, text: 'Recuperas 5 de razón ahora.' },
  epicuro: { type: 'def', art: 'garden', fx: { block: 4, heal: 2 }, text: 'Recuperas 2. Si fallas: recibes 4 menos.' },
  pirron: { type: 'def', art: 'balance', fx: { epoje: 1 }, text: 'Si fallas, no recibes daño: suspendes el juicio.' },
  marcoaurelio: { type: 'def', art: 'laurel', fx: { elim: 1, block: 4 }, text: 'Elimina 1 falsa. Si fallas: recibes 4 menos.' },
  agustin: { type: 'ing', art: 'heart', fx: { elim: 1, time: 15 }, text: 'Elimina 1 falsa y +15 segundos.' },
  averroes: { type: 'cur', art: 'astrolabe', fx: { dmg: 2, heal: 3 }, text: 'Recuperas 3. Si aciertas: +2 de daño.' },
  ockham: { type: 'ing', art: 'razor', fx: { elim: 2, dmg: 1 }, text: 'Elimina 2 falsas. Si aciertas: +1 de daño.' },
  tomas: { type: 'atk', art: 'fiveways', fx: { dmg: 6 }, text: 'Si aciertas: +6 de daño.' },
  pico: { type: 'ing', art: 'ladder', fx: { draw: 2, time: 8 }, text: 'Robas 2 cartas y +8 segundos.' },
  maquiavelo: { type: 'atk', art: 'wheel', fx: { risk: 1 }, text: 'Si aciertas: daño ×3. Si fallas: recibes el doble.' },
  montaigne: { type: 'ing', art: 'tower', fx: { reroll: 1, block: 3 }, text: 'Cambia la pregunta. Si fallas: recibes 3 menos.' },
  bacon: { type: 'atk', art: 'flask', fx: { streak: 1, dmg: 1 }, text: 'Si aciertas: +1 de daño y +1 por cada acierto seguido.' },
  descartes: { type: 'cur', art: 'axes', fx: { dmg: 2, healHit: 4 }, text: 'Si aciertas: +2 de daño y recuperas 4.' },
  spinoza: { type: 'def', art: 'lens', fx: { heal: 3, block: 3 }, text: 'Recuperas 3. Si fallas: recibes 3 menos.' },
  locke: { type: 'ing', art: 'tablet', fx: { redraw: 1, time: 5 }, text: 'Cambias toda tu mano por cartas nuevas y +5 s.' },
  hume: { type: 'def', art: 'billiard', fx: { weaken: 3, block: 2 }, text: 'Sus 2 próximos golpes hacen 3 menos.' },
  kant: { type: 'atk', art: 'copernicus', fx: { mult: 2, dmg: 2 }, text: 'Si aciertas: +2 de daño y luego ×2.' },
};
const LESSON_CARD = { id: 'leccion', name: 'Lección aprendida', type: 'ing', art: 'book', fx: { elim: 2, time: 10 }, text: 'Elimina 2 falsas y +10 s. Solo en este duelo.', temp: true };
const TYPE_NAME = { atk: 'Ataque', def: 'Defensa', ing: 'Ingenio', cur: 'Cura' };
function allSages() { const out = []; ERAS.forEach((e, ei) => e.sages.forEach((s) => out.push({ s, ei }))); return out; }
function conceptCard(s) { const c = CONCEPT_CARDS[s.id]; return { id: s.id, name: s.concept.name, by: s.short, ...c }; }

// ============================================================================
//  HABILIDADES DE LOS FILÓSOFOS
//  every: cada cuántos turnos actúa · heal, shield, fog (s), rush, ironia, decoy, steal, armor, dodge, atk
// ============================================================================
const ABILITIES = {
  tales: { name: 'Todo es agua', text: 'Cada 3 turnos recupera 2 de convicción.', every: 3, heal: 2 },
  pitagoras: { name: 'Armonía', text: 'Cada 3 turnos se protege con un escudo de 3.', every: 3, shield: 3 },
  heraclito: { name: 'El Oscuro', text: 'Las respuestas aparecen tras 2 segundos de niebla.', fog: 2 },
  parmenides: { name: 'El Ser inmóvil', text: 'Cada 2 turnos se escuda con 4. Su golpe es duro.', every: 2, shield: 4, atk: 1 },
  protagoras: { name: 'Dos argumentos', text: 'Cada 2 turnos tienes la mitad de tiempo.', every: 2, rush: 1 },
  socrates: { name: 'Ironía', text: 'Si fallas, su golpe es doble.', ironia: 1 },
  platon: { name: 'Las sombras', text: 'Una respuesta falsa brilla como si fuera verdadera.', decoy: 1 },
  aristoteles: { name: 'El término medio', text: 'Cada 3 turnos recupera 3 y se escuda con 2.', every: 3, heal: 3, shield: 2, atk: 1 },
  diogenes: { name: 'Desvergüenza', text: 'Cada 2 turnos te quita una carta de la mano.', every: 2, steal: 1 },
  epicuro: { name: 'Ataraxia', text: 'Recibe 1 de daño menos de cada golpe.', armor: 1 },
  pirron: { name: 'Epojé', text: 'Cada 3 turnos suspende el juicio: tu golpe no le afecta.', every: 3, dodge: 1 },
  marcoaurelio: { name: 'Fortaleza estoica', text: 'Cada 2 turnos se escuda con 3. Recibe 1 menos.', every: 2, shield: 3, armor: 1, atk: 1 },
  agustin: { name: 'Confesiones', text: 'Cada 3 turnos recupera 3.', every: 3, heal: 3 },
  averroes: { name: 'El Comentador', text: 'Cada 2 turnos se escuda con 2.', every: 2, shield: 2 },
  ockham: { name: 'La navaja', text: 'Cada 2 turnos corta una carta de tu mano.', every: 2, steal: 1 },
  tomas: { name: 'Las cinco vías', text: 'Cada 3 turnos se escuda con 5. Golpea fuerte.', every: 3, shield: 5, atk: 2 },
  pico: { name: 'El camaleón', text: 'Cada 2 turnos recupera 2.', every: 2, heal: 2 },
  maquiavelo: { name: 'Mejor temido', text: 'Su golpe hace 2 más.', atk: 2 },
  montaigne: { name: '¿Qué sé yo?', text: 'Las respuestas aparecen tras 2 segundos de niebla.', fog: 2 },
  bacon: { name: 'Los ídolos', text: 'Una respuesta falsa brilla. Cada 2 turnos se escuda con 3.', every: 2, shield: 3, decoy: 1, atk: 1 },
  descartes: { name: 'El genio maligno', text: 'Una respuesta falsa brilla como si fuera verdadera.', decoy: 1 },
  spinoza: { name: 'Necesidad', text: 'Recibe 1 de daño menos de cada golpe.', armor: 1 },
  locke: { name: 'Tabla rasa', text: 'Cada 3 turnos te cambia la mano por otra.', every: 3, steal: 3 },
  hume: { name: 'La costumbre', text: 'Cada 2 turnos tienes la mitad de tiempo.', every: 2, rush: 1 },
  kant: { name: 'La crítica', text: 'Niebla de 2 s. Cada 2 turnos se escuda con 4. Golpea fuerte.', every: 2, shield: 4, fog: 2, atk: 2 },
};

// ============================================================================
//  ARTE: monedas antiguas con el perfil de cada pensador
// ============================================================================
const ERA_TINT = ['#f0a35e', '#7fb2ff', '#e06a6a', '#ffcf6a', '#5fd18a', '#9ab8ff'];
const ERA_BG = [['#3a2414', '#c8803e'], ['#1c2c4a', '#7aa6d8'], ['#2a0f1e', '#b84a5a'], ['#0b0d1e', '#3b3f8a'], ['#162a20', '#c87a4a'], ['#05081c', '#2a3a7a']];
let coinSeq = 0;
function coinSVG(s, opts = {}) {
  const id = 'c' + (coinSeq++); const look = s.look || {}; const metal = opts.metal || 'gold';
  const M = { gold: ['#fff1c4', '#d6a84a', '#7a5418', '#3d2a0a'], silver: ['#ffffff', '#b8bcc8', '#5c6070', '#2a2c34'], bronze: ['#8a6a4a', '#5a4030', '#2a1c12', '#140c08'] }[metal];
  const hair = { none: 1, laurel: 1, bald: 0, hood: 0, tonsure: 0, mitre: 1, turban: 0, beret: 1, cap: 0, ruff: 1, wig: 1, longhair: 1 }[look.hat] ?? 1;
  let extra = '';
  const relief = `fill="url(#${id}r)" stroke="${M[3]}" stroke-width="0.8" stroke-linejoin="round"`;
  // pelo
  if (hair && look.hat !== 'wig' && look.hat !== 'longhair') extra += `<path d="M37 33 C38 17 60 12 67 24 C61 21 50 23 46 33 C44 39 44 45 41 50 C36 46 35 38 37 33 Z" ${relief} opacity="0.95"/>`;
  if (look.hat === 'longhair') extra += `<path d="M36 34 C36 16 62 12 67 24 C60 22 50 24 47 33 C46 44 46 56 44 64 C38 64 34 60 33 52 C32 46 34 40 36 34 Z" ${relief}/>`;
  if (look.hat === 'wig') extra += `<path d="M36 33 C37 17 61 12 67 24 C60 22 50 24 46 33 Z" ${relief}/>` + [[38, 42], [36, 49], [38, 56], [42, 47]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5" ${relief}/>`).join('');
  if (look.hat === 'laurel') extra += Array.from({ length: 7 }, (_, k) => { const a = -2.6 + k * 0.38; const x = 52 + Math.cos(a) * 17, y = 33 + Math.sin(a) * 15; return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="4" ry="1.8" transform="rotate(${(a * 57 + 60).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" ${relief}/>`; }).join('');
  if (look.hat === 'hood') extra += `<path d="M30 60 C26 36 36 14 56 13 C68 13 73 22 72 30 C66 24 52 22 46 32 C42 42 44 56 40 70 Z" ${relief}/>`;
  if (look.hat === 'tonsure') extra += `<path d="M39 33 C40 25 50 21 58 22 C52 24 46 29 45 36 C44 42 44 46 41 49 C37 45 37 38 39 33 Z" ${relief}/>`;
  if (look.hat === 'mitre') extra += `<path d="M40 30 L50 4 L66 26 C58 22 48 23 40 30 Z" ${relief}/><path d="M50 6 L52 26" stroke="${M[3]}" stroke-width="1"/>`;
  if (look.hat === 'turban') extra += `<ellipse cx="52" cy="24" rx="18" ry="9" ${relief}/><ellipse cx="52" cy="18" rx="14" ry="7" ${relief}/><path d="M42 24 C50 20 60 22 66 27" fill="none" stroke="${M[3]}" stroke-width="1"/>`;
  if (look.hat === 'beret') extra += `<ellipse cx="52" cy="20" rx="20" ry="6" transform="rotate(-12 52 20)" ${relief}/>`;
  if (look.hat === 'cap') extra += `<path d="M37 34 C36 18 60 12 68 26 C60 24 48 24 44 34 Z" ${relief}/>`;
  if (look.hat === 'bald') extra += `<path d="M38 40 C38 36 40 34 42 34 C42 40 42 46 40 50 C38 48 37 44 38 40 Z" ${relief}/>`;
  // barba
  if (look.beard) extra += `<path d="M50 49 C54 56 64 56 70 53 C71 62 66 72 57 72 C50 71 47 62 49 54 Z" ${relief}/><path d="M55 58 C58 62 60 66 58 70 M60 57 C63 61 64 65 62 69" fill="none" stroke="${M[3]}" stroke-width="0.6" opacity="0.6"/>`;
  if (look.hat === 'ruff') extra += `<ellipse cx="50" cy="73" rx="17" ry="5" ${relief}/><path d="M35 73 Q38 70 41 73 Q44 70 47 73 Q50 70 53 73 Q56 70 59 73 Q62 70 65 73" fill="none" stroke="${M[3]}" stroke-width="0.7"/>`;
  const name = (s.short || s.name).toUpperCase();
  return `<svg class="coin ${metal}" viewBox="0 0 100 100" aria-hidden="true">
    <defs>
      <radialGradient id="${id}g" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="${M[0]}"/><stop offset="0.45" stop-color="${M[1]}"/><stop offset="1" stop-color="${M[2]}"/></radialGradient>
      <linearGradient id="${id}r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${M[0]}"/><stop offset="0.5" stop-color="${M[1]}"/><stop offset="1" stop-color="${M[2]}"/></linearGradient>
      <path id="${id}t" d="M 14 50 A 36 36 0 0 1 86 50"/>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#${id}g)" stroke="${M[3]}" stroke-width="1.5"/>
    <circle cx="50" cy="50" r="41" fill="none" stroke="${M[3]}" stroke-width="0.8" stroke-dasharray="1.2 1.6" opacity="0.7"/>
    <g transform="translate(4 9) scale(0.86)">
      <path d="M28 88 C30 74 42 68 52 68 C62 68 72 74 74 88 Z" ${relief}/>
      <path d="M38 30 C40 18 58 14 66 22 C70 26 71 32 70 37 L74 46 L70 48 C71 51 70 53 69 54 C70 56 68 59 66 60 C60 63 55 63 52 61 L53 70 L41 72 C36 60 33 50 34 40 C35 34 36 32 38 30 Z" ${relief}/>
      <path d="M60 37 C62 36 64 36 65 38" fill="none" stroke="${M[3]}" stroke-width="1"/>
      <path d="M45 40 C42 41 42 47 45 48" fill="none" stroke="${M[3]}" stroke-width="1"/>
      ${extra}
    </g>
    <text font-family="Marcellus SC, Georgia, serif" font-size="8.5" letter-spacing="1.2" fill="${M[3]}" opacity="0.85"><textPath href="#${id}t" startOffset="50%" text-anchor="middle">${esc(name)}</textPath></text>
  </svg>`;
}

// ============================================================================
//  ARTE: emblemas de las cartas
// ============================================================================
function artSVG(key, col = '#ffd36a') {
  const g = `stroke="${col}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  const f = `fill="${col}"`;
  const A = {
    quill: `<path d="M30 74 C44 50 60 34 76 24 C72 40 58 58 34 72" ${g}/><path d="M30 74 L24 82" ${g}/><path d="M48 54 L56 58 M54 46 L62 50" ${g}/>`,
    shield: `<path d="M50 20 L74 28 C74 52 66 68 50 80 C34 68 26 52 26 28 Z" ${g}/><path d="M50 30 L50 70 M36 42 L64 42" ${g}/>`,
    question: `<path d="M38 38 C38 26 62 24 62 38 C62 48 50 48 50 58" ${g}/><circle cx="50" cy="70" r="3" ${f}/><circle cx="50" cy="50" r="30" ${g} opacity="0.4"/>`,
    hourglass: `<path d="M34 20 L66 20 M34 80 L66 80 M36 20 C36 40 64 44 64 50 C64 56 36 60 36 80 M64 20 C64 40 36 44 36 50 C36 56 64 60 64 80" ${g}/><path d="M42 72 L58 72 L50 64 Z" ${f}/>`,
    book: `<path d="M50 30 C42 24 30 24 22 28 L22 74 C30 70 42 70 50 76 C58 70 70 70 78 74 L78 28 C70 24 58 24 50 30 Z M50 30 L50 76" ${g}/>`,
    water: `<path d="M50 18 C44 30 36 38 36 48 C36 57 42 62 50 62 C58 62 64 57 64 48 C64 38 56 30 50 18 Z" ${g}/><path d="M18 72 Q26 66 34 72 T50 72 T66 72 T82 72 M18 82 Q26 76 34 82 T50 82 T66 82 T82 82" ${g}/>`,
    tetractys: [[50, 22], [43, 36], [57, 36], [36, 50], [50, 50], [64, 50], [29, 64], [43, 64], [57, 64], [71, 64]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.2" ${f}/>`).join('') + `<path d="M50 14 L80 72 L20 72 Z" ${g} opacity="0.5"/>`,
    flame: `<path d="M50 16 C58 32 72 40 70 58 C68 72 58 80 50 80 C40 80 30 72 30 58 C30 46 40 42 42 30 C46 38 50 40 52 46 C56 38 54 26 50 16 Z" ${g}/><path d="M50 52 C54 58 58 62 56 70 C54 75 46 75 44 70 C42 64 48 60 50 52 Z" ${f} opacity="0.7"/>`,
    sphere: `<circle cx="50" cy="50" r="28" ${g}/><ellipse cx="50" cy="50" rx="28" ry="9" ${g} opacity="0.5"/><circle cx="40" cy="40" r="7" ${f} opacity="0.5"/>`,
    scales: `<path d="M50 20 L50 78 M36 78 L64 78 M24 34 L76 34" ${g}/><path d="M24 34 L16 54 L32 54 Z M76 34 L68 54 L84 54 Z" ${g}/><circle cx="50" cy="20" r="3" ${f}/>`,
    maieutic: `<path d="M50 24 C40 24 32 32 32 42 C32 52 40 56 46 60 L46 68 L54 68 L54 60 C60 56 68 52 68 42 C68 32 60 24 50 24 Z" ${g}/><path d="M46 74 L54 74 M47 79 L53 79" ${g}/><path d="M50 12 L50 16 M26 22 L29 25 M74 22 L71 25 M18 42 L22 42 M82 42 L78 42" ${g}/>`,
    cave: `<path d="M14 80 C14 44 30 26 50 26 C70 26 86 44 86 80" ${g}/><circle cx="50" cy="48" r="8" ${f}/><path d="M50 32 L50 36 M38 40 L41 42 M62 40 L59 42" ${g}/><path d="M30 80 L34 64 L38 80 M58 80 L62 66 L66 80" ${g} opacity="0.6"/>`,
    seed: `<path d="M50 80 L50 44" ${g}/><path d="M50 56 C40 56 32 48 32 38 C42 38 50 46 50 56 Z M50 48 C60 48 68 40 68 30 C58 30 50 38 50 48 Z" ${g}/><ellipse cx="50" cy="82" rx="10" ry="3" ${f} opacity="0.6"/>`,
    lamp: `<path d="M38 34 L62 34 L60 70 L40 70 Z M36 70 L64 70 M42 34 C42 24 58 24 58 34" ${g}/><path d="M50 46 C54 52 54 58 50 62 C46 58 46 52 50 46 Z" ${f}/>`,
    garden: `<path d="M50 80 L50 40 M50 52 C40 52 34 44 34 34 C44 34 50 42 50 52 Z M50 46 C60 46 66 38 66 28 C56 28 50 36 50 46 Z" ${g}/><path d="M20 80 L80 80" ${g}/><circle cx="28" cy="74" r="3" ${f}/><circle cx="72" cy="74" r="3" ${f}/>`,
    balance: `<path d="M20 50 L80 50 M50 50 L50 78 M38 78 L62 78" ${g}/><circle cx="26" cy="44" r="6" ${g}/><circle cx="74" cy="44" r="6" ${g}/><circle cx="50" cy="50" r="3" ${f}/>`,
    laurel: Array.from({ length: 9 }, (_, k) => { const a = Math.PI * 0.85 + k * 0.2; const x = 50 + Math.cos(a) * 26, y = 54 + Math.sin(a) * 26; return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6" ry="2.5" transform="rotate(${(a * 57 + 70).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" ${f}/><ellipse cx="${(100 - x).toFixed(1)}" cy="${y.toFixed(1)}" rx="6" ry="2.5" transform="rotate(${(-a * 57 - 70).toFixed(0)} ${(100 - x).toFixed(1)} ${y.toFixed(1)})" ${f}/>`; }).join(''),
    heart: `<path d="M50 74 C30 60 24 48 28 38 C32 28 46 28 50 38 C54 28 68 28 72 38 C76 48 70 60 50 74 Z" ${g}/><path d="M50 14 L50 22 M24 22 L30 28 M76 22 L70 28 M14 46 L22 46 M86 46 L78 46" ${g}/>`,
    astrolabe: `<circle cx="50" cy="50" r="28" ${g}/><circle cx="50" cy="50" r="18" ${g} opacity="0.6"/><path d="M22 50 L78 50 M50 22 L50 78 M30 30 L70 70" ${g} opacity="0.7"/><circle cx="50" cy="50" r="3" ${f}/>`,
    razor: `<path d="M18 62 L64 30 C70 26 78 30 76 38 L34 72 Z" ${g}/><path d="M24 66 L68 34" ${g} opacity="0.5"/><path d="M34 72 L26 84" ${g}/>`,
    fiveways: Array.from({ length: 5 }, (_, k) => { const a = -Math.PI / 2 + (k / 5) * TAU; return `<path d="M50 50 L${(50 + Math.cos(a) * 32).toFixed(1)} ${(50 + Math.sin(a) * 32).toFixed(1)}" ${g}/><circle cx="${(50 + Math.cos(a) * 32).toFixed(1)}" cy="${(50 + Math.sin(a) * 32).toFixed(1)}" r="4" ${f}/>`; }).join('') + `<circle cx="50" cy="50" r="7" ${f}/>`,
    ladder: `<path d="M36 82 L44 18 M64 82 L56 18" ${g}/>` + [74, 62, 50, 38, 26].map((y, k) => `<path d="M${37 + k * 1.6} ${y} L${63 - k * 1.6} ${y}" ${g}/>`).join(''),
    wheel: `<circle cx="50" cy="50" r="28" ${g}/><circle cx="50" cy="50" r="5" ${f}/>` + Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * TAU; return `<path d="M50 50 L${(50 + Math.cos(a) * 28).toFixed(1)} ${(50 + Math.sin(a) * 28).toFixed(1)}" ${g}/>`; }).join(''),
    tower: `<path d="M38 82 L38 36 L62 36 L62 82 M34 36 L50 18 L66 36" ${g}/><path d="M46 52 L54 52 L54 62 L46 62 Z" ${f} opacity="0.7"/><path d="M70 30 C76 40 78 52 72 62" ${g} opacity="0.6"/>`,
    flask: `<path d="M42 18 L58 18 M45 18 L45 42 L28 76 C26 80 28 84 32 84 L68 84 C72 84 74 80 72 76 L55 42 L55 18" ${g}/><path d="M34 70 L66 70 L71 79 L29 79 Z" ${f} opacity="0.6"/>`,
    axes: `<path d="M24 76 L24 20 M24 76 L82 76" ${g}/><path d="M24 20 L20 28 M24 20 L28 28 M82 76 L74 72 M82 76 L74 80" ${g}/><path d="M24 76 C40 70 52 48 74 30" ${g} opacity="0.7"/><circle cx="56" cy="46" r="4" ${f}/>`,
    lens: `<ellipse cx="50" cy="50" rx="14" ry="28" ${g}/><ellipse cx="50" cy="50" rx="6" ry="20" ${g} opacity="0.5"/><path d="M16 50 L36 50 M64 50 L84 50" ${g} opacity="0.6"/><circle cx="84" cy="50" r="3" ${f}/>`,
    tablet: `<rect x="28" y="20" width="44" height="60" rx="4" ${g}/><path d="M36 32 L64 32" ${g} opacity="0.3"/>`,
    billiard: `<circle cx="34" cy="58" r="12" ${g}/><circle cx="66" cy="48" r="12" ${f} opacity="0.75"/><path d="M14 66 L22 62 M46 54 L54 50" ${g}/><path d="M80 42 L88 38" ${g} opacity="0.6"/>`,
    copernicus: `<circle cx="50" cy="50" r="9" ${f}/><ellipse cx="50" cy="50" rx="32" ry="14" ${g}/><circle cx="82" cy="50" r="4" ${f}/>` + [[22, 22], [78, 20], [24, 80], [80, 78], [50, 16]].map(([x, y]) => `<path d="M${x - 3} ${y} L${x + 3} ${y} M${x} ${y - 3} L${x} ${y + 3}" ${g}/>`).join(''),
  };
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${A[key] || A.question}</svg>`;
}
// emblema de cada época para el mapa
function eraEmblem(i) {
  const g = 'stroke="currentColor" stroke-width="1.5" fill="none"';
  return [
    `<path d="M10 90 L90 90 M18 90 L18 50 M30 90 L30 60 M70 90 L70 46 M82 90 L82 56 M14 50 L22 50 M66 46 L74 46" ${g}/>`,
    `<path d="M8 90 L92 90 M12 84 L88 84 M14 40 L86 40 L50 20 Z M20 44 L20 84 M32 44 L32 84 M44 44 L44 84 M56 44 L56 84 M68 44 L68 84 M80 44 L80 84" ${g}/>`,
    `<path d="M14 90 L14 30 L86 30 L86 90 M30 90 L30 58 C30 44 70 44 70 58 L70 90 M10 30 L90 30 M18 24 L82 24" ${g}/>`,
    `<circle cx="50" cy="44" r="26" ${g}/><circle cx="50" cy="44" r="10" ${g}/>` + Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * TAU; return `<path d="M${(50 + Math.cos(a) * 10).toFixed(1)} ${(44 + Math.sin(a) * 10).toFixed(1)} L${(50 + Math.cos(a) * 26).toFixed(1)} ${(44 + Math.sin(a) * 26).toFixed(1)}" ${g}/>`; }).join('') + `<path d="M24 90 L24 70 M76 90 L76 70 M14 90 L86 90" ${g}/>`,
    `<path d="M20 90 L20 56 L80 56 L80 90 M26 56 C26 26 74 26 74 56 M50 22 L50 30 M44 22 L56 22 M10 90 L90 90" ${g}/>`,
    `<path d="M20 90 L44 62 M44 62 L80 22 M40 66 L48 58 M74 18 L86 30 M30 90 L58 90 M44 62 L50 90" ${g}/>` + [[20, 20], [60, 14], [30, 40], [88, 52]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="currentColor"/>`).join(''),
  ][i];
}
function cardHTML(c, opts = {}) {
  const sage = allSages().find((x) => x.s.id === c.id);
  const col = { atk: '#ffb35a', def: '#8fc8ff', ing: '#8ff0b8', cur: '#ffd36a' }[c.type];
  return `<div class="card t-${c.type}${opts.small ? ' small' : ''}${c.temp ? ' temp' : ''}" ${opts.attrs || ''}>
    <div class="c-top"><span class="c-type">${TYPE_NAME[c.type]}</span>${sage ? `<span class="c-by">${esc(sage.s.short)}</span>` : ''}</div>
    <div class="c-art">${artSVG(c.art, col)}</div>
    <div class="c-name">${esc(c.name)}</div>
    <div class="c-text">${esc(c.text)}</div>
  </div>`;
}
