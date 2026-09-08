const core = [
  ['的','de','possessive / descriptive particle','我的','wǒ de · my'],['一','yī','one','一个','yí ge · one'],['是','shì','to be','我是学生','wǒ shì xuésheng · I am a student'],['不','bù','not','不是','bú shì · is not'],['了','le','completed/change particle','好了','hǎo le · okay / done'],['在','zài','at; in; doing','我在这里','wǒ zài zhèlǐ · I am here'],['人','rén','person','中国人','Zhōngguó rén · Chinese person'],['有','yǒu','to have; there is','我有时间','wǒ yǒu shíjiān · I have time'],['我','wǒ','I; me','我们','wǒmen · we'],['他','tā','he; him','他们','tāmen · they'],['这','zhè','this','这个','zhège · this one'],['个','gè','general measure word','一个人','yí ge rén · one person'],['们','men','plural suffix','你们','nǐmen · you all'],['中','zhōng','middle; China','中文','Zhōngwén · Chinese language'],['来','lái','to come','过来','guòlái · come over'],['上','shàng','up; on; go to','上班','shàngbān · go to work'],['大','dà','big','大学','dàxué · university'],['和','hé','and; with','我和你','wǒ hé nǐ · you and I'],['国','guó','country','中国','Zhōngguó · China'],['到','dào','arrive; to','到了','dào le · arrived'],['说','shuō','speak; say','说中文','shuō Zhōngwén · speak Chinese'],['时','shí','time','时间','shíjiān · time'],['要','yào','want; need; will','我要这个','wǒ yào zhège · I want this'],['会','huì','can; know how','我会说一点','wǒ huì shuō yìdiǎn · I can speak a little'],['可','kě','can; may','可以','kěyǐ · may / can'],['也','yě','also','我也喜欢','wǒ yě xǐhuan · I like it too'],['你','nǐ','you','你好','nǐ hǎo · hello'],['对','duì','correct; toward','对不起','duìbuqǐ · sorry'],['能','néng','can; be able','你能帮我吗','nǐ néng bāng wǒ ma · can you help me?'],['那','nà','that','那个','nàge · that one'],['下','xià','down; next','下午','xiàwǔ · afternoon'],['年','nián','year','今年','jīnnián · this year'],['后','hòu','after; behind','以后','yǐhòu · afterwards'],['里','lǐ','inside','这里','zhèlǐ · here'],['用','yòng','use','怎么用','zěnme yòng · how to use'],['道','dào','way; measure word','知道','zhīdào · know'],['行','xíng','okay; work; go','行吗？','xíng ma? · is that okay?'],['家','jiā','home; family','回家','huí jiā · go home'],['事','shì','matter; thing','没事','méishì · it’s okay'],['多','duō','many; much','多少','duōshao · how much/many'],['去','qù','go','去哪儿？','qù nǎr? · where are you going?'],['学','xué','study; learn','学中文','xué Zhōngwén · learn Chinese'],['都','dōu','all; both','我们都去','wǒmen dōu qù · we’re all going'],['现','xiàn','present; appear','现在','xiànzài · now'],['没','méi','not have; did not','没有','méiyǒu · don’t have'],['看','kàn','look; watch; read','看看','kànkan · take a look'],['天','tiān','day; sky','今天','jīntiān · today'],['分','fēn','minute; divide','分钟','fēnzhōng · minute'],['还','hái','still; also','还可以','hái kěyǐ · pretty okay'],['好','hǎo','good; well','很好','hěn hǎo · very good'],['小','xiǎo','small','小时','xiǎoshí · hour'],['前','qián','before; front','前面','qiánmiàn · in front'],['开','kāi','open; start; drive','开门','kāi mén · open the door'],['想','xiǎng','think; want','我想吃饭','wǒ xiǎng chīfàn · I want to eat'],['明','míng','bright; next','明天','míngtiān · tomorrow'],['点','diǎn','point; o’clock; a little','一点','yìdiǎn · a little'],['问','wèn','ask','请问','qǐngwèn · excuse me / may I ask'],['很','hěn','very','很好','hěn hǎo · very good']
];

