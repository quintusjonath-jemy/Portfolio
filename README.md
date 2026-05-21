# Jonath — Portfolio Website

A professional, animated portfolio for a **Frontend / Backend / Full Stack Developer & ML Researcher**, built with **vanilla HTML, Tailwind CSS (CDN), and JavaScript** — featuring 3D animated backgrounds, scroll animations, and an interactive, modern design.

> **Note on the stack:** the user originally asked for React + Tailwind + Framer Motion. Because this environment serves **static HTML/CSS/JS only** (no Node build step), the same look-and-feel was achieved using:
> - **Tailwind CSS via CDN** (identical utility-first styling)
> - **GSAP + AOS** (equivalent to Framer Motion for scroll/entry animations)
> - **Three.js + Vanta.js** (true WebGL 3D animated background)
> - **Vanilla JS** (no JSX needed)

---

## ✨ Currently Completed Features

### 🎨 Visual & Animation
- **3D animated WebGL background** (Vanta.NET / Three.js) with mouse interaction
- **Custom animated cursor** (dot + ring with smooth easing & hover states)
- **Animated page loader** with progress bar
- **Typing effect** in hero cycling through roles
- **3D tilt effect** on hero card (mouse-tracked perspective)
- **Floating icon badges** around hero card
- **Gradient text & glassmorphism cards** throughout
- **Scroll-triggered fade/slide animations** on every section (AOS + GSAP)
- **Animated counters** (years, projects, papers, citations)
- **Animated skill progress bars** that fill on scroll
- **Spotlight hover effect** on skill cards (radial gradient follows cursor)

### 📑 Sections
1. **Hero** — name, animated role typing, status badge, CTAs, social links, 3D tilt card with stats
2. **About** — bio, info cards (education, role, location, languages), animated TypeScript code block
3. **Skills** — 4 expertise cards (Frontend / Backend / DevOps / ML) + animated skill bars
4. **Projects** — 6 case studies with category filters (All / Frontend / Backend / Full Stack / ML)
5. **Research** — vertical timeline of 4 publications with venues, links + research stats
6. **Contact** — info cards + contact form (persists messages via Table API) + footer

### 🧭 Navigation
- Fixed translucent navbar with blur on scroll
- Active section highlighting on scroll
- Smooth in-page scrolling
- Fully responsive mobile menu

### 💾 Data
- Contact form submissions persisted to `messages` table via REST API
- Graceful fallback if API isn't reachable

---

## 🗂 Project Structure

```
/
├── index.html          # All page sections in a single file
├── css/
│   └── style.css       # Custom styles (cursor, cards, animations, etc.)
├── js/
│   └── main.js         # All interactivity (loader, cursor, typing, filters, etc.)
└── README.md
```

---

## 🔗 Functional Entry Points

| Path                  | Description                                    |
| --------------------- | ---------------------------------------------- |
| `/index.html` (or `/`) | Main single-page portfolio                    |
| `#home`               | Hero section                                   |
| `#about`              | About / bio section                            |
| `#skills`             | Skills & expertise                             |
| `#projects`           | Project showcase (filterable)                  |
| `#research`           | Publications timeline                          |
| `#contact`            | Contact form & info                            |

### REST API (used by contact form)
| Method | Endpoint            | Purpose                          |
| ------ | ------------------- | -------------------------------- |
| POST   | `/tables/messages`  | Save new contact form submission |
| GET    | `/tables/messages`  | (admin) List submitted messages  |

---

## 🗃 Data Models

### `messages` table
| Field         | Type      | Description                  |
| ------------- | --------- | ---------------------------- |
| `id`          | text      | Auto-generated UUID          |
| `name`        | text      | Sender name                  |
| `email`       | text      | Sender email                 |
| `message`     | rich_text | Body of the message          |
| `received_at` | number    | Unix timestamp (ms)          |

---

## 🚀 Tech Stack & Libraries (all via CDN)

- **Tailwind CSS** — utility-first styling
- **Google Fonts** (Inter + JetBrains Mono) — typography
- **Font Awesome 6** — icons
- **Three.js + Vanta.js** — 3D animated background
- **GSAP + ScrollTrigger** — advanced scroll animations
- **AOS** — animate-on-scroll entry animations

---

## 🛠 Not Yet Implemented / Recommended Next Steps

1. **Replace placeholder content** — swap mock name "Jonath Carter", emails, social links, project titles, and publication info with the real owner's details.
2. **Real project screenshots** — replace the gradient icon placeholders with actual project images or short MP4 demo clips.
3. **Resume PDF** — wire the "PDF" social-icon button to a real downloadable resume in `assets/`.
4. **Blog / Writing section** — add an optional `#blog` section listing technical articles (could be backed by a `posts` table).
5. **Dark / Light mode toggle** — currently dark-only; a light theme variant would broaden appeal.
6. **i18n** — add EN / FR / ES language switching since the bio mentions trilingual skill.
7. **SEO & social meta** — add Open Graph + Twitter Card meta tags and a `/sitemap.xml`.
8. **Analytics** — drop in Plausible or umami for visit analytics.
9. **Admin viewer** — small private page to read submitted `messages` (would only be appropriate behind auth on a real backend).

---

## 🚢 Deploying

To publish this site live, please use the **Publish tab** in your project — it handles one-click deployment automatically and gives you a public URL.
