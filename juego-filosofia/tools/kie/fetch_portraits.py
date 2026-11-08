import json, subprocess, os, time
A = 'Authorization: Bearer proxy-injected'
tasks = json.load(open('portrait_tasks.json')); tasks['socrates'] = 'c05689f10e879fb151bce25c3e21b113'
pending = {k: v for k, v in tasks.items() if not os.path.exists(f'img/{k}.png')}
for rnd in range(60):
    for k, t in list(pending.items()):
        r = json.loads(subprocess.run(['curl', '-sS', '-m', '60', '-H', A, f'https://api.kie.ai/api/v1/jobs/recordInfo?taskId={t}'], capture_output=True, text=True).stdout)['data']
        if r['state'] == 'success':
            url = json.loads(r['resultJson'])['resultUrls'][0]
            subprocess.run(['curl', '-sS', '-m', '120', '-o', f'img/{k}.png', url]); del pending[k]
        elif r['state'] == 'fail': print('FAIL', k, r.get('failMsg')); del pending[k]
    if not pending: break
    time.sleep(6)
print('faltan', list(pending))
