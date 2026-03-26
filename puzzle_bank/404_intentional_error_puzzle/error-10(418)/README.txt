418 I'm a Teapot Puzzle - README

How to run:
1. Extract this folder and open a terminal in the folder.
2. Start the server: python3 run_server.py
3. Open http://localhost:8009/index.html in your browser.

Task for participants:
- Edit only 'index.html' and make exactly ONE change so that the server
  refuses your request because it is a teapot and cannot brew coffee.

  Allowed change:
    * Change the link href from  pages/coffee.html
                              to  pages/tea.html

- After making the change, click the link.
- The page will show "418 I'm a Teapot" and "Clue: 418".
- The HTTP status code '418' is the clue for the next puzzle.

Notes for organizers:
- 418 is a REAL HTTP status code, defined in RFC 2324 (April Fools' 1998).
- It stands for "Hyper Text Coffee Pot Control Protocol" — a joke standard.
- Many production servers (Google, Cloudflare) implement 418 as an easter egg.
- This makes a great fun finale or icebreaker puzzle in the series.
- Runs on port 8009 by default.
