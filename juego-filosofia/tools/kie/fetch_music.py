import json, subprocess, time
A = 'Authorization: Bearer proxy-injected'
tasks = json.load(open('music_tasks.json')); out = json.load(open('music_urls.json')) if __import__('os').path.exists('music_urls.json') else {}
for rnd in range(40):
    for k, t in tasks.items():
        if k in out: continue
        d = json.loads(subprocess.run(['curl', '-sS', '-m', '60', '-H', A, f'https://api.kie.ai/api/v1/generate/record-info?taskId={t}'], capture_output=True, text=True).stdout)['data']
        if d['status'] == 'SUCCESS': out[k] = [(x['audioUrl'], x['duration']) for x in d['response']['sunoData']]
        elif 'FAIL' in d['status'] or 'ERROR' in d['status']: out[k] = 'FAIL ' + str(d.get('errorMessage'))
    json.dump(out, open('music_urls.json', 'w'))
    if len(out) == len(tasks): break
    time.sleep(10)
for k, v in sorted(out.items(), key=lambda x: int(x[0])): print(k, v if isinstance(v, str) else [round(x[1]) for x in v])
