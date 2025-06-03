# ⚡ EV Chargers Web App

An end-to-end web application that allows users to sign up, log in, and view EV charging station information.

---

## 🛠 Tech Stack

- **Frontend**: Vue.js (Vite)
- **Backend**: Express.js, MongoDB
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 🚀 Project Structure

EV_ChargingStn/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── .env
│ └── index.js
│
└── frontend/
├── src/
├── public/
├── vite.config.js
└── main.js

---


## 🧑‍💻 Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AryaMane1210/EV_ChargingStn.git
cd EV_ChargingStn  
```
### 2. Set Up the Backend
```bash
cd backend
npm install
```
### 3. Create a .env file inside the backend/ directory:
```bash
MONGO_URI=your_mongodb_connection_string
PORT=10000
```
### 4. ▶ Start the Backend
```bash
npm start
```
### 5. Set Up the Frontend
```bash
cd ../frontend
npm install
npm run dev
```

### API Endpoints (Backend)
POST /api/auth/signup – Register new users
POST /api/auth/login – Log in existing users
GET /api/chargers – Fetch charger station data
DELETE /api/:id - Deletes a charger station
Updation of details of a charger

### Deployment Link
```
ev-charging-stn-adwz-nh6vypzfr-aryamane1210s-projects.vercel.app
```



