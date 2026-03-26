# run_server.py - Returns 410 Gone for permanently deleted resources
from http.server import SimpleHTTPRequestHandler, HTTPServer

GONE_PATHS = {"/pages/deleted-newsletter.html"}

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in GONE_PATHS:
            self.send_response(410, "Gone")
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            body = (
                "<html><head><title>410 Gone</title></head>"
                "<body><h1>410 Gone</h1>"
                "<p>Clue: 410</p>"
                "<p>This resource existed once but has been permanently deleted and will not return.</p>"
                "</body></html>"
            )
            self.wfile.write(body.encode("utf-8"))
        else:
            super().do_GET()

if __name__ == "__main__":
    port = 8006
    httpd = HTTPServer(("", port), MyHandler)
    print(f"Serving on http://localhost:{port}/  (press Ctrl+C to stop)")
    httpd.serve_forever()
