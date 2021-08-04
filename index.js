const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));