const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db1Url = process.env.DB1_URL;
const db2Url = process.env.DB2_URL;

let db1, db2;

// Middleware
app.use(bodyParser.json());
app.use(cors());

async function connectToDatabases() {
    const client1 = new MongoClient(db1Url, { useNewUrlParser: true, useUnifiedTopology: true });
    const client2 = new MongoClient(db2Url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client1.connect();
        db1 = client1.db();
        console.log('Connected to DB1');
        
        await client2.connect();
        db2 = client2.db();
        console.log('Connected to DB2');
    } catch (error) {
        console.error('Error connecting to databases:', error);
    }
}

connectToDatabases();

// Routes
app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.post('/db1/add', async (req, res) => {
    const { item } = req.body;
    try {
        const result = await db1.collection('items').insertOne({ item });
        res.status(200).json({ message: 'Item added to DB1', result });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to DB1', error });
    }
});

app.post('/db2/add', async (req, res) => {
    const { item } = req.body;
    try {
        const result = await db2.collection('items').insertOne({ item });
        res.status(200).json({ message: 'Item added to DB2', result });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to DB2', error });
    }
});

app.post('/db1/remove', async (req, res) => {
    const { item } = req.body;
    try {
        const result = await db1.collection('items').deleteOne({ item });
        res.status(200).json({ message: 'Item removed from DB1', result });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from DB1', error });
    }
});

app.post('/db2/remove', async (req, res) => {
    const { item } = req.body;
    try {
        const result = await db2.collection('items').deleteOne({ item });
        res.status(200).json({ message: 'Item removed from DB2', result });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from DB2', error });
    }
});

app.post('/compare', async (req, res) => {
    const { item } = req.body;
    try {
        const result1 = await db1.collection('items').findOne({ item });
        const result2 = await db2.collection('items').findOne({ item });

        if (result1 && result2) {
            res.status(200).json({ message: 'Item found in both DB1 and DB2' });
        } else {
            res.status(200).json({ message: 'Item not found in both DB1 and DB2' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error comparing items in DB1 and DB2', error });
    }
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
    console.log(`DB1 URL: ${db1Url}`);
    console.log(`DB2 URL: ${db2Url}`);
});
