const express = require('express');
const app = express();

app.use(express.json());

// User details
const USER_ID = "john_doe_17091999"; // Change this to your full name and DOB

// POST method route
app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];
    
    // Initialize arrays
    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = [];

    // Process the data
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1 && /^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
        }
    });

    // Determine the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(ch => ch === ch.toLowerCase());
    if (lowercaseAlphabets.length > 0) {
        highestLowercaseAlphabet.push(lowercaseAlphabets.sort().pop());
    }

    // Create the response
    const response = {
        is_success: true,
        user_id: USER_ID,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    };

    res.json(response);
});

// GET method route
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
