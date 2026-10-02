import http.server
import socketserver
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

socketserver.TCPServer.allow_reuse_address = True

# Fall back to the next free port if PORT is taken (e.g. by Apache/XAMPP)
for port in range(PORT, PORT + 20):
    try:
        httpd = socketserver.TCPServer(("", port), Handler)
        break
    except OSError:
        print(f"Port {port} is in use, trying {port + 1}...")
else:
    raise SystemExit(f"No free port found in range {PORT}-{PORT + 19}")

with httpd:
    print(f"Serving HIGHROLERS Strategic Marketing Agency at http://127.0.0.1:{port}")
    httpd.serve_forever()
