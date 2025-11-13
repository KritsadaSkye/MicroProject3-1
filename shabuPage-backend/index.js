const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3301;

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shabudash',
    port: 3307
};


app.get('/history', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const historyResults = await conn.query('SELECT * FROM history');
        if (req.query.expand === 'pricestick') {

            const pricestickResults = await conn.query('SELECT * FROM pricestick');

            res.json({
                history: historyResults[0],
                pricestick: pricestickResults[0]
            });

        } else {
            res.json(historyResults[0]);
        }
        await conn.end();
    } catch (error) {
        console.error('Error fetching history:', error.message);
        res.status(500).json({
            error: 'Error fetching history'
        });
    }
})

app.get('/pricestick', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const results = await conn.query('SELECT * FROM pricestick');
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching history:', error.message);
        res.status(500).json({
            error: 'Error fetching history'
        });
    }
    await conn.end();
})

app.listen(port, (req, res) => {
    console.log(`Server is running on http://localhost:${port}`);
})

