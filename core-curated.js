// Human-reviewed learner overrides for the highest-frequency Core 100 characters.
// Generated frequency metadata remains the baseline; this layer fixes learner-facing
// readings/senses and adds short, genuinely useful sentences. Progress uses char IDs,
// so editorial improvements never reset SRS history.

const curatedCore = {
  '的': { readings:['de · structural/possessive particle','dí · true; real (e.g. 的确)','dì · target (目的)'], meaning:'possessive/descriptive particle; one of the most common grammar words', sentence:['这是我的。','Zhè shì wǒ de.','This is mine.'] },
  '一': { readings:['yī · one','yí · tone change before 4th tone','yì · tone change before 1st/2nd/3rd tone'], meaning:'one; a; once', sentence:['我想要一个。','Wǒ xiǎng yào yí ge.','I would like one.'] },
  '是': { readings:['shì'], meaning:'to be; yes; indeed', sentence:['我是学生。','Wǒ shì xuésheng.','I am a student.'] },
  '不': { readings:['bù · not','bú · pronounced this way before a 4th tone'], meaning:'not; no; negative prefix', sentence:['我不是中国人。','Wǒ bú shì Zhōngguó rén.','I am not Chinese.'] },
  '了': { readings:['le · completed action / new situation','liǎo · finish; understand; be able to (in compounds)'], meaning:'aspect/change particle; also liǎo in some words', sentence:['我吃过饭了。','Wǒ chīguo fàn le.','I have eaten already.'] },
  '在': { readings:['zài'], meaning:'at; in; be located; be doing', sentence:['我现在在家。','Wǒ xiànzài zài jiā.','I am at home now.'] },
  '人': { readings:['rén'], meaning:'person; people', sentence:['这里人很多。','Zhèlǐ rén hěn duō.','There are many people here.'] },
  '有': { readings:['yǒu'], meaning:'to have; there is/are', sentence:['你有时间吗？','Nǐ yǒu shíjiān ma?','Do you have time?'] },
  '我': { readings:['wǒ'], meaning:'I; me; my', sentence:['我会说一点中文。','Wǒ huì shuō yìdiǎn Zhōngwén.','I can speak a little Chinese.'] },
  '他': { readings:['tā'], meaning:'he; him', sentence:['他是我朋友。','Tā shì wǒ péngyou.','He is my friend.'] },
  '这': { readings:['zhè · this','zhèi · common spoken form before a measure word'], meaning:'this; here', sentence:['这个多少钱？','Zhège duōshao qián?','How much is this?'] },
  '个': { readings:['gè','ge · often unstressed in speech'], meaning:'general measure word; individual', sentence:['我要这个。','Wǒ yào zhège.','I want this one.'] },
  '们': { readings:['men · plural suffix for pronouns/people'], meaning:'plural suffix', sentence:['我们走吧。','Wǒmen zǒu ba.','Let’s go.'] },
  '中': { readings:['zhōng · middle; China','zhòng · hit; be affected'], meaning:'middle; China; among; hit (zhòng)', sentence:['我在中国学中文。','Wǒ zài Zhōngguó xué Zhōngwén.','I study Chinese in China.'] },
  '来': { readings:['lái'], meaning:'to come; come to do; for the past...', sentence:['你什么时候来？','Nǐ shénme shíhou lái?','When are you coming?'] },
  '上': { readings:['shàng','shang · often neutral in location compounds'], meaning:'up; on; above; go to; attend', sentence:['我早上八点上班。','Wǒ zǎoshang bā diǎn shàngbān.','I start work at 8 in the morning.'] },
  '大': { readings:['dà','dài · in 大夫 dàifu, doctor'], meaning:'big; large; great', sentence:['这个太大了。','Zhège tài dà le.','This is too big.'] },
  '为': { readings:['wèi · for; because of','wéi · act as; become; regard as'], meaning:'for; because of (wèi); be/become/do (wéi)', sentence:['你为什么学中文？','Nǐ wèishénme xué Zhōngwén?','Why are you learning Chinese?'] },
  '和': { readings:['hé · and; with; harmony','hè · respond in singing/poetry','huó/huò · mix (limited uses)'], meaning:'and; with; harmony', sentence:['我和朋友一起去。','Wǒ hé péngyou yìqǐ qù.','I’m going with a friend.'] },
  '国': { readings:['guó'], meaning:'country; nation', sentence:['你去过中国吗？','Nǐ qùguo Zhōngguó ma?','Have you been to China?'] },
  '地': { readings:['dì · earth; ground; place','de · adverb-forming particle'], meaning:'ground/place (dì); adverb marker (de)', sentence:['他慢慢地说。','Tā mànmàn de shuō.','He speaks slowly.'] },
  '到': { readings:['dào'], meaning:'arrive; reach; to; result complement', sentence:['我马上就到。','Wǒ mǎshàng jiù dào.','I’ll be there very soon.'] },
  '以': { readings:['yǐ'], meaning:'by; with; in order to; used in compounds like 可以/以后', sentence:['以后再说吧。','Yǐhòu zài shuō ba.','Let’s talk about it later.'] },
  '说': { readings:['shuō · speak; say','shuì · persuade (游说)','yuè · archaic: be pleased'], meaning:'to speak; say; explain', sentence:['请说慢一点。','Qǐng shuō màn yìdiǎn.','Please speak a little more slowly.'] },
  '时': { readings:['shí'], meaning:'time; hour; when; period', sentence:['你什么时候有时间？','Nǐ shénme shíhou yǒu shíjiān?','When do you have time?'] },
  '要': { readings:['yào · want; need; will','yāo · demand; require (要求)'], meaning:'want; need; going to; important/essential', sentence:['我要一杯水。','Wǒ yào yì bēi shuǐ.','I’d like a glass of water.'] },
  '就': { readings:['jiù'], meaning:'then; just; right away; as early as; emphatic connector', sentence:['我吃完就走。','Wǒ chī wán jiù zǒu.','I’ll leave as soon as I finish eating.'] },
  '出': { readings:['chū'], meaning:'go out; come out; produce; result complement', sentence:['我们出去吃饭吧。','Wǒmen chūqù chīfàn ba.','Let’s go out to eat.'] },
  '会': { readings:['huì · can/know how; meeting; will','kuài · accounting reading in 会计 kuàijì'], meaning:'can; know how; will; meeting', sentence:['你会说英语吗？','Nǐ huì shuō Yīngyǔ ma?','Can you speak English?'] },
  '可': { readings:['kě · can; may; but','kè · used in a few words/names'], meaning:'can; may; possible; but', sentence:['这里可以坐吗？','Zhèlǐ kěyǐ zuò ma?','Can I sit here?'] },
  '也': { readings:['yě'], meaning:'also; too; even', sentence:['我也喜欢。','Wǒ yě xǐhuan.','I like it too.'] },
  '你': { readings:['nǐ'], meaning:'you', sentence:['你叫什么名字？','Nǐ jiào shénme míngzi?','What’s your name?'] },
  '对': { readings:['duì'], meaning:'correct; toward; to; pair; regarding', sentence:['对不起，我听不懂。','Duìbuqǐ, wǒ tīngbudǒng.','Sorry, I don’t understand.'] },
  '生': { readings:['shēng'], meaning:'life; be born; grow; student (in compounds); raw', sentence:['我是大学生。','Wǒ shì dàxuéshēng.','I am a university student.'] },
  '能': { readings:['néng'], meaning:'can; be able to; ability', sentence:['你能帮我吗？','Nǐ néng bāng wǒ ma?','Can you help me?'] },
  '而': { readings:['ér'], meaning:'and; but; while; literary connector', sentence:['这个简单而实用。','Zhège jiǎndān ér shíyòng.','This is simple and practical.'] },
  '子': { readings:['zǐ · child; son; seed','zi · neutral-tone noun suffix'], meaning:'child/son; seed; common noun suffix', sentence:['那个孩子很可爱。','Nàge háizi hěn kě’ài.','That child is very cute.'] },
  '那': { readings:['nà · that','nèi · common spoken form before a measure word'], meaning:'that; then; in that case', sentence:['那个是什么？','Nàge shì shénme?','What is that?'] },
  '得': { readings:['dé · obtain; get','de · structural complement particle','děi · must; have to'], meaning:'get (dé); complement particle (de); must (děi)', sentence:['我得走了。','Wǒ děi zǒu le.','I have to go.'] },
  '于': { readings:['yú'], meaning:'at; in; to; than; regarding (formal)', sentence:['这个问题对于我很重要。','Zhège wèntí duìyú wǒ hěn zhòngyào.','This issue is important to me.'] },
  '着': { readings:['zhe · ongoing/state particle','zháo · achieve/contact; fall asleep','zhuó · wear; attach; set about','zhāo · move/trick'], meaning:'aspect/state particle; several common readings in compounds', sentence:['门开着。','Mén kāizhe.','The door is open.'] },
  '下': { readings:['xià','xia · often neutral after verbs as a complement'], meaning:'down; below; next; get off; a little action', sentence:['下一站在哪儿？','Xià yí zhàn zài nǎr?','Where is the next stop?'] },
  '自': { readings:['zì'], meaning:'self; from; naturally', sentence:['我自己来。','Wǒ zìjǐ lái.','I’ll do it myself.'] },
  '之': { readings:['zhī'], meaning:'of; it; literary connector/pronoun', sentence:['这是其中之一。','Zhè shì qízhōng zhī yī.','This is one of them.'] },
  '年': { readings:['nián'], meaning:'year; age/year period', sentence:['我去年去了北京。','Wǒ qùnián qù le Běijīng.','I went to Beijing last year.'] },
  '过': { readings:['guò · pass; cross','guo · experiential aspect particle'], meaning:'pass/cross; have ever done (aspect particle)', sentence:['我没去过上海。','Wǒ méi qùguo Shànghǎi.','I have never been to Shanghai.'] },
  '发': { readings:['fā · send; issue; develop','fà · hair (头发)'], meaning:'send; issue; develop; hair (fà in 头发)', sentence:['我给你发消息。','Wǒ gěi nǐ fā xiāoxi.','I’ll send you a message.'] },
  '后': { readings:['hòu'], meaning:'after; behind; later', sentence:['吃饭后我们走。','Chīfàn hòu wǒmen zǒu.','We’ll leave after eating.'] },
  '作': { readings:['zuò','zuō · workshop (作坊)'], meaning:'do; make; work; compose', sentence:['你做什么工作？','Nǐ zuò shénme gōngzuò?','What do you do for work?'] },
  '里': { readings:['lǐ'], meaning:'inside; in; neighborhood; li (distance unit)', sentence:['手机在包里。','Shǒujī zài bāo lǐ.','The phone is in the bag.'] },
  '用': { readings:['yòng'], meaning:'use; need; with/by means of', sentence:['这个怎么用？','Zhège zěnme yòng?','How do you use this?'] },
  '道': { readings:['dào'], meaning:'way; road; method; measure word; know in 知道', sentence:['我不知道。','Wǒ bù zhīdào.','I don’t know.'] },
  '行': { readings:['xíng · okay; work; go','háng · row; profession; bank (银行)'], meaning:'okay/work (xíng); line/profession (háng)', sentence:['这样行吗？','Zhèyàng xíng ma?','Is this okay?'] },
  '所': { readings:['suǒ'], meaning:'place; classifier; nominalizing word before verbs', sentence:['这是我所知道的。','Zhè shì wǒ suǒ zhīdào de.','This is what I know.'] },
  '然': { readings:['rán'], meaning:'so; correct; used in 然后/当然/虽然', sentence:['然后我们回家。','Ránhòu wǒmen huí jiā.','Then we’ll go home.'] },
  '家': { readings:['jiā','jie · in a few suffix-like uses'], meaning:'home; family; specialist; classifier for businesses', sentence:['我想回家。','Wǒ xiǎng huí jiā.','I want to go home.'] },
  '种': { readings:['zhǒng · kind; type; seed','zhòng · plant; cultivate'], meaning:'kind/type (zhǒng); plant (zhòng)', sentence:['你喜欢哪种？','Nǐ xǐhuan nǎ zhǒng?','Which kind do you like?'] },
  '事': { readings:['shì'], meaning:'matter; thing; event; work', sentence:['没事，别担心。','Méishì, bié dānxīn.','It’s okay, don’t worry.'] },
  '成': { readings:['chéng'], meaning:'become; complete; succeed; into', sentence:['他成为了老师。','Tā chéngwéi le lǎoshī.','He became a teacher.'] },
  '方': { readings:['fāng'], meaning:'direction; side; method; square', sentence:['地铁站在那个方向。','Dìtiězhàn zài nàge fāngxiàng.','The metro station is in that direction.'] },
  '多': { readings:['duō'], meaning:'many; much; more; how...', sentence:['这里有多少人？','Zhèlǐ yǒu duōshao rén?','How many people are here?'] },
  '经': { readings:['jīng'], meaning:'pass through; manage; classic; used in 已经/经常', sentence:['我已经吃过了。','Wǒ yǐjīng chīguo le.','I have already eaten.'] },
  '么': { readings:['me · unstressed component in 什么/怎么/那么'], meaning:'unstressed suffix in common question/demonstrative words', sentence:['你怎么了？','Nǐ zěnme le?','What’s wrong?'] },
  '去': { readings:['qù'], meaning:'go; leave; last/past (in time expressions)', sentence:['你想去哪儿？','Nǐ xiǎng qù nǎr?','Where do you want to go?'] },
  '法': { readings:['fǎ'], meaning:'method; way; law; France in compounds', sentence:['还有别的办法吗？','Hái yǒu bié de bànfǎ ma?','Is there another way?'] },
  '学': { readings:['xué'], meaning:'study; learn; subject of study', sentence:['我每天学中文。','Wǒ měitiān xué Zhōngwén.','I study Chinese every day.'] },
  '如': { readings:['rú'], meaning:'as; like; if; such as', sentence:['如果下雨，我们就不去。','Rúguǒ xiàyǔ, wǒmen jiù bú qù.','If it rains, we won’t go.'] },
  '都': { readings:['dōu · all; both','dū · capital/metropolis'], meaning:'all/both (dōu); capital (dū)', sentence:['我们都喜欢这个。','Wǒmen dōu xǐhuan zhège.','We all like this.'] },
  '同': { readings:['tóng','tòng · in 胡同 hútòng'], meaning:'same; together; with', sentence:['我们在同一个公司工作。','Wǒmen zài tóng yí ge gōngsī gōngzuò.','We work at the same company.'] },
  '现': { readings:['xiàn'], meaning:'appear; present/current; cash in compounds', sentence:['我现在没时间。','Wǒ xiànzài méi shíjiān.','I don’t have time right now.'] },
  '当': { readings:['dāng · be; serve as; when','dàng · regard as; appropriate; pawn'], meaning:'be/when (dāng); treat as/appropriate (dàng)', sentence:['我到家的时候给你打电话。','Wǒ dào jiā de shíhou gěi nǐ dǎ diànhuà.','I’ll call you when I get home.'] },
  '没': { readings:['méi · not have; did not','mò · sink; submerge'], meaning:'not have; did not; there is no', sentence:['我今天没吃早饭。','Wǒ jīntiān méi chī zǎofàn.','I didn’t eat breakfast today.'] },
  '动': { readings:['dòng'], meaning:'move; act; movement; touch/use', sentence:['别动！','Bié dòng!','Don’t move!'] },
  '面': { readings:['miàn'], meaning:'face; side; surface; aspect; noodles (面)', sentence:['我们在门口见面。','Wǒmen zài ménkǒu jiànmiàn.','Let’s meet at the entrance.'] },
  '起': { readings:['qǐ','qi · often neutral as directional complement'], meaning:'rise; start; get up; directional/result complement', sentence:['我每天七点起床。','Wǒ měitiān qī diǎn qǐchuáng.','I get up at seven every day.'] },
  '看': { readings:['kàn · look; watch; read','kān · guard; watch over'], meaning:'look; see; watch; read', sentence:['让我看看。','Ràng wǒ kànkan.','Let me have a look.'] },
  '定': { readings:['dìng'], meaning:'decide; set; fixed; certainly', sentence:['我们定在星期五吧。','Wǒmen dìng zài Xīngqīwǔ ba.','Let’s set it for Friday.'] },
  '天': { readings:['tiān'], meaning:'day; sky; heaven', sentence:['今天天气很好。','Jīntiān tiānqì hěn hǎo.','The weather is nice today.'] },
  '分': { readings:['fēn · divide; minute; point','fèn · portion; duty; component'], meaning:'divide/minute (fēn); portion/share (fèn)', sentence:['再等五分钟。','Zài děng wǔ fēnzhōng.','Wait another five minutes.'] },
  '还': { readings:['hái · still; also; yet','huán · return; pay back'], meaning:'still/also (hái); return (huán)', sentence:['我还没吃饭。','Wǒ hái méi chīfàn.','I haven’t eaten yet.'] },
  '进': { readings:['jìn'], meaning:'enter; advance; make progress', sentence:['请进。','Qǐng jìn.','Please come in.'] },
  '好': { readings:['hǎo · good; well','hào · be fond of; like doing'], meaning:'good/well; easy to; fond of (hào)', sentence:['好，我们走吧。','Hǎo, wǒmen zǒu ba.','Okay, let’s go.'] },
  '小': { readings:['xiǎo'], meaning:'small; little; young', sentence:['小一点可以吗？','Xiǎo yìdiǎn kěyǐ ma?','Can it be a little smaller?'] },
  '部': { readings:['bù'], meaning:'part; department; section; classifier for films/devices', sentence:['我买了一部新手机。','Wǒ mǎi le yí bù xīn shǒujī.','I bought a new phone.'] },
  '其': { readings:['qí'], meaning:'its; their; that; used in 其他/其实/其中', sentence:['其实我不太懂。','Qíshí wǒ bú tài dǒng.','Actually, I don’t really understand.'] },
  '些': { readings:['xiē'], meaning:'some; a few; somewhat', sentence:['我想买一些水果。','Wǒ xiǎng mǎi yìxiē shuǐguǒ.','I want to buy some fruit.'] },
  '主': { readings:['zhǔ'], meaning:'main; master; host; owner', sentence:['这不是主要问题。','Zhè bú shì zhǔyào wèntí.','This isn’t the main problem.'] },
  '样': { readings:['yàng'], meaning:'kind; appearance; way; sample', sentence:['我也想要一样的。','Wǒ yě xiǎng yào yíyàng de.','I’d like the same one too.'] },
  '理': { readings:['lǐ'], meaning:'reason; logic; manage; understand in 理解', sentence:['我理解你的意思。','Wǒ lǐjiě nǐ de yìsi.','I understand what you mean.'] },
  '心': { readings:['xīn'], meaning:'heart; mind; intention', sentence:['小心车！','Xiǎoxīn chē!','Watch out for the car!'] },
  '她': { readings:['tā'], meaning:'she; her', sentence:['她是我的同事。','Tā shì wǒ de tóngshì.','She is my colleague.'] },
  '本': { readings:['běn'], meaning:'root; origin; this; classifier for books', sentence:['这本书很好。','Zhè běn shū hěn hǎo.','This book is very good.'] },
  '前': { readings:['qián'], meaning:'front; before; ago; previous', sentence:['前面有一家银行。','Qiánmiàn yǒu yì jiā yínháng.','There is a bank up ahead.'] },
  '开': { readings:['kāi'], meaning:'open; start; turn on; drive; hold', sentence:['请开一下窗户。','Qǐng kāi yíxià chuānghu.','Please open the window.'] },
  '但': { readings:['dàn'], meaning:'but; however; only', sentence:['我想去，但是没时间。','Wǒ xiǎng qù, dànshì méi shíjiān.','I want to go, but I don’t have time.'] },
  '因': { readings:['yīn'], meaning:'cause; because; reason', sentence:['因为下雨，我没出去。','Yīnwèi xiàyǔ, wǒ méi chūqù.','I didn’t go out because it rained.'] },
  '只': { readings:['zhǐ · only','zhī · classifier for many animals/one of a pair'], meaning:'only (zhǐ); classifier (zhī)', sentence:['我只有十分钟。','Wǒ zhǐyǒu shí fēnzhōng.','I only have ten minutes.'] },
  '从': { readings:['cóng'], meaning:'from; since; follow; through', sentence:['我从北京来。','Wǒ cóng Běijīng lái.','I come from Beijing.'] },
  '想': { readings:['xiǎng'], meaning:'think; want to; miss', sentence:['我想喝咖啡。','Wǒ xiǎng hē kāfēi.','I want to drink coffee.'] },
  '实': { readings:['shí'], meaning:'real; actual; solid; honest; used in 其实/实在', sentence:['这个真的很实用。','Zhège zhēn de hěn shíyòng.','This is really useful.'] }
};

