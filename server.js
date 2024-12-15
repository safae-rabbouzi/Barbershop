const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware pour analyser les JSON
app.use(express.json());

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Mock data storage
const bookingsFile = './booking.json';
const messagesFile = './messages.json';

// Utility functions pour lire/écrire dans les fichiers JSON
const readJSONFile = (filePath) => {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
        return [];
    }
};

const writeJSONFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Routes pour les API
app.get('/api/bookings', (req, res) => {
    const bookings = readJSONFile(bookingsFile);
    res.json(bookings);
});

app.post('/api/bookings', (req, res) => {
    const { name, email, date, time } = req.body;

    if (!name || !email || !date || !time) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const bookings = readJSONFile(bookingsFile);
    const newBooking = { id: bookings.length + 1, name, email, date, time };
    bookings.push(newBooking);
    writeJSONFile(bookingsFile, bookings);

    res.status(201).json({ message: 'Booking added successfully', booking: newBooking });
});

app.get('/api/messages', (req, res) => {
    const messages = readJSONFile(messagesFile);
    res.json(messages);
});

app.post('/api/messages', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const messages = readJSONFile(messagesFile);
    const newMessage = { id: messages.length + 1, name, email, message };
    messages.push(newMessage);
    writeJSONFile(messagesFile, messages);

    res.status(201).json({ message: 'Message added successfully', message: newMessage });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running at https://barbershop-production-cbca.up.railway.app`);
});
