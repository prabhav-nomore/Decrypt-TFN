503 Service Unavailable Puzzle - README

How to run:
1. Extract this folder and open a terminal in the folder.
2. Start the server: python3 run_server.py
3. Open http://localhost:8008/index.html in your browser.

Task for participants:
- Edit only 'index.html' and make exactly ONE change so that the server
  responds saying the service is down for maintenance.

  Allowed change:
    * Change the link href from  pages/booking.html
                              to  pages/booking-v2.html

- After making the change, click the link.
- The page will show "503 Service Unavailable" and "Clue: 503".
- The HTTP status code '503' is the clue for the next puzzle.

Notes for organizers:
- 503 means the server is running but the requested service is not available right now.
- Unlike 500 (unexpected crash), 503 is an intentional/planned unavailability.
- The server sends Retry-After: 3600 to simulate a 1-hour maintenance window.
- Runs on port 8008 by default.
