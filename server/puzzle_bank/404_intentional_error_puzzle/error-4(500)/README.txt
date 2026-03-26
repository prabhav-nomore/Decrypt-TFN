500 Internal Server Error Puzzle - README

How to run:
1. Extract this folder and open a terminal in the folder.
2. Start the server: python3 run_server.py
3. Open http://localhost:8003/index.html in your browser.

Task for participants:
- Edit only the file 'index.html' and make exactly ONE change so that clicking
  the link causes the server to respond with an Internal Server Error.

  Allowed change:
    * Change the link href from  pages/process.html
                              to  pages/crash.html

- After making the change, click the link.
- The browser will show "500 Internal Server Error" and "Clue: 500".
- The HTTP status code '500' is the clue for the next puzzle.
- You can also confirm it in DevTools -> Network tab.

Notes for organizers:
- The server intercepts requests to /pages/crash.html and responds with HTTP 500.
- No actual server crash occurs — this is simulated for the puzzle.
- Runs on port 8003 by default.
