import json, subprocess, time, sys
STY = {
 0: ("Costas de Jonia", "ancient greek inspired instrumental, solo lyre and soft frame drum, gentle sea waves ambience, dorian mode, sunset, contemplative wonder, adventure game exploration music, no vocals"),
 2: ("Helenismo y Roma", "ancient roman and hellenistic inspired instrumental, cornu brass, lyre, warm strings, low drums, majestic twilight, cinematic adventure game exploration, no vocals"),
 3: ("Catedral medieval", "medieval sacred instrumental, gregorian-like wordless choir pads, pipe organ drones, hand bells, candlelit cathedral, reverent and mysterious, game exploration music, no lyrics"),
 4: ("Florencia renacentista", "renaissance instrumental, lute, recorder, viola da gamba, tambourine, bright tuscan morning, elegant and joyful, adventure game exploration music, no vocals"),
 5: ("La Ilustración", "baroque instrumental, harpsichord, string quartet, alberti bass, curious and elegant, library at night with stars, game exploration music, no vocals"),
 6: ("Siglo XIX", "romantic era instrumental, solo piano and cello with strings, nostalgic golden sunset, industrial age wonder, cinematic game exploration music, no vocals"),
 7: ("Época contemporánea", "modern ambient instrumental, soft felt piano, warm synth pads, gentle electronic pulses, city lights at night, hopeful and reflective, game exploration music, no vocals"),
 8: ("América Latina", "latin american folk instrumental, andean quena flute, charango, guitar, bombo drum, warm colonial plaza morning, joyful and soulful, game exploration music, no vocals"),
 9: ("Tenochtitlan", "mesoamerican inspired instrumental, clay flutes, huehuetl and teponaztli drums, rain stick, shell trumpet, lake city at morning, mystical and majestic, game music, no vocals"),
 10: ("Los Andes", "andean instrumental, quena and zampoña pan flutes, charango, bombo, wind over high mountains, majestic and serene, game exploration music, no vocals"),
 11: ("Wallmapu", "mapuche inspired instrumental, kultrun drum steady heartbeat, trutruka horn, wooden flutes, forest of araucarias, river, misty evening, deep and earthy, game music, no vocals"),
 12: ("China clásica", "traditional chinese instrumental, guzheng, dizi bamboo flute, erhu, soft gong, misty mountains and pagoda at dawn, serene taoist mood, game exploration music, no vocals"),
 13: ("La India", "indian classical inspired instrumental, sitar, bansuri flute, tanpura drone, tabla, sunset over the ganges, meditative and warm, game exploration music, no vocals"),
 14: ("África", "african instrumental, kora harp, djembe and talking drums, balafon, savanna golden sunset, uplifting and dignified, game exploration music, no vocals"),
}
A = 'Authorization: Bearer proxy-injected'
def curl(args): return json.loads(subprocess.run(['curl', '-sS', '-m', '60', '-H', A] + args, capture_output=True, text=True).stdout)
tasks = {}
for k, (title, style) in STY.items():
    body = {"customMode": True, "instrumental": True, "model": "V4_5", "title": title, "style": style, "prompt": "", "callBackUrl": "https://example.com/kie-callback"}
    r = curl(['-X', 'POST', 'https://api.kie.ai/api/v1/generate', '-H', 'Content-Type: application/json', '-d', json.dumps(body)])
    tasks[k] = r.get('data', {}) and r['data'].get('taskId'); print(k, r.get('msg'), tasks[k], flush=True); time.sleep(1.5)
json.dump(tasks, open('music_tasks.json', 'w'))
