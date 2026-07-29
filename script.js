const questions = [
  {
    text: "等速円運動で、物体の速度ベクトルはどちらを向く？",
    sub: "『速さ』ではなく『速度ベクトルの向き』に注目してみよう。",
    choices: [
      "円の中心向き",
      "円の接線方向",
      "円の外側向き",
      "常に真上向き"
    ],
    answer: 1,
    category: "direction"
  },
  {
    text: "等速円運動でも加速度がある理由として正しいものは？",
    sub: "速さが一定でも、運動状態は本当に変わっていない？",
    choices: [
      "速さがだんだん大きくなるから",
      "質量が変化するから",
      "速度の向きが連続的に変わるから",
      "重力が必ずゼロになるから"
    ],
    answer: 2,
    category: "direction"
  },
  {
    text: "半径 r、速さ v の等速円運動で、向心加速度の大きさは？",
    sub: "円運動の最重要公式。単位も一緒に考えると強い。",
    choices: [
      "v / r",
      "vr",
      "v² / r",
      "r² / v"
    ],
    answer: 2,
    category: "formula"
  },
  {
    text: "円運動を続けるために必要な合力の向きは？",
    sub: "物体を円軌道に曲げ続ける役割をする力の向きです。",
    choices: [
      "円の中心向き",
      "速度と同じ接線方向",
      "運動方向と逆向き",
      "半径と直角で外向き"
    ],
    answer: 0,
    category: "force"
  },
  {
    text: "同じ半径で速さを2倍にすると、向心力の大きさは何倍？",
    sub: "F = m v² / r の『2乗』のインパクトを見抜こう。",
    choices: [
      "2倍",
      "4倍",
      "1/2倍",
      "変わらない"
    ],
    answer: 1,
    category: "formula"
  }
];

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const questionCounter = document.getElementById("questionCounter");
const progressBar = document.getElementById("progressBar");
const questionBox = document.getElementById("questionBox");
const questionText = document.getElementById("questionText");
const questionSub = document.getElementById("questionSub");
const choicesEl = document.getElementById("choices");

const scoreNumber = document.getElementById("scoreNumber");
const resultBadge = document.getElementById("resultBadge");
const resultTitle = document.getElementById("resultTitle");
const resultCatch = document.getElementById("resultCatch");
const resultDetail = document.getElementById("resultDetail");
const nextList = document.getElementById("nextList");

const statDirection = document.getElementById("statDirection");
const statFormula = document.getElementById("statFormula");
const statForce = document.getElementById("statForce");

const statDirectionText = document.getElementById("statDirectionText");
const statFormulaText = document.getElementById("statFormulaText");
const statForceText = document.getElementById("statForceText");

let currentIndex = 0;
let score = 0;

let categoryScore = {
  direction: 0,
  formula: 0,
  force: 0
};

const categoryTotal = {
  direction: 2,
  formula: 2,
  force: 1
};

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((s) => {
    s.classList.remove("active");
  });

  screen.classList.add("active");
}

function startQuiz() {
  currentIndex = 0;
  score = 0;

  categoryScore = {
    direction: 0,
    formula: 0,
    force: 0
  };

  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentIndex];

  questionBox.classList.remove("switching");
  void questionBox.offsetWidth;
  questionBox.classList.add("switching");

  questionCounter.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
  progressBar.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;

  questionText.textContent = q.text;
  questionSub.textContent = q.sub;

  choicesEl.innerHTML = "";

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;

    btn.addEventListener("click", () => {
      selectAnswer(index, btn);
    });

    choicesEl.appendChild(btn);
  });
}

function selectAnswer(index, btn) {
  const q = questions[currentIndex];
  const buttons = document.querySelectorAll(".choice-btn");

  buttons.forEach((b) => {
    b.disabled = true;
    b.classList.remove("selected");
  });

  btn.classList.add("selected");

  if (index === q.answer) {
    score++;
    categoryScore[q.category]++;
  }

  setTimeout(() => {
    currentIndex++;

    if (currentIndex < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 520);
}

function showResult() {
  showScreen(resultScreen);

  scoreNumber.textContent = score;

  const directionRate = Math.round((categoryScore.direction / categoryTotal.direction) * 100);
  const formulaRate = Math.round((categoryScore.formula / categoryTotal.formula) * 100);
  const forceRate = Math.round((categoryScore.force / categoryTotal.force) * 100);

  const result = getResultMessage(score, directionRate, formulaRate, forceRate);

  resultBadge.textContent = result.badge;
  resultTitle.textContent = result.title;
  resultCatch.textContent = result.catch;
  resultDetail.textContent = result.detail;

  nextList.innerHTML = "";

  result.next.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    nextList.appendChild(li);
  });

  setTimeout(() => {
    animateStatus(statDirection, statDirectionText, directionRate);
    animateStatus(statFormula, statFormulaText, formulaRate);
    animateStatus(statForce, statForceText, forceRate);
  }, 250);

  launchConfetti();
}

