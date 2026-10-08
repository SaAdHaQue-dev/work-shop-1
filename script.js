/* =====================================================
   ✏️  YAHAN APNI DETAILS BADLEIN
   ===================================================== */
const CONFIG = {
  institute: "Your Institute Name",
  contact: "📞 99999-00000  |  📧 hello@yourinstitute.com",
  typedWords: ["Future Banao", "Career Banao", "Duniya Badlo", "Sapne Sach Karo"]
};

/* ---------- Setup ---------- */
document.getElementById("instName").textContent = CONFIG.institute;
document.getElementById("contact").textContent = CONFIG.contact;

const slides = [...document.querySelectorAll(".slide")];
const dotsBox = document.getElementById("dots");
slides.forEach((s, i) => {
  const b = document.createElement("button");
  b.title = "Slide " + (i + 1);
  b.onclick = () => slides[i].scrollIntoView();
  dotsBox.appendChild(b);
});
const dots = [...dotsBox.children];

/* ---------- Scroll reveal + progress ---------- */
let current = 0;
const io = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("show");
      current = slides.indexOf(e.target);
      dots.forEach((d, i) => d.classList.toggle("on", i === current));
      if (e.target.id === "s-hero") runCounters();
    }
  });
}, { threshold: 0.5 });
slides.forEach(s => io.observe(s));

addEventListener("scroll", () => {
  const h = document.documentElement;
  const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
  document.getElementById("progressBar").style.width = (p * 100) + "%";
});

function goNext() { go(1); }
function go(d) {
  const n = Math.max(0, Math.min(slides.length - 1, current + d));
  slides[n].scrollIntoView();
}
addEventListener("keydown", e => {
  if (e.target.tagName === "INPUT") return;
  if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(1); }
  if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
  if (e.key.toLowerCase() === "f") {
    document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  }
});

/* ---------- Particle network background ---------- */
const cv = document.getElementById("bg"), ctx = cv.getContext("2d");
let W, H, pts = [];
const mouse = { x: -999, y: -999 };
function resize() {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  const n = Math.min(110, Math.floor(W * H / 14000));
  pts = Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5
  }));
}
addEventListener("resize", resize); resize();
addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
(function draw() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, 7);
    ctx.fillStyle = "rgba(0,224,255,.8)"; ctx.fill();
    for (let j = i + 1; j < pts.length; j++) {
      const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 130) {
        ctx.strokeStyle = `rgba(124,92,255,${(1 - d / 130) * .5})`;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }
    }
    const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
    if (dm < 160) {
      ctx.strokeStyle = `rgba(255,79,216,${(1 - dm / 160) * .7})`;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
    }
  });
  requestAnimationFrame(draw);
})();

/* ---------- Typing effect ---------- */
(function typer() {
  const el = document.getElementById("typed");
  let w = 0, c = 0, del = false;
  (function tick() {
    const word = CONFIG.typedWords[w];
    el.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && c === 0) { del = false; w = (w + 1) % CONFIG.typedWords.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 45 : 90);
  })();
})();

/* ---------- Counters ---------- */
let counted = false;
function runCounters() {
  if (counted) return; counted = true;
  document.querySelectorAll("[data-count]").forEach(el => {
    const end = +el.dataset.count, suf = el.dataset.suffix || "";
    let v = 0; const step = Math.max(1, end / 60);
    const t = setInterval(() => {
      v += step;
      if (v >= end) { v = end; clearInterval(t); }
      el.textContent = Math.round(v) + suf;
    }, 25);
  });
}

/* ---------- AI capability cards ---------- */
const CAPS = [
  { i: "🎨", t: "Image banana", d: "Text likho — AI tasveer bana deta hai. Jaise: <b>\"Mumbai ki baarish me cyberpunk chai-wala\"</b>. Designers, ad-makers aur game artists isse roz use karte hain." },
  { i: "💻", t: "Code likhna", d: "AI aapke idea se <b>poori website ya app</b> ka code likh sakta hai. Aaj ka ye page bhi AI ki madad se bana ho sakta hai!" },
  { i: "📖", t: "Padhai me help", d: "Mushkil concept ko <b>5 saal ke bachche ki tarah</b> samjhana, practice questions banana, notes summary karna — 24x7 personal tutor." },
  { i: "🌐", t: "Translation", d: "Hindi, English, Tamil, Japanese… <b>100+ bhasha</b> me turant translation. Duniya ki koi bhi jaankari aapki bhasha me." },
  { i: "🎵", t: "Music & Video", d: "AI gaane compose karta hai, voice clone karta hai aur text se <b>video</b> bana deta hai. Content creators ke liye game-changer." },
  { i: "🏥", t: "Healthcare", d: "X-ray aur scans me bimari <b>doctors se pehle</b> pakadna, nayi dawai khojna — AI zindagiyan bacha raha hai." },
  { i: "🚗", t: "Self-driving", d: "Camera + AI se gaadi khud road padhti hai, signal pehchanti hai aur brake lagati hai." },
  { i: "🌾", t: "Kheti", d: "Drone aur AI se fasal ki bimari, paani ki zaroorat aur mausam ka sahi andaza — kisan ka fayda." }
];
const cardsBox = document.getElementById("cards"), cardOut = document.getElementById("cardOut");
CAPS.forEach(c => {
  const b = document.createElement("button");
  b.className = "card"; b.innerHTML = `<span class="ico">${c.i}</span>${c.t}`;
  b.onclick = () => {
    document.querySelectorAll(".card").forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    cardOut.innerHTML = `<b>${c.i} ${c.t}:</b> ${c.d}`;
  };
  cardsBox.appendChild(b);
});

