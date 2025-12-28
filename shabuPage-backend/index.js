const express = require('express');
const mysql = require('mysql2/promise');
const dayjs = require('dayjs')

const app = express();
const port = 3301;

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'shabudash',
    port: 3306
};

const keyMap = {
    'ไม้แดง': 'redStick',
    'ไม้เหลือง': 'yellowStick',
    'ไม้ฟ้า': 'blueStick'
};

const today = dayjs().format('YYYY-MM-DD')
console.log(today)

app.get('/history', async (req, res) => {
        try {
            const conn = await mysql.createConnection(dbConfig);
            const [menuItems] = await conn.query('SELECT * FROM shabudash.items');

            const [historyRows] = await conn.query('SELECT * FROM shabudash.history ORDER BY date DESC LIMIT 30');

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
        const results = await conn.query('SELECT * FROM shabudash.items');
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
        const [menuItems] = await conn.query('SELECT * FROM shabudash.items');
        const [historyRows] = await conn.query('SELECT * FROM shabudash.history ORDER BY date DESC LIMIT 1');
        const latestHistory = historyRows[0];

        const latestHistoryDate = dayjs(latestHistory.date).format('YYYY-MM-DD')

        if (latestHistoryDate === today) {
            const combinedData = menuItems.map((item) => {

                const historyKey = keyMap[item.type];
                const count = (latestHistory && historyKey) ? latestHistory[historyKey] : 0;

                return {
                    id: item.id,
                    name: item.type,
                    price: item.price,
                    count: count,
                };
            });

            await conn.end();
            res.json(combinedData);
        }

    } catch (error) {
        console.error('Error fetching today summary:', error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
})

app.get('/today', async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const todayResults = await conn.query('SELECT date FROM shabudash.history WHERE date = CURDATE()');


        res.json(todayResults[0]);
    } catch (error) {
        console.error('Error fetching today:', error.message);
        res.status(500).json({
            error: 'Error fetching today'
        });
    }
    await conn.end();
})

app.put("/api/prices/type", async (req, res) => {
    const { type,price } = req.body;
    try {
        const conn = await mysql.createConnection(dbConfig);
        await conn.query("UPDATE shabudash.items SET price = ? WHERE type = ?", [price, type]);
        res.json({ message: `อัปเดตราคา ${type} เป็น ${price} บาทเรียบร้อย` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, (req, res) => {
    console.log(`Server is running on http://localhost:${port}`);
})


/*raspy part*/

app.get("/api/get-items", async (req, res) => {
    try {
        const conn = await mysql.createConnection(dbConfig);
        const [rows] = await conn.query("SELECT type, price FROM shabudash.items");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/history", async (req, res) => {
    const conn = await mysql.createConnection(dbConfig);
    const { color, count } = req.body;

    await conn.query(
        "INSERT INTO history (color, count, created_at) VALUES (?, ?, NOW())",
        [color, count]
    );

    res.json({ message: "Inserted" });
});