# INFINITY // Premium Cyberpunk Technology Society

> **"BEYOND THE LIMITS."**  
> Official Technology Society of Sri Guru Gobind Singh College of Commerce (SGGSCC), University of Delhi.

---

## ⚡ Architecture & Tech Stack

This project has been modernized and structured with:
- **Core Framework:** React 18
- **Build Tool:** Vite 6
- **Language:** Modern JavaScript (ES Modules, JSX)
- **Styling & Design System:** Tailwind CSS v3 with PostCSS & Autoprefixer
- **Icons:** Lucide React

---

## 🎨 Visual Design System Tokens

Configured centrally in `tailwind.config.js`, `src/config/theme.js`, and `src/styles/index.css`:

| Token | Hex Value | Role & Usage |
| :--- | :--- | :--- |
| **Background** | `#070711` | Deep void foundation, canvas background, body color |
| **Neon Violet** | `#8B5CF6` | Quantum AI, ambient auroras, telemetry accents |
| **Cyber Cyan** | `#00E5FF` | High-voltage data lines, primary buttons, glyph glow |
| **Acid Green** | `#C6FF00` | Operational status indicators, terminal highlights, badges |

### Cyberpunk Visual Elements
- **Chamfered Geometries:** Custom `.clip-cyber-corner` and `.clip-cyber-badge` polygon cutouts
- **CRT / HUD Overlays:** Subtle grid matrix (`bg-cyber-grid`) with scanline illumination
- **Typography:** Orbitron (Headings), Rajdhani (Body & Subheadings), JetBrains Mono (Telemetry & Code)

---

## 📁 Component-Based Folder Structure

```
INFINITY/
├── public/                 # Static assets served at root
│   └── assets/images/      # Team portraits and cyberpunk wallpapers
├── src/
│   ├── components/
│   │   ├── common/         # Atomic cyberpunk UI primitives
│   │   │   ├── CyberButton.jsx   # Chamfered glowing buttons (variants: cyan, violet, acid)
│   │   │   ├── CyberBadge.jsx    # Pulsing status badges
│   │   │   └── CyberCard.jsx     # Futuristic panels with bracketed corners
│   │   ├── layout/         # Core layout shells
│   │   │   ├── Navbar.jsx        # Glassmorphism header with telemetry bar & mobile drawer
│   │   │   ├── Footer.jsx        # Society information, uplinks, and copyright
│   │   │   └── AmbientBackground.jsx # Cyber grid matrix with radial neon auroras
│   │   └── sections/       # Landing page page-level sections
│   │       ├── HeroSection.jsx   # Headline, tagline, stats HUD, primary CTAs
│   │       ├── SocietyPillars.jsx# Department cards (AI, Cyber Defense, Matrix, Esports)
│   │       └── ColorPaletteHUD.jsx # Interactive design token inspector & gradient bar
│   ├── config/
│   │   ├── constants.js    # Society facts, department data, and navigation links
│   │   └── theme.js        # Design system tokens (#070711, #8B5CF6, #00E5FF, #C6FF00)
│   ├── styles/
│   │   └── index.css       # Tailwind directives, custom clip-paths, text glows, scrollbars
│   ├── App.jsx             # Root landing page composition
│   └── main.jsx            # React root mount
├── _legacy_static/         # Archived static prototype files
├── index.html              # HTML5 entry with Google Fonts preloads
├── package.json            # Scripts & project dependencies
├── tailwind.config.js      # Custom theme colors, animations, and shadows
├── postcss.config.js       # PostCSS Tailwind + Autoprefixer configuration
└── vite.config.js          # Vite React plugin configuration
```

---

## 🚀 Running the Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates production-optimized output in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```
