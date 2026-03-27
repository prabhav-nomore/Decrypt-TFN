PUZZLE 8 — The Library Archive
================================

Files:
  • puzzle8.html   — the puzzle page
  • verifier8.py  — answer checker
  • solution8.txt — organiser solution (keep hidden from participants!)

Participant Instructions:
  1. Open puzzle8.html in your browser.
  2. A bookshelf with four books is displayed.
  3. Open DevTools (F12) → Elements tab.
  4. Click on each book element and look at the aria-label attribute.
     One book has more than just a title in its label.
  5. Extract the secret word and verify:
       python verifier8.py

Hint for participants:
  "Screen readers read more than you see. Inspect the ARIA labels on each book — 
   one volume carries a hidden inscription."

Expected answer format: One word, e.g. SOLSTICE
Technique covered: HTML aria-label accessibility attributes
Difficulty: ⭐⭐⭐ Advanced
