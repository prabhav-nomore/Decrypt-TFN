# run_server.py - Returns 408 Request Timeout for slow endpoints
from http.server import SimpleHTTPRequestHandler, HTTPServer
import time

TIMEOUT_PATHS = {"/pages/slow-results.html"}

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in TIMEOUT_PATHS:
            time.sleep(3)  # simulate slow server
            self.send_response(408, "Request Timeout")
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            body = (
                "<html><head><title>408 Request Timeout</title></head>"
                "<body><h1>408 Request Timeout</h1>"
                "<p>Clue: 408</p>"
                "<p>The server timed out waiting to handle your request.</p>"
                "</body></html>"
            )
            self.wfile.write(body.encode("utf-8"))
        else:
            super().do_GET()

if __name__ == "__main__":
    port = 8005
    httpd = HTTPServer(("", port), MyHandler)
    print(f"Serving on http://localhost:{port}/  (press Ctrl+C to stop)")
    httpd.serve_forever()
