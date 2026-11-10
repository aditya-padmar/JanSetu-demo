# Jan Setu (ಜನ ಸೇತು) — Unified Civic & Government Services Gateway Demo

**Repository:** [https://github.com/aditya-padmar/JanSetu-demo](https://github.com/aditya-padmar/JanSetu-demo)

**Jan Setu** is a responsive, accessible digital civic gateway demo designed to show how residents can find public services across multiple government departments, check their likely eligibility, generate a tailored document checklist, read or listen to guidance in **English** or **Kannada (`ಕನ್ನಡ`)**, report neighborhood issues, and follow request progress in one calm, easy-to-scan interface.

---

## Core Pillars

1. **Unified Service Access**
   - Brings citizen services from multiple departments into a single searchable gateway:
     - **Senior Citizen & Social Welfare** (*Seva Sindhu*)
     - **Revenue Department** (*Nadakacheri / Atalji Janasnehi*)
     - **Food & Civil Supplies** (*Ahara*)
     - **Urban Local Body / Municipal Services** (*BBMP / Janaspandana*)
     - **Water & Electricity Utilities** (*BWSSB / BESCOM*)
   - Filterable by government department, service topic, or keyword search.

2. **Document & Eligibility Help**
   - Interactive **Service Eligibility & Guidance Wizard** where residents choose a government service and answer 2–3 quick questions (e.g., age group, Karnataka residency proof, existing RD certificate number, household income source, or BPL/APL ration card type).
   - Dynamically evaluates **likely eligibility** and builds a **tailored document checklist** with interactive checkboxes so applicants can mark documents ready before applying.
   - Provides numbered, step-by-step application instructions and direct links to official portals (*Seva Sindhu*, *Nadakacheri*, *Ahara*, *Sakala*, *Janaspandana*, *BBMP*).

3. **Multilingual & Voice Access (`English` & `ಕನ್ನಡ`)**
   - Seamless language toggle between **English** and **Kannada (`ಕನ್ನಡ`)** across the experience.
   - **Voice Read-Aloud (Text-to-Speech):** Residents can listen to eligibility guidance, required documents, application steps, and grievance status timelines read aloud in English or Kannada.
   - **Voice Input (Speech-to-Text):** Supports voice search on the services directory and voice dictation on the grievance reporting form.

4. **Grievance Filing & Status Tracking**
   - **Report an Issue:** Accessible form with required-field validation, quick-pick locality buttons, voice dictation input, a 1-click *"Fill sample report"* shortcut for live presentations, optional local photo selection, and clearly labelled demo contact fields.
   - **Track a Request:** Generates a sample tracking ID upon submission and displays a 3-stage status timeline (**Received → Under review → Resolved**) with department routing details and an interactive stage switcher for evaluators.

---

## Demo Walkthrough (2-Minute Presentation Flow)

1. **Home Page:** Review Jan Setu’s purpose, toggle between **English** and **ಕನ್ನಡ**, or click **Listen (Voice)** to hear an audio introduction.
2. **Services & Eligibility Wizard:**
   - Open **Services** and select a government service (e.g., *Senior Citizen Identity Card*, *Income & Caste Certificate*, or *Ration Card Member Addition*).
   - Change the answers to the interactive questions to see how the **Eligibility Guidance** and **Tailored Document Checklist** update in real time.
   - Switch between **English** and **ಕನ್ನಡ (Kannada)** or click **Listen to guidance (Voice)**.
   - Review the step-by-step instructions and official portal links.
3. **Report an Issue (Grievance):**
   - Open **Report an issue**, choose a category, pick a locality, and type or dictate a description using **Voice Input** (or click **Fill sample report**).
   - Submit the form to receive a confirmation screen with a generated sample tracking ID (e.g., `JS-2026-4412`).
4. **Track a Request:**
   - Click **Track this request** (or inspect pre-loaded sample IDs `JS-2026-4082`, `JS-2026-3915`, `JS-2026-4109`, or `JS-2026-3840`).
   - View the 3-stage progress timeline (**Received → Under review → Resolved**) and use the **Interactive Demo Control** to preview how status stages update.

---

## Visual Direction & Color Palette

Designed with a warm, approachable civic-service aesthetic that avoids dense dashboards and bureaucratic clutter:

| Role | Color | Hex |
| :--- | :--- | :--- |
| Main Page Background | Warm Beige | `#F4EFE4` |
| Card & Content Surface | Warm White | `#FFFDF8` |
| Header, Headings & Primary Nav | Cobalt Blue | `#1647A5` |
| Primary Body Text | Deep Blue | `#18324A` |
| Primary Call-to-Action Accent | Sun Yellow | `#F6C744` |
| Secondary / Muted Text | Slate Muted | `#687783` |
| Resolved / Success Status | Forest Green | `#38785E` |

- **Typography:** `Plus Jakarta Sans` (Display & Headings), `Public Sans` & `Noto Sans Kannada` (Body Copy), and `JetBrains Mono` (Tabular Reference IDs & Timestamps).

---

## Tech Stack & Project Structure

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Speech & Accessibility:** Web Speech API (`speechSynthesis` & `SpeechRecognition` with automatic demo fallbacks), semantic HTML landmarks, keyboard focus rings, and ARIA live regions.

```text
├── index.html                        # HTML entry point & font imports
├── metadata.json                     # Application metadata
├── package.json                      # Dependencies & scripts
├── src/
│   ├── App.tsx                       # Root application state & navigation
│   ├── index.css                     # Civic color palette & typography rules
│   ├── main.tsx                      # React DOM entry point
│   ├── components/
│   │   ├── Navbar.tsx                # Responsive top navigation bar
│   │   ├── HomeView.tsx              # Home page, 4 core pillars & quick links
│   │   ├── ServicesView.tsx          # Unified department directory & voice search
│   │   ├── ServiceGuidanceWizard.tsx # Eligibility check, tailored checklist & steps
│   │   ├── ReportIssueView.tsx       # Accessible grievance form with voice input
│   │   ├── TrackRequestView.tsx      # Request ID lookup & 3-stage status timeline
│   │   └── HelpView.tsx              # Evaluator walkthrough, FAQ & sample contacts
│   ├── data/
│   │   ├── demoData.ts               # Sample civic services & pre-loaded requests
│   │   └── guidedServicesData.ts     # Bilingual (EN/KN) eligibility & checklist data
│   └── utils/
│       └── voiceAssistant.ts         # Text-to-speech & speech-to-text helper
└── vite.config.ts                    # Vite configuration
```

---

## Getting Started Locally

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm**

### Installation & Running

```bash
# 1. Clone the repository
git clone https://github.com/aditya-padmar/JanSetu-demo.git
cd JanSetu-demo

# 2. Install dependencies
npm install

# 3. Start the development server (runs on port 3000)
npm run dev
```

### Building for Production

```bash
# Type-check and build the production bundle
npm run lint
npm run build

# Preview the production build locally
npm run preview
```

---

## Demo Scope & Disclaimer

- **Sample Data Only:** All request records (`JS-2026-4082`, etc.), inspection notes, and helpline/contact details in this demo are fictional examples created to illustrate the product concept.
- **No External Data Storage:** Form submissions, optional photo selections, and contact fields operate strictly in local browser memory for the current session and are never transmitted to or stored on an external server.
- **Not a Live Government Portal:** While this demo provides reference links to official Karnataka portals (*Seva Sindhu*, *Nadakacheri*, *Ahara*, *Janaspandana*), submitting an issue or request inside this demo does not dispatch a real ticket to any municipal or government authority.
