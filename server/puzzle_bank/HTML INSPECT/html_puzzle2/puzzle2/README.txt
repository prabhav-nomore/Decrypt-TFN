PUZZLE 2 — The Art Gallery
============================

Files:
  • puzzle2.html   — the puzzle page
  • verifier2.py  — answer checker
  • solution2.txt — organiser solution (keep hidden from participants!)

Participant Instructions:
  1. Open puzzle2.html in your browser.
  2. The painting has no visible label — but the CSS knows its name.
  3. Open DevTools (F12) and explore the Styles panel, or View Page Source.
  4. Look for CSS variables and invisible elements.
  5. Verify your answer:
       python verifier2.py

Hint for participants:
  "The answer is a colour. Inspect the stylesheet — CSS variables tell the truth."

Expected answer format: One word colour name, e.g. COBALT
Technique covered: CSS custom properties (--variables), hidden span (opacity:0)
Difficulty: ⭐ Beginner
