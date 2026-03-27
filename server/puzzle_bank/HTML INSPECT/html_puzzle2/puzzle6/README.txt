PUZZLE 6 — The Painter's Studio
=================================

Files:
  • puzzle6.html   — the puzzle page
  • verifier6.py  — answer checker
  • solution6.txt — organiser solution (keep hidden from participants!)

Participant Instructions:
  1. Open puzzle6.html in your browser.
  2. Five colour swatches are displayed. Four have visible titles; the fifth has "???".
  3. Open DevTools (F12) → Elements tab.
  4. Click on the mystery fifth swatch and inspect its HTML attributes.
  5. Find the pigment name and verify:
       python verifier6.py

Hint for participants:
  "The fifth swatch refuses to reveal its name visually. But its HTML element 
   carries the truth in a data attribute."

Expected answer format: One word colour/pigment name, e.g. VERMILION
Technique covered: HTML data-* attributes on visual elements
Difficulty: ⭐⭐ Intermediate
