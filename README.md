# Abdulla Thaslim — Premium Portfolio Website

A modern, premium personal developer portfolio website showcasing Abdulla Thaslim's skills, projects, and professional background.

## ✨ Features

- **Premium Dark Theme** — Deep navy backgrounds with electric blue/cyan accents
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop
- **Typing Animation** — Dynamic title rotation in the hero section
- **Project Filters** — Interactive category filtering (All, Web, AI, Cybersecurity)
- **Theme Toggle** — Dark/light mode with localStorage persistence
- **Smooth Animations** — AOS scroll reveal and custom CSS transitions
- **Contact Form** — Client-side validation with `mailto:` submission
- **Copy to Clipboard** — One-click email copy button
- **Reading Progress Bar** — Top-of-page scroll progress indicator
- **Glassmorphism Cards** — Modern glass-effect UI components
- **SEO Optimized** — Complete meta tags, Open Graph, and semantic HTML5
- **Accessible** — ARIA labels, keyboard navigation, focus indicators, and reduced-motion support

## 🗂️ Project Structure

```
my-portfolio/
├── index.html                  # Main HTML file
├── css/
│   └── style.css               # All styles (CSS variables, components, responsive)
├── js/
│   └── script.js               # All JavaScript (animations, filters, form, etc.)
├── assets/
│   ├── images/
│   │   ├── profile.png         # Profile/avatar photo
│   │   └── projects/
│   │       ├── perception-mapper.png
│   │       ├── mawanella-tourism.png
│   │       ├── smart-queue.png
│   │       └── mars-chatbot.png
│   ├── icons/                  # (reserved for custom icons)
│   └── Abdulla_Thaslim_CV.pdf  # ← ADD YOUR CV HERE
├── copy_assets.py              # One-time setup helper script
├── setup.sh                    # Bash setup helper
└── README.md
```

## 🚀 Getting Started

### Option 1 — Open directly in browser (simplest)

```bash
# From your project folder:
xdg-open index.html
# or on macOS:
open index.html
```

### Option 2 — Run with a local server (recommended for full features)

```bash
# Using Python (pre-installed on most systems)
python3 -m http.server 8080

# Then open:
http://localhost:8080
```

```bash
# Using Node.js / npx
npx serve .

# Using VS Code — Install "Live Server" extension, right-click index.html → "Open with Live Server"
```

### Setting Up Images (First Time Only)

The AI-generated project thumbnails and profile image need to be copied into the project. Run one of these:

```bash
# Option A — Python script
python3 copy_assets.py

# Option B — Bash script
bash setup.sh
```

Or manually copy into:
- `assets/images/profile.png` — your profile photo
- `assets/images/projects/*.png` — project thumbnails

## 📝 Customization Guide

### Replacing the Profile Photo

1. Add your actual photo as `assets/images/profile.png`
2. Recommended: square crop, minimum 400×400px, JPG or PNG
3. The `<img>` tag in `index.html` has an `onerror` fallback showing your initials "AT"

### Adding Your CV

1. Export your CV as a PDF
2. Name it `Abdulla_Thaslim_CV.pdf`
3. Place it in `assets/`
4. The Download CV buttons will automatically work

### Updating Projects

In `index.html`, find each `<article class="project-card">` and update:

```html
<!-- Project category for filter (space-separated): web | ai | cybersecurity -->
<article class="project-card" data-category="web ai">
  ...
  <h3 class="project-title">Your Project Title</h3>
  <p class="project-desc">Your project description.</p>
  ...
  <!-- Update links -->
  <a href="https://your-live-demo.com" class="btn btn-outline btn-sm">Live Demo</a>
  <a href="https://github.com/your-repo" class="btn btn-ghost btn-sm">Source Code</a>
```

### Updating Repository Links

Search for `https://github.com/mt-abdulla-it` in `index.html` and replace with your actual repository URLs when available.

### Customizing Colors

All colors are CSS custom properties in `css/style.css`:

```css
:root {
  --accent-blue: #2979ff;     /* Primary blue */
  --accent-cyan: #00e5ff;     /* Cyan accent */
  --accent-violet: #7c3aed;   /* Violet accent */
  --bg-primary: #050d1a;      /* Main background */
}
```

Change these values to update the entire color scheme instantly.

### Adding More Sections

The codebase uses a consistent component system:

```html
<section id="new-section" class="section">
  <div class="container">
    <div class="section-header" data-aos="fade-up">
      <span class="section-tag">Tag Text</span>
      <h2 class="section-title">Title <span>Highlighted</span></h2>
      <div class="gradient-divider"></div>
    </div>
    <!-- Your content here -->
  </div>
</section>
```

## 🌐 Deployment

### GitHub Pages

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/mt-abdulla-it/portfolio.git
git push -u origin main

# Then in GitHub repo Settings → Pages → Source: main branch
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (from project folder)
vercel

# Or connect your GitHub repo at vercel.com → Import Project
```

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your project folder
4. Done!

## 📦 Dependencies (CDN — no install required)

| Library | Version | Purpose |
|---------|---------|---------|
| [AOS](https://michalsnik.github.io/aos/) | 2.3.4 | Scroll animations |
| [Font Awesome](https://fontawesome.com/) | 6.5.0 | Icons |
| [Google Fonts](https://fonts.google.com/) | — | Inter, Space Grotesk, JetBrains Mono |

All loaded via CDN — no `npm install` or build step required.

## ♿ Accessibility

- Semantic HTML5 elements throughout
- ARIA labels and roles on interactive elements
- Keyboard navigable (Tab, Enter, Escape)
- Visible focus indicators
- `aria-live` regions for dynamic content
- `prefers-reduced-motion` support
- Sufficient color contrast ratios
- Descriptive `alt` text on all images

## 🔍 SEO

- Descriptive `<title>` tag
- Meta description and keywords
- Open Graph and Twitter Card meta tags
- Canonical URL
- Semantic heading hierarchy (one `<h1>` per page)
- Fast loading (CDN assets, lazy image loading)

## 📧 Contact Form

The form uses **client-side validation** and opens the user's default email client via `mailto:` on submission. No backend or API key is required.

To use a form service instead (optional):
- [Formspree](https://formspree.io) — replace the `mailto:` logic in `script.js` with a `fetch()` POST
- [EmailJS](https://www.emailjs.com) — add their SDK and configure

## 📄 License

This portfolio is personal and not open-source. All rights reserved to Abdulla Thaslim.

---

**Built with passion using HTML5, CSS3, and JavaScript. Designed for maximum visual impact and performance.**