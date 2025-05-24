
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
            console.error('Database query error:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        
        // Transform data to match frontend interface
        const transformedResults = results.map(child => ({
            id: child.id.toString(),
            name: child.name,
            dob: child.dob,
            gender: child.gender,
            guardian_name: child.guardian_name,
            address: child.address,
            vaccine_name: child.vaccine_name,
            vaccination_date: child.vaccination_date,
            next_due_date: child.next_due_date || '',
            notes: child.notes || '',
            created_at: child.created_at
        }));
        
        res.json(transformedResults);
    });
});

// POST: Add new child
app.post('/api/children', (req, res) => {
    const { name, dateOfBirth, gender, guardianName, address, vaccineName, vaccinationDate, nextDueDate, notes } = req.body;
    
    const query = `INSERT INTO children (name, dob, gender, guardian_name, address, vaccine_name, vaccination_date, next_due_date, notes) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [name, dateOfBirth, gender, guardianName, address, vaccineName, vaccinationDate, nextDueDate || null, notes || ''];
    
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Database insert error:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        
        const insertId = result.insertId.toString();
        res.status(201).json({ 
            message: 'Child record added successfully', 
            id: insertId,
            child: {
                id: insertId,
                name,
                dateOfBirth,
                gender,
                guardianName,
                address,
                vaccineName,
                vaccinationDate,
                nextDueDate: nextDueDate || '',
                notes: notes || ''
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
    
    const values = [name, dateOfBirth, gender, guardianName, address, vaccineName, vaccinationDate, nextDueDate || null, notes || '', id];
    
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Database update error:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Child record not found' });
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
            console.error('Database delete error:', err);
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Child record not found' });
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
