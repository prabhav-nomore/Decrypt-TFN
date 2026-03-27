301 Intentional Redirect Puzzle - README

How to run:
1. Extract this folder and open a terminal in the folder.
2. Start the server: python3 run_server.py
3. Open http://localhost:8001/index.html in your browser.

Task for participants:
- Edit only the file 'index.html' and make exactly ONE change so that clicking
  the link triggers a redirect response from the server.
  
  Allowed change:
    * Change the link href from  pages/archive.html
                              to  pages/old-archive.html

- After making the change, open DevTools -> Network tab, then click the link.
- Look for the request to pages/old-archive.html — its status code is 301.
- The HTTP status code '301' is the clue for the next puzzle.
- The page body also shows "Clue: 301" so you can read it even without DevTools.

Notes for organizers:
- The server (run_server.py) intercepts requests to /pages/old-archive.html
  and responds with HTTP 301, redirecting browsers to /pages/archive.html.
- Browsers follow redirects automatically; instruct participants to check the
  Network tab (preserve log / disable cache) to see the 301 response directly.
- Runs on port 8001 by default to avoid conflicting with the 404 puzzle.