function getResultMessage(score, directionRate, formulaRate, forceRate) {
  if (score === 5) {
    return {
      badge: "Perfect Orbit",
      title: "円運動マスター級！",
      catch: "速度・加速度・力の向きまで、円運動の核心を立体的につかめています。",
      detail:
        "あなたは公式を覚えているだけでなく、『なぜ中心向きの加速度が必要なのか』『速さが変わらなくても速度は変わる』という本質を理解できています。次は鉛直面内の円運動や万有引力との接続に進むと、力学全体が一気につながります。",
      next: [
        "鉛直面内の円運動で、最上点・最下点の力の式を立てる。",
        "人工衛星の運動を、向心力 = 万有引力として説明する。",
        "エネルギー保存と円運動を組み合わせた入試問題に挑戦する。"
      ]
    };
  }

  if (score >= 3) {
    const weak =
      directionRate < formulaRate && directionRate < forceRate
        ? "速度・加速度・力の向き"
        : formulaRate < forceRate
          ? "v²/r や mv²/r の式の意味"
          : "向心力が合力であるという見方";

    return {
      badge: "Almost There",
      title: "本質にかなり近い！",
      catch: `あと一歩で円運動が武器になります。特に「${weak}」を磨くと伸びます。`,
      detail:
        "基本イメージはつかめています。ここからは、図を描いて『速度は接線方向』『加速度と合力は中心方向』を毎回確認する練習が効果的です。公式は暗記で終わらせず、半径や速さを変えたときに何が何倍になるかを言葉で説明してみましょう。",
      next: [
        "各問題で、まず速度ベクトルと加速度ベクトルを図に描く。",
        "a = v²/r、F = mv²/r の比例関係を声に出して説明する。",
        "『向心力という新しい力』ではなく『中心向きの合力』と捉える。"
      ]
    };
  }

  return {
    badge: "Growing Orbit",
    title: "伸びしろが大きい！",
    catch: "今はまだ円運動の入口。けれど、向きの整理だけで一気に見える景色が変わります。",
    detail:
      "円運動で最初に大切なのは、公式よりもベクトルの向きです。速度は接線方向、加速度と合力は中心方向。この3点を図で確認できるようになると、公式の意味も自然につながっていきます。焦らず、図解から始めましょう。",
    next: [
      "円軌道上の4点で、速度ベクトルを接線方向に描く練習をする。",
      "加速度は中心向きになる理由を、『速度の向きが変わるから』と説明する。",
      "F = ma と a = v²/r をつなげて、F = mv²/r を自分で導く。"
    ]
  };
}

function animateStatus(bar, text, target) {
  bar.style.width = "0%";
  text.textContent = "0%";

  let value = 0;

  const timer = setInterval(() => {
    value += Math.max(1, Math.ceil(target / 32));

    if (value >= target) {
      value = target;
      clearInterval(timer);
    }

    bar.style.width = `${value}%`;
    text.textContent = `${value}%`;
  }, 22);
}

function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  ctx.scale(dpr, dpr);

  const colors = ["#8b5cf6", "#ec4899", "#22d3ee", "#facc15", "#ffffff"];

  const pieces = Array.from({ length: 180 }, () => ({
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * window.innerHeight * 0.4,
    size: 6 + Math.random() * 9,
    speed: 2 + Math.random() * 5,
    rotate: Math.random() * Math.PI,
    rotateSpeed: -0.18 + Math.random() * 0.36,
    color: colors[Math.floor(Math.random() * colors.length)],
    drift: -1.8 + Math.random() * 3.6
  }));

  let frame = 0;
  const maxFrame = 230;

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    pieces.forEach((p) => {
      p.y += p.speed;
      p.x += p.drift + Math.sin(frame * 0.03 + p.y * 0.01);
      p.rotate += p.rotateSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotate);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55);
      ctx.restore();
    });

    frame++;

    if (frame < maxFrame) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  draw();
}

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
