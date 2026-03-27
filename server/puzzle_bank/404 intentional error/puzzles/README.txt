
How to run:

Extract this folder and open a terminal in the folder.
Start the small server: python3 run_server.py
Open http://localhost:8000/index.html in your browser.
Task for participants:

Edit only the file index.html and make exactly ONE change so that a linked resource becomes missing.

Example allowed changes:

Change the img src to a non-existent filename (e.g., images/missing.png)
Change the link href to a non-existent page (e.g., pages/missing.html)
After making the change:
Reload the page
Open the missing resource directly
(Right-click broken image → Open image in new tab)
OR click the broken link
The server will return a 404 page.
The HTTP status code '404' is the clue for the next puzzle.

🔍 Hint:
Try changing a file path so that something does not load.