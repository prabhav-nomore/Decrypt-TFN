PUZZLE 10 — The Radio Tower
=============================

Files:
  • puzzle10.html   — the puzzle page
  • verifier10.py  — answer checker
  • solution10.txt — organiser solution (keep hidden from participants!)

Participant Instructions:
  1. Open puzzle10.html in your browser.
  2. A radio tower panel shows a redacted callsign.
  3. The callsign appears THREE times in the document — but NOT in the visible body.
  4. Use View Page Source (Ctrl+U) and explore:
       - The very top of the document (before <html>)
       - The <title> tag in <head>
       - HTML comments scattered through the page
  5. Find the callsign and verify:
       python verifier10.py

Hint for participants:
  "The callsign hides in the document's own bones — its tag, its title, its comments. 
   Look beyond the body."

Expected answer format: One word callsign, e.g. ECLIPSE
Technique covered: HTML document-level comments, <title> tag, <html> tag comments
Difficulty: ⭐⭐⭐ Advanced
