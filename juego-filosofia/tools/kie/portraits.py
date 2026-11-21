import json, subprocess, time, sys, os
STYLE = ", head and shoulders portrait, centered, facing slightly to the side, oil painting with visible brushstrokes, warm soft light, dark background with a subtle golden halo glow, dignified and thoughtful, museum quality, consistent painterly style, no text, no letters, no frame, no signature"
D = {
 'tales': 'Thales of Miletus, ancient Greek philosopher, elderly man with a short grey beard, ionian chiton, Aegean sea light',
 'pitagoras': 'Pythagoras, ancient Greek philosopher, long white beard, white robe, wearing a simple wreath, serene and mystical',
 'teano': 'Theano of Croton, ancient Greek woman Pythagorean philosopher, dark hair tied up, white chiton with blue border, wise gaze',
 'heraclito': 'Heraclitus of Ephesus, ancient Greek philosopher, stern dark-bearded man, brooding expression, firelight on his face',
 'parmenides': 'Parmenides of Elea, ancient Greek philosopher, solemn elderly man with long grey beard, white himation, calm luminous gaze',
 'protagoras': 'Protagoras, ancient Greek sophist, confident middle-aged man with trimmed dark beard, elegant red himation, persuasive smile',
 'socrates': 'Socrates, ancient Greek philosopher, elderly bald man with a wide snub nose and a full grey curly beard, simple off-white himation, warm ironic expression',
 'platon': 'Plato, ancient Greek philosopher, broad-shouldered man with a full grey beard and short hair, purple-trimmed himation',
 'aristoteles': 'Aristotle, ancient Greek philosopher, middle-aged man with a short neat beard, receding hair, blue himation, observant gaze',
 'diogenes': 'Diogenes the Cynic, ancient Greek philosopher, scruffy weathered elderly man with a wild grey beard, ragged cloak, holding a small oil lamp',
 'epicuro': 'Epicurus, ancient Greek philosopher, gentle man with a full curly beard, serene smile, garden greenery behind him',
 'pirron': 'Pyrrho of Elis, ancient Greek skeptic philosopher, calm bearded man, indifferent serene expression, simple grey robe',
 'hipatia': 'Hypatia of Alexandria, late antique woman mathematician and philosopher, dark hair, white philosopher cloak, holding an astrolabe, intelligent gaze',
 'marcoaurelio': 'Marcus Aurelius, Roman emperor and Stoic philosopher, curly hair and full curly beard, purple imperial cloak, contemplative',
 'agustin': 'Saint Augustine of Hippo, North African bishop philosopher, dark skin, dark beard, bishop robes, introspective expression',
 'hildegarda': 'Hildegard of Bingen, medieval German abbess, nun habit with white wimple and black veil, visionary gaze, soft green and golden light',
 'averroes': 'Averroes (Ibn Rushd), Andalusian philosopher, bearded man with a white turban and elegant robe, scholarly expression',
 'ockham': 'William of Ockham, medieval Franciscan friar philosopher, tonsured hair, brown Franciscan habit, sharp gaze',
 'tomas': 'Thomas Aquinas, medieval Dominican theologian, stout tonsured man, white habit with black cape, serene scholarly expression',
 'pizan': 'Christine de Pizan, medieval French woman writer, blue gown and white horned headdress veil, holding a quill, resolute expression',
 'pico': 'Giovanni Pico della Mirandola, young Italian Renaissance philosopher, long light brown hair, red cap, refined features',
 'maquiavelo': 'Niccolo Machiavelli, Italian Renaissance thinker, thin face, short dark hair, black robe, enigmatic slight smile',
 'montaigne': 'Michel de Montaigne, French Renaissance essayist, mustache and small beard, white ruff collar, black doublet, thoughtful',
 'bacon': 'Francis Bacon, English philosopher, pointed beard, tall black hat, white ruff collar, black robe, intense gaze',
 'descartes': 'Rene Descartes, French philosopher, shoulder-length dark hair, thin mustache, white collar, black clothing, skeptical gaze',
 'spinoza': 'Baruch Spinoza, Dutch philosopher, long dark curly hair, large dark eyes, simple dark clothing, gentle calm expression',
 'locke': 'John Locke, English philosopher, long face, long grey hair, plain dark coat, wise expression',
 'hume': 'David Hume, Scottish philosopher, round friendly face, white wig, green coat with white cravat, amused expression',
 'kant': 'Immanuel Kant, Prussian philosopher, slender elderly man, white powdered wig with side curls, dark coat and white cravat, keen blue eyes, starry night behind',
 'hegel': 'Georg Wilhelm Friedrich Hegel, German philosopher, middle-aged man with tousled grey hair, high white collar and dark coat, severe intelligent gaze',
 'kierkegaard': 'Soren Kierkegaard, Danish philosopher, thin young man with high upswept wavy hair, dark coat and white collar, melancholic gaze',
 'marx': 'Karl Marx, German philosopher, big bushy grey beard and wild grey hair, dark frock coat, determined expression',
 'mill': 'John Stuart Mill, English philosopher, balding man with sideburns, dark Victorian coat, earnest expression',
 'nietzsche': 'Friedrich Nietzsche, German philosopher, very large thick walrus mustache, dark swept-back hair, intense deep-set eyes, snowy alpine light',
 'wittgenstein': 'Ludwig Wittgenstein, Austrian philosopher, lean face, short curly hair, open-collar shirt and tweed jacket, intense piercing gaze',
 'sartre': 'Jean-Paul Sartre, French philosopher, round thick-framed glasses, wavy hair, suit and tie, pipe smoke, Parisian cafe light',
 'beauvoir': 'Simone de Beauvoir, French philosopher, dark hair pulled up in a turban-style wrap, elegant blouse, sharp intelligent gaze',
 'camus': 'Albert Camus, French-Algerian writer, short slicked dark hair, trench coat with upturned collar, cigarette-free, Mediterranean sunlight',
 'arendt': 'Hannah Arendt, German-American political philosopher, short dark wavy hair with grey streaks, dark jacket, thoughtful penetrating gaze',
 'nezahualcoyotl': 'Nezahualcoyotl, Aztec poet king of Texcoco, indigenous Mexican man, feathered headdress, turquoise jewelry, white cotton cloak with geometric border, flowers',
 'sorjuana': 'Sor Juana Ines de la Cruz, 17th century Mexican nun poet, white habit with black veil and a large painted medallion on her chest, books behind her',
 'marti': 'Jose Marti, Cuban poet and patriot, broad forehead, thick dark mustache, dark suit with bow tie, idealistic gaze',
 'castellanos': 'Rosario Castellanos, Mexican writer philosopher, 1960s, dark hair, cat-eye glasses, elegant dark dress, ironic warm smile',
 'freire': 'Paulo Freire, Brazilian educator, older man with long white beard and glasses, white shirt, kind wise smile, warm tropical light',
 'tochihuitzin': 'Tochihuitzin, Aztec noble poet, indigenous Mexican man, white cotton cloak, jade earrings, dreamy expression, flowers and lake light',
 'macuilxochitzin': 'Macuilxochitzin, Aztec woman poet, indigenous Mexican woman, embroidered huipil, braided dark hair with ribbons, dignified',
 'tecayehuatzin': 'Tecayehuatzin, Nahua lord of Huexotzinco, indigenous Mexican man, feather headdress, embroidered cloak, holding flowers, volcanoes behind',
 'tlacaelel': 'Tlacaelel, Aztec high counselor, stern elderly indigenous Mexican man, black and gold cloak, jade, solemn powerful gaze, temple fire light',
 'incaroca': 'Inca Roca, Inca ruler, Andean indigenous man, red woven headband with royal fringe, gold ear spools, colorful tunic',
 'garcilaso': 'Inca Garcilaso de la Vega, 16th century mestizo Peruvian writer, mestizo features, dark Spanish doublet with white collar, Andean textile detail',
 'guamanpoma': 'Felipe Guaman Poma de Ayala, Andean indigenous chronicler, elderly man, Andean poncho, holding a quill and drawings, determined gaze',
 'pachacutec': 'Pachacutec, Inca emperor, Andean indigenous man, royal red fringe headband, gold sun ornaments, richly woven tunic, majestic mountains',
 'machi': 'a Mapuche machi healer, indigenous Mapuche woman, traditional black dress, silver trapelacucha jewelry and headband, holding a kultrun drum, araucaria forest',
 'kimche': 'a Mapuche kimche elder sage, indigenous Mapuche elderly man, woven poncho with traditional patterns, red headband, wise kind face, volcano and forest',
 'janequeo': 'Janequeo, Mapuche woman leader, indigenous Mapuche woman, dark braided hair, poncho, silver jewelry, fierce determined gaze, mountains',
 'lautaro': 'Lautaro (Leftraru), young Mapuche military leader, indigenous young man, red headband, poncho, strong determined expression, araucarias',
 'laozi': 'Laozi, ancient Chinese sage, very old man with long flowing white beard and white eyebrows, simple robe, serene, misty mountains',
 'banzhao': 'Ban Zhao, Han dynasty Chinese woman historian, Han dynasty hanfu robe, dark hair in an elegant bun, holding bamboo scrolls',
 'zhuangzi': 'Zhuangzi, ancient Chinese Taoist philosopher, bearded man with playful smile, loose robe, butterflies around him',
 'confucio': 'Confucius, ancient Chinese philosopher, elderly man with long grey beard, scholar cap, dark robe with wide sleeves, benevolent',
 'gargi': 'Gargi Vachaknavi, ancient Indian woman philosopher of the Upanishads, saffron and white sari, dark hair, bold questioning gaze, temple light',
 'mahavira': 'Mahavira, ancient Indian Jain teacher, serene meditating man, minimal simple attire, calm half-closed eyes, lotus light',
 'nagarjuna': 'Nagarjuna, ancient Indian Buddhist philosopher monk, shaved head, maroon monastic robe, calm profound expression',
 'buda': 'Siddhartha Gautama the Buddha, serene face, elongated earlobes, curly hair in a topknot, saffron robe, bodhi tree leaves, peaceful',
 'ptahhotep': 'Ptahhotep, ancient Egyptian vizier, Egyptian man with shaved head, broad collar necklace, white linen, wise elderly face',
 'zerayacob': 'Zera Yacob, 17th century Ethiopian philosopher, Ethiopian man with short beard, white shamma cloth draped over shoulders, thoughtful',
 'maathai': 'Wangari Maathai, Kenyan environmentalist, smiling African woman wearing a colorful headwrap and patterned dress, green trees behind',
 'tutu': 'Desmond Tutu, South African archbishop, elderly smiling Black man with short grey hair, purple clerical shirt with collar and a cross, joyful',
}
A = 'Authorization: Bearer proxy-injected'
def curl(args): return json.loads(subprocess.run(['curl', '-sS', '-m', '60', '-H', A] + args, capture_output=True, text=True).stdout)
os.makedirs('img', exist_ok=True)
tasks = json.load(open('portrait_tasks.json')) if os.path.exists('portrait_tasks.json') else {}
only = set(sys.argv[1:])
for k, desc in D.items():
    if only and k not in only: continue
    if k in tasks and not only: continue
    if k == 'socrates' and not only: continue
    body = {"model": "google/nano-banana", "input": {"prompt": "Painted portrait of " + desc + STYLE, "output_format": "png", "image_size": "1:1"}}
    r = curl(['-X', 'POST', 'https://api.kie.ai/api/v1/jobs/createTask', '-H', 'Content-Type: application/json', '-d', json.dumps(body)])
    tasks[k] = (r.get('data') or {}).get('taskId'); print(k, r.get('msg'), flush=True); time.sleep(0.8)
    json.dump(tasks, open('portrait_tasks.json', 'w'))
print(len(tasks))
