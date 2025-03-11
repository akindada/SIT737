const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome, I am student of SIT737, This is my simple web page!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
