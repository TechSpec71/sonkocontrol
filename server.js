const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, HOST, () => {
    console.log(`Command Center running on http://${HOST}:${PORT}`);
});
