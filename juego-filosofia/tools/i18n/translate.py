"""Traduce tools/i18n/strings.json al inglés con Opus-MT (CTranslate2, en local) y guarda
tools/i18n/en.json. Respeta etiquetas HTML y huecos ⟦n⟧; traduce frase a frase.
Lo ya traducido se conserva (en.json), y las correcciones a mano de en-fix.json mandan.
Uso: python translate.py <carpeta del modelo ct2>"""
import json, os, re, sys, time
import ctranslate2, sentencepiece as spm
D = os.path.dirname(os.path.abspath(__file__)); M = sys.argv[1]
tr = ctranslate2.Translator(M, device='cpu', compute_type='int8', inter_threads=1, intra_threads=os.cpu_count())
sp_s = spm.SentencePieceProcessor(os.path.join(M, 'source.spm')); sp_t = spm.SentencePieceProcessor(os.path.join(M, 'target.spm'))
strings = json.load(open(os.path.join(D, 'strings.json')))
out_p = os.path.join(D, 'en.json'); done = json.load(open(out_p)) if os.path.exists(out_p) else {}
TOK = re.compile(r'(<[^>]+>|⟦\d+⟧|\n)')
SENT = re.compile(r'(?<=[.!?…»])\s+(?=[«¿¡"A-ZÁÉÍÓÚÑ0-9])')
def pieces(s):
    out = []
    for part in TOK.split(s):
        if not part or TOK.fullmatch(part) or not re.search(r'[A-Za-zÁÉÍÓÚÑáéíóúñ]', part): out.append(('keep', part)); continue
        lead = re.match(r'^\s*', part).group(0); trail = re.search(r'\s*$', part).group(0); core = part.strip()
        if lead: out.append(('keep', lead))
        sents = SENT.split(core)
        for k, x in enumerate(sents): out.append(('tr', x)); out.append(('keep', ' ' if k < len(sents) - 1 else ''))
        if trail: out.append(('keep', trail))
    return out
todo = [s for s in strings if s not in done]
plan = [(s, pieces(s)) for s in todo]
uniq = sorted({x for _, p in plan for k, x in p if k == 'tr'}, key=len)
print('textos', len(todo), 'frases', len(uniq), flush=True)
cache = {}; t0 = time.time(); B = 48
for i in range(0, len(uniq), B):
    batch = uniq[i:i + B]
    res = tr.translate_batch([sp_s.encode(x, out_type=str) + ['</s>'] for x in batch], beam_size=3, max_batch_size=B, max_decoding_length=400)
    for x, r in zip(batch, res): cache[x] = sp_t.decode(r.hypotheses[0])
    if i // B % 40 == 0: print(f'{i + len(batch)}/{len(uniq)} {time.time() - t0:.0f}s', flush=True)
for s, p in plan:
    done[s] = ''.join(cache.get(x, x) if k == 'tr' else x for k, x in p)
json.dump(done, open(out_p, 'w'), ensure_ascii=False, indent=0)
print('listo', len(done), f'{time.time() - t0:.0f}s')
