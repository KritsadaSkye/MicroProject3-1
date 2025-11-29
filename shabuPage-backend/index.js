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

        const [menuItems] = await conn.query('SELECT * FROM items');

        const [historyRows] = await conn.query('SELECT * FROM history ORDER BY date DESC LIMIT 30');

        const priceMap = {};
        menuItems.forEach(item => {
            const historyKey = keyMap[item.type];
            if (historyKey) {
                priceMap[historyKey] = item.price;
            }
        });

        const enhancedHistory = historyRows.map((day) => {
            let totalRevenueForThisDay = 0;

            for (const historyKey in priceMap) {
                const count = day[historyKey] || 0;
                const price = priceMap[historyKey];

                totalRevenueForThisDay += (count * price);
            }
            return {
                ...day,
                totalRevenue: totalRevenueForThisDay
            };
        });

        await conn.end();
        res.json(enhancedHistory);

    } catch (error) {
        console.error('Error fetching history:', error.message);
        res.status(500).json({ error: 'Error fetching history' });
    }
});


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

app.get('/today', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const todayResults = await conn.query('SELECT date FROM history WHERE date = CURDATE()');


        res.json(todayResults[0]);
    } catch (error) {
        console.error('Error fetching today:', error.message);
        res.status(500).json({
            error: 'Error fetching today'
        });
    }
    await conn.end();
})

app.listen(port, (req, res) => {
    console.log(`Server is running on http://localhost:${port}`);
})

/*raspy part*/

app.post("/api/history", async (req, res) => {
    const { color, count } = req.body;

    await pool.query(
        "INSERT INTO history (color, count, created_at) VALUES (?, ?, NOW())",
        [color, count]
    );

    res.json({ message: "Inserted" });
});


app.get("/api/history/today", async (req, res) => {
    const [rows] = await pool.query(`
    SELECT color, SUM(count) AS total
    FROM history
    WHERE DATE(created_at) = CURDATE()
    GROUP BY color
  `);

    res.json(rows);
});

app.put("/api/prices/:color", async (req, res) => {
    const { color } = req.params;
    const { price } = req.body;

    await pool.query("UPDATE prices SET price = ? WHERE color = ?", [
        price,
        color
    ]);

    res.json({ message: "Updated" });
});