const sentences = [
 ['你好！很高兴认识你。','Nǐ hǎo! Hěn gāoxìng rènshi nǐ.','Hello! Nice to meet you.'],
 ['请问，洗手间在哪里？','Qǐngwèn, xǐshǒujiān zài nǎlǐ?','Excuse me, where is the restroom?'],
 ['我会说一点中文。','Wǒ huì shuō yìdiǎn Zhōngwén.','I can speak a little Chinese.'],
 ['你能说慢一点吗？','Nǐ néng shuō màn yìdiǎn ma?','Can you speak a little more slowly?'],
 ['我听不懂。','Wǒ tīngbudǒng.','I don’t understand what I hear.'],
 ['这个是什么意思？','Zhège shì shénme yìsi?','What does this mean?'],
 ['这个怎么说？','Zhège zěnme shuō?','How do you say this?'],
 ['多少钱？','Duōshao qián?','How much is it?'],
 ['太贵了，可以便宜一点吗？','Tài guì le, kěyǐ piányi yìdiǎn ma?','Too expensive. Can it be a little cheaper?'],
 ['我要这个，谢谢。','Wǒ yào zhège, xièxie.','I want this one, thank you.'],
 ['不要辣，谢谢。','Bú yào là, xièxie.','Not spicy, please.'],
 ['我要一杯水。','Wǒ yào yì bēi shuǐ.','I’d like a glass of water.'],
 ['买单，谢谢。','Mǎidān, xièxie.','The bill, please.'],
 ['我现在有点忙。','Wǒ xiànzài yǒudiǎn máng.','I’m a little busy right now.'],
 ['我们几点见？','Wǒmen jǐ diǎn jiàn?','What time shall we meet?'],
 ['我马上就到。','Wǒ mǎshàng jiù dào.','I’ll be there very soon.'],
 ['没关系。','Méi guānxi.','No problem / it’s okay.'],
 ['对不起，我迟到了。','Duìbuqǐ, wǒ chídào le.','Sorry, I’m late.'],
 ['你可以帮我吗？','Nǐ kěyǐ bāng wǒ ma?','Can you help me?'],
 ['我想去火车站。','Wǒ xiǎng qù huǒchēzhàn.','I want to go to the train station.'],
 ['请一直往前走。','Qǐng yìzhí wǎng qián zǒu.','Please keep going straight.'],
 ['在前面左转。','Zài qiánmiàn zuǒzhuǎn.','Turn left up ahead.'],
 ['这里可以用信用卡吗？','Zhèlǐ kěyǐ yòng xìnyòngkǎ ma?','Can I use a credit card here?'],
 ['有无线网吗？','Yǒu wúxiànwǎng ma?','Is there Wi‑Fi?'],
 ['密码是多少？','Mìmǎ shì duōshao?','What is the password?'],
 ['我今天不舒服。','Wǒ jīntiān bù shūfu.','I don’t feel well today.'],
 ['附近有医院吗？','Fùjìn yǒu yīyuàn ma?','Is there a hospital nearby?'],
 ['今天天气很好。','Jīntiān tiānqì hěn hǎo.','The weather is very nice today.'],
 ['明天你有时间吗？','Míngtiān nǐ yǒu shíjiān ma?','Do you have time tomorrow?'],
 ['我喜欢学中文。','Wǒ xǐhuan xué Zhōngwén.','I like learning Chinese.'],
 ['我每天练习二十分钟。','Wǒ měitiān liànxí èrshí fēnzhōng.','I practice twenty minutes every day.']
];

