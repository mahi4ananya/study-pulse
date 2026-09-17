const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Initialize SQLite Database
const db = new sqlite3.Database('./studypulse.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to StudyPulse SQLite database.');
    }
});

// Create tasks table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0
)`);

// API: Get all tasks
app.get('/api/tasks', (req, res) => {
    db.all(`SELECT * FROM tasks`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ tasks: rows });
    });
});

// API: Add a new task
app.post('/api/tasks', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Task text is required" });
    }
    
    const query = `INSERT INTO tasks (text) VALUES (?)`;
    db.run(query, [text], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ 
            id: this.lastID, 
            text, 
            completed: 0 
        });
    });
});

// API: Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Task deleted successfully", id });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`StudyPulse server running at http://localhost:${PORT}`);
});
