# run_server.py - Custom HTTP server that returns 500 for crash-trigger paths
from http.server import SimpleHTTPRequestHandler, HTTPServer

CRASH_PATHS = {"/pages/crash.html"}

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in CRASH_PATHS:
            self.send_response(500, "Internal Server Error")
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            body = (
                "<html><head><title>500 Internal Server Error</title></head>"
                "<body><h1>500 Internal Server Error</h1>"
                "<p>Clue: 500</p>"
                "<p>The server encountered an unexpected condition and could not complete your request.</p>"
                "</body></html>"
            )
            self.wfile.write(body.encode("utf-8"))
        else:
            super().do_GET()

if __name__ == "__main__":
    port = 8003
    httpd = HTTPServer(("", port), MyHandler)
    print(f"Serving on http://localhost:{port}/  (press Ctrl+C to stop)")
    httpd.serve_forever()
