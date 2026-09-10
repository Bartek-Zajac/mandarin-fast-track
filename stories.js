// Memorable Chinese language stories, word pictures and myth checks.
// The goal is useful memory hooks without presenting folk etymology as fact.

const chineseStories = [
  {
    category:'Word pictures', icon:'🦉', title:'猫头鹰 — “cat-headed eagle”', zh:'猫头鹰', py:'māotóuyīng',
    literal:'猫 cat + 头 head + 鹰 eagle/hawk',
    story:'The ordinary Mandarin word for “owl” is wonderfully visual: a cat-headed bird of prey. The round face and forward-facing eyes make the image surprisingly memorable.',
    takeaway:'When a Chinese compound looks transparent, use the picture: cat + head + eagle → owl.',
    confidence:'Literal meaning: solid'
  },
  {
    category:'Word pictures', icon:'🐼', title:'熊猫 — the “bear-cat” panda', zh:'熊猫', py:'xióngmāo',
    literal:'熊 bear + 猫 cat',
    story:'The modern mainland Chinese name for the giant panda is 熊猫, literally “bear-cat.” Older sources also used 猫熊 (“cat-bear”), and the history of why the order settled as 熊猫 is more complicated than the popular museum-sign story often repeated online.',
    takeaway:'熊猫 is a great two-character animal word; remember 熊 as the bear part and 猫 as the cat part.',
    confidence:'Name history: complicated — beware neat legends'
  },
  {
    category:'Idioms & slang', icon:'🐴', title:'马马虎虎 — horse horse, tiger tiger?', zh:'马马虎虎', py:'mǎmǎhūhū',
    literal:'马 horse + 马 horse + 虎 tiger + 虎 tiger',
    story:'It means “so-so,” “passable,” or “careless.” Grammatically it is an AABB reduplication of 马虎 (“careless/casual”). A famous folk tale says a painter made an animal that was neither clearly horse nor tiger — memorable, but not a secure historical etymology. Some scholarship instead connects 马虎 to northern/Manchu-influenced speech.',
    takeaway:'Use it for quality or effort that is merely okay: 我的中文马马虎虎。',
    confidence:'Meaning: solid · painter story: folklore'
  },
  {
    category:'Character secrets', icon:'🐎', title:'妈 is NOT “woman + horse = mother”', zh:'妈', py:'mā',
    literal:'女 gives a meaning clue; 马 gives a sound clue',
    story:'This is the key to reading Chinese characters intelligently. 妈 is a phono-semantic character: 女 hints at the semantic field, while 马 (mǎ) mainly hints at pronunciation. Treating every component as a tiny picture-story often creates fake etymologies.',
    takeaway:'Look for sound families: 妈 mā, 码 mǎ, 玛 mǎ, 蚂 mǎ all share 马 as a phonetic clue.',
    confidence:'Character structure: solid'
  },
  {
    category:'Character secrets', icon:'🧩', title:'Most characters contain a sound clue', zh:'形声字', py:'xíngshēngzì',
    literal:'形 form/meaning + 声 sound + 字 character',
    story:'Roughly four-fifths of Chinese characters are commonly described as semantic-phonetic compounds. One component tends to hint at meaning and another at pronunciation. The sound match is not always exact because pronunciations changed over centuries.',
    takeaway:'Don’t memorize 1,000 unrelated drawings. Learn recurring components and phonetic families.',
    confidence:'General writing-system fact: solid'
  },
  {
    category:'Character secrets', icon:'🌳', title:'休 — person by a tree', zh:'休', py:'xiū',
    literal:'亻 person + 木 tree',
    story:'休 means “rest.” Its component structure gives one of the classic, genuinely useful visual memory hooks: a person beside a tree. Even when historical character formation is nuanced, this decomposition is an excellent learner mnemonic.',
    takeaway:'休息 xiūxi = to rest. Picture a person leaning by a tree.',
    confidence:'Mnemonic: excellent · ancient formation: simplified here'
  },
  {
    category:'Character secrets', icon:'☀️', title:'明 — sun + moon = bright', zh:'明', py:'míng',
    literal:'日 sun + 月 moon',
    story:'The modern form invites an irresistible mnemonic: the two brightest objects in the sky make 明 “bright/clear.” Historical palaeography is more complicated, so treat “sun + moon” primarily as a memory story rather than a guaranteed origin story.',
    takeaway:'明天 míngtiān = tomorrow; 明白 míngbai = understand clearly.',
    confidence:'Mnemonic: strong · exact origin: debated/complex'
  },
  {
    category:'Sound tricks', icon:'🎢', title:'你好 is written nǐ hǎo but sounds like ní hǎo', zh:'你好', py:'nǐ hǎo → ní hǎo',
    literal:'two third tones collide',
    story:'Mandarin has tone sandhi: tones change in connected speech. When a third tone is followed by another third tone, the first is pronounced like a second tone. That is why native 你好 does not sound like two textbook dipping tones.',
    takeaway:'3 + 3 → 2 + 3. The pinyin spelling normally stays nǐ hǎo.',
    confidence:'Pronunciation rule: solid'
  },
  {
    category:'Sound tricks', icon:'🔄', title:'一 has three common spoken tones', zh:'一', py:'yī / yí / yì',
    literal:'“one” changes tone according to what follows',
    story:'一 is yī when isolated/counting, commonly yí before a fourth tone (一个 yí ge), and yì before first, second or third tones (一天 yì tiān, 一年 yì nián, 一起 yìqǐ).',
    takeaway:'This one rule makes everyday Mandarin sound much more natural.',
    confidence:'Pronunciation rule: solid'
  },
  {
    category:'Sound tricks', icon:'🚫', title:'不 changes before another 4th tone', zh:'不是', py:'bú shì',
    literal:'bù + 4th tone → bú + 4th tone',
    story:'不 is normally fourth tone, but before another fourth-tone syllable it changes to a rising second tone: 不是 bú shì, 不要 bú yào, 不对 bú duì.',
    takeaway:'You still usually see bù in dictionary form, but listen for bú before tone 4.',
    confidence:'Pronunciation rule: solid'
  },
  {
    category:'Grammar magic', icon:'👀', title:'看看 makes an action lighter', zh:'看看', py:'kànkan',
    literal:'看 look + 看 look',
    story:'Mandarin often reduplicates verbs. 看 “look” becomes 看看 “take a look”; 想想 is “think it over”; 试试 is “give it a try.” The repetition often makes the action feel brief, casual or less forceful.',
    takeaway:'Chinese frequently changes nuance by rhythm rather than adding endings.',
    confidence:'Grammar pattern: solid'
  },
  {
    category:'Grammar magic', icon:'🎟️', title:'Chinese counts things by shape and type', zh:'一张票', py:'yì zhāng piào',
    literal:'one + flat-object measure word + ticket',
    story:'You normally do not say simply “one ticket” as 一票 in everyday counting. Mandarin inserts classifiers: 一个人 one person, 一杯水 one cup of water, 一张票 one ticket, 一只猫 one cat.',
    takeaway:'Learn nouns together with their common measure word; it saves effort later.',
    confidence:'Grammar pattern: solid'
  },
  {
    category:'Word pictures', icon:'💻', title:'电脑 — “electric brain”', zh:'电脑', py:'diànnǎo',
    literal:'电 electricity + 脑 brain',
    story:'The standard word for computer is 电脑: “electric brain.” Chinese is full of compounds whose pieces remain visible, which can make technical vocabulary surprisingly memorable.',
    takeaway:'电 is a productivity powerhouse: 电话 telephone, 电视 television, 电影 movie, 电脑 computer.',
    confidence:'Literal composition: solid'
  },
  {
    category:'Word pictures', icon:'📱', title:'手机 — “hand machine”', zh:'手机', py:'shǒujī',
    literal:'手 hand + 机 machine/device',
    story:'手机 means mobile phone. Once you know 手 and 机, the compound is almost self-explanatory. 机 appears in many machines and devices: 飞机 airplane, 洗衣机 washing machine, 打印机 printer.',
    takeaway:'Learning productive compound pieces multiplies your vocabulary.',
    confidence:'Literal composition: solid'
  },
  {
    category:'Word pictures', icon:'🚆', title:'火车 — the “fire vehicle”', zh:'火车', py:'huǒchē',
    literal:'火 fire + 车 vehicle',
    story:'火车 means train. The name preserves the technological memory of steam railways: a vehicle powered by fire. Modern trains may be electric, but the old compound stayed.',
    takeaway:'Old technology can fossilize inside everyday vocabulary.',
    confidence:'Literal composition: solid'
  },
  {
    category:'Culture & symbols', icon:'囍', title:'囍 — double happiness', zh:'囍', py:'shuāngxǐ',
    literal:'喜 happiness written twice',
    story:'The doubled 喜 character is a traditional wedding symbol seen on decorations, invitations and gifts. It is not an ordinary everyday character in running prose; it is a special graphic symbol associated especially with marriage celebrations.',
    takeaway:'If you see 囍 on a red decoration, think wedding rather than “a new vocabulary character.”',
    confidence:'Cultural usage: solid'
  },
  {
    category:'Language mindset', icon:'🧠', title:'A character is usually a syllable + a chunk of meaning', zh:'字', py:'zì',
    literal:'Chinese writing is morphosyllabic, not alphabetic',
    story:'A Chinese character normally corresponds to a spoken syllable and a morpheme — a meaningful unit — rather than to one sound like an alphabetic letter. Modern words are very often two or more characters, so knowing a character is only the beginning of knowing how it lives in vocabulary.',
    takeaway:'Learn 字 through words: 学 → 学生 / 学习 / 学校, not as isolated symbols only.',
    confidence:'Writing-system fact: solid'
  }
];

