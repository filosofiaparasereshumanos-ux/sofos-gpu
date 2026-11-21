import json,subprocess
S="Photorealistic cinematic film still, vertical composition, shot on ARRI Alexa with anamorphic lens, dramatic motivated lighting, shallow depth of field, subtle film grain, ultra detailed realistic skin texture, historically accurate costume, epic movie look, no text, no watermark. "
P={
'socrates':"Socrates, elderly bald ancient Greek philosopher with a thick curly grey beard, snub nose and bulging eyes, rough wool himation, sitting in a dim stone prison cell in Athens 399 BC, holding a clay cup of hemlock in his hands, a single shaft of dusty light from a high small window, calm defiant expression",
'hipatia':"Hypatia of Alexandria, a beautiful woman philosopher in her forties with dark hair tied back, white Greco-Egyptian robe, standing among towering shelves of papyrus scrolls in the Library of Alexandria at night, a bronze astrolabe beside her, oil lamps, the orange glow of an angry mob's torches coming through the doorway behind her",
'sorjuana':"Sor Juana Ines de la Cruz, 17th century Mexican Hieronymite nun with black veil, white wimple and a large painted escudo de monja medallion on her chest, writing with a quill at night by candlelight at a desk piled with books in her convent cell in colonial Mexico City",
'nietzsche':"Friedrich Nietzsche, 19th century German philosopher with a huge thick walrus moustache and intense deep-set eyes, dark wool frock coat, standing on the edge of a rocky alpine cliff in the Swiss Alps under a dark stormy sky, wind blowing his hair, lightning far away",
'buda':"Siddhartha Gautama the Buddha, a serene Indian man with dark hair in a topknot and elongated earlobes, simple saffron robe, seated in lotus meditation under a giant ancient bodhi tree at dawn, golden mist, floating dust motes, rays of sunlight through leaves",
'final':"Socrates, elderly bald ancient Greek philosopher with a thick curly grey beard and snub nose, standing in the busy sunlit Athenian agora at golden hour with the Parthenon on the Acropolis behind him, looking directly into the camera with a mischievous knowing half smile, blurred citizens in togas around",
'inca':"Inca emperor Pachacutec in ornate gold ear spools, red mascapaicha fringe crown and rich tocapu textile tunic, standing on the stone terraces of Machu Picchu above a sea of clouds at sunrise",
'azteca':"Nezahualcoyotl, Aztec poet king of Texcoco with quetzal feather headdress, turquoise jewelry and embroidered tilmatli cloak, standing atop a temple pyramid overlooking the lake city of Tenochtitlan with canals and canoes at sunset",
'china':"Confucius, elderly Chinese sage with long white beard and traditional Zhou dynasty scholar robes and hat, teaching young disciples in a wooden pavilion in misty green mountains, bamboo, soft morning light",
'africa':"An ancient Egyptian sage vizier in white linen and gold collar dictating wisdom to a kneeling scribe with papyrus beside the Nile at sunset, pyramids of Giza in the hazy distance, feluccas on the river",
'mapuche':"A Mapuche machi woman with silver trarilonco headband and trapelacucha silver jewelry, black woven cloak, holding a kultrun drum, in an ancient araucaria forest with a snowy volcano in the mist",
'india':"Gargi Vachaknavi, ancient Indian woman philosopher in a simple white sari, debating confidently before a royal court of bearded sages in a Vedic palace hall with carved pillars and oil lamps",
}
out={}
for k,p in P.items():
  b=json.dumps({"model":"google/nano-banana","input":{"prompt":S+p,"output_format":"png","image_size":"9:16"}})
  r=json.loads(subprocess.run(['bash','../kie/kie.sh','create',b],capture_output=True,text=True).stdout)
  out[k]=r['data']['taskId'] if r.get('data') else r; print(k,out[k])
json.dump(out,open('img_tasks.json','w'))