// Preserve the exact pre-reorder sequence so any still-legacy numeric progress can
// be migrated correctly by pro.js even after the Core deck is frequency-sorted.
globalThis.legacyCoreOrder = core.map(item => item[0]);

for (const [char, override] of Object.entries(curatedCore)) {
  const meta = globalThis.core1000ByChar?.[char];
  if (!meta) continue;
  Object.assign(meta, override, { curated: true });
}

// Rebuild the learning deck in true frequency order now that SRS uses stable char IDs.
// Human-curated sentences take precedence; otherwise retain an existing useful card,
// then fall back to the best generated HSK word example.
const oldRowsByChar = new Map(core.map(row => [row[0], row]));
const rankedRows = core1000Meta.map(meta => {
  const old = oldRowsByChar.get(meta.char);
  const firstWord = meta.words?.[0];
  const sentence = meta.sentence;
  return [
    meta.char,
    meta.readings?.join(' · ') || old?.[1] || meta.pinyin,
    meta.meaning || old?.[2] || 'common Mandarin character',
    sentence?.[0] || old?.[3] || firstWord?.zh || meta.char,
    sentence ? `${sentence[1]} · ${sentence[2]}` : (old?.[4] || (firstWord ? `${firstWord.pinyin} · ${firstWord.meaning}` : meta.pinyin))
  ];
});
core.splice(0, core.length, ...rankedRows);

globalThis.curatedCore = curatedCore;
