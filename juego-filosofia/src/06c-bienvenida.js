// ============================================================================
//  BIENVENIDA DEL FILÓSOFO GUÍA (Filosofía para Seres Humanos)
//  Al empezar una nueva odisea, el guía da la bienvenida en video con subtítulos.
// ============================================================================
const Welcome = {
  src: 'video/bienvenida.mp4',
  lines: [
    [0.0, 3.2, 'Bienvenido, bienvenida, al camino del filósofo.'],
    [3.35, 7.95, 'Recuerda: la filosofía es la luz que ilumina cuando todo parece oscuro…'],
    [7.95, 13.2, '…pero también es la oscuridad, cuando todo parece demasiado claro.'],
    [13.4, 16.8, 'Te invito a estudiar filosofía conmigo.'],
    [16.8, 30, '¡Comienza tu odisea!'],
  ],
  next: null, done: false,
  play(next) {
    this.next = next; this.done = false;
    const v = $('#wl-video');
    if (!v.getAttribute('src')) v.src = this.src;
    G.state = 'welcome'; try { Track.pause(); } catch (e) {}
    $('#wl-go').hidden = true; $('#wl-skip').hidden = false; $('#wl-sub').textContent = '';
    show('welcome');
    v.currentTime = 0;
    const p = v.play();
    if (p && p.catch) p.catch(() => { $('#wl-go').hidden = false; }); // sin video o sin permiso de audio: se puede seguir igual
  },
  finish() {
    if (this.done) return; this.done = true;
    const v = $('#wl-video'); v.pause();
    $('#welcome').hidden = true;
    try { Track.resume(); } catch (e) {}
    const n = this.next; this.next = null; if (n) n();
  },
};
$('#wl-video').addEventListener('timeupdate', (e) => {
  const t = e.target.currentTime; const l = Welcome.lines.find((x) => t >= x[0] && t < x[1]);
  const txt = l ? l[2] : ''; if ($('#wl-sub').textContent !== txt) $('#wl-sub').textContent = txt;
});
$('#wl-video').addEventListener('ended', () => { $('#wl-skip').hidden = true; $('#wl-go').hidden = false; setTimeout(() => Welcome.finish(), 1200); });
$('#wl-video').addEventListener('error', () => { $('#wl-go').hidden = false; });
on('#wl-skip', () => Welcome.finish());
on('#wl-go', () => Welcome.finish());