function renderStories(filter='All') {
  const grid = document.getElementById('storyGrid');
  if (!grid) return;
  grid.replaceChildren();
  const items = filter === 'All' ? chineseStories : chineseStories.filter(item => item.category === filter);
  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'story-card';
    card.innerHTML = `<div class="story-top"><span class="story-icon">${item.icon}</span><span class="story-category">${item.category}</span></div><h3>${item.title}</h3><div class="story-zh">${item.zh}</div><div class="story-pinyin">${item.py}</div><p class="story-literal"><strong>Literally:</strong> ${item.literal}</p><p>${item.story}</p><p class="story-takeaway"><strong>Remember:</strong> ${item.takeaway}</p><div class="story-footer"><small>${item.confidence}</small><button class="ghost story-speak" type="button">🔊 Hear it</button></div>`;
    card.querySelector('.story-speak').addEventListener('click', () => speak(item.zh));
    grid.appendChild(card);
  });
}

const storyFilters = ['All', ...new Set(chineseStories.map(item => item.category))];
const filterHost = document.getElementById('storyFilters');
if (filterHost) {
  storyFilters.forEach((name, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `secondary story-filter${i === 0 ? ' active-story-filter' : ''}`;
    button.textContent = name;
    button.addEventListener('click', () => {
      document.querySelectorAll('.story-filter').forEach(b => b.classList.remove('active-story-filter'));
      button.classList.add('active-story-filter');
      renderStories(name);
    });
    filterHost.appendChild(button);
  });
}
renderStories();
