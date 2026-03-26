HTTP Error Code Puzzle Pack - COMPLETE MASTER README
====================================================

This collection contains 10 puzzles spread across two packs.
Each puzzle teaches a different HTTP status code through hands-on discovery.
Participants make exactly ONE edit to index.html to trigger the target error.

====================================================
PACK 1  (puzzle_404, puzzle_301, puzzle_403, puzzle_500)
====================================================

Puzzle       | Code | Port  | Concept
-------------|------|-------|--------------------------------------------------
puzzle_404   | 404  | 8000  | Not Found        - trigger a missing resource
puzzle_301   | 301  | 8001  | Moved Perm.      - trigger a redirect
puzzle_403   | 403  | 8002  | Forbidden        - trigger an access denial
puzzle_500   | 500  | 8003  | Server Error     - trigger a server crash

====================================================
PACK 2  (puzzle_401, puzzle_408, puzzle_410, puzzle_429, puzzle_503, puzzle_418)
====================================================

Puzzle       | Code | Port  | Concept
-------------|------|-------|--------------------------------------------------
puzzle_401   | 401  | 8004  | Unauthorized     - trigger an authentication wall
puzzle_408   | 408  | 8005  | Request Timeout  - trigger a slow/hanging request
puzzle_410   | 410  | 8006  | Gone             - trigger a permanently deleted resource
puzzle_429   | 429  | 8007  | Too Many Reqs    - trigger a rate limit block
puzzle_503   | 503  | 8008  | Unavailable      - trigger a maintenance shutdown
puzzle_418   | 418  | 8009  | I'm a Teapot     - trigger the famous easter egg code

====================================================
SUGGESTED FULL CHAIN (all 10 puzzles)
====================================================

Use as a chain — each puzzle's HTTP code unlocks the next puzzle folder.

  START
    |
    v
  [404] Not Found          port 8000   -> clue: 404
    |
    v
  [401] Unauthorized       port 8004   -> clue: 401
    |
    v
  [403] Forbidden          port 8002   -> clue: 403
    |
    v
  [408] Request Timeout    port 8005   -> clue: 408
    |
    v
  [410] Gone               port 8006   -> clue: 410
    |
    v
  [429] Too Many Requests  port 8007   -> clue: 429
    |
    v
  [500] Server Error       port 8003   -> clue: 500
    |
    v
  [503] Service Unavail.   port 8008   -> clue: 503
    |
    v
  [301] Moved Permanently  port 8001   -> clue: 301
    |
    v
  [418] I'm a Teapot       port 8009   -> clue: 418  (grand finale!)
    |
    v
  FINISH

====================================================
HOW EACH PUZZLE WORKS
====================================================

1. Open the puzzle folder in a terminal.
2. Run:   python3 run_server.py
3. Open the localhost URL shown (e.g. http://localhost:8000/index.html).
4. Read the HTML comment inside index.html for the task hint.
5. Make EXACTLY ONE edit to index.html (change the href or img src).
6. Click the link / reload — read the HTTP status code from the page body.
7. That status code is the clue that unlocks the next puzzle.

====================================================
QUICK REFERENCE — ALL EDITS AT A GLANCE
====================================================

Puzzle  | Change this href / src           | To this
--------|----------------------------------|---------------------------------
404     | images/logo.png                  | images/missing.png
         OR pages/info.html               | pages/missing.html
301     | pages/archive.html              | pages/old-archive.html
403     | pages/public-report.html        | pages/secret-report.html
500     | pages/process.html              | pages/crash.html
401     | pages/dashboard.html            | pages/members-only.html
408     | pages/results.html              | pages/slow-results.html
410     | pages/newsletter.html           | pages/deleted-newsletter.html
429     | pages/search.html               | pages/bulk-search.html
503     | pages/booking.html              | pages/booking-v2.html
418     | pages/coffee.html               | pages/tea.html

====================================================
ORGANIZER TIPS
====================================================

- All 10 servers use unique ports (8000-8009) so every puzzle can run
  simultaneously — great for parallel team challenges.

- Each puzzle folder contains:
    index.html      — the page participants edit
    run_server.py   — the custom server returning the target status code
    README.txt      — instructions for that specific puzzle
    solutions.txt   — the exact edit needed (organizer reference)
    pages/          — linked HTML pages
    images/         — logo image

- To increase difficulty: remove "Clue: XXX" from the response body in
  run_server.py so participants must read the status from DevTools -> Network.

- Bonus challenge for 429: point participants to the Retry-After response
  header visible in DevTools -> Network -> Headers.

- Bonus challenge for 418: ask participants why 418 is a real HTTP code
  and which famous websites return it. (Answer: RFC 2324, April Fools' 1998;
  Google, npm, Cloudflare and others return it as an easter egg.)

- 401 vs 403 teaching moment:
    401 = "Who are you? Please log in first."
    403 = "I know who you are — you're just not allowed here."

- 404 vs 410 teaching moment:
    404 = "I can't find it — maybe it never existed or moved."
    410 = "It existed, and it was intentionally deleted. It's not coming back."

- 500 vs 503 teaching moment:
    500 = "The server crashed unexpectedly."
    503 = "The server is intentionally offline (maintenance/overload)."