/* ---------- AI Career Guide (offline demo) ---------- */
const KB = [
  { k: ["code", "coding", "programming", "software", "python"], a: "💻 Coding se shuru karo:\n1) Python seekho (free: freeCodeCamp, CS50)\n2) Chhote projects banao — calculator, quiz game\n3) GitHub par daalo\n12th ke baad: B.Tech CSE / BCA / B.Sc Computer Science. Roz 1 ghanta = 1 saal me bada fark!" },
  { k: ["ai", "ml", "machine learning", "artificial", "data"], a: "🤖 AI/ML engineer banne ka raasta:\n• 11-12th me Maths + Physics + Computer Science lo\n• Python → Statistics → Machine Learning → Deep Learning\n• B.Tech (CSE/AI-DS) ya B.Sc Data Science\nSalary shuruaat me ₹6–15 LPA, aur tezi se badh rahi hai." },
  { k: ["doctor", "medical", "bio", "neet", "health"], a: "🏥 Biology pasand hai? AI + Medical ka combo jeetega!\nOptions: MBBS ke saath Medical AI, ya Biotechnology / Bioinformatics / Health-Tech.\nAI doctors ko replace nahi, <b>powerful</b> bana raha hai." },
  { k: ["art", "design", "creative", "draw", "painting", "video", "music"], a: "🎨 Creative ho? AI aapka sabse bada hathiyar hai!\nCareers: UI/UX Designer, Game Artist, Animator, Prompt Artist, Content Creator.\nSeekho: Figma, Blender, Photoshop + AI tools. B.Des / BFA / Animation courses dekho." },
  { k: ["business", "startup", "commerce", "paisa", "money", "company"], a: "🚀 Startup ka sapna? AI se ek akela insaan poori company jaisa kaam kar sakta hai!\nSeekho: coding basics, marketing, AI tools, finance.\nCourses: BBA / B.Com + side me AI skills. Pehla idea abhi likh lo — kal hi shuru karo." },
  { k: ["game", "gaming", "gamer"], a: "🎮 Gaming + AI = Game Developer ya AI-NPC designer.\nSeekho: Unity / Unreal Engine, C#, Python.\nPehla game ek hafte me bana sakte ho — AI se code madad lekar!" },
  { k: ["salary", "package", "paisa kitna", "lpa"], a: "💰 Approx. fresher range (India):\n• Software dev: ₹4–10 LPA\n• Data Analyst: ₹4–8 LPA\n• AI/ML Engineer: ₹6–15 LPA\n• Top skills + projects = isse bahut zyada.\n(Ye andaza hai, company/skill par depend karta hai.)" },
  { k: ["exam", "jee", "college", "course", "degree", "12th"], a: "🎓 12th ke baad rasta:\n• PCM → B.Tech (JEE / state CET)\n• Kisi bhi stream → BCA, B.Sc Data Science\n• Online: Coursera, NPTEL, edX (free/cheap)\nDegree + <b>projects + skills</b> = asli taakat." },
  { k: ["job", "naukri", "replace", "khatam", "darr", "fear"], a: "🤔 Kya AI naukri chheen lega?\nAI <b>kaam</b> badalta hai, insaan ko nahi. Jo AI use karna jaanta hai, wo jo nahi jaanta usse aage nikal jayega. Isiliye aaj seekhna zaroori hai!" },
  { k: ["hello", "hi", "namaste", "hey"], a: "Namaste! 😊 Apna interest bata do — coding, art, doctor, business, gaming — main raasta dikhata hoon." }
];
const FALLBACK = "🤔 Achha sawaal! Is demo me mere paas limited jawab hain. Try karo: 'coding', 'AI', 'doctor', 'business', 'salary', 'game'.\nAsli AI tools (Claude, ChatGPT) is sawaal ka poora jawab de dete hain — wo hum workshop me live dekhenge!";

