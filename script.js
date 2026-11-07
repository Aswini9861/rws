/**
 * ROMANTIC SURPRISE WEBSITE - INTERACTIVE SCRIPT
 * Full Vanilla JavaScript with Canvas Confetti, Web Audio FX & Dual Music Engine
 */

(function () {
  'use strict';

  /* ========================================================
     GLOBAL STATE & CONFIGURATION
     ======================================================== */
  const state = {
    soundEnabled: true,
    theme: 'pastel',
    reasonsUnlocked: new Set(),
    smilesCount: 1,
    currentQuizIndex: 0,
    openedBoxes: new Set(),
    isPlayingMusic: false,
    synthAudioPlaying: false
  };

  /* ========================================================
     WEB AUDIO API - GENTLE SOUND EFFECTS & SYNTHESIS
     ======================================================== */
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Play gentle synthesized sound effects
  function playSound(type) {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      if (type === 'chime' || type === 'sparkle') {
        // High soft bell chime
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);

          gain.gain.setValueAtTime(0, now + idx * 0.06);
          gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.06 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.85);
        });
      } else if (type === 'pop') {
        // Soft bubble pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'success' || type === 'celebrate') {
        // Grand romantic chord chime
        const chords = [523.25, 659.25, 783.99, 987.77, 1318.51];
        chords.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);

          gain.gain.setValueAtTime(0, now + i * 0.08);
          gain.gain.linearRampToValueAtTime(0.1, now + i * 0.08 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.6);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 1.7);
        });
      }
    } catch (e) {
      console.warn('Audio playback not allowed yet:', e);
    }
  }

  // Built-in soothing ambient music generator fallback
  let synthInterval = null;
  function startSynthMusic() {
    state.synthAudioPlaying = true;
    const ctx = getAudioContext();
    if (!ctx) return;

    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];
    let chordIdx = 0;

    function playChord() {
      if (!state.synthAudioPlaying) return;
      const now = ctx.currentTime;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, noteIdx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + noteIdx * 0.15);

        gain.gain.setValueAtTime(0, now + noteIdx * 0.15);
        gain.gain.linearRampToValueAtTime(0.05, now + noteIdx * 0.15 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + noteIdx * 0.15 + 2.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + noteIdx * 0.15);
        osc.stop(now + noteIdx * 0.15 + 3.0);
      });
    }

    playChord();
    synthInterval = setInterval(playChord, 3200);
  }

  function stopSynthMusic() {
    state.synthAudioPlaying = false;
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  /* ========================================================
     PRELOADER
     ======================================================== */
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.remove(), 600);
      }, 400);
    }
  });

  /* ========================================================
     CANVAS BACKGROUND (FLOATING HEARTS & SPARKLES)
     ======================================================== */
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const maxParticles = window.innerWidth < 600 ? 25 : 45;

    class FloatingHeart {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 20;
        this.size = Math.random() * 14 + 10;
        this.speedY = Math.random() * 0.7 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.45 + 0.2;
        this.rotation = (Math.random() - 0.5) * 0.4;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.isStar = Math.random() > 0.65;
        this.hue = Math.random() > 0.5 ? 345 : 270; // pink or lavender
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotSpeed;
        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        if (this.isStar) {
          // Draw twinkle 4-point star
          ctx.fillStyle = '#FFF';
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.18, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw cute heart
          ctx.fillStyle = `hsl(${this.hue}, 80%, 75%)`;
          ctx.beginPath();
          const s = this.size * 0.07;
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-10 * s, -12 * s, -22 * s, 4 * s, 0, 22 * s);
          ctx.bezierCurveTo(22 * s, 4 * s, 10 * s, -12 * s, 0, 0);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(new FloatingHeart());
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }

  /* ========================================================
     HOMEPAGE CURTAIN / WELCOME SCREEN
     ======================================================== */
  const welcomeScreen = document.getElementById('welcome-screen');
  const mainContent = document.getElementById('main-content');
  const openSurpriseBtn = document.getElementById('open-surprise-btn');
  const welcomeHeartBtn = document.getElementById('welcome-heart-btn');

  function openCurtain() {
    playSound('celebrate');
    // Confetti burst from center
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FF758C', '#FF7EB3', '#B6A6E9', '#FFF', '#FFB703']
      });
    }

    welcomeScreen.classList.add('curtain-opened');
    mainContent.classList.remove('is-hidden');

    setTimeout(() => {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }

  if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener('click', openCurtain);
  }

  if (welcomeHeartBtn) {
    welcomeHeartBtn.addEventListener('click', () => {
      playSound('sparkle');
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.45 },
          colors: ['#FF758C', '#FF7EB3', '#FFF']
        });
      }
    });
  }

  /* ========================================================
     NAVBAR CONTROLS (SOUND FX & THEME TOGGLES)
     ======================================================== */
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');

  if (soundToggleBtn && soundIcon) {
    soundToggleBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      soundIcon.textContent = state.soundEnabled ? '🔔' : '🔕';
      if (state.soundEnabled) playSound('pop');
    });
  }

  if (themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener('click', () => {
      playSound('pop');
      if (document.body.getAttribute('data-theme') === 'twilight') {
        document.body.setAttribute('data-theme', 'pastel');
        themeIcon.textContent = '🌙';
      } else {
        document.body.setAttribute('data-theme', 'twilight');
        themeIcon.textContent = '☀️';
      }
    });
  }

  /* ========================================================
     SECTION 1: REASONS WHY YOU'RE SPECIAL (3D CARDS)
     ======================================================== */
  const reasonCards = document.querySelectorAll('.reason-card');
  const reasonsCounter = document.getElementById('reasons-counter');
  const reasonsProgressFill = document.getElementById('reasons-progress-fill');
  const allReasonsCelebration = document.getElementById('all-reasons-celebration');

  reasonCards.forEach((card) => {
    card.addEventListener('click', () => {
      playSound('sparkle');
      card.classList.toggle('is-flipped');

      const cardId = card.getAttribute('data-id');
      if (!state.reasonsUnlocked.has(cardId)) {
        state.reasonsUnlocked.add(cardId);
        const count = state.reasonsUnlocked.size;
        reasonsCounter.textContent = count;
        const percent = (count / 8) * 100;
        reasonsProgressFill.style.width = `${percent}%`;

        // Small confetti pop on card
        if (typeof confetti === 'function') {
          const rect = card.getBoundingClientRect();
          confetti({
            particleCount: 15,
            spread: 45,
            origin: {
              x: (rect.left + rect.width / 2) / window.innerWidth,
              y: (rect.top + rect.height / 2) / window.innerHeight
            },
            colors: ['#FF758C', '#FF7EB3', '#B6A6E9']
          });
        }

        // Check if all 8 unlocked
        if (count === 8) {
          setTimeout(() => {
            allReasonsCelebration.classList.remove('is-hidden');
            playSound('celebrate');
            if (typeof confetti === 'function') {
              confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#FF758C', '#FF7EB3', '#B6A6E9', '#FFD166']
              });
            }
          }, 400);
        }
      }
    });
  });

  /* ========================================================
     SECTION 2: A LITTLE LOVE LETTER (3D ENVELOPE)
     ======================================================== */
  const envelope = document.getElementById('envelope');
  const waxSeal = document.getElementById('wax-seal');
  const toggleLetterBtn = document.getElementById('toggle-letter-btn');
  const letterBtnText = document.getElementById('letter-btn-text');
  const fullscreenLetterBtn = document.getElementById('fullscreen-letter-btn');
  const letterModal = document.getElementById('letter-modal');
  const letterModalClose = document.getElementById('letter-modal-close');
  const letterModalInner = document.getElementById('letter-modal-inner');
  const letterPaper = document.getElementById('letter-paper');

  let isEnvelopeOpen = false;

  function toggleEnvelope() {
    isEnvelopeOpen = !isEnvelopeOpen;
    playSound(isEnvelopeOpen ? 'sparkle' : 'pop');

    if (isEnvelopeOpen) {
      envelope.classList.add('is-opened');
      letterBtnText.textContent = 'Fold & Close 💌';
      fullscreenLetterBtn.classList.remove('is-hidden');

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#FF758C', '#FFF', '#F9D5E0']
        });
      }
    } else {
      envelope.classList.remove('is-opened');
      letterBtnText.textContent = 'Open Envelope 💌';
      fullscreenLetterBtn.classList.add('is-hidden');
    }
  }

  if (envelope) {
    envelope.addEventListener('click', (e) => {
      // Avoid closing if clicking directly inside letter paper when opened
      if (isEnvelopeOpen && e.target.closest('.letter-paper')) {
        return;
      }
      toggleEnvelope();
    });

    // Keyboard accessibility
    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleEnvelope();
      }
    });
  }

  if (toggleLetterBtn) {
    toggleLetterBtn.addEventListener('click', toggleEnvelope);
  }

  // Fullscreen Letter Modal
  if (fullscreenLetterBtn && letterModal && letterPaper) {
    fullscreenLetterBtn.addEventListener('click', () => {
      playSound('pop');
      letterModalInner.innerHTML = letterPaper.innerHTML;
      letterModal.classList.remove('is-hidden');
    });
  }

  if (letterModalClose && letterModal) {
    letterModalClose.addEventListener('click', () => {
      playSound('pop');
      letterModal.classList.add('is-hidden');
    });
    letterModal.addEventListener('click', (e) => {
      if (e.target === letterModal) {
        letterModal.classList.add('is-hidden');
      }
    });
  }

  /* ========================================================
     SECTION 3: OUR CUTE QUESTION GAME
     ======================================================== */
  const quizData = [
    {
      question: "Who is more likely to fall asleep during a call? 😴",
      options: [
        { text: "Definitely you! 💤", reaction: "Haha! You look like a sleepy angel anyway, so you're forgiven! 🧸", emoji: "🥰" },
        { text: "100% me 🙈", reaction: "Guilty as charged! Good thing I love listening to you snooze. 💤", emoji: "🤭" },
        { text: "We'd both fall asleep together 🧸", reaction: "The cutest call ever! Dreamland rendezvous. 🌙", emoji: "✨" }
      ]
    },
    {
      question: "Who is more romantic? 🌹",
      options: [
        { text: "You, hands down! ✨", reaction: "Aww, you're sweet! But you bring out all the romance in me. 🥰", emoji: "💖" },
        { text: "Me! I'm a hopeless romantic 💌", reaction: "I adore that about you! Never change your romantic heart. 💌", emoji: "🌹" },
        { text: "It's a secret competition 😉", reaction: "Game on! But let's agree we both win. 🏆", emoji: "😜" }
      ]
    },
    {
      question: "If we could travel anywhere together, where would we go? ✈️",
      options: [
        { text: "A cozy mountain cabin with hot chocolate 🏔️", reaction: "Sweater weather, crackling fire, and cozy blankets! Perfection. ☕", emoji: "🧣" },
        { text: "A sunny beach with ocean waves 🏖️", reaction: "Walking along the shore at golden hour with our feet in the water! 🌅", emoji: "🐚" },
        { text: "A glowing city with midnight dessert cafés 🍰", reaction: "Late night sweet treats and wandering fairy-lit streets together! 🥐", emoji: "🧁" },
        { text: "Anywhere, as long as it's with you 💫", reaction: "My heart just melted into a million pieces. Truly anywhere. 🥹", emoji: "❤️" }
      ]
    },
    {
      question: "What would our perfect date look like? 🕯️",
      options: [
        { text: "Cooking dinner together and dancing in the kitchen 🍝", reaction: "Even if we burn the pasta, we'll be laughing the whole time! 🎶", emoji: "🧑‍🍳" },
        { text: "Stargazing with cozy blankets and good music 🌌", reaction: "Looking up at the universe and knowing my favorite star is right beside me. ✨", emoji: "🌟" },
        { text: "An arcade & ice cream spree 🍦", reaction: "I will win you the biggest plushie in the claw machine, promised! 🧸", emoji: "🎮" },
        { text: "Movie marathon wrapped like burritos in blankets 🎬", reaction: "Snacks, cuddles, and pausing every 5 minutes to talk! 🍿", emoji: "🛋️" }
      ]
    },
    {
      question: "Who would say sorry first after an argument? 🥺",
      options: [
        { text: "You, with the cutest puppy dog eyes 🐶", reaction: "No one can resist those puppy eyes! Instant ceasefire. 🥹", emoji: "🐾" },
        { text: "Me, because I can't stay mad at you for 5 seconds ❤️", reaction: "I couldn't stay mad at you either. Love always wins! 💖", emoji: "🥰" },
        { text: "Whoever's stomach rumbles first 🍕", reaction: "Food solves all problems! Let's get pizza immediately. 🍕", emoji: "🍕" }
      ]
    },
    {
      question: "What is one thing that makes you smile instantly? 🌸",
      options: [
        { text: "A warm, tight hug that melts worries away 🫂", reaction: "Sending you the biggest, coziest hug right this second! 🫂", emoji: "🧸" },
        { text: "Surprise sweet snacks and delicious food 🍓", reaction: "A sweet treat for the sweetest person! 🍫", emoji: "🍰" },
        { text: "A cute good morning text 📱", reaction: "You are the first thing on my mind when I wake up anyway! ☀️", emoji: "💌" },
        { text: "Seeing each other happy 🥹", reaction: "Your happiness is literally my happiness. Always. 💖", emoji: "🌸" }
      ]
    },
    {
      question: "Would you rather hug for an hour or hold hands all day? 🤝",
      options: [
        { text: "A continuous 60-minute warm hug 🧸", reaction: "60 minutes of uninterrupted warmth and peace. Yes please! 🧸", emoji: "🫂" },
        { text: "Hold hands everywhere we walk 🫶", reaction: "Interlocking fingers and never letting go. 🤝", emoji: "🫶" },
        { text: "Why choose? Both please! 💖", reaction: "The only correct answer! You get both, forever and always. 💖", emoji: "✨" }
      ]
    }
  ];

  const quizProgressHearts = document.getElementById('quiz-progress-hearts');
  const quizStepCount = document.getElementById('quiz-step-count');
  const quizQuestionText = document.getElementById('quiz-question-text');
  const quizOptionsGrid = document.getElementById('quiz-options-grid');
  const quizFeedbackBox = document.getElementById('quiz-feedback-box');
  const feedbackEmoji = document.getElementById('feedback-emoji');
  const feedbackText = document.getElementById('feedback-text');
  const nextQuestionBtn = document.getElementById('next-question-btn');
  const quizCard = document.getElementById('quiz-card');
  const quizResultCard = document.getElementById('quiz-result-card');
  const restartQuizBtn = document.getElementById('restart-quiz-btn');

  function initQuizHearts() {
    if (!quizProgressHearts) return;
    quizProgressHearts.innerHTML = '';
    quizData.forEach((_, idx) => {
      const heart = document.createElement('span');
      heart.className = `heart-step ${idx <= state.currentQuizIndex ? 'completed' : ''}`;
      heart.textContent = '❤️';
      quizProgressHearts.appendChild(heart);
    });
  }

  function renderQuestion() {
    const q = quizData[state.currentQuizIndex];
    if (!q) return;

    quizStepCount.textContent = `Question ${state.currentQuizIndex + 1} of ${quizData.length}`;
    quizQuestionText.textContent = q.question;
    quizOptionsGrid.innerHTML = '';
    quizFeedbackBox.classList.add('is-hidden');

    initQuizHearts();

    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span class="opt-bullet">🌸</span> <span class="opt-text">${opt.text}</span>`;
      btn.addEventListener('click', () => {
        playSound('pop');
        // Disable other buttons
        const allBtns = quizOptionsGrid.querySelectorAll('.quiz-option-btn');
        allBtns.forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');

        // Show feedback
        feedbackEmoji.textContent = opt.emoji;
        feedbackText.textContent = opt.reaction;
        quizFeedbackBox.classList.remove('is-hidden');

        if (typeof confetti === 'function') {
          confetti({
            particleCount: 20,
            spread: 50,
            origin: { y: 0.7 },
            colors: ['#FF758C', '#FF7EB3']
          });
        }
      });
      quizOptionsGrid.appendChild(btn);
    });
  }

  if (nextQuestionBtn) {
    nextQuestionBtn.addEventListener('click', () => {
      playSound('sparkle');
      state.currentQuizIndex++;
      if (state.currentQuizIndex < quizData.length) {
        renderQuestion();
      } else {
        // Complete Quiz
        quizCard.classList.add('is-hidden');
        quizResultCard.classList.remove('is-hidden');
        playSound('celebrate');
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#FF758C', '#FFD166', '#B6A6E9', '#06D6A0']
          });
        }
      }
    });
  }

  if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', () => {
      playSound('pop');
      state.currentQuizIndex = 0;
      quizResultCard.classList.add('is-hidden');
      quizCard.classList.remove('is-hidden');
      renderQuestion();
    });
  }

  // Initial render
  renderQuestion();

  /* ========================================================
     SECTION 4: A CUTE COMPLIMENT MACHINE
     ======================================================== */
  const complimentsList = [
    "You're prettier than the stars tonight. ✨",
    "Your smile should honestly be illegal. 🥰",
    "If happiness had a face, it would look like you. 🌸",
    "Your eyes are my favourite place to get lost. 👀💖",
    "Just a reminder: someone is smiling right now because of you. 😊",
    "You have a voice that makes even mundane days feel like poetry. 🎶",
    "If cuteness was a crime, you'd be serving a life sentence! 🚨",
    "The world became a significantly better place the day you were born. 🎂",
    "You are the sweetest notification I could ever receive. 📱❤️",
    "I hope you see yourself the way I see you: completely wonderful. ✨",
    "You have this gentle magic that calms everything around you. 🕊️",
    "Even on days when you feel ordinary, you are extraordinary to me. 💫",
    "Your laugh is my absolute favorite song in the universe. 🎵",
    "Are you a magician? Because every time you speak, everyone else disappears. 🪄",
    "You are proof that pure kindness and true beauty still exist. 🌷",
    "I was having a plain day until I thought of you, and then everything was bright. ☀️",
    "You make my heart do a tiny happy dance every single time. 💃",
    "You deserve flowers, sweet words, and endless peace every single day. 💐",
    "Someone out there (hint: me!) is endlessly proud of you. 💖",
    "You are made of stardust and pure golden warmth. ⭐",
    "Your brain is brilliant, your heart is pure, and you are unforgettable. 🧠✨",
    "If I could wrap up a hug and send it in an envelope, it would be yours. 🫂",
    "You light up every room you walk into without even trying. 💡",
    "You are my favorite thought before falling asleep. 🌙",
    "I'm so lucky that of all the people in the world, I get to know you. 🍀"
  ];

  const complimentText = document.getElementById('compliment-text');
  const newComplimentBtn = document.getElementById('new-compliment-btn');
  const copyComplimentBtn = document.getElementById('copy-compliment-btn');
  const smilesCount = document.getElementById('smiles-count');
  const copyToast = document.getElementById('copy-toast');

  let lastComplimentIndex = 0;

  function getRandomCompliment() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * complimentsList.length);
    } while (newIndex === lastComplimentIndex && complimentsList.length > 1);
    lastComplimentIndex = newIndex;
    return complimentsList[newIndex];
  }

  if (newComplimentBtn && complimentText) {
    newComplimentBtn.addEventListener('click', () => {
      playSound('sparkle');
      complimentText.style.opacity = '0';
      complimentText.style.transform = 'scale(0.95)';

      state.smilesCount++;
      if (smilesCount) smilesCount.textContent = state.smilesCount;

      setTimeout(() => {
        complimentText.textContent = getRandomCompliment();
        complimentText.style.opacity = '1';
        complimentText.style.transform = 'scale(1)';
      }, 250);

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#FF758C', '#FF7EB3', '#B6A6E9']
        });
      }
    });
  }

  if (copyComplimentBtn && complimentText && copyToast) {
    copyComplimentBtn.addEventListener('click', () => {
      playSound('pop');
      navigator.clipboard.writeText(complimentText.textContent.trim()).then(() => {
        copyToast.classList.remove('is-hidden');
        setTimeout(() => copyToast.classList.add('is-hidden'), 2000);
      }).catch(() => {
        copyToast.textContent = 'Copied! ❤️';
        copyToast.classList.remove('is-hidden');
        setTimeout(() => copyToast.classList.add('is-hidden'), 2000);
      });
    });
  }

  /* ========================================================
     SECTION 5: REASONS TO SMILE – SURPRISE BOXES
     ======================================================== */
  const giftBoxes = document.querySelectorAll('.gift-box-item');
  const giftModal = document.getElementById('gift-modal');
  const giftModalClose = document.getElementById('gift-modal-close');
  const modalGiftBtn = document.getElementById('modal-gift-btn');
  const modalGiftIcon = document.getElementById('modal-gift-icon');
  const modalGiftCategory = document.getElementById('modal-gift-category');
  const modalGiftTitle = document.getElementById('modal-gift-title');
  const modalGiftContent = document.getElementById('modal-gift-content');
  const resetBoxesBtn = document.getElementById('reset-boxes-btn');

  const giftSurprises = {
    '1': {
      icon: '🌸',
      category: 'Cute Compliment',
      title: 'A Gentle Reminder',
      content: `
        <p>You are genuine, rare, and radiant. In a world where so many people pretend to be someone else, your authenticity and tender heart are a breath of fresh air.</p>
        <p style="margin-top: 0.8rem; font-weight: 600; color: #EE6B8B;">Never forget how special you truly are! ✨</p>
      `
    },
    '2': {
      icon: '💌',
      category: 'Romantic Thought',
      title: 'A Secret Thought',
      content: `
        <p>Whenever my mind wanders off into happy daydreams, it always finds its way back to you. The little moments, the smiles we share, and the warmth you bring into my world.</p>
        <p style="margin-top: 0.8rem; font-style: italic;">“You make ordinary moments feel like poetry.” ❤️</p>
      `
    },
    '3': {
      icon: '🚨',
      category: 'Funny Message',
      title: 'Emergency Cute Overload!',
      content: `
        <p><strong>OFFICIAL NOTICE:</strong> You have been cited by the Department of Cuteness for exceeding all lawful limits of charm and adorableness.</p>
        <p style="margin-top: 0.8rem;">Penalty: You are sentenced to receive unlimited warm smiles and complimentary head pats! 🧸</p>
      `
    },
    '4': {
      icon: '🫂',
      category: 'Virtual Hug',
      title: 'A Big Squeeze Just For You!',
      content: `
        <div class="hug-illustration-wrap">
          <img src="assets/images/bear-hug.svg" alt="Cute Hugging Bear" class="hug-bear-img">
        </div>
        <p><strong>*Squeeeeeeze!*</strong></p>
        <p style="margin-top: 0.4rem;">A warm, snuggly virtual hug to wrap around you like a cozy blanket whenever you need comfort. You are never alone. 🧸💖</p>
      `
    },
    '5': {
      icon: '🎟️',
      category: 'Surprise Challenge',
      title: 'The Golden Wish Voucher',
      content: `
        <div class="golden-ticket">
          <div class="ticket-headline">✨ GOLDEN LOVE COUPON ✨</div>
          <div class="ticket-details">
            Valid for: <strong>1 Free Coffee Date / Midnight Drive / Ice Cream Treat</strong> of your choice!<br>
            <small>Terms: Redeemable anytime. No expiration date. Non-transferable! 😉</small>
          </div>
        </div>
        <p style="margin-top: 0.8rem;">Take a screenshot to claim it anytime! 📸</p>
      `
    }
  };

  giftBoxes.forEach((box) => {
    box.addEventListener('click', () => {
      const boxId = box.getAttribute('data-box');
      box.classList.add('is-opened');
      box.querySelector('.gift-status').textContent = 'Opened! ✨';
      state.openedBoxes.add(boxId);

      playSound('sparkle');

      if (typeof confetti === 'function') {
        const rect = box.getBoundingClientRect();
        confetti({
          particleCount: 40,
          spread: 70,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight
          },
          colors: ['#FF758C', '#FFD166', '#B6A6E9', '#FFF']
        });
      }

      const data = giftSurprises[boxId];
      if (data) {
        modalGiftIcon.textContent = data.icon;
        modalGiftCategory.textContent = data.category;
        modalGiftTitle.textContent = data.title;
        modalGiftContent.innerHTML = data.content;
        setTimeout(() => {
          giftModal.classList.remove('is-hidden');
        }, 300);
      }
    });
  });

  function closeGiftModal() {
    playSound('pop');
    giftModal.classList.add('is-hidden');
  }

  if (giftModalClose) giftModalClose.addEventListener('click', closeGiftModal);
  if (modalGiftBtn) modalGiftBtn.addEventListener('click', closeGiftModal);
  if (giftModal) {
    giftModal.addEventListener('click', (e) => {
      if (e.target === giftModal) closeGiftModal();
    });
  }

  if (resetBoxesBtn) {
    resetBoxesBtn.addEventListener('click', () => {
      playSound('pop');
      state.openedBoxes.clear();
      giftBoxes.forEach((box) => {
        box.classList.remove('is-opened');
        box.querySelector('.gift-status').textContent = 'Click to Open 🎁';
      });
    });
  }

  /* ========================================================
     SECTION 6: A LITTLE MUSIC CORNER
     ======================================================== */
  const bgAudio = document.getElementById('bg-audio');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const playIcon = document.getElementById('play-icon');
  const replayBtn = document.getElementById('replay-btn');
  const volumeToggleBtn = document.getElementById('volume-toggle-btn');
  const volumeSlider = document.getElementById('volume-slider');
  const vinylRecord = document.getElementById('vinyl-record');
  const toneArm = document.getElementById('tone-arm');
  const visualizerBars = document.getElementById('visualizer-bars');
  const timeCurrent = document.getElementById('time-current');
  const timeTotal = document.getElementById('time-total');
  const timelineSlider = document.getElementById('timeline-slider');
  const timelineFill = document.getElementById('timeline-fill');

  let audioDuration = 27; // Default 27s fallback for melody loop

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function startMusicVisuals() {
    state.isPlayingMusic = true;
    playIcon.textContent = '⏸️';
    vinylRecord.classList.add('spinning');
    toneArm.classList.add('playing');
    visualizerBars.classList.add('active');
  }

  function stopMusicVisuals() {
    state.isPlayingMusic = false;
    playIcon.textContent = '▶️';
    vinylRecord.classList.remove('spinning');
    toneArm.classList.remove('playing');
    visualizerBars.classList.remove('active');
  }

  function toggleMusicPlayback() {
    getAudioContext(); // unlock audio on user gesture
    if (state.isPlayingMusic) {
      if (bgAudio && !bgAudio.paused) {
        bgAudio.pause();
      }
      stopSynthMusic();
      stopMusicVisuals();
    } else {
      if (bgAudio) {
        bgAudio.play().then(() => {
          startMusicVisuals();
        }).catch((err) => {
          console.warn('Audio tag play blocked/failed, switching to generative Web Audio synth:', err);
          startSynthMusic();
          startMusicVisuals();
        });
      } else {
        startSynthMusic();
        startMusicVisuals();
      }
    }
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', toggleMusicPlayback);
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      playSound('pop');
      if (bgAudio) {
        bgAudio.currentTime = 0;
        bgAudio.play().then(startMusicVisuals).catch(() => {});
      }
    });
  }

  if (volumeToggleBtn && bgAudio) {
    volumeToggleBtn.addEventListener('click', () => {
      bgAudio.muted = !bgAudio.muted;
      volumeToggleBtn.textContent = bgAudio.muted ? '🔇' : '🔊';
    });
  }

  if (volumeSlider && bgAudio) {
    volumeSlider.addEventListener('input', (e) => {
      bgAudio.volume = parseFloat(e.target.value);
    });
  }

  if (bgAudio) {
    bgAudio.addEventListener('loadedmetadata', () => {
      if (!isNaN(bgAudio.duration)) {
        audioDuration = bgAudio.duration;
        timeTotal.textContent = formatTime(audioDuration);
      }
    });

    bgAudio.addEventListener('timeupdate', () => {
      const cur = bgAudio.currentTime;
      timeCurrent.textContent = formatTime(cur);
      const pct = (cur / (bgAudio.duration || audioDuration)) * 100;
      timelineFill.style.width = `${pct}%`;
    });

    bgAudio.addEventListener('ended', () => {
      // Loop smoothly
      bgAudio.currentTime = 0;
      bgAudio.play().catch(() => stopMusicVisuals());
    });
  }

  if (timelineSlider && bgAudio) {
    timelineSlider.addEventListener('click', (e) => {
      const rect = timelineSlider.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = clickX / rect.width;
      bgAudio.currentTime = pct * (bgAudio.duration || audioDuration);
    });
  }

  /* ========================================================
     SECTION 7: THE FINAL SURPRISE & GRAND FINALE
     ======================================================== */
  const finalQuestionBtn = document.getElementById('final-question-btn');
  const finaleModal = document.getElementById('finale-modal');
  const finaleModalClose = document.getElementById('finale-modal-close');
  const finaleYesBtn = document.getElementById('finale-yes-btn');
  const finalePlayfulBtn = document.getElementById('finale-playful-btn');
  const finaleCelebrationCard = document.getElementById('finale-celebration-card');

  if (finalQuestionBtn && finaleModal) {
    finalQuestionBtn.addEventListener('click', () => {
      playSound('sparkle');
      finaleModal.classList.remove('is-hidden');
    });
  }

  function triggerGrandCelebration() {
    playSound('celebrate');
    finaleCelebrationCard.classList.remove('is-hidden');

    // Multi-stage grand confetti burst
    if (typeof confetti === 'function') {
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        }));
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#FF758C', '#FF7EB3']
      });
      fire(0.2, {
        spread: 60,
        colors: ['#FFD166', '#FFF']
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ['#B6A6E9', '#A88DE0']
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: ['#06D6A0', '#FF758C']
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
        colors: ['#FF758C', '#FFD166', '#FFF']
      });
    }
  }

  if (finaleYesBtn) {
    finaleYesBtn.addEventListener('click', triggerGrandCelebration);
  }

  if (finalePlayfulBtn) {
    // Playful button responds lovingly too!
    finalePlayfulBtn.addEventListener('click', () => {
      triggerGrandCelebration();
    });
  }

  if (finaleModalClose && finaleModal) {
    finaleModalClose.addEventListener('click', () => {
      playSound('pop');
      finaleModal.classList.add('is-hidden');
    });
    finaleModal.addEventListener('click', (e) => {
      if (e.target === finaleModal) {
        finaleModal.classList.add('is-hidden');
      }
    });
  }

  /* ========================================================
     BACK TO TOP BUTTON WITH SCROLL PROGRESS RING
     ======================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  const progressCircle = document.querySelector('.progress-ring-circle');
  const circumference = 2 * Math.PI * 20; // r=20 => 125.66

  if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    if (progressCircle) {
      const offset = circumference - scrollPercent * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }

    if (backToTopBtn) {
      if (scrollTop > 350) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      playSound('pop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ========================================================
     CUSTOM CURSOR (DESKTOP ONLY)
     ======================================================== */
  const cursorHeart = document.getElementById('cursor-heart');
  const cursorFollower = document.getElementById('cursor-follower');

  if (cursorHeart && cursorFollower && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;
    let lastSparkleTime = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorHeart.style.left = `${mouseX}px`;
      cursorHeart.style.top = `${mouseY}px`;

      // Sparkle trailing effect on fast movement
      const now = Date.now();
      if (now - lastSparkleTime > 120 && Math.random() > 0.4) {
        lastSparkleTime = now;
        createCursorSparkle(mouseX, mouseY);
      }
    });

    function createCursorSparkle(x, y) {
      const sparkle = document.createElement('span');
      sparkle.className = 'cursor-trail-sparkle';
      sparkle.textContent = Math.random() > 0.5 ? '✨' : '💖';
      sparkle.style.position = 'fixed';
      sparkle.style.left = `${x + (Math.random() - 0.5) * 15}px`;
      sparkle.style.top = `${y + (Math.random() - 0.5) * 15}px`;
      sparkle.style.pointerEvents = 'none';
      sparkle.style.fontSize = `${Math.random() * 8 + 8}px`;
      sparkle.style.zIndex = '999997';
      sparkle.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
      sparkle.style.transform = 'translate(-50%, -50%) scale(1)';
      sparkle.style.opacity = '0.8';

      document.body.appendChild(sparkle);

      requestAnimationFrame(() => {
        sparkle.style.transform = 'translate(-50%, -30px) scale(0.4)';
        sparkle.style.opacity = '0';
      });

      setTimeout(() => sparkle.remove(), 600);
    }

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover expand cursor over interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .reason-card, .envelope, .gift-box-item');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.style.width = '42px';
        cursorFollower.style.height = '42px';
        cursorFollower.style.background = 'rgba(255, 117, 140, 0.15)';
      });
      el.addEventListener('mouseleave', () => {
        cursorFollower.style.width = '26px';
        cursorFollower.style.height = '26px';
        cursorFollower.style.background = 'transparent';
      });
    });
  }

})();

