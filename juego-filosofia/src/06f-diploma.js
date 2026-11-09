// ============================================================================
//  DIPLOMAS: al terminar la odisea o al vencer a todos los pensadores de una
//  época, el jugador descarga un diploma con su nombre (imagen PNG).
// ============================================================================
const Diploma = {
  logo: null,
  name() {
    let n = (typeof Fame !== 'undefined' && Fame.alias()) || (typeof Cuenta !== 'undefined' && Cuenta.ses && Cuenta.ses.usuario) || '';
    const v = window.prompt('¿Qué nombre quieres que aparezca en tu diploma?', n);
    if (v === null) return null;
    n = v.trim().slice(0, 40); if (n) try { store.set(ALIAS_KEY, n.slice(0, 22)); } catch (e) { /* nada */ }
    return n || 'Viajero de la razón';
  },
  wrap(x, text, maxW) { const words = text.split(' '); const lines = []; let cur = ''; for (const w of words) { const t = cur ? cur + ' ' + w : w; if (x.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; } if (cur) lines.push(cur); return lines; },
  async draw(d) {
    const W = 1600, H = 1131; const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
    try { await document.fonts.ready; } catch (e) { /* nada */ }
    if (!this.logo) this.logo = await new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = 'img/logo-fpsh.png'; });
    // papel
    const g = x.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, W * 0.75); g.addColorStop(0, '#fbf3df'); g.addColorStop(1, '#e8d6ad'); x.fillStyle = g; x.fillRect(0, 0, W, H);
    // marcos
    x.strokeStyle = '#8a6a2a'; x.lineWidth = 10; x.strokeRect(40, 40, W - 80, H - 80);
    x.strokeStyle = '#b8924a'; x.lineWidth = 3; x.strokeRect(62, 62, W - 124, H - 124);
    x.fillStyle = '#b8924a'; for (const [a, b] of [[62, 62], [W - 62, 62], [62, H - 62], [W - 62, H - 62]]) { x.beginPath(); x.arc(a, b, 14, 0, Math.PI * 2); x.fill(); }
    const disp = '"Marcellus SC", "Marcellus", Georgia, serif', body = '"EB Garamond", Georgia, serif';
    x.textAlign = 'center'; x.textBaseline = 'alphabetic';
    if (this.logo) { x.fillStyle = '#2a1e10'; x.beginPath(); x.arc(W / 2, 172, 92, 0, Math.PI * 2); x.fill(); x.strokeStyle = '#b8924a'; x.lineWidth = 4; x.stroke(); const h = 140, w = (this.logo.width / this.logo.height) * h; x.drawImage(this.logo, W / 2 - w / 2, 102, w, h); }
    x.fillStyle = '#6a4a1a'; x.font = `34px ${disp}`; x.fillText('ODISEA DE LA RAZÓN', W / 2, 300);
    x.fillStyle = '#2a1a08'; x.font = `92px ${disp}`; x.fillText('Diploma', W / 2, 395);
    x.fillStyle = '#5a4222'; x.font = `italic 34px ${body}`; x.fillText('Se otorga a', W / 2, 465);
    x.fillStyle = '#1a1008'; x.font = `82px ${body}`; x.fillText(d.name, W / 2, 560);
    x.strokeStyle = '#b8924a'; x.lineWidth = 2; x.beginPath(); x.moveTo(W / 2 - 420, 585); x.lineTo(W / 2 + 420, 585); x.stroke();
    x.fillStyle = '#3a2a12'; x.font = `36px ${body}`;
    this.wrap(x, d.text, 1180).forEach((l, i) => x.fillText(l, W / 2, 650 + i * 48));
    if (d.rank) { x.fillStyle = '#8a3a1a'; x.font = `44px ${disp}`; x.fillText(d.rank, W / 2, 800); }
    if (d.stats) { x.fillStyle = '#5a4222'; x.font = `30px ${body}`; x.fillText(d.stats, W / 2, 850); }
    // cita y firma
    x.fillStyle = '#6a5232'; x.font = `italic 28px ${body}`; x.fillText('«La filosofía es la luz que ilumina cuando todo parece muy oscuro.»', W / 2, 925);
    x.textAlign = 'left'; x.fillStyle = '#3a2a12'; x.font = `30px ${body}`; x.fillText(d.date, 150, 1010);
    x.font = `22px ${disp}`; x.fillStyle = '#7a5a2a'; x.fillText('FECHA', 150, 1045);
    x.textAlign = 'right'; x.font = `italic 40px ${body}`; x.fillStyle = '#2a1a08'; x.fillText('El guía', W - 150, 1010);
    x.font = `22px ${disp}`; x.fillStyle = '#7a5a2a'; x.fillText('FILOSOFÍA PARA SERES HUMANOS', W - 150, 1045);
    x.textAlign = 'center'; x.font = `24px ${body}`; x.fillStyle = '#7a5a2a'; x.fillText('filosofiaparasereshumanos.com', W / 2, 1065);
    // sello
    x.save(); x.translate(W / 2, 990); x.fillStyle = '#a8342a'; x.beginPath(); for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2, r = i % 2 ? 50 : 58; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.closePath(); x.fill();
    x.fillStyle = '#f8e8c8'; x.font = `40px ${disp}`; x.textBaseline = 'middle'; x.fillText('Φ', 0, 2); x.restore();
    return c;
  },
  async make(d) {
    const name = this.name(); if (name === null) return;
    const date = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    const c = await this.draw({ ...d, name, date });
    const blob = await new Promise((r) => c.toBlob(r, 'image/png'));
    const fname = 'diploma-odisea-' + (d.slug || 'razon') + '.png';
    try { const f = new File([blob], fname, { type: 'image/png' }); if (IS_TOUCH && navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], text: `¡Conseguí mi diploma en la Odisea de la Razón! ${GAME_URL}` }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = fname; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    if (typeof toast === 'function') toast('Diploma descargado. ¡Felicidades!');
  },
  // diploma de toda la odisea (pantalla final)
  odyssey() {
    this.make({ slug: 'completa', text: 'por haber completado la Odisea de la Razón, recorriendo veintiséis siglos de pensamiento y debatiendo con los grandes filósofos y filósofas de la historia.',
      rank: $('#e-rank').textContent, stats: [...$('#e-stats').children].map((d) => d.querySelector('b').textContent + ' ' + d.querySelector('span').textContent.toLowerCase()).join(' · ') });
  },
  // diploma de una época o cultura completa (desde el códice)
  era(i) {
    const e = ERAS[i];
    this.make({ slug: e.id, text: `por haber debatido y vencido a ${e.sages.map((s) => s.short).join(', ').replace(/, ([^,]*)$/, ' y $1')} en «${e.name}» (${e.years}).`, rank: `${e.num} · ${e.name}`, stats: '' });
  },
};
on('#b-diploma', () => Diploma.odyssey());
