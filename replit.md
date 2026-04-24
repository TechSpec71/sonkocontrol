# SRT Command Center (sonkocontrol)

## Overview
A static dashboard ("MHE. SONKO COMMAND") served by a small Express.js server. The frontend is a single HTML page that uses Tailwind (CDN), Font Awesome, and Leaflet to render a fleet/operations command center with a live map of the Nairobi area.

## Tech Stack
- **Runtime:** Node.js 20
- **Server:** Express 4 (`server.js`)
- **Frontend:** Static HTML in `public/index.html` (Tailwind CDN, Leaflet, Font Awesome)

## Project Structure
- `server.js` — Express server that serves files from `public/`
- `public/index.html` — The dashboard UI
- `package.json` — Node dependencies and `start` script

## Replit Setup
- The server listens on `0.0.0.0:5000` (required for the Replit web preview).
- Cache-control headers are disabled in dev so the iframe preview always shows fresh content.
- Workflow `Start application` runs `npm start` and exposes port 5000 (webview).

## Running Locally
```
npm install
npm start
```
