408 Request Timeout Puzzle - README

How to run:
1. Extract this folder and open a terminal in the folder.
2. Start the server: python3 run_server.py
3. Open http://localhost:8005/index.html in your browser.

Task for participants:
- Edit only 'index.html' and make exactly ONE change so that clicking the link
  causes the server to stall and return a timeout error.

  Allowed change:
    * Change the link href from  pages/results.html
                              to  pages/slow-results.html

- After making the change, click the link (the page will pause for ~3 seconds).
- The browser will show "408 Request Timeout" and "Clue: 408".
- The HTTP status code '408' is the clue for the next puzzle.

Notes for organizers:
- The server deliberately sleeps 3 seconds before responding with 408.
- This gives participants the realistic experience of a hanging/slow request.
- Runs on port 8005 by default.
