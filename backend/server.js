
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'children_vaccination'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Routes

// GET: Fetch all children
app.get('/api/children', (req, res) => {
    const query = 'SELECT * FROM children ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        // Transform data to match frontend interface
        const transformedResults = results.map(child => ({
            id: child.id.toString(),
            name: child.name,
            dateOfBirth: child.dob,
            gender: child.gender,
            guardianName: child.guardian_name,
            address: child.address,
            vaccineName: child.vaccine_name,
            vaccinationDate: child.vaccination_date,
            nextDueDate: child.next_due_date || '',
            notes: child.notes || ''
        }));
        
        res.json(transformedResults);
    });
});

// POST: Add new child
app.post('/api/children', (req, res) => {
    const { name, dateOfBirth, gender, guardianName, address, vaccineName, vaccinationDate, nextDueDate, notes } = req.body;
    
    const query = `INSERT INTO children (name, dob, gender, guardian_name, address, vaccine_name, vaccination_date, next_due_date, notes) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(query, [name, dateOfBirth, gender, guardianName, address, vaccineName, vaccinationDate, nextDueDate, notes], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ 
            message: 'Child record added successfully', 
            id: result.insertId.toString(),
            child: {
                id: result.insertId.toString(),
                name,
                dateOfBirth,
                gender,
                guardianName,
                address,
                vaccineName,
                vaccinationDate,
                nextDueDate,
                notes
            }
        });
    });
});

// PUT: Update child
app.put('/api/children/:id', (req, res) => {
    const { id } = req.params;
    const { name, dateOfBirth, gender, guardianName, address, vaccineName, vaccinationDate, nextDueDate, notes } = req.body;
    
    const query = `UPDATE children SET name=?, dob=?, gender=?, guardian_name=?, address=?, vaccine_name=?, vaccination_date=?, next_due_date=?, notes=? 
                   WHERE id=?`;
    
    db.query(query, [name, dateOfBirth, gender, guardianName, address, vaccineName, vaccinationDate, nextDueDate, notes, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Child record updated successfully' });
    });
});

// DELETE: Delete child
app.delete('/api/children/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM children WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Child record deleted successfully' });
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend server is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