// Unique common/useful Han characters. This intentionally includes more than 1,000 entries.
const bankSource = `的一是在不了有人我他这中大来上国个到说们为子和你地出道也时年得就那要下以生会自着去之过家学对可她里后小么心多天而能好都然没日于起还发成事只作当想看文无开手十用主行方又如前所本见经头面公同三已老从动两长知民样现分将外但身些与高意进把法此实回二理明点问力定机部话等制最间业全因期月别车被给正情者或向位由先什它并表走使第让名其内接平许做原城儿每比真常色声相风张通放件光门气非完空吃请住钱早玩再才呢快谁站找衣往离岁笑新场师员认亲病元跟更卖您虽妹洗穿份懂块带馆望菜议达求信史越答礼脸办算层传危险愿料假值难教举例服级专领错副属辛永选课讲书写读听买喝饭水果肉鱼鸡蛋奶茶咖啡酒汤面米包饺馒桌椅床房屋店桥船飞机火铁交租自行跑坐右左前后旁边东南西北远近低短少慢冷热旧坏真假容易忙闲晚今天明昨天现在以前以后刚马已经正在一起可能应该必须可以喜欢爱讨厌觉得知道认识明白记忘习工作生活休息睡觉起床刷牙澡脱关闭始结束帮助谢谢对不起关系问欢迎再见生日快乐祝成功问题答案原因结果方法机会时间分钟小时星期周春夏秋冬天气晴阴雨雪云温度颜色红黄蓝绿白黑灰紫粉棕金银音乐电影电视电脑手机网络照片视频新闻报杂志故事小说汉语中文英语法德日韩西班俄老师学生学校大学中小学教室办公室公司工厂商店医院银行邮局机场酒店饭餐厅公园图书博物院体育市场超市厕所厨房卧室客厅阳台电梯楼窗户墙地板顶灯沙发冰箱空调洗衣打印电话钥匙钱包卡票护照地图地址名字姓年龄号码价格便宜贵免费人民币美元欧块毛分公斤斤克公里厘米零四五六七八九百千万亿第一第二第三半双次遍本杯瓶碗盘只条位口间座辆架艘班趟种点几各任何其他自己别人大家我们你们他们她们谁什么哪哪里怎么怎样为什么因为所以但是可是不过如果虽然而且或者还是然后于是曾经从来刚才将准备希望打算决定认为以为发现感觉需要敢怕愿意要了解相信同意反对接受拒绝选择改变提高降低增加减少继续停止完成失败赢输得到失去找到丢掉拿放送借还换付花省赚钱练考试题目成绩数课程专业语言汉字拼音声调发音口语听阅读写作语法词汇句文章意思翻译解释介绍讨论聊天答告诉讲话唱歌哭见闻尝身体头脸眼睛耳朵鼻嘴牙齿舌脖肩膀胳膊指胸背肚腿脚肝肺胃血健康疼痛药医生护士检查治疗感冒发烧咳嗽疼累饿渴饱困精神运动步游泳踢足球篮球乒乓羽毛网球健身旅行旅游出差假周末计划安排预订住宿单人入住退服务签证行李箱登机牌航班路线方向转直达到达离出发回来附近这里那里对面里面外面楼上楼下几点刻上午中午下午晚上凌晨日期月春天夏天秋天冬天刮凉快潮湿干燥服衬衫毛外套大裤牛仔裙鞋袜帽眼镜尺寸试合适漂亮好看难看新的干净脏购物逛街商场网上东西快递送货付款现金银行卡信用支付宝微信打折优惠发票收据退货换货早餐午饭晚饭夜宵条粥蔬菜白菜土豆西红柿黄瓜茄豆腐猪牛羊虾水果苹果香蕉橙葡萄西瓜草莓梨桃果汁啤甜酸辣咸苦香好吃难吃服务菜单点菜筷勺叉刀纸巾卫生家庭爸爸妈妈父母爷奶外公婆哥弟姐姐妹妹丈夫妻子老老婆儿女孩子孩朋友同事学邻居老板经理客户客人先生女士警察结婚离婚恋爱约礼物节春节新年中秋国庆圣诞歌曲跳舞画拍演员导演山河湖海沙滩森林城市农村北京上海广州深圳香港澳门台湾中国美国英国法国德国日本韩国加拿大澳大利亚新加坡泰越印度俄罗斯欧洲亚洲非洲世界国家省市县区街道小区房子搬家具柜浴热电煤修坏安全小心报警消防取存转账余额密码账户零钱会议项目任务目标报告文件合同邮件消息信息联系短信网站应用软件程序下载上传登录注册账号键盘鼠标屏幕充电电池信号无线科技机器人工智能效率习惯记忆复习重复重点难点简单复杂清楚认真努力坚持进步安按暗岸案拔摆班般板帮保抱备倍笨笔必边变标冰步参草差产超朝持迟虫初除楚处聪村错担单刀岛倒顶典吊钓丁订丢冬董洞豆督毒独堵赌杜端锻段断堆兑队盾恶恩耳尔饵二罚伐乏反返范贩犯芳妨访纺放肥匪肺废费芬氛纷坟焚粉奋份丰封峰锋逢奉凤佛否夫肤扶辅府腐赴复父腹负富附妇改概钙盖甘杆肝赶感敢刚钢港杠高告哥歌格各根耕更工攻功供共钩狗构购够古骨谷故顾固雇刮瓜寡挂怪关官冠观管惯贯光广逛规归轨鬼桂贵滚棍锅郭果过孩海害含寒喊汗汉杭航豪好耗号浩和河合黑狠恨横衡恒红洪宏厚候后呼忽胡湖虎互户花华滑画化话怀坏欢环还缓换患幻荒慌黄皇晃灰挥辉回毁会婚魂混活伙火获或货祸基机积迹激级集及急即己技季济计记际继纪佳家加甲价架驾嫁坚间检简减见建健件将江奖讲交较叫接街节结解姐界借介届斤金今进近尽劲京经井警景静境敬竞净究久九酒旧救就局举聚拒据巨具句惧剧决绝均军君俊卡开考靠科颗可克刻客课肯空恐控口扣苦酷库裤夸跨快宽款狂矿亏昆困括扩阔拉赖蓝栏兰览懒烂劳牢老乐雷累类冷梨黎离理李里礼丽历利例立粒力连联练恋凉梁良两亮量了列烈劣林临邻零龄另令流留刘柳六龙楼漏路陆旅虑律率绿乱轮论落洛络妈麻码蚂马骂买麦卖迈满慢忙猫毛貌贸梅眉煤每美妹门梦米密面苗秒庙民敏明名命模末莫默某母木目拿哪那纳奶耐南男难脑闹内能泥你年念娘鸟宁牛农弄怒女暖诺偶怕拍排牌派盘盼旁胖跑泡配朋碰片骗漂票拼品聘平评破迫普期七其奇齐旗骑起气弃汽恰千迁签钱前浅墙强抢桥巧切且亲勤琴青轻清情请庆穷秋球求区曲取去全权劝缺却群然燃染让饶热人仁忍任认仍日荣容柔肉如入软瑞若弱洒赛三伞散森杀沙山闪善伤商赏上烧少绍舍射社设身深神审慎声生升胜省盛剩师失施湿诗十石时食实识史使始式示士世事势是适市室视试收手首守受瘦书熟暑署数树束术述水睡税顺说四送搜素速宿诉肃酸算随岁孙损所他她它台太态谈坦探叹汤堂唐糖躺趟涛桃逃讨套特疼提题体替天添田甜挑条跳贴铁听停庭挺通同童统痛偷投透图途土吐兔团推退托脱妥外弯湾玩完碗挽晚万王亡网往旺望忘威危围为维委伟未味胃位谓卫温文闻问我握无吴武五午舞物务误西吸希息惜习喜洗系细夏先鲜闲显险现线相香想响享项向象消晓小校笑效些协鞋写谢新心信星兴行醒幸性姓兄雄休修需许续宣选学雪血寻训压押呀牙雅烟盐严言颜眼演验阳洋仰养样要药爷也业夜一医依衣移宜椅已以艺易意议义益忆音银引隐印英应营迎赢影硬用优由邮油游有友右又幼于余鱼雨与宇语玉遇预元原园员圆源远愿院约越月云允运再早造责则怎增曾赠站张掌长找照者这真正政整证之知直值职止只纸指至制治中忠钟终种重众周州洲主住助注祝专转庄装状准桌着子字自总走足族组最左作坐座做`;
const characterBank = [...new Set([...bankSource])].filter(c => /^[\u3400-\u9fff]$/.test(c));

