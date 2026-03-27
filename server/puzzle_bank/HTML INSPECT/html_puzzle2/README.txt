HTML INSPECT ELEMENTS — 10 PUZZLE COLLECTION
=============================================

Each puzzle is in its own numbered folder (puzzle1/ through puzzle10/).
Every folder contains:
  • puzzleN.html  — the puzzle page (open in a browser)
  • verifierN.py  — the answer checker (run with Python 3)

HOW TO PLAY
-----------
1. Open the puzzleN.html file in any web browser.
2. Use browser DevTools to hunt for the hidden key:
     • Right-click → "Inspect" or "View Page Source"
     • Press F12 to open DevTools
3. Find the answer and verify it:
     cd puzzleN/
     python verifierN.py

PUZZLE GUIDE — TECHNIQUES COVERED
-----------------------------------

# | File         | Theme               | Hidden In                        | Answer
--|--------------|---------------------|----------------------------------|----------------
1 | puzzle1.html | The Lost Expedition | HTML comments + hidden div        | DRAGONFLY
2 | puzzle2.html | The Art Gallery     | CSS variable + invisible span     | COBALT
3 | puzzle3.html | Daily Weather       | <meta> tag (secret-code)          | CIPHER
4 | puzzle4.html | Museum of Curiosities | data-fragment attributes         | AMBERSTONEGATE
5 | puzzle5.html | The Login Vault     | Hidden <input type="hidden">      | NIGHTWATCH
6 | puzzle6.html | The Painter's Studio| data-pigment attribute on div     | VERMILION
7 | puzzle7.html | Mission Control     | JavaScript variable in <script>   | ZENITH
8 | puzzle8.html | The Library Archive | aria-label attribute on element   | SOLSTICE
9 | puzzle9.html | The Antique Shop    | title="" tooltip attribute        | OBSIDIAN
10| puzzle10.html| The Radio Tower     | HTML comment + <title> + html tag | ECLIPSE

ORGANISER NOTES
---------------
• Answers are case-insensitive in most verifiers (converted to uppercase).
• You may change the expected answer in each verifierN.py and update the
  corresponding HTML clue to run custom sessions.
• Puzzles are roughly ordered by difficulty (1 = easiest, 10 = hardest).
• Puzzles 1–3: Beginner — visible source and comments
• Puzzles 4–6: Intermediate — attributes and CSS
• Puzzles 7–10: Advanced — JS, ARIA, tooltips, document structure

TECHNIQUES REFERENCE (for participants)
----------------------------------------
• View Page Source:    Ctrl+U (Windows/Linux) | Cmd+U (Mac)
• DevTools Elements:  F12 → Elements tab
• DevTools Console:   F12 → Console tab (type variable names)
• Search in Source:   Ctrl+F in View Source window
• CSS Variables:      DevTools → Elements → :root → Computed
• data-* attributes:  Visible in DevTools Elements panel
• Hidden inputs:      Search for type="hidden" in source
• Meta tags:          In <head> section of source
• aria-label:         Attribute on any HTML element
• title attribute:    Hover over elements to see tooltip

Good luck!
