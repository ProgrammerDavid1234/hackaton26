# hackaton26

A 2-hour hackathon project built with React and Supabase.

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Supabase (Postgres database, Auth, Storage)

## Project Structure

```
hackaton26/
├── frontend/                    # React app — all UI code lives here
│   ├── src/
│   │   ├── assets/              # Images, icons
│   │   ├── components/          # Reusable UI components (buttons, cards, forms)
│   │   ├── pages/               # Full page components (Home, Login, Dashboard)
│   │   ├── lib/
│   │   │   └── supabase.js      # Supabase client
│   │   ├── App.jsx              # Main component (routing)
│   │   ├── App.css              # Main styles
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── public/                  # Static files
│   ├── index.html               # HTML shell
│   ├── package.json             # Dependencies
│   ├── vite.config.js           # Vite config
│   └── .env.local               # Supabase keys (NOT committed)
│
├── supabase/                    # Database setup
│   ├── migrations/              # SQL schema files
│   ├── seed/                    # Dummy data for testing
│   └── README.md                # Supabase setup notes
│
├── .env.example                 # Lists which env vars are needed
├── .gitignore                   # Files Git should never push
└── README.md                    # This file
```

## What Goes Where

| Building... | Goes in... |
|---|---|
| A button, card, or navbar | `frontend/src/components/` |
| A full screen (Home, Login, Dashboard) | `frontend/src/pages/` |
| Code that fetches or saves data | Import from `frontend/src/lib/supabase.js` |
| A new database table | Write SQL in `supabase/migrations/` and run it in the Supabase dashboard |

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/ProgrammerDavid1234/hackaton26.git
cd hackaton26
```

### 2. Get the Supabase keys from Abdulsalam

### 3. Create `frontend/.env.local` with these values

```env
VITE_SUPABASE_URL=your-url-here
VITE_SUPABASE_ANON_KEY=your-key-here
```

### 4. Install and run

```bash
cd frontend
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

## Using Supabase

```javascript
import { supabase } from './lib/supabase'

// Fetch
const { data, error } = await supabase
  .from('students')
  .select('*')

// Insert
const { error } = await supabase
  .from('students')
  .insert({ name: 'David', email: 'd@example.com' })
```

## Git Workflow

**Never push directly to `main`.** Always branch:

```bash
git checkout dev
git pull
git checkout -b feature/your-thing

# do your work, then:
git add .
git commit -m "feat: what you added"
git push -u origin feature/your-thing
```

Then open a Pull Request on GitHub from your branch into `dev`.

### Branches

- **`main`** — always works, used for the demo
- **`dev`** — where everyone's work merges first
- **`feature/*`** — your individual tasks

## Team

| Name | Role |
|---|---|
| Samuel | Frontend |
| Seun | Frontend |
| Abdulsalam | Supabase / Frontend |

Everyone codes frontend. Abdulsalam owns the Supabase setup.