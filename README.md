# HerbalHub 🌿

Premium Ayurvedic & Medical Store — full-stack web application.

- **Frontend:** React.js + Tailwind CSS + Framer Motion (Vite)
- **Backend:** Python Flask (REST API)
- **Database:** MongoDB
- **Location:** Sonia Vihar, Delhi · Home delivery available

---

## 1. Folder Structure

```
herbalhub/
├── backend/
│   ├── app.py                 # Flask app entry point
│   ├── config.py              # Environment-based config
│   ├── requirements.txt
│   ├── .env.example
│   ├── seed_data.py           # Populates MongoDB with categories/products/admin
│   ├── models/
│   │   └── schemas.py         # Reference data shapes (Mongo is schema-less)
│   ├── routes/
│   │   ├── auth.py            # Register/login/me/address
│   │   ├── products.py        # Product CRUD + search/filter
│   │   ├── categories.py      # Category CRUD
│   │   ├── orders.py          # Order placement, history, tracking, admin status
│   │   ├── ai_assistant.py    # Rule-based AI Health Assistant (safety guardrails)
│   │   ├── admin.py           # Admin stats + customer management
│   │   └── contact.py         # Contact form submissions
│   └── utils/
│       ├── db.py              # MongoDB connection & collections
│       └── auth_utils.py      # JWT + bcrypt helpers, decorators
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    ├── postcss.config.js
    └── src/
        ├── main.jsx / App.jsx
        ├── index.css           # Design system (deep green / cream / gold)
        ├── api/                # Axios client + service functions
        ├── context/            # AuthContext, CartContext
        ├── components/         # Navbar, Footer, ProductCard, etc.
        └── pages/              # Home, Shop, ProductDetail, Cart, Checkout,
                                 # Orders, AIAssistant, About, Contact, Login,
                                 # Register, Admin/* (Dashboard, Products,
                                 # Categories, Orders, Customers)
```

---

## 2. Prerequisites

Install these before you start:

| Tool | Version | Check with |
|---|---|---|
| Node.js | 18+ | `node -v` |
| Python | 3.10+ | `python3 --version` |
| MongoDB | 6+ (local or Atlas) | `mongod --version` |
| Git (optional) | any | `git --version` |

---

## 3. Backend Setup (Flask + MongoDB)

```bash
cd backend

# 1. Create a virtual environment
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment variables
cp .env.example .env
# Edit .env: set MONGO_URI (local Mongo or MongoDB Atlas connection string),
# and a strong random JWT_SECRET.

# 4. Make sure MongoDB is running
#    Local:  mongod --dbpath /path/to/data
#    Atlas:  just make sure MONGO_URI points to your cluster

# 5. Seed the database with categories, sample products, and an admin user
python seed_data.py
#   -> creates admin login: admin@herbalhub.com / Admin@123

# 6. Run the API server
python app.py
#   -> API runs at http://localhost:5000
#   -> Health check: http://localhost:5000/api/health
```

### Key Backend Environment Variables (`.env`)

```
MONGO_URI=mongodb://localhost:27017/herbalhub
JWT_SECRET=replace-with-a-long-random-string
ADMIN_SIGNUP_KEY=herbalhub-admin-2024   # used to register as admin via API
CORS_ORIGIN=http://localhost:5173
```

---

## 4. Frontend Setup (React + Tailwind + Vite)

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
#   -> Frontend runs at http://localhost:5173
#   -> API calls to /api/* are proxied to http://localhost:5000 (see vite.config.js)

# 3. Build for production
npm run build
npm run preview     # preview the production build locally
```

The frontend expects the backend running on **port 5000**. If you change
the backend port, update the proxy target in `vite.config.js`.

---

## 5. Running Both Together

Open two terminals:

```bash
# Terminal 1
cd backend && source venv/bin/activate && python app.py

# Terminal 2
cd frontend && npm run dev
```

Visit **http://localhost:5173** in your browser.

---

## 6. VS Code Setup Guide

1. Open the `herbalhub` folder in VS Code (`File > Open Folder`).
2. Install these recommended extensions:
   - **Python** (Microsoft) — backend IntelliSense & debugging
   - **Pylance** — Python type checking
   - **ES7+ React/Redux/React-Native snippets**
   - **Tailwind CSS IntelliSense**
   - **Prettier - Code formatter**
   - **MongoDB for VS Code** (optional, to browse your database visually)
3. Select the Python interpreter: `Cmd/Ctrl + Shift + P` → "Python: Select
   Interpreter" → choose `backend/venv/bin/python`.
4. Open two integrated terminals (`Terminal > Split Terminal`) — one for
   `backend`, one for `frontend` — and run the dev servers as shown above.
5. (Optional) Add a `.vscode/launch.json` in `backend/` to debug Flask:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Flask: app.py",
         "type": "debugpy",
         "request": "launch",
         "program": "${workspaceFolder}/app.py",
         "console": "integratedTerminal",
         "justMyCode": true
       }
     ]
   }
   ```

---

## 7. Default Accounts (after running `seed_data.py`)

| Role | Email | Password |
|---|---|---|
| Admin | admin@herbalhub.com | Admin@123 |

Register a new customer account from the **Register** page in the app.
To register an additional admin via the API, pass `admin_key:
"herbalhub-admin-2024"` (or your custom `ADMIN_SIGNUP_KEY`) in the
`/api/auth/register` request body.

---

## 8. Core API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/products` | List/search/filter products |
| GET | `/api/products/:id` | Single product |
| POST/PUT/DELETE | `/api/products` | Admin-only product management |
| GET | `/api/categories` | List categories |
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| POST | `/api/orders` | Place an order (auth required) |
| GET | `/api/orders/my` | Customer's order history |
| GET/PUT | `/api/admin/orders` | Admin order management |
| GET/DELETE | `/api/admin/customers` | Admin customer management |
| GET | `/api/admin/stats` | Dashboard stats |
| POST | `/api/ai/chat` | AI Health Assistant chat |
| POST | `/api/contact` | Contact form submission |

---

## 9. Production Notes

- **Payments:** UPI / Card / Net Banking are wired up as selectable
  methods in checkout with a clear structure to plug in a real gateway
  (e.g. Razorpay, Cashfree, PayU). Replace the placeholder logic in
  `Checkout.jsx` and `routes/orders.py` with real gateway SDK calls and
  webhook handling for `payment_status` updates.
- **WhatsApp button:** update the phone number in
  `frontend/src/components/WhatsAppButton.jsx`.
- **Google Maps:** replace the placeholder in `Contact.jsx` with a real
  `<iframe>` embed for your store location.
- **Images:** sample product/category images use Unsplash placeholder
  URLs — replace with your real product photography before launch.
- **AI Assistant:** currently rule-based for predictable, safe behaviour
  (no diagnosis/prescription). To upgrade to an LLM-backed assistant,
  keep the same safety system instructions and swap `generate_reply()`
  in `routes/ai_assistant.py` for an API call, preserving the emergency
  and diagnostic guardrails.
- **Secrets:** never commit `.env` — only `.env.example` is tracked.
- **CORS:** set `CORS_ORIGIN` to your real frontend domain in production.
