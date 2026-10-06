import http.server
import socketserver
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def run_server(port):
    for p in [port, 8080, 5000, 5500]:
        try:
            handler = CustomHandler
            with socketserver.TCPServer(("", p), handler) as httpd:
                print(f"BIT Timetable Server started at: http://localhost:{p}")
                print(f"Serving files from: {DIRECTORY}")
                sys.stdout.flush()
                httpd.serve_forever()
        except OSError as e:
            if "Address already in use" in str(e) or e.errno in (48, 98, 10048):
                print(f"Port {p} in use, trying next port...")
                continue
            raise

if __name__ == "__main__":
    run_server(PORT)
