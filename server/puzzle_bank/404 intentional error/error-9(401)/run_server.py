# run_server.py - Returns 401 Unauthorized for the members-only endpoint
from http.server import SimpleHTTPRequestHandler, HTTPServer

AUTH_PATHS = {"/pages/members-only.html"}

class MyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in AUTH_PATHS:
            self.send_response(401, "Unauthorized")
            self.send_header("WWW-Authenticate", 'Basic realm="Members Only"')
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.end_headers()
            body = (
                "<html><head><title>401 Unauthorized</title></head>"
                "<body><h1>401 Unauthorized</h1>"
                "<p>Clue: 401</p>"
                "<p>Access to this resource requires authentication.</p>"
                "</body></html>"
            )
            self.wfile.write(body.encode("utf-8"))
        else:
            super().do_GET()

if __name__ == "__main__":
    port = 8004
    httpd = HTTPServer(("", port), MyHandler)
    print(f"Serving on http://localhost:{port}/  (press Ctrl+C to stop)")
    httpd.serve_forever()
