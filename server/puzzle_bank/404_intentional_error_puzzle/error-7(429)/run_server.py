# run_server.py - Returns 429 Too Many Requests for rate-limited endpoints
from http.server import SimpleHTTPRequestHandler, HTTPServer

RATE_LIMITED_PATHS = {"/pages/bulk-search.html"}

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in RATE_LIMITED_PATHS:
            self.send_response(429, "Too Many Requests")
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.send_header("Retry-After", "60")
            self.end_headers()
            body = (
                "<html><head><title>429 Too Many Requests</title></head>"
                "<body><h1>429 Too Many Requests</h1>"
                "<p>Clue: 429</p>"
                "<p>You have exceeded the rate limit. Please wait 60 seconds before retrying.</p>"
                "</body></html>"
            )
            self.wfile.write(body.encode("utf-8"))
        else:
            super().do_GET()

if __name__ == "__main__":
    port = 8007
    httpd = HTTPServer(("", port), MyHandler)
    print(f"Serving on http://localhost:{port}/  (press Ctrl+C to stop)")
    httpd.serve_forever()
