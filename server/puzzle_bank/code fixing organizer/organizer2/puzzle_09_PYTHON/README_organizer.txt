Fix-the-Errors Puzzle #9 — Organizer Pack
================================================

Files included:
  - solution.py          : Fixed script that decodes secret.bin (organizer reference only)
  - verifier.py          : Command-line tool to check participant submissions
  - secret.bin           : The encoded secret (same file given to participants)

Hidden Word  : PYTHON
XOR Key      : 0x3F
Encoded Bytes: [111, 102, 107, 119, 112, 113]

Usage:
  1) Reveal the decoded secret (for your reference):
       python solution.py
     Output: Decoded message -> PYTHON

  2) Verify a participant submission:
       python verifier.py PYTHON
     Output: ✅ Correct submission.

       python verifier.py WRONGWORD
     Output: ❌ Incorrect. Expected: PYTHON

  3) Batch verify from a list (one submission per line in submissions.txt):
       python verifier.py $(cat submissions.txt | head -1)

Security Notes:
  - Keep solution.py and verifier.py secure; do NOT share with participants.
  - Distribute only: buggy_puzzle.py, secret.bin, README_participant.txt
  - The verifier check is case-insensitive.

Expected participant deliverable format:
  FIXKEY: <WORD>
  Example: FIXKEY: PYTHON
