import{r as n,j as e,c as We}from"./vendor-CCigjdfu.js";import{i as Ke,g as Ue,a as Je,s as Ye,b as qe,o as Qe,d as W,c as ye,e as Ze,f as Ge,h as we,q as et,j as tt,k as rt,l as at}from"./vendor-firebase-CkElGqow.js";(function(){const A=document.createElement("link").relList;if(A&&A.supports&&A.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))$(u);new MutationObserver(u=>{for(const h of u)if(h.type==="childList")for(const p of h.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&$(p)}).observe(document,{childList:!0,subtree:!0});function g(u){const h={};return u.integrity&&(h.integrity=u.integrity),u.referrerPolicy&&(h.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?h.credentials="include":u.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function $(u){if(u.ep)return;u.ep=!0;const h=g(u);fetch(u.href,h)}})();function st(){const[K,A]=n.useState(null),[g,$]=n.useState(null),[u,h]=n.useState(null),[p,se]=n.useState(null),[ve,R]=n.useState(!0),[C,U]=n.useState(""),[N,J]=n.useState(""),[M,Y]=n.useState(""),[E,q]=n.useState(""),[L,Q]=n.useState("A"),[H,Z]=n.useState("ISTJ"),[y,je]=n.useState(""),[Ne,ne]=n.useState(!1),[S,D]=n.useState(""),[w,oe]=n.useState(!1),[ie,m]=n.useState(""),[le,de]=n.useState([]),[Se,G]=n.useState(!1),[ce,ee]=n.useState(null),[I,z]=n.useState([]),[P,me]=n.useState(!1),[k,ue]=n.useState(!1),[B,te]=n.useState(0),Ie=20,[re,pe]=n.useState(!1),V=n.useRef(null),X=n.useRef(null),he=n.useRef(null),Te=[{value:"",label:"占いたいジャンルを選択してください"},{value:"今日の運勢",label:"今日の運勢"},{value:"恋愛運",label:"恋愛運"},{value:"仕事運",label:"仕事運"},{value:"金運",label:"金運"},{value:"健康運",label:"健康運"},{value:"対人関係運",label:"対人関係運"},{value:"自己成長",label:"自己成長"}],Ce=["ISTJ","ISFJ","INFJ","INTJ","ISTP","ISFP","INFP","INTP","ESTP","ESFP","ENFP","ENTP","ESTJ","ESFJ","ENFJ","ENTJ"],ke=["A","B","O","AB"],Fe=[{name:"0 愚者 (The Fool)"},{name:"I 魔術師 (The Magician)"},{name:"II 女教皇 (The High Priestess)"},{name:"III 女帝 (The Empress)"},{name:"IV 皇帝 (The Emperor)"},{name:"V 法王 (The Hierophant)"},{name:"VI 恋人 (The Lovers)"},{name:"VII 戦車 (The Chariot)"},{name:"VIII 力 (Strength)"},{name:"IX 隠者 (The Hermit)"},{name:"X 運命の輪 (Wheel of Fortune)"},{name:"XI 正義 (Justice)"},{name:"XII 吊るされた男 (The Hanged Man)"},{name:"XIII 死神 (Death)"},{name:"XIV 節制 (Temperance)"},{name:"XV 悪魔 (The Devil)"},{name:"XVI 塔 (The Tower)"},{name:"XVII 星 (The Star)"},{name:"XVIII 月 (The Moon)"},{name:"XIX 太陽 (The Sun)"},{name:"XX 審判 (Judgement)"},{name:"XXI 世界 (The World)"},{name:"ワンドのエース (Ace of Wands)"},{name:"ワンドの2 (Two of Wands)"},{name:"ワンドの3 (Three of Wands)"},{name:"ワンドの4 (Four of Wands)"},{name:"ワンドの5 (Five of Wands)"},{name:"ワンドの6 (Six of Wands)"},{name:"ワンドの7 (Seven of Wands)"},{name:"ワンドの8 (Eight of Wands)"},{name:"ワンドの9 (Nine of Wands)"},{name:"ワンドの10 (Ten of Wands)"},{name:"ワンドのペイジ (Page of Wands)"},{name:"ワンドのナイト (Knight of Wands)"},{name:"ワンドのクイーン (Queen of Wands)"},{name:"ワンドのキング (King of Wands)"},{name:"カップのエース (Ace of Cups)"},{name:"カップの2 (Two of Cups)"},{name:"カップの3 (Three of Cups)"},{name:"カップの4 (Four of Cups)"},{name:"カップの5 (Five of Cups)"},{name:"カップの6 (Six of Cups)"},{name:"カップの7 (Seven of Cups)"},{name:"カップの8 (Eight of Cups)"},{name:"カップの9 (Nine of Cups)"},{name:"カップの10 (Ten of Cups)"},{name:"カップのペイジ (Page of Cups)"},{name:"カップのナイト (Knight of Cups)"},{name:"カップのクイーン (Queen of Cups)"},{name:"カップのキング (King of Cups)"},{name:"ソードのエース (Ace of Swords)"},{name:"ソードの2 (Two of Swords)"},{name:"ソードの3 (Three of Swords)"},{name:"ソードの4 (Four of Swords)"},{name:"ソードの5 (Five of Swords)"},{name:"ソードの6 (Six of Swords)"},{name:"ソードの7 (Seven of Swords)"},{name:"ソードの8 (Eight of Swords)"},{name:"ソードの9 (Nine of Swords)"},{name:"ソードの10 (Ten of Swords)"},{name:"ソードのペイジ (Page of Swords)"},{name:"ソードのナイト (Knight of Swords)"},{name:"ソードのクイーン (Queen of Swords)"},{name:"ソードのキング (King of Swords)"},{name:"ペンタクルのエース (Ace of Pentacles)"},{name:"ペンタクルの2 (Two of Pentacles)"},{name:"ペンタクルの3 (Three of Pentacles)"},{name:"ペンタクルの4 (Four of Pentacles)"},{name:"ペンタクルの5 (Five of Pentacles)"},{name:"ペンタクルの6 (Six of Pentacles)"},{name:"ペンタクルの7 (Seven of Pentacles)"},{name:"ペンタクルの8 (Eight of Pentacles)"},{name:"ペンタクルの9 (Nine of Pentacles)"},{name:"ペンタクルの10 (Ten of Pentacles)"},{name:"ペンタクルのペイジ (Page of Pentacles)"},{name:"ペンタクルのナイト (Knight of Pentacles)"},{name:"ペンタクルのクイーン (Queen of Pentacles)"},{name:"ペンタクルのキング (King of Pentacles)"}];n.useEffect(()=>{(async()=>{if(R(!0),m(""),K){R(!1);return}try{const a=Ke({apiKey:"AIzaSyCwe-7ih-aAZMVCrIZ8iZZLucOO3ZvZROQ",authDomain:"myfortuneapp-c7667.firebaseapp.com",projectId:"myfortuneapp-c7667",storageBucket:"myfortuneapp-c7667.firebasestorage.app",messagingSenderId:"770046874662",appId:"1:770046874662:web:115065e3877397d1b082e7",measurementId:"G-NQ701V0GWS"}),o=Ue(a),c=Je(a);A(a),h(o),$(c);let i=!1;if(typeof __initial_auth_token<"u"&&__initial_auth_token)try{await Ye(o,__initial_auth_token),console.log("Firebase: Signed in with custom token from Canvas."),i=!0}catch(s){console.warn("Firebase: Custom token sign-in failed (might be invalid or expired for this project config), attempting anonymous sign-in.",s)}if(!i)try{await qe(o),console.log("Firebase: Signed in anonymously."),i=!0}catch(s){console.error("Firebase: Anonymous sign-in failed. App features might be limited.",s),m("Firebase認証に失敗しました。アプリの機能が制限されます。詳細: "+s.message)}Qe(o,s=>{s?(se(s.uid),console.log("Firebase user ID:",s.uid),_e(c,s.uid),De(c,s.uid)):(se(null),U(""),J(""),Y(""),q(""),Q("A"),Z("ISTJ"),de([]),console.log("No user signed in after auth state change.")),R(!1)})}catch(r){console.error("Firebaseアプリケーションの初期化に致命的なエラーが発生しました:",r),m("Firebaseの初期化に失敗しました。アプリは動作しません。詳細: "+r.message),R(!1)}})()},[K]);const _e=async(t,r)=>{if(!t||!r)return;const o=W(t,`artifacts/${typeof __app_id<"u"?__app_id:"default-app-id"}/users/${r}/user_data/profile`);try{const c=await Ge(o);if(c.exists()){const i=c.data();U(i.name||""),J(i.birthDate?new Date(i.birthDate.toDate()).toISOString().split("T")[0]:""),Y(i.birthTime||""),q(i.birthPlace||""),Q(i.bloodType||"A"),Z(i.mbtiType||"ISTJ"),pe(i.hasSharedForAdSkip||!1)}}catch(c){console.error("ユーザーデータの読み込みに失敗しました:",c),m("ユーザーデータの読み込みに失敗しました。")}},Ae=async()=>{if(!g||!p){m("ユーザーが認証されていません。");return}const r=W(g,`artifacts/${typeof __app_id<"u"?__app_id:"default-app-id"}/users/${p}/user_data/profile`);try{await ye(r,{name:C,birthDate:N?new Date(N):null,birthTime:M,birthPlace:E,bloodType:L,mbtiType:H,updatedAt:new Date,hasSharedForAdSkip:re},{merge:!0}),console.log("ユーザーデータが保存されました！"),m(""),ne(!0),setTimeout(()=>ne(!1),3e3)}catch(a){console.error("ユーザーデータの保存に失敗しました:",a),m("ユーザーデータの保存に失敗しました。")}},fe=async t=>{if(!g||!p){console.error("ユーザーが認証されていません。広告スキップステータスを更新できません。");return}const a=W(g,`artifacts/${typeof __app_id<"u"?__app_id:"default-app-id"}/users/${p}/user_data/profile`);try{await ye(a,{hasSharedForAdSkip:t},{merge:!0}),pe(t),console.log("広告スキップステータスが更新されました:",t)}catch(o){console.error("広告スキップステータスの更新に失敗しました:",o)}},De=(t,r)=>{if(!t||!r)return;const o=we(t,`artifacts/${typeof __app_id<"u"?__app_id:"default-app-id"}/users/${r}/fortune_history`),c=et(o,tt("timestamp","desc"));return rt(c,s=>{const f=s.docs.map(x=>({id:x.id,...x.data()}));de(f)},s=>{console.error("占い履歴の読み込みに失敗しました:",s),m("占い履歴の読み込みに失敗しました。")})},Pe=async(t,r,a,o=[])=>{if(!g||!p){m("ユーザーが認証されていません。");return}const i=we(g,`artifacts/${typeof __app_id<"u"?__app_id:"default-app-id"}/users/${p}/fortune_history`);try{await at(i,{fortuneCategory:r,inputData:a,fortuneResult:t,tarotCards:o.map(s=>({name:s.name,position:s.position,isReversed:s.isReversed})),timestamp:new Date}),console.log("占い結果が履歴に保存されました！")}catch(s){console.error("占い結果の保存に失敗しました:",s),m("占い結果の保存に失敗しました。")}},$e=async()=>{if(!g||!p||!ce){m("削除できませんでした。");return}const t=typeof __app_id<"u"?__app_id:"default-app-id";try{await Ze(W(g,`artifacts/${t}/users/${p}/fortune_history`,ce.id)),console.log("占い履歴が削除されました！"),m("")}catch(r){console.error("占い履歴の削除に失敗しました:",r),m("占い履歴の削除に失敗しました。")}finally{G(!1),ee(null)}},Re=t=>{ee(t),G(!0)},Me=()=>{G(!1),ee(null)},Ee=t=>{if(!t)return null;let r=new Date(t),a=r.getFullYear(),o=r.getMonth()+1,c=r.getDate();const i=b=>{for(;b>9&&b!==11&&b!==22&&b!==33;)b=String(b).split("").reduce((T,O)=>T+parseInt(O),0);return b},s=i(a),f=i(o),x=i(c);return i(s+f+x)},Le=()=>{me(!0),z([]),D("");const t=[...Fe].sort(()=>.5-Math.random()),r=[{card:t[0],position:"過去 (Past)"},{card:t[1],position:"現在 (Present)"},{card:t[2],position:"未来 (Future)"}];let a=[];r.forEach((o,c)=>{setTimeout(()=>{const i=Math.random()<.5;a.push({name:o.card.name,position:o.position,isReversed:i}),z([...a]),c===r.length-1&&me(!1)},500*(c+1))})},He=async(t,r)=>{const a={name:C,birthDate:N,birthTime:M||"不明",birthPlace:E||"不明",bloodType:L,mbtiType:H,fortuneCategory:t},o=Ee(a.birthDate);let s=`太陽星座: ${(_=>{const be=new Date(_),l=be.getMonth()+1,d=be.getDate();return l===3&&d>=21||l===4&&d<=19?"牡羊座 (Aries)":l===4&&d>=20||l===5&&d<=20?"牡牛座 (Taurus)":l===5&&d>=21||l===6&&d<=20?"双子座 (Gemini)":l===6&&d>=21||l===7&&d<=22?"蟹座 (Cancer)":l===7&&d>=23||l===8&&d<=22?"獅子座 (Leo)":l===8&&d>=23||l===9&&d<=22?"乙女座 (Virgo)":l===9&&d>=23||l===10&&d<=22?"天秤座 (Libra)":l===10&&d>=23||l===11&&d<=21?"蠍座 (Scorpio)":l===11&&d>=22||l===12&&d<=21?"射手座 (Sagittarius)":l===12&&d>=22||l===1&&d<=19?"山羊座 (Capricorn)":l===1&&d>=20||l===2&&d<=18?"水瓶座 (Aquarius)":l===2&&d>=19||l===3&&d<=20?"魚座 (Pisces)":"不明"})(a.birthDate)}。
`;s+=`出生時刻: ${a.birthTime!=="不明"?a.birthTime:"不明"}。出生地: ${a.birthPlace!==""?a.birthPlace:"不明"}。
`,s+=`これらの情報（特に正確な出生時刻と出生地が不明な場合は、太陽星座と心理学的特性を重視）に基づき、月星座、アセンダント、主要な惑星（水星、金星、火星など）のサインや、それらがどのハウスにあるか（一般的な解釈で良い）、そして主要なアスペクト（例: コンジャンジョン、オポジション、スクエア、トライン、セクスタイル）の可能性を占星術の知識を総動員して想像し、あなたの洞察に含めてください。
`,s+="具体的に、ユーザーのMBTIタイプや血液型との関連性も踏まえ、行動傾向や内面世界を深く読み解いてください。";let f="";r.length>0&&(f=`
**引かれたタロットカードとそのポジション:**
`,r.forEach(_=>{f+=`  - ${_.position}: ${_.name} (${_.isReversed?"逆位置":"正位置"})
`}),f+=`
これらのカードの正位置・逆位置の意味と、それらがユーザーの現状、課題、未来にどう影響するかを深く読み解いてください。特に、タロットは潜在意識や状況の流れを示すため、この点も考慮に入れてください。
`);let x=`あなたは経験豊富なプロの占い師です。以下のユーザー情報、詳細な占星術の概念、数秘術のデータ、MBTIタイプ、血液型${r.length>0?"、そして引かれたタロットカード":""}に基づき、${a.fortuneCategory}について、具体的で示唆に富む、心理統計に基づいた深みのある占い結果を日本語で生成してください。当たり障りのない言葉や定型文は避け、本気で当てに行く内容で、ユーザーの自己理解と成長を促すトーンで記述してください。

占い結果はMarkdown形式で、必ず小見出し（###）と段落（空行で区切る）を使用して、非常に読みやすく構成してください。
**ユーザーのプロフィール:**
**血液型:** ${a.bloodType}型
**MBTIタイプ:** ${a.mbtiType}

特に${a.fortuneCategory}に関する結果を強調し、必要に応じてその他の関連する運勢（例：総合運、恋愛運など）についても言及してください。

---
ユーザー名: ${a.name}
生年月日: ${a.birthDate}${a.birthTime!=="不明"?` (${a.birthTime}生)`:""}
出生地: ${a.birthPlace}

占星術データ:
  ${s}

数秘術データ:
  ライフパスナンバー: ${o!==null?o:"計算不能"}
  （名前からの運命数など、より詳細な数秘術データがここに入ります。）
${f}
---

### ${a.fortuneCategory}の運勢
`;x+=`

### まとめ
この占い結果の最も重要なポイントを2〜3文で簡潔に要約してください。`;let j=[];j.push({role:"user",parts:[{text:x}]});const F=await(await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:j})})).json();if(F.candidates&&F.candidates.length>0&&F.candidates[0].content&&F.candidates[0].content.parts&&F.candidates[0].content.parts.length>0)return F.candidates[0].content.parts[0].text;throw new Error("AI生成結果の構造が予期せぬものでした。")},ze=async()=>{if(!C||!N||!y){m("名前、生年月日、占いのジャンルは必須です。");return}if(!g||!p){m("ユーザーが認証されていません。しばらくお待ちください。");return}oe(!0),m(""),D("");try{const t=await He(y,I);D(t),Pe(t,y,{name:C,birthDate:N,birthTime:M,birthPlace:E,bloodType:L,mbtiType:H},I),X.current&&X.current.scrollIntoView({behavior:"smooth"})}catch(t){console.error("占い結果の生成中にエラーが発生しました:",t),m("占い結果の生成中にエラーが発生しました。")}finally{oe(!1)}},xe=()=>{D(""),z([]),m(""),ue(!1),te(0),V.current&&V.current.scrollIntoView({behavior:"smooth"})},Be=()=>{if(re){console.log("広告スキップ権限あり、広告をスキップします。"),xe();return}ue(!0),te(Ie)};n.useEffect(()=>{let t;return k&&B>0?t=setTimeout(()=>{te(r=>r-1)},1e3):k&&B===0&&xe(),()=>clearTimeout(t)},[k,B,re]);const Ve=t=>{const r="### まとめ",a=t.indexOf(r);if(a!==-1){let o=t.substring(a+r.length).trim();const c=o.indexOf("###",1);c!==-1&&(o=o.substring(0,c).trim());let s=o.split(`
`).filter(f=>f.trim()!=="").slice(0,2).join(" ").trim();return s=s.replace(/#+\s*/g,"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*\*/g,"$1"),s.length>80&&(s=s.substring(0,80)+"..."),s}return""},v=t=>{if(!S){m("シェアする占い結果がありません。");return}const r=Ve(S),a=`驚愕の的中率！私のAI占いはコレ🔮✨

ジャンル: ${y}`,o=r?`
【まとめ】${r}`:"",c="#AI占い #本格占い";let i=`${a}${o}
${c}`;const f=280-23;i.length>f&&(i=i.substring(0,f-3)+"...");const x=window.location.href;let j="";switch(t){case"twitter":j=`https://twitter.com/intent/tweet?text=${encodeURIComponent(i)}&url=${encodeURIComponent(x)}`;break;case"facebook":j=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(x)}&quote=${encodeURIComponent(a+o)}`;break;case"line":j=`https://line.me/R/share?text=${encodeURIComponent(a+o+`
`+x+`
`+tags)}`;break;case"copy":const b=`🔮✨ 学術的AI占い結果 ✨🔮

ジャンル: ${y}

${S}

${c}
${x}`,T=document.createElement("textarea");T.value=b,document.body.appendChild(T),T.select();try{document.execCommand("copy"),alert("占い結果のリンクと内容がクリップボードにコピーされました！")}catch(O){console.error("Failed to copy: ",O),alert("コピーに失敗しました。")}document.body.removeChild(T),k&&fe(!0);return;default:return}window.open(j,"_blank"),k&&fe(!0)},ae=t=>{t.current&&t.current.scrollIntoView({behavior:"smooth"})},ge=C&&N&&y,Xe=ge&&!w&&I.length===0&&!P&&S==="",Oe=ge&&!P&&!w&&I.length>0&&S==="";return ve?e.jsx("div",{className:"flex items-center justify-center min-h-screen bg-gray-900",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-purple-400",role:"status",children:e.jsx("span",{className:"visually-hidden",children:"Loading..."})}),e.jsx("p",{className:"text-xl font-semibold text-gray-300 mt-4",children:"アプリを初期化中..."})]})}):e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-gray-900 to-purple-950 p-4 sm:p-8 font-inter",children:[e.jsx("style",{children:`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
                .animate-slide-down { animation: slide-down 0.5s ease-out forwards; }
                .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }

                /* Spinner styles */
                .spinner-border {
                    border-top-color: currentColor;
                    border-right-color: transparent;
                    border-bottom-color: transparent;
                    border-left-color: currentColor;
                }
                .tarot-card {
                    width: 80px; /* Adjust size as needed */
                    height: 120px; /* Adjust size as needed */
                    border: 2px solid #a78bfa; /* Purple border */
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: #2d2d3a;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                    flex-shrink: 0; /* Prevent shrinking in flex container */
                    opacity: 0; /* Hidden by default for animation */
                    transform: translateY(20px) rotateX(90deg); /* Start off-screen and rotated */
                    animation: card-reveal 0.5s ease-out forwards; /* Apply reveal animation */
                    transition: transform 0.3s ease-in-out; /* Smooth transition for reversal */
                }
                .tarot-card.reversed { /* Apply to the whole card container for reversal */
                    transform: rotate(180deg);
                }
                /* Ensure history cards also respect reversal */
                .tarot-card-history { /* Base style for history cards to not inherit reveal animation */
                    width: 60px;
                    height: 90px;
                    border: 2px solid #a78bfa;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: #2d2d3a;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    flex-shrink: 0;
                    opacity: 1; /* Always visible */
                    transform: none; /* No initial transform */
                    transition: transform 0.3s ease-in-out; /* Smooth transition for reversal */
                }
                .tarot-card-history.reversed {
                    transform: rotate(180deg);
                }

                .tarot-card .card-name-display { /* Specific class for the card name inside */
                    text-align: center;
                    font-size: 0.8rem; /* Smaller font for better fit */
                    line-height: 1.1;
                    padding: 0 2px; /* Small padding */
                    word-break: break-word; /* Allow breaking words */
                    white-space: normal; /* Allow normal wrapping */
                }
                .tarot-card-history .card-name-display {
                    font-size: 0.6rem; /* Even smaller for history */
                    line-height: 1;
                }
                
                @keyframes card-reveal {
                    0% {
                        opacity: 0;
                        transform: translateY(20px) rotateX(90deg);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) rotateX(0deg);
                    }
                }

                /* New loading animation styles - Crystal Ball */
                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.9); /* Darker overlay */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    color: white;
                    font-size: 1.5rem;
                }

                .crystal-ball {
                    width: 100px;
                    height: 100px;
                    background: radial-gradient(circle at 30% 30%, #a78bfa, #6d28d9); /* Inner glow */
                    border-radius: 50%;
                    position: relative;
                    box-shadow: 0 0 30px #d8b4fe, inset 0 0 15px #e9d5ff; /* Outer glow and inner light */
                    animation: pulse-glow 2s infinite alternate ease-in-out;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    margin-bottom: 2rem;
                }

                .crystal-ball::before {
                    content: '';
                    position: absolute;
                    top: 10%;
                    left: 10%;
                    width: 80%;
                    height: 80%;
                    border-radius: 50%;
                    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%);
                    filter: blur(5px);
                }

                @keyframes pulse-glow {
                    0% {
                        box-shadow: 0 0 30px #d8b4fe, inset 0 0 15px #e9d5ff;
                        transform: scale(1);
                    }
                    100% {
                        box-shadow: 0 0 45px #d8b4fe, inset 0 0 20px #e9d5ff;
                        transform: scale(1.05);
                    }
                }
            `}),w&&e.jsxs("div",{className:"loading-overlay",children:[e.jsx("div",{className:"crystal-ball",children:e.jsx("span",{role:"img","aria-label":"crystal ball",children:"🔮"})}),e.jsx("p",{className:"text-xl font-semibold text-gray-300 loading-text",children:"運命の導きを生成中..."}),e.jsx("p",{className:"text-md text-gray-400 mt-2 loading-text",children:"AIがあなたのデータを深く読み解いています。"})]}),k&&e.jsx("div",{className:"loading-overlay",children:e.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white",children:[e.jsx("h2",{className:"text-3xl font-bold mb-4",children:"広告表示中"}),e.jsxs("p",{className:"text-xl mb-8",children:["次の占いまであと ",B," 秒..."]}),e.jsx("p",{className:"text-xl font-bold text-center text-yellow-300 mb-4 animate-pulse",children:"運命の人に会えるかも❣会員数1500万人の出会いマッチングサイト‼"}),e.jsxs("div",{className:"my-4 flex justify-center items-center",style:{width:"320px",height:"280px",overflow:"hidden"},children:[e.jsxs("a",{href:"https://px.a8.net/svt/ejp?a8mat=457HK0+6TW1MA+22QA+I47XT",rel:"nofollow",target:"_blank",children:[" ",e.jsx("img",{border:"0",width:"320",height:"280",alt:"美容系広告",src:"https://www28.a8.net/svt/bgt?aid=250612128413&wid=001&eno=01&mid=s00000009685003043000&mc=1"})]}),e.jsx("img",{border:"0",width:"1",height:"1",src:"https://www12.a8.net/0.gif?a8mat=457HK0+6TW1MA+22QA+I47XT",alt:"トラッキングピクセル",style:{display:"none"}})," "]}),e.jsx("p",{className:"text-sm text-gray-500 mt-2",children:"SNSでシェアすると、広告をスキップできます！"}),e.jsxs("div",{className:"text-center mt-8 space-x-1 sm:space-x-2 flex flex-wrap justify-center gap-y-2",children:[" ",e.jsxs("button",{onClick:()=>v("twitter"),className:"bg-blue-400 text-white p-2 rounded-md font-semibold text-sm hover:bg-blue-500 transition duration-300 shadow-md flex items-center justify-center min-w-[100px]",children:[e.jsx("svg",{className:"w-4 h-4 mr-1",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.14L9.35 12.98 2.464 22H0l8.09-10.702L0 2.25h8.322L12.5 7.398 18.244 2.25zM17.272 20l-1.895-2.656-7.147-9.99H5.503L13.181 20H17.272z"})}),"X (Twitter)"]}),e.jsxs("button",{onClick:()=>v("facebook"),className:"bg-blue-700 text-white p-2 rounded-md font-semibold text-sm hover:bg-blue-800 transition duration-300 shadow-md flex items-center justify-center min-w-[100px]",children:[e.jsx("svg",{className:"w-4 h-4 mr-1",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 .5-2.5h2V7.472s-1.5-.164-2.75-.164c-2.68 0-4.5 1.6-4.5 4.75V13.5H6v4h3.5v6.5h4V17.5h3.5l1-4H14z"})}),"Facebook"]}),e.jsxs("button",{onClick:()=>v("line"),className:"bg-green-500 text-white p-2 rounded-md font-semibold text-sm hover:bg-green-600 transition duration-300 shadow-md flex items-center justify-center min-w-[100px]",children:[e.jsx("svg",{className:"w-4 h-4 mr-1",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M11.996 2C6.475 2 2 6.477 2 12s4.475 10 9.996 10C17.525 22 22 17.523 22 12S17.525 2 11.996 2zM12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM14.28 9.544l-2.072 2.072L9.136 9.544a.75.75 0 00-1.06 1.06l2.072 2.072-2.072 2.072a.75.75 0 001.06 1.06l2.072-2.072 2.072 2.072a.75.75 0 001.06-1.06l-2.072-2.072 2.072-2.072a.75.75 0 00-1.06-1.06z",clipRule:"evenodd"})}),"LINE"]}),e.jsxs("button",{onClick:()=>v("copy"),className:"bg-gray-600 text-white p-2 rounded-md font-semibold text-sm hover:bg-gray-700 transition duration-300 shadow-md flex items-center justify-center min-w-[100px]",children:[e.jsx("svg",{className:"w-4 h-4 mr-1",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M7 7H5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-2h2v-8c0-1.103-.897-2-2-2h-8zm10 2h-6V7h6v2zm-2 4h-6V9h6v4z",clipRule:"evenodd"})}),"コピー"]})]})]})}),e.jsxs("div",{className:"fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-80 p-3 z-40 shadow-lg flex justify-center space-x-4 rounded-b-lg",children:[e.jsx("button",{onClick:()=>ae(V),className:"text-gray-200 hover:text-purple-400 font-semibold text-sm sm:text-base px-3 py-2 rounded-md transition duration-200",children:"入力"}),e.jsx("button",{onClick:()=>ae(X),className:"text-gray-200 hover:text-purple-400 font-semibold text-sm sm:text-base px-3 py-2 rounded-md transition duration-200",children:"結果"}),e.jsx("button",{onClick:()=>ae(he),className:"text-gray-200 hover:text-purple-400 font-semibold text-sm sm:text-base px-3 py-2 rounded-md transition duration-200",children:"履歴"})]}),e.jsxs("div",{className:"max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10 border border-purple-700 mt-16",children:[" ",e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("div",{className:"h-20 w-20 mx-auto bg-purple-600 rounded-full flex items-center justify-center mb-4 shadow-xl",children:e.jsx("span",{className:"text-white text-3xl font-bold",children:"🔮"})}),e.jsx("h1",{className:"text-3xl sm:text-4xl font-bold text-purple-300 mb-6 animate-fade-in",children:"学術的AI占い：あなたの運命を深く読み解く"})]}),ie&&e.jsxs("div",{className:"bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-md mb-6 animate-slide-down",role:"alert",children:[e.jsx("p",{className:"font-bold",children:"エラー:"}),e.jsx("p",{children:ie})]}),e.jsxs("div",{className:"mb-8 p-4 bg-yellow-900 border border-yellow-700 text-yellow-200 rounded-md text-sm",children:[e.jsx("p",{className:"font-semibold mb-2",children:"【これまでにない究極の占い体験へ！】"}),e.jsx("p",{children:"このアプリは、**心理統計学**、**伝統的な占術（占星術、数秘術、タロット）**、そして**最先端のAI技術**を総合的に組み合わせた、まさに「最強」の占いツールです。あなたの名前、生年月日、血液型、MBTIタイプといったパーソナルデータから、AIが深層を分析し、当たり障りのない言葉ではない、本当にあなたに響く示唆に富んだ洞察をお届けします。あなたの自己理解を深め、未来を切り開くための羅針盤としてご活用ください。MBTIタイプは自己理解に非常に有用ですが、科学的妥当性には限定的な側面があることをご理解の上、お楽しみください。"})]}),e.jsxs("div",{ref:V,className:"space-y-6 mb-8 pt-4",children:[" ",e.jsx("h2",{className:"text-2xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2",children:"パーソナルデータの入力"}),e.jsxs("div",{className:"p-3 bg-blue-900 border border-blue-700 text-blue-200 rounded-md text-sm",children:[e.jsxs("p",{className:"font-semibold",children:["現在のユーザーID: ",e.jsx("span",{className:"font-mono break-all",children:p||"N/A"})]}),e.jsx("p",{children:"（このIDはアプリ内であなたを識別するために使用されます。）"})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"name",className:"block text-gray-200 text-lg font-medium mb-2",children:["名前 ",e.jsx("span",{className:"text-red-400",children:"*"})]}),e.jsx("input",{type:"text",id:"name",value:C,onChange:t=>U(t.target.value),className:"w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200",placeholder:"あなたの名前を入力してください"})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"birthDate",className:"block text-gray-200 text-lg font-medium mb-2",children:["生年月日 ",e.jsx("span",{className:"text-red-400",children:"*"})]}),e.jsx("input",{type:"date",id:"birthDate",value:N,onChange:t=>J(t.target.value),className:"w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200"})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"birthTime",className:"block text-gray-200 text-lg font-medium mb-2",children:["出生時刻 ",e.jsx("span",{className:"text-gray-400 text-sm",children:"(不明な場合は空欄でOK)"})]}),e.jsx("input",{type:"time",id:"birthTime",value:M,onChange:t=>Y(t.target.value),className:"w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200"})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"birthPlace",className:"block text-gray-200 text-lg font-medium mb-2",children:["出生地 ",e.jsx("span",{className:"text-gray-400 text-sm",children:"(例: 東京都)"})]}),e.jsx("input",{type:"text",id:"birthPlace",value:E,onChange:t=>q(t.target.value),className:"w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200",placeholder:"都道府県名または市町村名"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"bloodType",className:"block text-gray-200 text-lg font-medium mb-2",children:"血液型"}),e.jsx("select",{id:"bloodType",value:L,onChange:t=>Q(t.target.value),className:"w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200",children:ke.map(t=>e.jsxs("option",{value:t,children:[t,"型"]},t))})]}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"mbtiType",className:"block text-gray-200 text-lg font-medium mb-2",children:["MBTIタイプ ",e.jsxs("span",{className:"text-gray-400 text-sm",children:["(",e.jsx("a",{href:"https://www.16personalities.com/ja/",target:"_blank",rel:"noopener noreferrer",className:"text-blue-400 hover:underline",children:"16Personalities"}),"などで診断後選択)"]})]}),e.jsx("select",{id:"mbtiType",value:H,onChange:t=>Z(t.target.value),className:"w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200",children:Ce.map(t=>e.jsx("option",{value:t,children:t},t))})]}),e.jsx("button",{onClick:Ae,className:"w-full bg-blue-700 text-white p-3 rounded-md font-semibold hover:bg-blue-800 transition duration-300 transform hover:scale-105 shadow-md",children:"入力情報を保存"}),Ne&&e.jsx("p",{className:"text-green-400 text-center text-sm mt-2 animate-fade-in",children:"保存しました！"}),e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"fortuneCategory",className:"block text-gray-200 text-lg font-medium mb-2",children:["占いたいジャンル ",e.jsx("span",{className:"text-red-400",children:"*"})]}),e.jsx("select",{id:"fortuneCategory",value:y,onChange:t=>{je(t.target.value),z([]),D("")},className:"w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition duration-200",children:Te.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))})]}),Xe&&e.jsx("div",{className:"text-center mt-6",children:e.jsx("button",{onClick:Le,disabled:w||P,className:`w-full p-4 rounded-md font-bold text-lg shadow-lg transform transition duration-300 ${w||P?"bg-gray-600 text-gray-400 cursor-not-allowed":"bg-indigo-700 text-white hover:bg-indigo-800 hover:scale-105"}`,children:P?"カードを選んでいます...":"タロットカードを引く (3枚)"})}),I.length>0&&e.jsxs("div",{className:"mt-6 p-4 border border-purple-600 rounded-md bg-gray-700 text-gray-100 text-center",children:[e.jsx("h3",{className:"text-xl font-bold text-purple-300 mb-4",children:"引かれたタロットカード"}),e.jsx("div",{className:"flex flex-wrap justify-center gap-4",children:I.map((t,r)=>e.jsxs("div",{className:`tarot-card p-2 text-center text-sm ${t.isReversed?"reversed":""}`,style:{animationDelay:`${.2+r*.5}s`},children:[e.jsx("p",{className:"font-semibold text-purple-200 card-name-display",children:t.name}),e.jsxs("p",{className:"text-gray-400 text-xs",children:["(",t.position,")"]})]},r))}),e.jsx("p",{className:"text-sm text-gray-400 mt-4",children:"これらのカードがあなたの占いに組み込まれます。"})]}),Oe&&e.jsx("button",{onClick:ze,disabled:w||!y,className:`w-full p-4 rounded-md font-bold text-lg shadow-lg transform transition duration-300 ${w||!y?"bg-gray-600 text-gray-400 cursor-not-allowed":"bg-purple-700 text-white hover:bg-purple-800 hover:scale-105"}`,children:w?e.jsxs("div",{className:"flex items-center justify-center",children:[e.jsx("div",{className:"spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full text-white",role:"status",children:e.jsx("span",{className:"visually-hidden",children:"Loading..."})}),e.jsx("span",{className:"ml-3",children:"占い結果を生成中..."})]}):I.length>0?"タロットとAIで占う！":"AIで占う！"})]}),S&&e.jsxs("div",{ref:X,className:"bg-gray-700 border border-purple-700 rounded-xl p-6 sm:p-8 shadow-inner mt-8 animate-fade-in-up pt-4",children:[e.jsx("h2",{className:"text-2xl sm:text-3xl font-bold text-purple-300 mb-4 text-center border-b border-gray-600 pb-2",children:"あなたの占い結果"}),e.jsx("div",{className:"prose prose-invert lg:prose-lg mx-auto text-gray-100 leading-relaxed break-words",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:S.replace(/\n/g,"<br/>")}})}),e.jsx("div",{className:"text-center mt-8",children:e.jsx("button",{onClick:Be,className:"bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-md font-semibold hover:from-green-600 hover:to-teal-600 transition duration-300 shadow-xl transform hover:scale-105",children:"別の項目を占う"})}),e.jsxs("div",{className:"text-center mt-8 space-x-2 sm:space-x-4 flex flex-wrap justify-center gap-y-3",children:[e.jsxs("button",{onClick:()=>v("twitter"),className:"bg-blue-400 text-white p-3 rounded-md font-semibold hover:bg-blue-500 transition duration-300 shadow-md flex-1 inline-flex items-center justify-center min-w-[150px] sm:min-w-0",children:[e.jsx("svg",{className:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.14L9.35 12.98 2.464 22H0l8.09-10.702L0 2.25h8.322L12.5 7.398 18.244 2.25zM17.272 20l-1.895-2.656-7.147-9.99H5.503L13.181 20H17.272z"})}),"X (Twitter)でシェア"]}),e.jsxs("button",{onClick:()=>v("facebook"),className:"bg-blue-700 text-white p-3 rounded-md font-semibold hover:bg-blue-800 transition duration-300 shadow-md flex-1 inline-flex items-center justify-center min-w-[150px] sm:min-w-0",children:[e.jsx("svg",{className:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 .5-2.5h2V7.472s-1.5-.164-2.75-.164c-2.68 0-4.5 1.6-4.5 4.75V13.5H6v4h3.5v6.5h4V17.5h3.5l1-4H14z"})}),"Facebookでシェア"]}),e.jsxs("button",{onClick:()=>v("line"),className:"bg-green-500 text-white p-3 rounded-md font-semibold hover:bg-green-600 transition duration-300 shadow-md flex-1 inline-flex items-center justify-center min-w-[150px] sm:min-w-0",children:[e.jsx("svg",{className:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M11.996 2C6.475 2 2 6.477 2 12s4.475 10 9.996 10C17.525 22 22 17.523 22 12S17.525 2 11.996 2zM12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM14.28 9.544l-2.072 2.072L9.136 9.544a.75.75 0 00-1.06 1.06l2.072 2.072-2.072 2.072a.75.75 0 001.06 1.06l2.072-2.072 2.072 2.072a.75.75 0 001.06-1.06l-2.072-2.072 2.072-2.072a.75.75 0 00-1.06-1.06z",clipRule:"evenodd"})}),"LINEでシェア"]}),e.jsxs("button",{onClick:()=>v("copy"),className:"bg-gray-600 text-white p-3 rounded-md font-semibold hover:bg-gray-700 transition duration-300 shadow-md flex-1 inline-flex items-center justify-center min-w-[150px] sm:min-w-0",children:[e.jsx("svg",{className:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M7 7H5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-2h2v-8c0-1.103-.897-2-2-2h-8zm10 2h-6V7h6v2zm-2 4h-6V9h6v4z",clipRule:"evenodd"})}),"コピー"]})]})]}),le.length>0&&e.jsxs("div",{ref:he,className:"mt-12 bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10 border border-gray-700 pt-4",children:[e.jsx("h2",{className:"text-2xl sm:text-3xl font-bold text-gray-200 mb-6 text-center border-b border-gray-700 pb-2",children:"あなたの占い履歴"}),e.jsx("div",{className:"space-y-6",children:le.map(t=>e.jsxs("div",{className:"bg-gray-700 border border-gray-600 rounded-lg p-4 shadow-sm",children:[e.jsx("p",{className:"text-sm text-gray-400 mb-1",children:new Date(t.timestamp.toDate()).toLocaleString()}),e.jsxs("p",{className:"text-lg font-semibold text-purple-300 mb-2",children:["ジャンル: ",t.fortuneCategory]}),t.tarotCards&&t.tarotCards.length>0&&e.jsx("div",{className:"flex flex-wrap justify-center gap-2 mb-4",children:t.tarotCards.map((r,a)=>e.jsxs("div",{className:`tarot-card-history p-1 text-center text-xs ${r.isReversed?"reversed":""}`,children:[e.jsx("p",{className:"font-bold text-purple-200 card-name-display",children:r.name}),e.jsxs("p",{className:"text-gray-400 text-xs",children:["(",r.position,")"]})]},a))}),e.jsx("div",{className:"prose prose-sm max-w-none text-gray-300",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:t.fortuneResult.replace(/\n/g,"<br/>")}})}),e.jsx("button",{onClick:()=>Re(t),className:"mt-3 text-red-400 hover:text-red-500 text-sm",children:"削除"})]},t.id))})]}),Se&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:e.jsxs("div",{className:"bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 text-center",children:[e.jsx("p",{className:"text-xl font-semibold text-gray-100 mb-6",children:"この占い履歴を削除しますか？"}),e.jsxs("div",{className:"flex justify-center space-x-4",children:[e.jsx("button",{onClick:$e,className:"bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition duration-300",children:"はい、削除します"}),e.jsx("button",{onClick:Me,className:"bg-gray-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-700 transition duration-300",children:"キャンセル"})]})]})})]})]})}We(document.getElementById("root")).render(e.jsx(n.StrictMode,{children:e.jsx(st,{})}));
