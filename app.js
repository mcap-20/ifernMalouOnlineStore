const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const GCash_API_URL = 'https://your-gcash-api-endpoint'; // Replace with actual GCash API URL
const GCash_API_KEY = 'your_api_key'; // Replace with your API key

app.post('/create-gcash-source', async (req, res) => {
    const { amount, currency, description } = req.body;

    try {
        const response = await fetch(`${GCash_API_URL}/path/to/create/source`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GCash_API_KEY}`
            },
            body: JSON.stringify({
                amount,
                currency,
                type: 'gcash',
                redirect: {
                    success: "https://magpie.im?status=success",
                    fail: "https://magpie.im?status=fail"
                },
                description,
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error creating GCash source:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
