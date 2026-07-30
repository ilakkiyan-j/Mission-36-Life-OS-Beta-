# Mission 36

A premium static personal roadmap website documenting a 36-day execution journey (August 3 – September 7, 2026).

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- AOS (scroll animations)
- Lucide icons (via inline SVG)
- Google Fonts (Inter)
- GitHub raw JSON for sync

## Structure

```
Mission36/
  index.html
  css/
    style.css
    components.css
    responsive.css
  js/
    app.js
    data.js
    countdown.js
    animations.js
  assets/
    images/
    icons/
    background/
  README.md
```

## Features

- 12 scrollable sections with smooth navigation
- Sticky navbar + dot navigation
- Dark / Light theme toggle
- Dark premium theme with glass cards
- Live countdown timers
- Day-by-day checklist & to-do tracking
- Progress persisted to GitHub (`progress.json`)
- Fully responsive (desktop → mobile)

## Sync Setup

The site works fully offline by default using `localStorage`. To sync progress between devices via GitHub:

### 1. Use the same GitHub repo
- Use the **same repo** where this website is hosted.
- The sync file is `progress.json` at the **repo root**.

### 2. Add `progress.json`
- Add an empty `progress.json` at the repo root.
- The file can be empty (`{}`) or omitted entirely — the site will auto-create it on first sync.

### 3. Generate a GitHub Personal Access Token
- Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic).
- Generate a new token with the **`repo`** scope.
- Copy the token — you’ll paste it into the site Settings.

### 4. Configure the site
- Open `index.html` in your browser.
- Click the **Settings** icon in the navbar.
- Paste:
  - **GitHub Token:** your PAT
  - **Repo:** `owner/repo` (e.g. `ilakkiyan/Mission36`)
- Click **Save**.

### 5. Sync
- Toggle any checklist item or add a to-do.
- The site auto-syncs to GitHub within 2 seconds.
- On another device, open the site, enter the same token + repo in Settings, and your progress will load.

**Note:** The site reads `progress.json` from `https://raw.githubusercontent.com/<owner>/<repo>/main/progress.json` and writes via the GitHub Contents API. If you use a different branch, edit the URLs in `js/data.js`.

## Local Development

Open `index.html` in a browser, or serve with:

```bash
npx serve .
# or
python -m http.server 8080
```

## License

Personal use only.
