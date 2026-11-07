# A Cute, Romantic Surprise Website for Someone Special ❤️

A dreamy, interactive, and romantic surprise website built with HTML5, CSS3, and Vanilla JavaScript. Designed to feel personal, emotional, playful, and packed with sweet little surprises that will make her smile from the very first click.

---

## ✨ Features Overview

1. **A Special Welcome (Hero Screen)**
   - Dreamy intro screen with floating hearts, ambient canvas particles, and a glowing pulsing heart.
   - Welcoming message: *"Hey, beautiful! I made something special just for you. I hope this little surprise makes you smile. ❤️"*
   - Smooth opening curtain transition into the main website with celebration confetti.

2. **Section A: Reasons Why You're Special ❤️**
   - 8 interactive 3D flip cards with custom illustrations.
   - Click to reveal sweet personal messages (e.g. *Your Beautiful Smile*, *Your Lovely Eyes*, *Our Conversations*, *How You Make Me Smile*, *Simply Because You're You*...).
   - Live discovery progress counter and progress bar with a celebration popup when all 8 are unlocked.

3. **Section B: A Little Love Letter 💌**
   - Realistic interactive 3D envelope with a vintage postage stamp and wax seal.
   - Click the wax seal to break the seal, unfold the envelope flap, and watch the letter slide out.
   - Styled with warm handwritten-style calligraphy (`Caveat` and `Dancing Script`) on realistic textured stationery.
   - Easy to edit with custom heartfelt words.
   - Options to fold back into the envelope or view in a distraction-free full-screen reader.

4. **Section C: Our Cute Question Game 🎮**
   - 7 romantic, funny, and playful interactive questions:
     1. *Who is more likely to fall asleep during a call? 😴*
     2. *Who is more romantic? 🌹*
     3. *If we could travel anywhere together, where would we go? ✈️*
     4. *What would our perfect date look like? 🕯️*
     5. *Who would say sorry first after an argument? 🥺*
     6. *What is one thing that makes you smile instantly? 🌸*
     7. *Would you rather hug for an hour or hold hands all day? 🤝*
   - Interactive multiple-choice answers with heart-stepper progress.
   - Custom playful reaction message & emoji for every single choice!
   - Final completion card with an adorable *1000% Soulmate Compatibility* badge.

5. **Section D: A Cute Compliment Machine ✨**
   - *"Need a little smile? ✨"* button delivering 25+ randomized heartfelt and playful compliments.
   - Live "Smiles Delivered" counter tracking every smile generated.
   - One-click "Copy Compliment" button with toast notification.

6. **Section E: Reasons to Smile – Surprise Gift Boxes 🎁**
   - 5 uniquely styled 3D gift boxes with bouncing bows.
   - Clicking each box pops the lid off with a confetti shower and opens a special modal:
     - **Box 1:** A heartwarming compliment reminder
     - **Box 2:** A secret romantic thought
     - **Box 3:** A hilarious "Emergency Cuteness Citation"
     - **Box 4:** An animated Virtual Hug with a cute hugging teddy bear
     - **Box 5:** A "Golden Love Coupon" redeemable for 1 free coffee/ice cream date anytime!
   - "Reset All Boxes" button to replay the surprise anytime.

7. **Section F: A Little Music Corner 🎵**
   - Retro-modern vinyl player with spinning record and animated tone arm.
   - 16-bar dynamic equalizer audio visualizer.
   - Play/Pause, Replay, Volume Slider, and clickable timeline scrubber.
   - Dual-engine audio: plays the bundled soothing audio (`assets/music/romantic-melody.mp3` / `.wav`) AND features an automatic Web Audio API synthesizer fallback that generates relaxing music box chords live if no audio file is available.
   - Respectful manual play control (no invasive autoplay).

8. **Section G: The Final Surprise ❤️**
   - Heartfelt closing quote: *“Out of all the people in this world, I'm really glad our paths crossed.”*
   - *"One Last Question ❤️"* button leading to the grand promise:
     *"Will you promise to keep smiling and being the wonderful person you are?"*
   - Multi-directional canvas confetti celebration, fireworks, and a heartwarming closing card.

9. **Extra Cute Details & Polish**
   - Ambient background canvas with floating pastel hearts and twinkling stars.
   - Custom desktop cursor with heart pointer and sparkling trail (automatically disabled for touch/mobile devices).
   - Theme toggle: **🌸 Soft Pastel** and **🌙 Starlight Twilight** dark mode.
   - Sound FX toggle (synthesized bell chimes and bubble pops via Web Audio API).
   - Floating Back to Top button with a circular SVG scroll-progress ring.
   - 100% responsive on smartphones, tablets, and desktops.
   - Accessible with `prefers-reduced-motion` support.

---

## 📁 Project Structure

```text
romantic-surprise/
│
├── index.html                 # Main website markup & semantic structure
├── style.css                  # Romantic themes, 3D animations, responsive styling
├── script.js                  # Vanilla JS interactions, quiz engine, audio, confetti
├── assets/
│   ├── images/
│   │   ├── favicon.svg        # Cute glowing heart favicon
│   │   ├── album-cover.svg    # Twilight starry album art for vinyl player
│   │   ├── stamp.svg          # Vintage postage stamp for the love letter
│   │   └── bear-hug.svg       # Cute animated teddy bear hug illustration
│   └── music/
│       ├── romantic-melody.mp3 # Soothing ambient music box melody
│       └── romantic-melody.wav # High fidelity audio loop
└── README.md                  # Documentation and deployment guide
```

---

## 🎨 How to Personalize This Website

Everything is designed to be easily editable without touching complicated code:

### 1. Change Her Name or Greeting
Open `index.html` and search for `Hey, Beautiful!`. Change it to her name or your favorite pet nickname:
```html
<h1 class="welcome-title">Hey, [Her Name]! ❤️</h1>
```

### 2. Edit the Love Letter
In `index.html`, look for `<div class="letter-paper" id="letter-paper">`. You can edit the paragraphs, the greeting, and the signature to include your own personal inside jokes and memories:
```html
<span class="letter-to">To [Her Name],</span>
...
<p class="letter-paragraph">Your custom message here...</p>
...
<p class="letter-signature">With all my love, [Your Name] ❤️</p>
```

### 3. Add or Modify Questions
In `script.js`, locate `const quizData = [...]`. You can add, remove, or modify any questions, choices, and reaction messages.

### 4. Add Your Own Compliments
In `script.js`, locate `const complimentsList = [...]` and add your own unique compliments or sweet memories to the list.

### 5. Add Your Own Custom Song
To use a favorite song of yours:
1. Place your MP3 file into `assets/music/` and name it `romantic-melody.mp3`.
2. The website will automatically play your audio file when she clicks play on the vinyl player!

### 6. Receive Her Answers Directly in WhatsApp (Optional)
In `script.js` on line 14, you can enter your phone number with your country code (digits only):
```javascript
const SENDER_PHONE_NUMBER = "1234567890"; // Example: "14155552671" or "919876543210"
```
- If set: When she clicks **"Send Answers to Him 💬"**, WhatsApp will open directly into your chat with all her answers pre-filled!
- If left blank: WhatsApp will simply let her tap your contact from her recent chats list.

---

## 💌 How to See What Options She Selected

Because this is a private, static website without backend tracking or invasive analytics, we designed **three seamless, charming ways** for you to see everything she selected:

### 1. One-Click "Send Answers to Him 💬" (WhatsApp)
At the end of the Quiz Game and in the Grand Finale celebration, a prominent button lets her send you a pre-formatted message with all her chosen answers and cute emojis:
> *“✨ My Answers from Your Surprise Website ❤️ ✨*
> *1. Sleepyhead: We'd both fall asleep together 🧸*
> *2. More romantic: You, hands down! ✨*
> *3. Dream trip: A cozy mountain cabin 🏔️*
> *4. Perfect date: Cooking together 🍝*
> *5. Apology: Puppy eyes 🐶*
> *6. Instant smile: A warm tight hug 🫂*
> *7. Hug or hands: Both please! 💖*
> *🎁 Gift Boxes Opened: Box 1, Box 2, Box 3, Box 4, Box 5*
> *💍 Final Promise: Yes, I promise to keep smiling! 🥰”*

### 2. Native Share Sheet (iPhone & Android 📱)
She can tap **"Share My Answers 💌"** which opens the native iOS / Android share sheet, letting her send it to you via iMessage, SMS, Instagram DM, Telegram, or AirDrop!

### 3. One-Click "Copy Summary 📋"
She can copy her formatted answer card and paste it straight into your conversation.

### 4. Secret "View Her Answers" Button (On-Device Review Mode 🔒)
Every choice she makes is automatically saved into her device's local storage (`localStorage`).
- In the website footer at the bottom, there is a discreet **`🔒 View Her Answers`** button.
- Clicking it opens an organized summary displaying every question she answered, the exact option she selected, which gift boxes she opened, and the date and time!

---

## 🚀 How to Run Locally

You don't need Node.js or any backend server!

### Method 1: Just Double-Click
Simply open `index.html` in any web browser (Google Chrome, Apple Safari, Microsoft Edge, Mozilla Firefox).

### Method 2: Python Local Server
If you have Python installed, open your terminal/command prompt in the project folder and run:
```bash
# Python 3
python -m http.server 8000
```
Then visit: `http://localhost:8000` in your browser.

### Method 3: VS Code Live Server
1. Open the folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **"Open with Live Server"**.

---

## 🌐 How to Deploy to GitHub Pages (Free Hosting)

GitHub Pages lets you host this website online for free so you can send her a beautiful link like `https://<your-username>.github.io/<repository-name>/`.

### Option A: Using the GitHub Web Interface (Easiest, No Git required!)

1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. In the top-right corner, click **+** and select **New repository**.
3. Name your repository (e.g., `for-someone-special` or `surprise`).
4. Set the repository visibility to **Public**.
5. Do **not** check "Add a README file" (we already have one). Click **Create repository**.
6. On the empty repository page, click the link that says **"uploading an existing file"**.
7. Drag and drop all files and folders:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
   - The entire `assets` folder (containing `images` and `music`)
8. Click **Commit changes**.
9. Now go to **Settings** (tab at the top of your repository).
10. On the left sidebar under "Code and automation", click **Pages**.
11. Under **Branch**, select `main` (or `master`) and keep the folder as `/(root)`.
12. Click **Save**.
13. Wait 1-2 minutes, refresh the page, and GitHub will provide your live URL:
    `https://<your-username>.github.io/<repository-name>/`
14. Copy the link and send it to her! ❤️

---

### Option B: Using Git Command Line

If you have Git installed on your computer:

```bash
# 1. Initialize git repository in this folder
git init

# 2. Add all files
git add .

# 3. Commit files
git commit -m "A cute surprise website for someone special ❤️"

# 4. Set main branch
git branch -M main

# 5. Connect to your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push to GitHub
git push -u origin main
```

Then turn on GitHub Pages:
1. Go to your repository on GitHub.
2. Click **Settings** -> **Pages**.
3. Under **Build and deployment > Branch**, choose `main` branch and `/ (root)`.
4. Click **Save**.
5. Your website will be live in 60 seconds!

---

## 📱 Mobile Compatibility & Performance

- **Fully Responsive**: Adapts seamlessly to all screen sizes (iPhone, Android, tablets, and laptops).
- **Touch-Optimized**: Touch-friendly card flips, envelope opening, and buttons.
- **Zero Heavy Frameworks**: Ultra-lightweight Vanilla JS and CSS3 ensures fast 60fps animations even on older devices.
- **Offline & Zero-Backend**: Operates 100% statically with no external server or database needed.

---

## ❤️ Made With Love

Every single card, transition, animation, and sound has been crafted to create a magical, memorable experience for someone truly special.

