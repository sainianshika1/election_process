/* ═══════════════════════════════════════════════════════════════
   QUIZ.JS — Election Knowledge Quiz
   Interactive MCQ quiz with scoring and explanations
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
});

const quizQuestions = [
  {
    question: "What is the minimum age to vote in Indian elections?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correct: 1,
    explanation: "The minimum voting age in India is 18 years, as per the 61st Constitutional Amendment Act, 1988. The age is calculated as of January 1 of the qualifying year."
  },
  {
    question: "Who conducts general elections in India?",
    options: ["Supreme Court", "Prime Minister's Office", "Election Commission of India", "Parliament"],
    correct: 2,
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional body established on 25th January 1950, responsible for conducting all elections in India."
  },
  {
    question: "What does VVPAT stand for?",
    options: [
      "Voter Verification and Paper Trail",
      "Voter Verifiable Paper Audit Trail",
      "Valid Voter Audit Paper Trail",
      "Verified Voting and Paper Tracking"
    ],
    correct: 1,
    explanation: "VVPAT stands for Voter Verifiable Paper Audit Trail. It prints a paper slip showing the candidate's name and symbol, visible to the voter for 7 seconds, providing a verifiable record of the vote cast."
  },
  {
    question: "How many seats are there in the Lok Sabha?",
    options: ["245", "435", "543", "552"],
    correct: 2,
    explanation: "The Lok Sabha (Lower House) has 543 elected seats. A party or coalition needs 272 seats (simple majority) to form the government."
  },
  {
    question: "When does the Model Code of Conduct come into effect?",
    options: [
      "On polling day",
      "One month before elections",
      "When election dates are announced",
      "When nominations begin"
    ],
    correct: 2,
    explanation: "The Model Code of Conduct takes effect immediately when the Election Commission announces the election dates. It remains in force until the results are declared."
  },
  {
    question: "What is NOTA in Indian elections?",
    options: [
      "A political party",
      "A type of ballot paper",
      "None of the Above - option to reject all candidates",
      "An election monitoring body"
    ],
    correct: 2,
    explanation: "NOTA (None of the Above) was introduced in 2013 after a Supreme Court ruling. It allows voters to reject all candidates. However, even if NOTA gets the most votes, the candidate with the highest votes still wins."
  },
  {
    question: "How long before polling day must election campaigning stop?",
    options: ["12 hours", "24 hours", "48 hours", "72 hours"],
    correct: 2,
    explanation: "Election campaigning must stop 48 hours before polling day. This 'silence period' allows voters to make their decisions without further campaign influence."
  },
  {
    question: "Which of these is NOT a valid ID for voting?",
    options: ["Aadhaar Card", "PAN Card", "Credit Card", "Passport"],
    correct: 2,
    explanation: "A credit card is not a valid identification for voting. Valid IDs include EPIC (Voter ID), Aadhaar, passport, PAN card, driving license, and several other government-issued photo IDs."
  },
  {
    question: "On which finger is the indelible ink applied during voting?",
    options: ["Right index finger", "Left index finger", "Right thumb", "Left thumb"],
    correct: 1,
    explanation: "Indelible ink is applied on the left index finger. The ink contains silver nitrate and typically stays visible for 2-4 weeks, preventing duplicate voting."
  },
  {
    question: "What is the security deposit for a General category Lok Sabha candidate?",
    options: ["Rs.10,000", "Rs.25,000", "Rs.50,000", "Rs.1,00,000"],
    correct: 1,
    explanation: "General category candidates must deposit Rs.25,000, while SC/ST candidates deposit Rs.12,500. The deposit is forfeited if the candidate doesn't secure at least 1/6th of the total valid votes."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function initQuiz() {
  renderQuizStart();
}

function renderQuizStart() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="quiz-start">
      <div class="quiz-start-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r="0.5" fill="var(--coral)"/></svg>
      </div>
      <h3>Ready to Test Your Knowledge?</h3>
      <p>${quizQuestions.length} questions about Indian elections. Let's see how much you know!</p>
      <button class="btn btn-primary" id="quizStartBtn">
        <span>Start Quiz</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  `;

  document.getElementById('quizStartBtn').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    renderQuestion();
  });
}

function renderQuestion() {
  const container = document.getElementById('quizContainer');
  const q = quizQuestions[currentQuestion];
  answered = false;
  const letters = ['A', 'B', 'C', 'D'];
  const progress = ((currentQuestion) / quizQuestions.length) * 100;

  container.innerHTML = `
    <div class="quiz-progress">
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${progress}%"></div>
      </div>
      <span class="quiz-progress-text">Question ${currentQuestion + 1} of ${quizQuestions.length}</span>
    </div>
    <div class="quiz-question-card">
      <div class="quiz-question-number">Question ${currentQuestion + 1}</div>
      <h3 class="quiz-question-text">${q.question}</h3>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-index="${i}" id="quiz-opt-${i}">
            <span class="quiz-option-letter">${letters[i]}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
      <div id="quizFeedback"></div>
    </div>
  `;

  container.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => selectAnswer(parseInt(btn.dataset.index)));
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const q = quizQuestions[currentQuestion];
  const options = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quizFeedback');

  options.forEach(opt => {
    opt.style.pointerEvents = 'none';
  });

  if (index === q.correct) {
    options[index].classList.add('correct');
    score++;
  } else {
    options[index].classList.add('wrong');
    options[q.correct].classList.add('correct');
  }

  const isCorrect = index === q.correct;
  feedback.innerHTML = `
    <div class="quiz-explanation">
      ${isCorrect ? '<strong>Correct!</strong>' : '<strong>Not quite.</strong>'} ${q.explanation}
    </div>
    <button class="btn btn-primary quiz-next-btn" id="quizNextBtn">
      <span>${currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
  `;

  document.getElementById('quizNextBtn').addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      renderQuestion();
    } else {
      renderResult();
    }
  });
}

function renderResult() {
  const container = document.getElementById('quizContainer');
  const percentage = Math.round((score / quizQuestions.length) * 100);

  let message, iconSvg;
  if (percentage >= 80) {
    iconSvg = '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0112 0v1"/><path d="M16 3l2 2 4-4"/></svg>';
    message = "Outstanding! You're an election expert!";
  } else if (percentage >= 60) {
    iconSvg = '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    message = "Great job! You know your elections well!";
  } else if (percentage >= 40) {
    iconSvg = '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" stroke-width="1.5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>';
    message = "Good start! Read through our guide to learn more.";
  } else {
    iconSvg = '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" stroke-width="1.5"><path d="M18.36 6.64a9 9 0 11-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>';
    message = "Keep learning! Check out our guide and timeline sections.";
  }

  container.innerHTML = `
    <div class="quiz-result">
      <span class="quiz-result-icon">${iconSvg}</span>
      <h3>Quiz Complete!</h3>
      <div class="quiz-result-score">${score}/${quizQuestions.length}</div>
      <p>${message}</p>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" id="quizRetryBtn">
          <span>Try Again</span>
        </button>
        <a href="#guide" class="btn btn-secondary">
          <span>Read Guide</span>
        </a>
      </div>
    </div>
  `;

  document.getElementById('quizRetryBtn').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    renderQuestion();
  });
}
