# GRAMCREDIT - AI-Powered Microfinance Platform

**GRAMCREDIT** is a production-ready, AI-driven microfinance platform designed to streamline borrower onboarding and loan management. It leverages modern technologies like FastAPI, MongoDB, and React to provide a secure, scalable, and user-friendly experience for both borrowers and field agents.

---

## 🚀 Key Features

- **AI-Powered KYC Verification**: Integrated OCR and mock Aadhaar verification for rapid identity validation.
- **Role-Based Dashboards**: 
    - **Borrower Dashboard**: Track loan status, apply for new loans, and manage profiles.
    - **Agent Dashboard**: Manage field verifications, geo-tagging, and borrower approvals.
- **Secure Authentication**: Robust JWT-based authentication with role-based access control (RBAC).
- **Modern UI/UX**: High-performance frontend built with React 19 and Tailwind CSS 4, featuring smooth transitions using Framer Motion.
- **Scalable Backend**: Asynchronous FastAPI architecture with MongoDB integration via Motor.

---

## 🛠️ Technology Stack

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (using Motor for async operations)
- **Security**: JWT (python-jose), Bcrypt (passlib)
- **AI/OCR**: Pytesseract & Pillow
- **Validation**: Pydantic v2

### Frontend
- **Library**: [React 19](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Lucide React
- **HTTP Client**: Axios

---

## 📂 Project Structure

```text
GramCredit/
├── backend/            # FastAPI Backend
│   ├── app/
│   │   ├── api/        # API Endpoints (Auth, KYC)
│   │   ├── core/       # Config and Security
│   │   ├── db/         # MongoDB Connection
│   │   ├── schemas/    # Pydantic Schemas
│   ├── requirements.txt
│   └── print_users.py  # Helper script to preview MongoDB users
├── frontend/           # React Frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/      # Dashboard and Auth Pages
│   │   ├── services/   # API Integration
│   │   └── App.jsx     # Main Routing
│   ├── package.json
│   └── tsconfig.json
└── .gitignore          # Project-wide ignore rules
```

---

## ⚙️ Installation & Setup

### 1. Backend Setup
```bash
cd backend
# Create virtual environment
python -m venv venv
# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. MongoDB Setup
Create a `.env` file in `backend/` with the following values.

#### Local MongoDB
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=gramcredit
```

#### MongoDB Atlas
If you want to connect to Atlas instead of local MongoDB, use your Atlas URI:
```env
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster-address>/<dbname>?retryWrites=true&w=majority
DATABASE_NAME=gramcredit
```

> Use the connection string provided by MongoDB Atlas, replace `<username>`, `<password>`, `<cluster-address>`, and `<dbname>`.

Then run the backend server:
```bash
uvicorn app.main:app --reload
```

The backend will be available at `http://localhost:8000`. Documentation at `http://localhost:8000/docs`.

### 3. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install

# Run the development server
npm run dev
```
*The frontend will be available at `http://localhost:5173`.*

### 4. Preview MongoDB Users
From the `backend/` folder, run:
```bash
python print_users.py
```
This script prints users from the `gramcredit` database without exposing passwords.

---

## 👨‍💻 Author Attribution

> [!IMPORTANT]
> This project and its core implementation (Backend API structure, Frontend Dashboard UI, and Authentication Flow) were developed by **Abhishek Kushwaha**.

---

## 📜 License
This project is part of an internship submission and is intended for demonstration purposes.
