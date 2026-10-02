/**
 * HIGHROLERS — Node.js production server
 * Serves the Vite build in dist/ and falls back to the next free port if PORT is taken.
 *
 *   npm run build && npm start      (add --open to launch the browser)
 */
import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT) || 8080;
const MAX_PORT_ATTEMPTS = 20;
const DIST_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const INDEX_FILE = path.join(DIST_DIR, 'index.html');

if (!existsSync(INDEX_FILE)) {
  console.error('No production build found in dist/. Run "npm run build" first.');
  process.exit(1);
}

const app = express();

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  next();
});
app.use(express.static(DIST_DIR));

// Single-page app: any unknown route returns the React shell
app.use((req, res) => res.sendFile(INDEX_FILE));

function openBrowser(url) {
  const command =
    process.platform === 'win32' ? `start "" "${url}"` :
    process.platform === 'darwin' ? `open "${url}"` :
    `xdg-open "${url}"`;
  exec(command);
}

// Fall back to the next free port if PORT is taken (e.g. by Apache/XAMPP)
function listen(port, attemptsLeft) {
  const server = http.createServer(app);

  server.once('error', (err) => {
    const portBusy = err.code === 'EADDRINUSE' || err.code === 'EACCES';
    if (portBusy && attemptsLeft > 1) {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      listen(port + 1, attemptsLeft - 1);
    } else if (portBusy) {
      console.error(`No free port found in range ${PORT}-${PORT + MAX_PORT_ATTEMPTS - 1}`);
      process.exit(1);
    } else {
      throw err;
    }
  });

  server.listen(port, '0.0.0.0', () => {
    const url = `http://127.0.0.1:${port}`;
    console.log(`Serving HIGHROLERS Strategic Marketing Agency at ${url}`);
    if (process.argv.includes('--open')) openBrowser(url);
  });
}

listen(PORT, MAX_PORT_ATTEMPTS);
