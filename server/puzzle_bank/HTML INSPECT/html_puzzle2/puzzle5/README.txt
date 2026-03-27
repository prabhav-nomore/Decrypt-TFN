PUZZLE 5 — The Login Vault
============================

Files:
  • puzzle5.html   — the puzzle page
  • verifier5.py  — answer checker
  • solution5.txt — organiser solution (keep hidden from participants!)

Participant Instructions:
  1. Open puzzle5.html in your browser.
  2. A login form is displayed. The Login button denies access.
  3. Open DevTools (F12) → Elements tab and search within the form.
  4. Look for <input> elements that are not visible on screen.
  5. Find the override token and verify:
       python verifier5.py

Hint for participants:
  "Forms often carry more data than they show. Not all inputs are visible — 
   inspect the form elements carefully."

Expected answer format: One word token, e.g. NIGHTWATCH
Technique covered: HTML hidden input fields (type="hidden")
Difficulty: ⭐⭐ Intermediate
