import json, subprocess, time, os, sys
STYLE = ", wide cinematic landscape, painterly concept art for an educational adventure video game, rich oil painting with visible brushstrokes, atmospheric light, majestic and inviting, no people in the foreground, no text, no letters, no frame"
E = {
 0: 'ruins of ionian greek temples on a rocky coast of the Aegean sea at golden sunset, Miletus harbor with ancient ships',
 1: 'classical Athens at bright midday, the Parthenon on the Acropolis above the agora with marble stoas, olive trees and flowering gardens',
 2: 'hellenistic Alexandria and Rome at purple twilight, the lighthouse of Alexandria, a roman triumphal arch and corinthian columns, first stars',
 3: 'interior of a gothic cathedral at night, tall stained glass windows glowing, candles, beams of colored light, monks reading',
 4: 'Renaissance Florence at a bright morning, Brunelleschi dome over terracotta roofs, Tuscan hills, cypress trees',
 5: 'Enlightenment library observatory at night, tall bookshelves, a brass orrery, a large telescope pointing to a starry sky with a full moon',
 6: '19th century iron and glass exhibition hall at golden sunset, gas lamps, autumn trees, a steam locomotive, snowy alps beyond a sea of mist',
 7: 'modern city plaza at blue hour night, glass skyscrapers with lit windows, cherry blossom trees, string lights, planet Earth large in the sky',
 8: 'Latin American colonial plaza in the morning, colorful houses with arches and balconies, papel picado, purple jacaranda trees, a stepped pyramid and the snowy Andes',
 9: 'Aztec city of Tenochtitlan on a lake, the twin-temple Templo Mayor, canals with canoes and floating flower gardens, smoking volcanoes',
 10: 'Inca citadel in the high Andes, fitted stone walls, green agricultural terraces, llamas, a dramatic green peak in the clouds',
 11: 'Mapuche land in southern Chile, forest of araucaria trees, thatched rukas with smoke, a snowy smoking volcano, a river, misty evening',
 12: 'classical China at dawn, red pillared pavilions, a pagoda, bamboo groves, red lanterns, misty karst mountains, pink sky',
 13: 'ancient India at sunset, sandstone arcades, a great white Buddhist stupa, banyan trees, marigold garlands, the Ganges with oil lamps',
 14: 'Africa at golden sunset, Timbuktu mud mosque with wooden beams, baobab trees, acacias, distant pyramids and Mount Kilimanjaro',
}
A = 'Authorization: Bearer proxy-injected'
def curl(args): return json.loads(subprocess.run(['curl', '-sS', '-m', '60', '-H', A] + args, capture_output=True, text=True).stdout)
os.makedirs('era', exist_ok=True)
tasks = {}
for k, desc in E.items():
    body = {"model": "google/nano-banana", "input": {"prompt": desc + STYLE, "output_format": "png", "image_size": "16:9"}}
    r = curl(['-X', 'POST', 'https://api.kie.ai/api/v1/jobs/createTask', '-H', 'Content-Type: application/json', '-d', json.dumps(body)])
    tasks[k] = (r.get('data') or {}).get('taskId'); time.sleep(0.8)
pending = dict(tasks)
for rnd in range(60):
    for k, t in list(pending.items()):
        r = curl([f'https://api.kie.ai/api/v1/jobs/recordInfo?taskId={t}'])['data']
        if r['state'] == 'success': subprocess.run(['curl', '-sS', '-m', '120', '-o', f'era/{k}.png', json.loads(r['resultJson'])['resultUrls'][0]]); del pending[k]
        elif r['state'] == 'fail': print('FAIL', k, r.get('failMsg')); del pending[k]
    if not pending: break
    time.sleep(6)
print('faltan', list(pending))
