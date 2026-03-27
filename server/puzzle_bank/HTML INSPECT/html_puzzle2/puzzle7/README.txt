PUZZLE 7 — Mission Control
============================

Files:
  • puzzle7.html   — the puzzle page
  • verifier7.py  — answer checker
  • solution7.txt — organiser solution (keep hidden from participants!)

Participant Instructions:
  1. Open puzzle7.html in your browser.
  2. A mission control panel is displayed. The abort code is redacted.
  3. Open DevTools (F12) → Console tab.
  4. Type: missionConfig   and press Enter to inspect the JavaScript object.
     OR use View Page Source and scroll to the <script> section.
  5. Find the abort code and verify:
       python verifier7.py

Hint for participants:
  "The display has been redacted. But JavaScript variables are never truly hidden — 
   open the Console and inspect the mission configuration object."

Expected answer format: One word code, e.g. ZENITH
Technique covered: JavaScript inline variables, Browser Console inspection
Difficulty: ⭐⭐⭐ Advanced
