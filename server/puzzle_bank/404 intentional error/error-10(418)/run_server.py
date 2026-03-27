# run_server.py - Returns 418 I'm a Teapot (RFC 2324) for the tea endpoint
# 418 is a real HTTP status code defined as an April Fools' joke in RFC 2324.
# Many real servers implement it as an easter egg.
from http.server import SimpleHTTPRequestHandler, HTTPServer

TEAPOT_PATHS = {"/pages/tea.html"}

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in TEAPOT_PATHS:
            self.send_response(418, "I'm a Teapot")
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            body = (
                "<html><head><title>418 I'm a Teapot</title></head>"
                "<body><h1>418 I'm a Teapot</h1>"
                "<p>Clue: 418</p>"
                "<p>This server is a teapot. It cannot brew coffee — only tea.</p>"
                "<p><em>(RFC 2324 - Hyper Text Coffee Pot Control Protocol)</em></p>"
                "</body></html>"
            )
            self.wfile.write(body.encode("utf-8"))
        else:
            super().do_GET()

if __name__ == "__main__":
    port = 8009
    httpd = HTTPServer(("", port), MyHandler)
    print(f"Serving on http://localhost:{port}/  (press Ctrl+C to stop)")
    httpd.serve_forever()
