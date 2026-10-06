
let deck=[], index=0, score=0, combo=0, mistakes=[], currentType="reading", locked=false;
const $=id=>document.getElementById(id);
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
const qkey=q=>`${q.type}|${q.q}|${q.a}`;

function questionsOf(type){return QUESTIONS.filter(q=>q.type===type)}
function getChoices(q){
  if(q.wrong && q.wrong.length>=3) return shuffle([q.a,...q.wrong.slice(0,3)]);
  const pool=[...new Set(questionsOf(q.type).map(x=>x.a).filter(x=>x!==q.a))];
  return shuffle([q.a,...shuffle(pool).slice(0,3)]);
}
function loadMistakes(){
  const keys=JSON.parse(localStorage.getItem("kanken_mistakes_v2")||"[]");
  return QUESTIONS.filter(q=>keys.includes(qkey(q)));
}
function saveMistakes(){
  localStorage.setItem("kanken_mistakes_v2",JSON.stringify([...new Set(mistakes.map(qkey))]));
}
function renderStages(){
  const box=$("stageButtons"); box.innerHTML="";
  Object.entries(STAGES).forEach(([type,s])=>{
    const n=questionsOf(type).length;
    if(!n) return;
    const b=document.createElement("button"); b.className="stage";
    b.innerHTML=`${s.name}<small>${n}問収録 / 1回最大10問</small>`;
    b.onclick=()=>startGame(type,false); box.appendChild(b);
  });
  $("revengeStart").classList.toggle("hidden",loadMistakes().length===0);
  $("revengeStart").onclick=()=>startGame(null,true);
  const best=Number(localStorage.getItem("kanken_best_v2")||0);
  $("bestStart").textContent=best?`BEST：${best} / 10`:"BEST：まだなし";
}
function startGame(type,revenge){
  let source;
  if(revenge){source=loadMistakes(); currentType="revenge";}
  else{currentType=type; source=questionsOf(type);}
  if(!source.length)return;
  deck=shuffle(source).slice(0,Math.min(10,source.length));
  index=0;score=0;combo=0;mistakes=[];locked=false;
  $("start").classList.add("hidden");$("result").classList.add("hidden");$("game").classList.remove("hidden");
  showQuestion();
}
function showQuestion(){
  locked=false; const q=deck[index];
  $("count").textContent=`${index+1} / ${deck.length}`;
  $("combo").textContent=`COMBO ${combo}`;$("score").textContent=`EXP ${score}`;
  $("bar").style.width=`${index/deck.length*100}%`;
  $("prompt").textContent=(STAGES[q.type]||{}).prompt||"正しい答えは？";
  $("question").textContent=q.q;$("feedback").textContent="";$("feedback").className="feedback";
  const box=$("choices");box.innerHTML="";
  getChoices(q).forEach(opt=>{
    const b=document.createElement("button");b.className="choice";b.textContent=opt;
    b.onclick=()=>answer(opt,b);box.appendChild(b);
  });
}
function answer(opt,button){
  if(locked)return;locked=true;const q=deck[index];
  [...document.querySelectorAll(".choice")].forEach(b=>{
    b.disabled=true;if(b.textContent===q.a)b.classList.add("correct");
  });
  if(opt===q.a){
    combo++;score+=100+Math.max(0,(combo-1)*10);
    $("feedback").textContent=combo>=3?`正解！ ${combo} COMBO 🔥`:"正解！ +100 EXP";
    $("feedback").classList.add("good");
  }else{
    combo=0;button.classList.add("wrong");mistakes.push(q);
    $("feedback").textContent=`正解は「${q.a}」`;$("feedback").classList.add("bad");
  }
  $("combo").textContent=`COMBO ${combo}`;$("score").textContent=`EXP ${score}`;
  setTimeout(()=>{index++;index<deck.length?showQuestion():finish()},850);
}
function finish(){
  $("game").classList.add("hidden");$("result").classList.remove("hidden");
  const correct=deck.length-mistakes.length;
  const old=Number(localStorage.getItem("kanken_best_v2")||0);
  if(deck.length===10&&correct>old)localStorage.setItem("kanken_best_v2",correct);
  if(mistakes.length)saveMistakes(); else localStorage.removeItem("kanken_mistakes_v2");
  $("rank").textContent=correct===deck.length?"PERFECT!! 👑":correct>=8?"S RANK!! 🔥":correct>=6?"CLEAR! ⚔":"RETRY!";
  $("resultScore").textContent=`${correct} / ${deck.length}`;
  $("resultText").textContent=mistakes.length?`EXP ${score}獲得。${mistakes.length}問がリベンジ待ち！`:`EXP ${score}獲得。全問撃破！Good job 澪菜`;
  $("revengeResult").classList.toggle("hidden",mistakes.length===0);
  $("revengeResult").onclick=()=>startGame(null,true);
  $("again").onclick=()=>currentType==="revenge"?startGame(null,true):startGame(currentType,false);
}
$("home").onclick=()=>{$("result").classList.add("hidden");$("start").classList.remove("hidden");renderStages()};
renderStages();
