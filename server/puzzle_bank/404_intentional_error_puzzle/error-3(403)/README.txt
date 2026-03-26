403 Forbidden Puzzle - README

How to run:
1. Extract this folder and open a terminal in the folder.
2. Start the server: python3 run_server.py
3. Open http://localhost:8002/index.html in your browser.

Task for participants:
- Edit only the file 'index.html' and make exactly ONE change so that clicking
  the link causes the server to respond with a Forbidden error.

  Allowed change:
    * Change the link href from  pages/public-report.html
                              to  pages/secret-report.html

- After making the change, click the link.
- The browser will show "403 Forbidden" and "Clue: 403".
- The HTTP status code '403' is the clue for the next puzzle.
- You can also confirm it in DevTools -> Network tab.

Notes for organizers:
- The server blocks any request to /pages/secret-report.html with a 403 response.
- The file pages/secret-report.html does NOT need to exist on disk — the server
  intercepts the request before the filesystem is checked.
- Runs on port 8002 by default.
