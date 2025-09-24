/* =========================================================================
   Hitchdeck — Marcus Compatibility Quiz
   -------------------------------------------------------------------------
   HOW IT WORKS
   - QUESTIONS: Update the list below to change the quiz.
   - quiz.html: This script auto-generates the form and handles submit.
   - results.html: Reads (or generates) a random score (83–97%) and shows it.
   - All answers are ignored by design — it’s a gag quiz :)
   ========================================================================= */

const QUESTIONS = [
  {
    id: "coffeeOrder",
    text: "Pick a coffee order:",
    options: ["Iced vanilla latte", "Americano (black)", "Mocha with extra whip", "Herbal tea (plot twist)"],
  },
  {
    id: "firstDate",
    text: "Ideal first date?",
    options: ["Trivia night", "Street food crawl", "Art gallery + gelato", "Dog park hang (borrow a dog)"],
  },
  {
    id: "playlist",
    text: "What’s on your playlist?",
    options: ["Indie pop", "’90s R&B", "Pop punk nostalgia", "Whatever Spotify tells me"],
  },
  {
    id: "superpower",
    text: "Choose a superpower:",
    options: ["Teleportation", "Mind reading (dangerous)", "Super cozy hoodie summoning", "Unlimited PTO"],
  },
  {
    id: "meme",
    text: "Pick a meme vibe:",
    options: ["Chaotic good", "Lawful neutral", "Chaotic cozy", "Just vibes"],
  },
];

/* ========================= UTILITIES ========================= */
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Write score to sessionStorage and go to results page
function completeQuiz() {
  const score = randInt(83, 97);
  sessionStorage.setItem("marcus_compat_score", String(score));
  window.location.href = "./results.html";
}

// Read (or create) score on results page
function loadScore() {
  let score = sessionStorage.getItem("marcus_compat_score");
  if (!score) {
    score = String(randInt(83, 97)); // fallback if landing directly
    sessionStorage.setItem("marcus_compat_score", score);
  }
  const scoreEl = document.getElementById("score");
  if (scoreEl) scoreEl.textContent = `${score}%`;

  const blurb = document.getElementById("blurb");
  if (blurb) {
    const lines = [
      "Scientifically dubious. Emotionally accurate.",
      "Peer-reviewed by exactly zero peers.",
      "Our algorithm is mostly glitter.",
      "Results may vary; Marcus does not.",
      "Patent pending (it’s not).",
    ];
    blurb.textContent = lines[randInt(0, lines.length - 1)];
  }
}

/* ========================= PAGE ROUTING ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.getAttribute("data-page");

  if (page === "quiz") {
    const form = document.getElementById("quiz-form");
    if (form) {
      // Build the quiz UI
      QUESTIONS.forEach((q, idx) => {
        const qWrap = document.createElement("fieldset");
        qWrap.className = "q";
        qWrap.setAttribute("aria-labelledby", `${q.id}-label`);

        const h = document.createElement("h2");
        h.id = `${q.id}-label`;
        h.textContent = `${idx + 1}. ${q.text}`;
        qWrap.appendChild(h);

        q.options.forEach((opt, i) => {
          const optWrap = document.createElement("div");
          optWrap.className = "opt";

          const input = document.createElement("input");
          input.type = "radio";
          input.name = q.id;
          input.id = `${q.id}-${i}`;
          input.value = opt;

          const label = document.createElement("label");
          label.setAttribute("for", input.id);
          label.textContent = opt;

          optWrap.appendChild(input);
          optWrap.appendChild(label);
          qWrap.appendChild(optWrap);
        });

        form.appendChild(qWrap);
      });

      // Handle submit (ignore answers by design)
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        completeQuiz();
      });
    }
  }

  if (page === "results") {
    loadScore();
  }
});

