/*
=========================================================
  ★ 先生が基本的に編集するのは、この questions.js だけです ★
=========================================================

【一番簡単な追加方法】
  { type:"reading", q:"慎重", a:"しんちょう" },

これを QUESTIONS の中へ1行追加するだけです。
4択のハズレ候補は、同じ type の別問題の正解から自動生成します。

type:
  reading  = 読み
  antonym  = 対義語
  synonym  = 類義語
  yoji     = 四字熟語など

※ 同じ type は最低4問以上あると、4択を自動生成できます。
※ 特定のハズレを指定したい場合だけ
   wrong:["○○","△△","□□"]
   を追加できます。
*/

const STAGES = {
  reading: { name:"🌲 読みの森", prompt:"この漢字の読みは？" },
  antonym: { name:"🕳 対義語の洞窟", prompt:"対義語はどれ？" },
  synonym: { name:"🏰 類義語の城", prompt:"類義語はどれ？" },
  yoji:    { name:"🐉 四字熟語の塔", prompt:"正しい答えはどれ？" }
};

const QUESTIONS = [
  // ---------- 読み ----------
  { type:"reading", q:"穏やか", a:"おだやか" },
  { type:"reading", q:"尊敬", a:"そんけい" },
  { type:"reading", q:"貢献", a:"こうけん" },
  { type:"reading", q:"沿岸", a:"えんがん" },
  { type:"reading", q:"奨励", a:"しょうれい" },
  { type:"reading", q:"把握", a:"はあく" },
  { type:"reading", q:"懸命", a:"けんめい" },
  { type:"reading", q:"頻繁", a:"ひんぱん" },
  { type:"reading", q:"趣旨", a:"しゅし" },
  { type:"reading", q:"赴任", a:"ふにん" },
  { type:"reading", q:"憩う", a:"いこう" },
  { type:"reading", q:"覆う", a:"おおう" },
  { type:"reading", q:"紛れる", a:"まぎれる" },
  { type:"reading", q:"隔てる", a:"へだてる" },
  { type:"reading", q:"促す", a:"うながす" },
  { type:"reading", q:"潔い", a:"いさぎよい" },
  { type:"reading", q:"緩やか", a:"ゆるやか" },
  { type:"reading", q:"遂げる", a:"とげる" },
  { type:"reading", q:"慕う", a:"したう" },
  { type:"reading", q:"乏しい", a:"とぼしい" },

  // ---------- 対義語（サンプル） ----------
  { type:"antonym", q:"拡大", a:"縮小" },
  { type:"antonym", q:"増加", a:"減少" },
  { type:"antonym", q:"賛成", a:"反対" },
  { type:"antonym", q:"開始", a:"終了" },
  { type:"antonym", q:"原因", a:"結果" },
  { type:"antonym", q:"収入", a:"支出" },

  // ---------- 類義語（サンプル） ----------
  { type:"synonym", q:"援助", a:"助力" },
  { type:"synonym", q:"永久", a:"永遠" },
  { type:"synonym", q:"容易", a:"簡単" },
  { type:"synonym", q:"突然", a:"急に" },
  { type:"synonym", q:"方法", a:"手段" },
  { type:"synonym", q:"決意", a:"決心" },

  // ---------- 四字熟語（サンプル） ----------
  { type:"yoji", q:"一石○鳥", a:"二" },
  { type:"yoji", q:"温故○新", a:"知" },
  { type:"yoji", q:"異口○音", a:"同" },
  { type:"yoji", q:"試行○誤", a:"錯" },
  { type:"yoji", q:"以心○心", a:"伝" },
  { type:"yoji", q:"臨機○変", a:"応" }
];