let queue = core.map((_, i) => i);
let mastered = 0;
let needsReview = 0;
let sentenceIndex = 0;

const byId = id => document.getElementById(id);

function speak(text) {
  if (!('speechSynthesis' in window)) {
    alert('Speech playback is not available in this browser.');
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 0.78;
  const voices = speechSynthesis.getVoices();
  const mandarin = voices.find(v => /^zh(-CN)?/i.test(v.lang));
  if (mandarin) utterance.voice = mandarin;
  speechSynthesis.speak(utterance);
}

function renderCharacter() {
  const index = queue[0];
  const [hanzi, pinyin, meaning, word, wordInfo] = core[index];
  byId('rankLabel').textContent = `Core ${index + 1} of ${core.length}`;
  byId('character').textContent = hanzi;
  byId('pinyin').textContent = pinyin;
  byId('meaning').textContent = meaning;
  byId('example').innerHTML = `${word}<small>${wordInfo}</small>`;
}

function updateStats() {
  byId('masteredCount').textContent = mastered;
  byId('reviewCount').textContent = `${needsReview} marked for review`;
}

function advance(again) {
  const current = queue.shift();
  if (again) {
    needsReview += 1;
    queue.splice(Math.min(3, queue.length), 0, current);
  } else {
    mastered += 1;
    queue.push(current);
  }
  updateStats();
  renderCharacter();
}

function renderSentence() {
  const [chinese, pinyin, english] = sentences[sentenceIndex];
  byId('sentenceNumber').textContent = `Sentence ${sentenceIndex + 1} of ${sentences.length}`;
  byId('sentenceChinese').textContent = chinese;
  byId('sentencePinyin').textContent = pinyin;
  byId('sentenceEnglish').textContent = english;
  byId('sentenceAnswer').hidden = true;
  byId('revealSentence').textContent = 'Reveal pinyin + meaning';
}

function renderBank(filter = '') {
  const grid = byId('characterGrid');
  grid.replaceChildren();
  const visible = characterBank.filter(c => !filter || c.includes(filter));
  for (const char of visible) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'char-button';
    button.textContent = char;
    button.title = `Tap to hear ${char}`;
    button.addEventListener('click', () => speak(char));
    grid.appendChild(button);
  }
  byId('bankCount').textContent = `${characterBank.length.toLocaleString()} unique characters`;
}

