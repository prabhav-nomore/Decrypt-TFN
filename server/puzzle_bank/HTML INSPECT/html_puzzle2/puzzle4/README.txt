PUZZLE 4 — Museum of Curiosities
==================================

Files:
  • puzzle4.html   — the puzzle page
  • verifier4.py  — answer checker
  • solution4.txt — organiser solution (keep hidden from participants!)

Participant Instructions:
  1. Open puzzle4.html in your browser.
  2. Three exhibits are displayed. Each HTML element holds a hidden fragment.
  3. Open DevTools (F12) → Elements tab.
  4. Click on each exhibit <div> and look for data-* attributes in the inspector.
  5. Note the data-order value to know the correct sequence.
  6. Combine all fragments in order (no spaces) and verify:
       python verifier4.py

Hint for participants:
  "HTML elements can carry invisible data. Inspect each exhibit's attributes — 
   order matters."

Expected answer format: Combined fragments with no spaces, e.g. AMBERSTONEGATE
Technique covered: HTML data-* custom attributes (data-fragment, data-order)
Difficulty: ⭐⭐ Intermediate
