
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pnrdb'
});

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.post('/api/tc/login', (req, res) => {
    const { employeeNumber, password } = req.body;
    db.query('SELECT * FROM tcs WHERE employeeNumber = ?', [employeeNumber], (err, results) => {
        if (err || results.length === 0) return res.sendStatus(403);
        const tc = results[0];
        if (password !== tc.password) return res.sendStatus(403); // In prod use bcrypt.compare
        const token = jwt.sign({ employeeNumber }, 'secret');
        res.json({ token });
    });
});

app.get('/api/pnr/:pnr', authenticate, (req, res) => {
    const pnr = req.params.pnr;
    db.query('SELECT * FROM passengers WHERE pnr = ?', [pnr], (err, results) => {
        if (err || results.length === 0) return res.sendStatus(404);
        res.json(results[0]);
    });
});

app.put('/api/pnr/:pnr/status', authenticate, (req, res) => {
    const { status } = req.body;
    const pnr = req.params.pnr;
    db.query('UPDATE passengers SET status = ? WHERE pnr = ?', [status, pnr], err => {
        if (err) return res.sendStatus(500);
        res.sendStatus(200);
    });
});

app.post('/api/pnr/:pnr/notify', authenticate, (req, res) => {
    const pnr = req.params.pnr;
    db.query('SELECT * FROM passengers WHERE status = "waiting" ORDER BY id ASC LIMIT 1', (err, results) => {
        if (err || results.length === 0) return res.sendStatus(404);
        const next = results[0];
        db.query('UPDATE passengers SET status = "confirmed" WHERE id = ?', [next.id]);
        twilioClient.messages.create({
            body: `Dear ${next.name}, your ticket is now confirmed.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: next.phone
        }).then(() => res.sendStatus(200)).catch(() => res.sendStatus(500));
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));