document.querySelectorAll('.tab').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.view').forEach(view => { view.hidden = true; view.classList.remove('active-view'); });
    button.classList.add('active');
    const view = byId(button.dataset.view);
    view.hidden = false;
    view.classList.add('active-view');
  });
});

byId('speakCharacter').addEventListener('click', () => speak(core[queue[0]][0]));
byId('againButton').addEventListener('click', () => advance(true));
byId('knowButton').addEventListener('click', () => advance(false));
byId('speakSentence').addEventListener('click', () => speak(sentences[sentenceIndex][0]));
byId('revealSentence').addEventListener('click', () => {
  const answer = byId('sentenceAnswer');
  answer.hidden = !answer.hidden;
  byId('revealSentence').textContent = answer.hidden ? 'Reveal pinyin + meaning' : 'Hide answer';
});
byId('previousSentence').addEventListener('click', () => { sentenceIndex = (sentenceIndex - 1 + sentences.length) % sentences.length; renderSentence(); });
byId('nextSentence').addEventListener('click', () => { sentenceIndex = (sentenceIndex + 1) % sentences.length; renderSentence(); });
document.querySelectorAll('.tone-card').forEach(button => button.addEventListener('click', () => speak(button.dataset.tone)));
byId('characterSearch').addEventListener('input', event => renderBank(event.target.value.trim()));

renderCharacter();
renderSentence();
renderBank();
updateStats();
