# AI Log — Key Club Website

**Project:** Key Club Member & Attendance Tracker
**Repo:** https://github.com/barbaragrcast/key-club-website
**Format per entry:** What I asked → What it produced → What I fixed/rejected → How I verified

---

## Entry 1 — October 15, 2026

**What I asked for:**
Run the Vite app locally.

**What it produced:**
Started the dev server with `npm run dev`. Port 5173 was in use, so it launched on `http://localhost:5174`.

**What I fixed or rejected:**
Nothing needed fixing — server started cleanly.

**How I verified:**
Read the terminal output confirming Vite was ready. Opened the browser to confirm the app loaded.

---

## Entry 2 — October 15, 2026

**What I asked for:**
Connect the project to GitHub using the repo I created at `https://github.com/barbaragrcast/key-club-website.git`.

**What it produced:**
Ran `git init`, staged all files, made an initial commit ("Initial commit"), set the remote origin, and pushed to the `main` branch. 16 files were committed including source files, `package.json`, `.gitignore`, and assets.

**What I fixed or rejected:**
- Noted LF/CRLF line-ending warnings — accepted these as harmless on Windows.
- `node_modules` was correctly excluded by the existing `.gitignore`.

**How I verified:**
Checked the terminal output showing `* [new branch] main -> main` and `branch 'main' set up to track 'origin/main'`. Confirmed on GitHub.com that files appeared in the repo.

---

## Entry 3 — October 15, 2026

**What I asked for:**
Build the full UI for a Key Club attendance and member tracking website based on my spec. Interface only (no backend). Requirements:
- Home page with next meeting date and description
- Officers page with roles, pictures (placeholder), and emails
- Members page with roster, hours, points leaderboard, and attendance sign-in
- Member login (select name from list) and webmaster login (username/password)
- Webmaster panel to edit meeting info, toggle meeting active, edit member hours/points, add members
- Rules: members can only sign in under their own name, sign-in only during active meetings

**What it produced:**
Created 7 new files and rewrote 3 existing ones:
- `src/data/mockData.js` — 10 mock members, 6 officers, 1 upcoming meeting, webmaster credentials
- `src/components/Navbar.jsx` — sticky nav with Key Club branding, active-page highlighting, login/logout
- `src/components/HomePage.jsx` — hero section + next meeting card
- `src/components/OfficersPage.jsx` — officer grid with avatar initials, role badge, mailto links
- `src/components/MembersPage.jsx` — sortable leaderboard table with medals, color-coded attendance, conditional Sign In button
- `src/components/LoginModal.jsx` — tabbed modal for member (name dropdown) and webmaster (username/password) login
- `src/components/WebmasterPanel.jsx` — admin panel to edit meeting, toggle attendance window, edit/add members
- `src/App.jsx` — rewrote as main state manager routing between all pages
- `src/index.css` — complete redesign in Key Club blue (#003DA5) and gold (#FFC72C)
- `src/App.css` — cleared old Vite boilerplate styles

**What I fixed or rejected:**
- Did not implement any paid tools, payments, or backend (as specified)
- Did not allow members to sign in under other members' names (enforced in UI — button only appears on your own row)
- Did not add real authentication — this is interface only; real auth comes later

**How I verified:**
Dev server picked up all changes via HMR (confirmed in terminal output). Checked that the server had no build errors. *Next step: manually click through each page in the browser to test the full flow.*

---

*Keep this log updated. One entry per work session. Your capstone reviewer will check it.*
