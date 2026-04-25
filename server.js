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

// Health-check / keep-alive endpoints — point an uptime pinger at either of these
// to prevent free-tier hosts (Render, etc.) from spinning the instance down.
app.get('/ping',   (req, res) => res.status(200).type('text/plain').send('pong'));
app.get('/health', (req, res) => res.status(200).json({
    status: 'ok',
    service: 'mike-sonko-control-dashboard',
    uptime: process.uptime(),
    time: new Date().toISOString()
}));

// Internal self-ping — once the instance is awake it stays awake by hitting itself
// every 4 minutes. (This alone won't wake a sleeping instance — pair it with an
// external pinger like UptimeRobot pointing at /ping for a cold start guarantee.)
const SELF_URL = process.env.RENDER_EXTERNAL_URL
              || process.env.PUBLIC_URL
              || `http://127.0.0.1:${PORT}`;
setInterval(() => {
    const client = SELF_URL.startsWith('https') ? require('https') : require('http');
    client.get(`${SELF_URL}/ping`, (r) => {
        r.on('data', () => {});
        r.on('end',  () => {});
    }).on('error', (err) => {
        console.warn('[keep-alive] self-ping failed:', err.message);
    });
}, 4 * 60 * 1000); // every 4 minutes

app.listen(PORT, HOST, () => {
    console.log(`Command Center running on http://${HOST}:${PORT}`);
    console.log(`Keep-alive self-ping target: ${SELF_URL}/ping (every 4 min)`);
});
