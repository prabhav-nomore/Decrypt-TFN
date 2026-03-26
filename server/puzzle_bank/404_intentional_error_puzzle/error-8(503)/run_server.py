# run_server.py - Returns 503 Service Unavailable for maintenance paths
from http.server import SimpleHTTPRequestHandler, HTTPServer

MAINTENANCE_PATHS = {"/pages/booking-v2.html"}

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in MAINTENANCE_PATHS:
            self.send_response(503, "Service Unavailable")
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.send_header("Retry-After", "3600")
            self.end_headers()
            body = (
                "<html><head><title>503 Service Unavailable</title></head>"
                "<body><h1>503 Service Unavailable</h1>"
                "<p>Clue: 503</p>"
                "<p>This service is temporarily offline for maintenance. Please try again later.</p>"
                "</body></html>"
            )
            self.wfile.write(body.encode("utf-8"))
        else:
            super().do_GET()

if __name__ == "__main__":
    port = 8008
    httpd = HTTPServer(("", port), MyHandler)
    print(f"Serving on http://localhost:{port}/  (press Ctrl+C to stop)")
    httpd.serve_forever()
