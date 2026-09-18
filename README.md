# Mini CRM — MERN Fullstack Project

A fullstack **Mini CRM (Customer Relationship Management)** web app to manage sales leads.
Users can **register / login**, **add leads**, **view / search / filter leads**, **update lead status**, **delete leads**, and see **dashboard stats & charts**.

Built with the **MERN stack**: MongoDB + Express + React + Node.js.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [API Reference](#api-reference)
- [Database Models](#database-models)
- [Prerequisites](#prerequisites)
- [Setup — Local Development](#setup--local-development)
- [Environment Variables](#environment-variables)
- [Run Commands](#run-commands)
- [Build & Deployment](#build--deployment)
- [Usage Guide](#usage-guide)
- [Validation Rules](#validation-rules)
- [Troubleshooting](#troubleshooting)
- [Scripts Reference](#scripts-reference)
- [Future Improvements](#future-improvements)

---

## Features

### Auth
- User registration with validation (name, email, strong password)
- User login with bcrypt password compare
- JWT auth stored in `httpOnly` cookie (`token`, 2-day expiry)
- Auto session restore via `GET /api/auth/profile`
- Logout (clears cookie)
- Protected frontend routes (`ProtectedRoute`)

### Leads (CRM core)
- Create lead: name, phone, email, company, leadSource, status, notes
- List all leads of logged-in user (newest first)
- Get single lead by ID
- Update lead (partial PATCH, only changed fields)
- Delete lead
- Ownership enforced: every lead has `userid`, all queries filter by `req.user.id`
- Frontend extras: search, filter by status/source, table + card views, dashboard charts (Recharts)

### Dashboard
- `/dashboard` → stats overview (`LeadStats` — counts/charts)
- `/dashboard/leads` → leads table
- `/dashboard/addleads` → add lead form
- `/dashboard/leads/edit/:id` → edit lead form
- Sidebar + Header layout

---

## Tech Stack

### Backend (`/backend`)
| Package | Used for |
|---|---|
| `express@5` | REST API server |
| `mongoose@9` | MongoDB ODM (User, Lead models) |
| `jsonwebtoken` | JWT sign/verify (`generateToken.js`) |
| `bcrypt` / `bcryptjs` | Password hashing (salt 10) + compare |
| `cookie-parser` | Read `token` cookie in `auth.middleware.js` |
| `cors` | Allow `CLIENT_URL` with `credentials: true` |
| `dotenv` | Load `.env` |
| `helmet` | Security headers (installed) |
| `morgan` | Dev request logger |
| `express-validator`, `validator` | Email + strong-password validation |
| `nodemon` | Auto-reload in dev |

### Frontend (`/frontend`)
| Package | Used for |
|---|---|
| `react@19`, `react-dom` | UI |
| `vite@8` | Dev server + build |
| `react-router-dom@7` | Routing (`Router/router.jsx`, `ProtectedRoute.jsx`) |
| `axios` | API calls, `withCredentials: true` |
| `tailwindcss@4` + `@tailwindcss/vite` | Styling |
| `recharts` | Dashboard charts |
| `lucide-react`, `lucide`, `react-icons` | Icons |
| `react-hot-toast` | Toast notifications |
| `lenis` | Smooth scrolling |

### Database / Hosting
- MongoDB Atlas (`MONGO_URI`)
- Frontend ready for Vercel (`vercel.json` rewrites SPA → `/`)
- Backend runs on Node (port 3000)

---

## Project Structure

```
CRM/
├── README.md                  <- this file
├── backend/
│   ├── server.js              <- Express entry: middleware, CORS, routes, listen
│   ├── package.json           <- scripts: dev (nodemon), start (node)
│   ├── .env                   <- PORT, MONGO_URI, JWT_SECRET, CLIENT_URL
│   └── src/
│       ├── config/db/db.js    <- mongoose.connect(MONGO_URI)
│       ├── models/
│       │   ├── user.model.js  <- User { name, email, password, role }
│       │   └── lead.model.js  <- Lead { userid, name, phone, email, company,
│       │                            leadSource, status, notes, timestamps }
│       ├── controllers/
│       │   ├── auth.controllers.js  <- userRegister, userLogin, userProfile, userLogout
│       │   └── lead.controllers.js  <- addLeads, leads, singleByIdLeads,
│       │                               updateLeads, deleteLeads
│       ├── routes/
│       │   ├── auth.route.js  <- POST /register, POST /login,
│       │   │                     GET /profile, POST /logout
│       │   └── lead.route.js  <- POST /, GET /, GET /:id, PATCH /:id, DELETE /:id
│       ├── middleware/
│       │   └── auth.middleware.js   <- verify cookie token → req.user
│       └── utils/
│           └── generateToken.js     <- jwt.sign({id, role}, JWT_SECRET, 2d)
└── frontend/
    ├── package.json           <- scripts: dev, build, preview, lint
    ├── vite.config.js         <- react + tailwindcss plugins
    ├── vercel.json            <- SPA rewrite
    ├── index.html
    ├── .env                   <- VITE_BACKEND_URL=http://localhost:3000/api
    └── src/
        ├── main.jsx           <- AuthConextProvider > LeadContextProvider > Router
        ├── Router/
        │   ├── router.jsx         <- /, /login, /dashboard (+ children)
        │   └── ProtectedRoute.jsx <- redirects to /login if no user
        ├── context/
        │   ├── AuthContext.jsx    <- registerUser, LoginUser, userProfile, LogOutuser
        │   └── LeadsContext.jsx   <- addLeads, fetchLeads, updateLeads,
        │                             deleteLeads, singleByIdLeads (+ useLeads hook)
        ├── layout/            <- DashboardLayout, Header, Sidebar
        ├── components/        <- Navbar, UserMenu, InputField, ErrorMessage, Loader
        ├── leads/             <- LeadCard, LeadTable, LeadForm, LeadFilter, LeadSearch
        ├── pages/
        │   ├── auth/          <- Login.jsx, Register.jsx
        │   └── Dashboard/     <- Dashbord.jsx + components/
        │                         (LeadStats, LeadsTable, UpdateLeads)
        ├── hooks/useAuth.jsx
        └── data/sidebardata.js
```

---

## How It Works

1. **Register** → `POST /api/auth/register` → backend validates → bcrypt hash → `User.create` → JWT signed → set `token` cookie → frontend stores user in `AuthContext`.
2. **Login** → `POST /api/auth/login` → find user → bcrypt compare → new JWT cookie.
3. **Persist session** → on app load `AuthContext.userProfile()` calls `GET /api/auth/profile` (cookie sent via `withCredentials`). If valid, user stays logged in; `ProtectedRoute` allows `/dashboard`.
4. **Leads CRUD** → all `/api/leads` routes use `authMiddleWare` which reads `req.cookies.token`, verifies with `JWT_SECRET`, sets `req.user = { id, role }`. Controllers scope every query to `{ userid: req.user.id }` so users only see their own leads.
5. **Frontend state** → `LeadsContext` holds `leads[]`, calls axios (`VITE_BACKEND_URL`), updates local state optimistically on add/update/delete.

---

## API Reference

Base URL (dev): `http://localhost:3000/api`

### Auth — `/api/auth`

| Method | Endpoint | Auth | Body | Success |
|---|---|---|---|---|
| POST | `/register` | No | `{ name, email, password }` | 200 `{ success, message, data: user, token }` + cookie |
| POST | `/login` | No | `{ email, password }` | 200 `{ success, message, data: user, token }` + cookie |
| GET | `/profile` | Yes (cookie) | — | 201 `{ message, data: user }` |
| POST | `/logout` | Yes (cookie) | — | 200 `{ success, message }` (clears cookie) |

> Note: current `auth.route.js` wires `POST /logout` to `userProfile` instead of `userLogout`. Fix: import `userLogout` and use it — see Troubleshooting.

### Leads — `/api/leads` (all require cookie auth)

| Method | Endpoint | Body / Notes | Success |
|---|---|---|---|
| POST | `/` | `{ name*, phone*, leadSource*, email?, company?, status?, notes? }` | 201 new lead |
| GET | `/` | List own leads, sorted newest first | 200 `{ data: [...] }` |
| GET | `/:id` | Single lead | 200 `{ data: lead }` |
| PATCH | `/:id` | Partial: any of `name, phone, email, company, leadSource, status, notes` | 200 updated lead |
| DELETE | `/:id` | — | 200 deleted message |

Error shapes: `400` validation, `401` unauthorized (no token), `404` not found / invalid id (`CastError` → 400).

---

## Database Models

### User (`backend/src/models/user.model.js`)
```js
{
  name: String (required, trim),
  email: String (required, unique, lowercase, trim),
  password: String (required, hashed),
  role: String (enum: ["admin"], default: "admin"),
  timestamps: createdAt, updatedAt
}
```

### Lead (`backend/src/models/lead.model.js`)
```js
{
  userid: ObjectId → User (required),
  name: String (required),
  phone: String (required),        // validated: /^[6-9]\d{9}$/ (10-digit IN format)
  email: String (optional, lowercase),
  company: String (optional),
  leadSource: String (required, enum: facebook, google, website, whatsApp, referral, other),
  status: String (enum: new, contacted, interested, won, converted, lost; default: new),
  notes: String (optional),
  timestamps: createdAt, updatedAt
}
```

---

## Prerequisites

- **Node.js** 20+ and npm (`node -v`, `npm -v`)
- **MongoDB** — Atlas cluster (connection string) or local `mongod`
- **Git** (optional, for cloning)

---

## Setup — Local Development

### 1. Clone / open the project
```bash
git clone <your-repo-url>
cd CRM
```

### 2. Backend setup
```bash
cd backend
npm install
# create/edit .env (see table below)
npm run dev    # nodemon server.js → http://localhost:3000
```

### 3. Frontend setup (new terminal)
```bash
cd frontend
npm install
# create/edit .env (see table below)
npm run dev    # vite → http://localhost:5173
```

### 4. Verify
- Backend health: open `http://localhost:3000/` → `Bakend server is running`
- Frontend: open `http://localhost:5173/` → Register page
- Register a user → you land on `/dashboard`
- Add a lead via `Dashboard → Add Leads` → check `Leads` table + MongoDB `leads` collection

---

## Environment Variables

### `backend/.env`
| Key | Example | Description |
|---|---|---|
| `PORT` | `3000` | Express listen port |
| `MONGO_URI` | `mongodb+srv://<user>:<pass>@crm.xxxxx.mongodb.net/mini-crm` | MongoDB connection string |
| `JWT_SECRET` | `<long random string>` | Secret for signing JWTs — **never commit real value** |
| `CLIENT_URL` | `http://localhost:5173` | Allowed CORS origin (frontend URL) |
| `NODE_ENV` | `development` | `development` / `production` |

### `frontend/.env`
| Key | Example | Description |
|---|---|---|
| `VITE_BACKEND_URL` | `http://localhost:3000/api` | Backend API base used by axios in contexts |

> Production: set backend `CLIENT_URL` to your deployed frontend URL (e.g. `https://your-app.vercel.app`) and frontend `VITE_BACKEND_URL` to deployed backend URL (e.g. `https://your-api.onrender.com/api`), with cookie `secure/sameSite` adjustments (see Troubleshooting).

---

## Run Commands

### Backend (`cd backend`)
```bash
npm run dev    # dev with nodemon (auto-reload)
npm start      # production: node server.js
```

### Frontend (`cd frontend`)
```bash
npm run dev      # vite dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
npm run lint     # eslint check
```

### Quick test with curl (after `npm run dev` on backend)
```bash
# register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@mail.com\",\"password\":\"Test@1234\"}" -c cookies.txt

# list leads (uses saved cookie)
curl http://localhost:3000/api/leads -b cookies.txt

# add lead
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" -b cookies.txt \
  -d "{\"name\":\"Rahul Sharma\",\"phone\":\"9876543210\",\"leadSource\":\"website\",\"company\":\"Acme\"}"
```

---

## Build & Deployment

### Frontend (Vercel — already configured)
- `vercel.json` rewrites all routes to `/` for React Router SPA support.
- Steps: import `frontend/` as project in Vercel → set env `VITE_BACKEND_URL=<deployed backend>/api` → deploy.
- Or manually:
```bash
cd frontend
npm run build   # outputs dist/
```

### Backend (Render / Railway / VPS)
- Set env vars: `PORT`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL=<vercel frontend url>`, `NODE_ENV=production`.
- Start command: `npm start` (runs `node server.js`).
- Ensure MongoDB Atlas allows the host IP (or `0.0.0.0/0` for dev).
- For cross-site cookies in production, update cookie options to `secure: true, sameSite: "none"` and CORS `origin` to the exact frontend URL.

---

## Usage Guide

1. Open frontend → **Register** (`/`) with name (min 4 chars), valid email, strong password.
2. **Login** (`/login`) if you already have an account.
3. **Dashboard** (`/dashboard`) shows lead stats/charts.
4. **Add Leads** (`/dashboard/addleads`): fill name + 10-digit phone + source (required), optional email/company/status/notes → submit.
5. **Leads** (`/dashboard/leads`): search, filter, view table/cards.
6. **Edit** (`/dashboard/leads/edit/:id`): update any field or status (`new → contacted → interested → won/converted/lost`).
7. **Delete** a lead from the table/card.
8. **Logout** from header/user menu (clears cookie + context).

---

## Validation Rules

- **Name**: required, `> 3` characters (both User and Lead).
- **Email**: must pass `validator.isEmail`.
- **Password** (register): strong — min 8 chars, ≥1 lowercase, ≥1 uppercase, ≥1 number, ≥1 symbol. Example: `Test@1234`.
- **Phone** (lead): must match `/^[6-9]\d{9}$/` — 10 digits starting 6–9.
- **leadSource**: one of `facebook, google, website, whatsApp, referral, other` (case-sensitive).
- **status**: one of `new, contacted, interested, won, converted, lost` (defaults `new`).

---

## Troubleshooting

| Problem | Cause / Fix |
|---|---|
| `CORS error` / cookie not sent | Backend `CLIENT_URL` must exactly match frontend origin; frontend axios uses `withCredentials: true` (already set). In production use exact HTTPS URL. |
| `401 unauthorized User` | No/expired `token` cookie → login again. Check cookie `maxAge`/JWT `expiresIn: 2d`. |
| `please add mongo url` / `Data not connected` | `MONGO_URI` missing or wrong; check Atlas user/pass, IP whitelist, DB name `mini-crm`. |
| `Logout doesn't work` | Known bug: `auth.route.js` maps `POST /logout` to `userProfile` instead of `userLogout`. Fix: `const { userRegister, userLogin, userProfile, userLogout } = require(...); router.post("/logout", authMiddleWare, userLogout)`. |
| `Port already in use` | Another process on 3000/5173 → kill it or change `PORT` / run `vite --port 5174`. |
| `Vite build fails` | `npm install` first; Node 20+ required (`vercel.json` pins Node 20). |
| `Leads empty after login` | Leads are per-user (`userid`); registering a new account starts empty — expected. |
| `Invalid lead id` | Malformed Mongo ObjectId in URL → check `:id` param. |
| Cookie not persisting cross-site (prod) | Change cookie to `secure: true, sameSite: "none"` and serve both sides over HTTPS. |

---

## Scripts Reference

`backend/package.json`:
```json
{ "scripts": { "dev": "nodemon server.js", "start": "node server.js" } }
```

`frontend/package.json`:
```json
{ "scripts": { "dev": "vite", "build": "vite build", "preview": "vite preview", "lint": "eslint ." } }
```

---

## Future Improvements

- [ ] Fix `/logout` route → `userLogout`
- [ ] Add `helmet()` + rate limiting + proper `secure/sameSite` cookie handling per env
- [ ] Pagination / server-side search & filter for leads
- [ ] Lead assignment, follow-up dates, activity timeline
- [ ] Role-based access (`admin` vs `agent`)
- [ ] Unit/integration tests (Jest/Vitest + Supertest)

---

> Default local URLs: frontend `http://localhost:5173` · backend `http://localhost:3000` · API `http://localhost:3000/api`
