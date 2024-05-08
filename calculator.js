const express = require('express');
const axios = require('axios');

// Create an instance of the Express.js application
const app = express();

// Configure Axios with a timeout of 1000 milliseconds
const axiosInstance = axios.create({
  timeout: 500
});

const apiMap = {
  'p': 'http://localhost:9876/numbers/primes',
  't': 'http://localhost:9876/numbers/fibonacci',
  'e': 'http://localhost:9876/numbers/even',
  'r': 'http://localhost:9876/numbers/random'
};

// Initialize queue and window size
const numberQueue = [];
const WINDOW_SIZE = 10;

// API endpoint to handle requests
app.get('/numbers/:id', async (req, res) => {
  const id = req.params.id;
  if (!apiMap[id]) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const response = await axiosInstance.get(apiMap[id]);
    let numbers = response.data;

    // Wrap the response data in an array if it's not already an array
    if (!Array.isArray(numbers)) {
        numbers = [numbers];
    }

    // Store unique numbers in the queue
    if (numbers.length > 0) {
        numbers.forEach((number) => {
            if (!numberQueue.includes(number)) {
                numberQueue.push(number);
                if (numberQueue.length > WINDOW_SIZE) {
                    numberQueue.shift();
                }
            }
        });

        let avg = 0;
        if (numberQueue.length >= WINDOW_SIZE) {
            avg = numberQueue.reduce((acc, curr) => acc + curr, 0) / WINDOW_SIZE;
        }

        const prevState = [...numberQueue];
        const currState = [...numberQueue];
        res.json({
            windowPrevState: prevState,
            windowCurrState: currState,
            numbers,
            avg: avg.toFixed(2)
        });
    } else {
        console.error('Empty array received');
        res.status(500).json({ error: 'Empty array received' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching numbers' });
}

});

const PORT = process.env.PORT || 9876;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