const chatbox = document.getElementById("chatbox");
function addMsg(text, who) {
  const m = document.createElement("div"); m.className = "msg " + who;
  chatbox.appendChild(m);
  if (who === "me") { m.textContent = text; }
  else {
    let i = 0; const html = text;
    m.innerHTML = "<i>soch raha hoon…</i>";
    setTimeout(() => {
      m.innerHTML = "";
      (function t() {
        i += 2; m.innerHTML = html.slice(0, i);
        chatbox.scrollTop = chatbox.scrollHeight;
        if (i < html.length) setTimeout(t, 14);
      })();
    }, 600);
  }
  chatbox.scrollTop = chatbox.scrollHeight;
}
function answer(q) {
  const s = q.toLowerCase();
  for (const e of KB) if (e.k.some(w => s.includes(w))) return e.a;
  return FALLBACK;
}
function ask(q) { if (!q.trim()) return; addMsg(q, "me"); addMsg(answer(q), "ai"); }

const CHIPS = ["💻 Coding", "🤖 AI/ML", "🏥 Doctor", "🎨 Art & Design", "🚀 Business", "🎮 Gaming", "💰 Salary", "🎓 12th ke baad", "😨 AI naukri khayega?"];
CHIPS.forEach(c => {
  const b = document.createElement("button"); b.className = "chip"; b.textContent = c;
  b.onclick = () => ask(c.replace(/^\S+\s/, ""));
  document.getElementById("chips").appendChild(b);
});
document.getElementById("chatForm").onsubmit = e => {
  e.preventDefault();
  const i = document.getElementById("chatInput");
  ask(i.value); i.value = "";
};

/* ---------- Quiz ---------- */
const QUIZ = [
  { q: "AI ka full form kya hai?", o: ["Automatic Internet", "Artificial Intelligence", "Advanced Input", "Applied Integration"], a: 1, w: "Artificial Intelligence = machine ka insaan jaisa sochne/seekhne ka tareeka." },
  { q: "AI model kaise 'seekhta' hai?", o: ["Jaadu se", "Bahut saare data me pattern dhoondh kar", "Internet band karke", "Sirf ek rule se"], a: 1, w: "Lakhon examples dekh kar pattern pehchanna hi machine learning hai." },
  { q: "ChatGPT / Claude jaise tools kis category ke hain?", o: ["Search Engine", "Antivirus", "Large Language Model (LLM)", "Browser"], a: 2, w: "LLM = text samajhne aur likhne wale bade AI models." },
  { q: "AI se best kaam lene ke liye sabse zaroori kya hai?", o: ["Achha, saaf prompt (instruction)", "Bahut tez typing", "Costly laptop", "Kuch nahi"], a: 0, w: "Jitna clear sawaal, utna behtar jawab. Isse 'prompting' kehte hain." },
  { q: "Kya AI kabhi galat jawab de sakta hai?", o: ["Kabhi nahi", "Haan, isliye check karna zaroori hai", "Sirf Sunday ko", "Sirf free version me"], a: 1, w: "AI kabhi-kabhi confidently galat bolta hai — hamesha verify karo!" },
  { q: "Inme se kaunsa career AI se judta hai?", o: ["Data Scientist", "Prompt Engineer", "ML Engineer", "Teeno"], a: 3, w: "AI field me bahut roles hain — aur naye roles roz ban rahe hain." }
];
const quizBox = document.getElementById("quiz");
let qi = 0, score = 0;
function renderQ() {
  if (qi >= QUIZ.length) return renderScore();
  const Q = QUIZ[qi];
  quizBox.innerHTML = `<div class="bar"><i style="width:${qi / QUIZ.length * 100}%"></i></div>
    <div class="qn">SAWAAL ${qi + 1} / ${QUIZ.length}</div><div class="q">${Q.q}</div>
    ${Q.o.map((o, i) => `<button class="opt" data-i="${i}">${o}</button>`).join("")}
    <div class="why" id="why"></div>`;
  quizBox.querySelectorAll(".opt").forEach(b => b.onclick = () => pick(+b.dataset.i));
}
function pick(i) {
  const Q = QUIZ[qi];
  quizBox.querySelectorAll(".opt").forEach((b, k) => {
    b.disabled = true;
    if (k === Q.a) b.classList.add("right");
    else if (k === i) b.classList.add("wrong");
  });
  if (i === Q.a) score++;
  document.getElementById("why").innerHTML = (i === Q.a ? "✅ Sahi! " : "❌ Galat. ") + Q.w +
    `<br><br><button class="btn sm" id="nx">${qi === QUIZ.length - 1 ? "Result dekho" : "Agla →"}</button>`;
  document.getElementById("nx").onclick = () => { qi++; renderQ(); };
}
function renderScore() {
  const pct = score / QUIZ.length;
  const title = pct === 1 ? "🏆 AI Master!" : pct >= .6 ? "🚀 AI Explorer!" : "🌱 AI Beginner — shuruaat achhi hai!";
  quizBox.innerHTML = `<div class="score"><div class="big grad">${score}/${QUIZ.length}</div>
    <h3>${title}</h3><p class="mini" style="margin:10px auto">Workshop ke baad ye score aur badhega!</p>
    <button class="btn sm" id="again">Dobara khelo</button></div>`;
  document.getElementById("again").onclick = () => { qi = 0; score = 0; renderQ(); };
}
renderQ();

