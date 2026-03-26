# run_server.py - Custom HTTP server that returns a clue on 301 redirect responses
from http.server import SimpleHTTPRequestHandler, HTTPServer

REDIRECT_MAP = {
    "/pages/old-archive.html": "/pages/archive.html",
}

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in REDIRECT_MAP:
            new_location = REDIRECT_MAP[self.path]
            self.send_response(301, "Moved Permanently")
            self.send_header("Location", new_location)
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            body = (
                "<html><head><title>301 Moved Permanently</title></head>"
                "<body><h1>301 Moved Permanently</h1>"
                "<p>Clue: 301</p>"
                f"<p>This resource has moved to <a href='{new_location}'>{new_location}</a></p>"
                "</body></html>"
            )
            self.wfile.write(body.encode("utf-8"))
        else:
            super().do_GET()

if __name__ == "__main__":
    port = 8001
    httpd = HTTPServer(("", port), MyHandler)
    print(f"Serving on http://localhost:{port}/  (press Ctrl+C to stop)")
    httpd.serve_forever()
