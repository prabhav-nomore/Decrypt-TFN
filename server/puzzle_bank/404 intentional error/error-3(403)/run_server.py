# run_server.py - Custom HTTP server that returns 403 Forbidden for protected paths
from http.server import SimpleHTTPRequestHandler, HTTPServer

FORBIDDEN_PATHS = {"/pages/secret-report.html"}

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in FORBIDDEN_PATHS:
            self.send_response(403, "Forbidden")
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            body = (
                "<html><head><title>403 Forbidden</title></head>"
                "<body><h1>403 Forbidden</h1>"
                "<p>Clue: 403</p>"
                "<p>You do not have permission to access this resource.</p>"
                "</body></html>"
            )
            self.wfile.write(body.encode("utf-8"))
        else:
            super().do_GET()

if __name__ == "__main__":
    port = 8002
    httpd = HTTPServer(("", port), MyHandler)
    print(f"Serving on http://localhost:{port}/  (press Ctrl+C to stop)")
    httpd.serve_forever()
