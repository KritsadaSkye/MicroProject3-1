const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

const port = 3301;

app.get('/history', async (req, res) => {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'shabudash',
            port: 3307
        });
        const results = await conn.query('SELECT * FROM history');
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching history:', error.message);
        res.status(500).json({
            error: 'Error fetching history'
        });
    }
})

app.get('/pricestick', async (req, res) => {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'shabudash',
            port: 3307
        });
        const results = await conn.query('SELECT * FROM pricestick');
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching history:', error.message);
        res.status(500).json({
            error: 'Error fetching history'
        });
    }
})

app.listen(port, (req, res) => {
    console.log(`Server is running on http://localhost:${port}`);
})

