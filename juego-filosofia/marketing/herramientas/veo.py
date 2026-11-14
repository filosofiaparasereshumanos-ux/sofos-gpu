import json,subprocess,sys
U=json.load(open('urls.json'))
H="Cinematic vertical film shot, photorealistic, natural motion. "
NAR="a deep, gravelly male movie-trailer narrator says in Latin American Spanish, in voiceover, slowly and dramatically:"
END=" No music. No subtitles, no text on screen."
P={
'hipatia':H+"Slow push-in on the woman philosopher in the Library of Alexandria at night; the orange glow of torches and moving shadows grows in the doorway behind her. First, "+NAR+" \"Alejandría. A ella la persiguieron por enseñar.\" Then the woman turns her head toward the camera and says firmly in Spanish: \"Defiende tu derecho a pensar.\" Sound: distant angry crowd, crackling torches."+END,
'sorjuana':H+"Slow push-in on the nun writing with a quill by candlelight; she stops writing and raises her eyes. First, "+NAR+" \"Nueva España. A ella le prohibieron escribir.\" Then the nun looks into the camera and says softly but proudly in Spanish: \"Yo no estudio para saber más, sino para ignorar menos.\" Sound: candle flame, quill scratching, distant convent bell."+END,
'nietzsche':H+"Low angle, the man with the huge moustache stands on the cliff in a violent storm, wind whipping his hair and coat, lightning flashes. He raises his face to the sky and shouts in Spanish with fury: \"¡Dios ha muerto!\" A huge thunderclap. Then "+NAR+" \"Y él se atrevió a desafiarlo todo.\" Sound: howling wind, thunder."+END,
'buda':H+"Slow push-in on the man meditating under the bodhi tree at dawn; he slowly opens his eyes, golden leaves drift down. "+NAR[0].upper()+NAR[1:]+" \"Durante veintiséis siglos... en la India, en China, en los Andes, en África... buscaron la verdad.\" Sound: soft dawn wind, birds."+END,
'phone':H+"Slow push-in on the teenage girl looking at her phone at night; the golden glow of the screen grows brighter on her amazed face and she smiles. "+NAR[0].upper()+NAR[1:]+" \"Hoy puedes hablar con ellos. Preguntarles lo que quieras. Y desafiarlos.\" Sound: quiet bedroom at night, soft magical shimmer."+END,
'final':H+"The old bearded philosopher in the sunlit agora turns to look directly into the camera with a mischievous knowing half smile and says in Spanish, warmly and playfully: \"¿Te atreves a pensar?\" Then "+NAR+" \"Odisea de la Razón. Juega gratis.\" Sound: lively ancient marketplace murmur."+END,
}
keys=sys.argv[1:] or list(P)
t=json.load(open('veo_tasks.json')) if len(sys.argv)>1 else {}
for k in keys:
  b=json.dumps({"prompt":P[k],"imageUrls":[U[k]],"model":"veo3_fast","aspectRatio":"9:16","enableTranslation":False})
  r=subprocess.run(['curl','-sS','-m','60','-X','POST','https://api.kie.ai/api/v1/veo/generate','-H','Authorization: Bearer proxy-injected','-H','Content-Type: application/json','-d',b],capture_output=True,text=True).stdout
  print(k,r); t[k]=json.loads(r)['data']['taskId']
json.dump(t,open('veo_tasks.json','w'))
