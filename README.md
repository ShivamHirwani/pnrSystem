# PNR System Project

This project is a full-stack application built with React and Node.js that allows Ticket Checkers (TCs) to login, view PNR details, mark passengers as present or absent, and notify the next passenger on the waiting list via SMS using Twilio.

## Features

- TC Login system (JWT-based)
- PNR detail lookup
- Passenger status update (present/absent)
- Auto-confirm and notify next passenger on waitlist using Twilio
- React frontend with Axios integration
- Sample SQL dump and Postman collection included

---

## 📦 Folder Structure

```
pnr-system-project/
├── backend/              # Node.js + Express API
├── frontend/             # React frontend app
├── sql/                  # SQL dump for MySQL database
├── postman/              # Postman collection for API testing
└── README.md             # Project setup guide
```

---

## 🛠 Setup Instructions

### 1. Clone or Extract

Extract the zip or clone the repo:

```bash
unzip pnr-system-project.zip
cd pnr-system-project
```

### 2. Setup MySQL Database

Import the SQL dump:

```bash
mysql -u root -p < sql/pnrdb.sql
```

### 3. Backend Setup

```bash
cd backend
npm install
node index.js
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

### 5. Test with Postman

Import `postman/PNR_System.postman_collection.json` into Postman.

---

## ✅ Default TC Login

- **Employee Number**: `TC001`
- **Password**: `tc123`

---

## 📞 Twilio Setup (Optional)

Update your Twilio SID, Auth Token, and Phone Number in `backend/.env`.

```
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
```
