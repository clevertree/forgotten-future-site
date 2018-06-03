const express = require('express');
const path = require('path');
const app = express();

// app.get('/', (req, res) => res.send('Hello World!'));
app.use('/', express.static(path.dirname(__dirname)));

app.listen(3000, () => console.log('Example app listening on port 3000!'));