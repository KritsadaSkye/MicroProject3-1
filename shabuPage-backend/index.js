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

const keyMap = {
    'ไม้แดง': 'redStick',
    'ไม้เหลือง': 'yellowStick',
    'ไม้ฟ้า': 'blueStick'
};


app.get('/history', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const historyResults = await conn.query('SELECT * FROM history');
        if (req.query.expand === 'items') {

            const itemsResults = await conn.query('SELECT * FROM items');

            res.json({
                history: historyResults[0],
                items: itemsResults[0]
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

app.get('/items', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const results = await conn.query('SELECT * FROM items');
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching history:', error.message);
        res.status(500).json({
            error: 'Error fetching history'
        });
    }
    await conn.end();
})

app.get('/today-summary', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);

        const [menuItems] = await conn.query('SELECT * FROM items');
        const [historyRows] = await conn.query('SELECT * FROM history ORDER BY date DESC LIMIT 1');
        const latestHistory = historyRows[0];

        const combinedData = menuItems.map((item) => {

            const historyKey = keyMap[item.type];
            const count = (latestHistory && historyKey) ? latestHistory[historyKey] : 0;

            return {
                name: item.type,
                price: item.price,
                count: count
            };
        });

        await conn.end();
        res.json(combinedData);

    } catch (error) {
        console.error('Error fetching today summary:', error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
})

app.get('/total-price', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);

        const [menuItems] = await conn.query('SELECT * FROM items');
        const [historyRows] = await conn.query('SELECT * FROM history ORDER BY date DESC LIMIT 1');
        const latestHistory = historyRows[0];

        const combinedData = menuItems.map((item) => {

            const historyKey = keyMap[item.type];
            const count = (latestHistory && historyKey) ? latestHistory[historyKey] : 0;

            return {
                name: item.type,
                price: item.price,
                count: count
            };
        });

        await conn.end();
        res.json(combinedData);

    } catch (error) {
        console.error('Error fetching today summary:', error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
})


app.listen(port, (req, res) => {
    console.log(`Server is running on http://localhost:${port}`);
})

