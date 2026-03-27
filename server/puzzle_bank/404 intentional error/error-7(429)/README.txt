429 Too Many Requests Puzzle - README

How to run:
1. Extract this folder and open a terminal in the folder.
2. Start the server: python3 run_server.py
3. Open http://localhost:8007/index.html in your browser.

Task for participants:
- Edit only 'index.html' and make exactly ONE change so that the server
  responds saying you are being rate-limited.

  Allowed change:
    * Change the link href from  pages/search.html
                              to  pages/bulk-search.html

- After making the change, click the link.
- The page will show "429 Too Many Requests" and "Clue: 429".
- The HTTP status code '429' is the clue for the next puzzle.

Notes for organizers:
- The server also sends a Retry-After: 60 header to simulate a real rate-limit response.
- 429 is commonly encountered when hitting API limits — great real-world teaching moment.
- Runs on port 8007 by default.