/* ---------- Career tabs ---------- */
const CAREER = {
  "🔬 Science (PCM)": [
    ["PADHAI", ["B.Tech CSE / AI & DS", "B.Sc Computer Science / Data Science", "Entrance: JEE, state CETs"]],
    ["SKILLS", ["Python, Maths, Statistics", "Machine Learning, Deep Learning", "Projects + GitHub"]],
    ["JOBS", ["AI/ML Engineer", "Data Scientist", "Robotics Engineer"]]
  ],
  "🧬 Science (PCB)": [
    ["PADHAI", ["MBBS + Medical AI", "Biotech / Bioinformatics", "B.Sc Life Sciences + Data skills"]],
    ["SKILLS", ["Python basics", "Data analysis", "Medical imaging AI"]],
    ["JOBS", ["Health-Tech Specialist", "Bioinformatician", "Medical Researcher"]]
  ],
  "📊 Commerce": [
    ["PADHAI", ["BBA / B.Com + Analytics", "BCA (kisi bhi stream se)", "CA / Finance + AI tools"]],
    ["SKILLS", ["Excel, SQL, Power BI", "AI for marketing & finance", "Business thinking"]],
    ["JOBS", ["Business Analyst", "FinTech Analyst", "Startup Founder"]]
  ],
  "🎨 Arts / Creative": [
    ["PADHAI", ["B.Des / BFA / Animation", "Mass Comm + Digital Media", "Psychology + AI (Human-AI)"]],
    ["SKILLS", ["Figma, Blender, Photoshop", "AI image/video tools", "Storytelling + Prompting"]],
    ["JOBS", ["UI/UX Designer", "AI Content Creator", "Game / Film Artist"]]
  ]
};
const tabsBox = document.getElementById("tabs"), tabBody = document.getElementById("tabBody");
Object.keys(CAREER).forEach((name, idx) => {
  const b = document.createElement("button"); b.className = "tab"; b.textContent = name;
  b.onclick = () => showTab(name);
  tabsBox.appendChild(b);
  if (idx === 0) showTab(name);
});
function showTab(name) {
  [...tabsBox.children].forEach(b => b.classList.toggle("on", b.textContent === name));
  tabBody.innerHTML = CAREER[name].map(([h, l]) =>
    `<div class="box"><h4>${h}</h4><ul>${l.map(x => `<li>${x}</li>`).join("")}</ul></div>`).join("");
}

/* ---------- Timeline ---------- */
const TL = [
  ["1950", "Alan Turing ka sawaal: <b>\"Kya machines soch sakti hain?\"</b>", ""],
  ["1997", "IBM Deep Blue ne chess champion Kasparov ko haraya", ""],
  ["2016", "AlphaGo ne Go ke world champion ko haraya", ""],
  ["2022", "ChatGPT aaya — AI har kisi ke haath me", ""],
  ["Aaj", "AI code likhta hai, image/video banata hai, padhata hai", ""],
  ["Aane wale 10 saal", "Personal AI assistants, AI doctors, smart kheti — <b>aap isse banane wale ho sakte ho!</b>", "future"]
];
document.getElementById("timeline").innerHTML = TL.map(([y, t, c]) =>
  `<div class="tl ${c}"><b>${y}</b> — ${t}</div>`).join("");

/* ---------- Agenda ---------- */
const AG = [
  ["Part 1", "AI ki basic samajh + live demo"],
  ["Part 2", "Hands-on: AI tools khud chalao"],
  ["Part 3", "Chhota project: apna AI idea"],
  ["Part 4", "Career guidance + Q&A"]
];
document.getElementById("agenda").innerHTML = AG.map(([a, b]) =>
  `<div class="ag"><b>${a}</b>${b}</div>`).join("");