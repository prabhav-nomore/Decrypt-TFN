410 Gone Puzzle - README

How to run:
1. Extract this folder and open a terminal in the folder.
2. Start the server: python3 run_server.py
3. Open http://localhost:8006/index.html in your browser.

Task for participants:
- Edit only 'index.html' and make exactly ONE change so that the server
  responds saying the resource is permanently gone.

  Allowed change:
    * Change the link href from  pages/newsletter.html
                              to  pages/deleted-newsletter.html

- After making the change, click the link.
- The page will show "410 Gone" and "Clue: 410".
- The HTTP status code '410' is the clue for the next puzzle.

Notes for organizers:
- 410 is different from 404: 404 = "not found (maybe temporary)", 410 = "gone forever".
- This is a great teaching moment about the semantic difference between the two.
- Runs on port 8006 by default.
