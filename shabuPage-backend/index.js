const express = require('express');
const mysql = require('mysql2/promise');
const dayjs = require('dayjs')

const app = express();
const port = 3301;

// parse JSON bodies
app.use(express.json());

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

app.put("/prices/type", async (req, res) => {
    const { type, price } = req.body;
    let conn;
    try {
        conn = await mysql.createConnection(dbConfig);
        await conn.query("UPDATE shabudash.items SET price = ? WHERE type = ?", [price, type]);
        await conn.end();
        res.json({ message: `อัปเดตราคา ${type} เป็น ${price} บาทเรียบร้อย` });
    } catch (error) {
        if (conn) await conn.end();
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, (req, res) => {
    console.log(`Server is running on http://localhost:${port}`);
})


/*raspy part*/

app.get("/get-items", async (req, res) => {
    let conn;
    try {
        conn = await mysql.createConnection(dbConfig);
        const [rows] = await conn.query("SELECT type, price, img FROM shabudash.items");
        await conn.end();
        res.json(rows);
    } catch (error) {
        if (conn) await conn.end();
        res.status(500).json({ error: error.message });
    }
});

app.post("/post-history", async (req, res) => {
    let conn;
    try {
        conn = await mysql.createConnection(dbConfig);
        const payload = req.body || {};
        const targetDate = dayjs().format('YYYY-MM-DD');

        const allowedCols = ['redStick', 'yellowStick', 'blueStick'];

        const counts = {};
        for (const col of allowedCols) {
            if (Object.prototype.hasOwnProperty.call(payload, col)) {
                counts[col] = parseInt(payload[col], 10) || 0;
            }
        }

        if (Object.keys(counts).length === 0) {
            await conn.end();
            return res.status(400).json({ error: 'Invalid payload: expected keys redStick/yellowStick/blueStick with numeric values' });
        }
        const [existing] = await conn.query('SELECT date FROM shabudash.history WHERE date = ? LIMIT 1', [targetDate]);

        if (existing.length) {
            const updates = [];
            const params = [];
            for (const col of Object.keys(counts)) {
                updates.push(`${col} = ${col} + ?`);
                params.push(counts[col]);
            }
            params.push(targetDate);
            await conn.query(`UPDATE shabudash.history SET ${updates.join(', ')} WHERE date = ?`, params);
        } else {
            const cols = ['date', ...Object.keys(counts)];
            const placeholders = cols.map(() => '?').join(',');
            const values = [targetDate, ...Object.values(counts)];
            await conn.query(`INSERT INTO shabudash.history (${cols.join(',')}) VALUES (${placeholders})`, values);
        }

        await conn.end();
        return res.json({ message: 'Inserted/Updated counts' });

    } catch (error) {
        if (conn) await conn.end();
        return res.status(500).json({ error: error.message });
    }
});