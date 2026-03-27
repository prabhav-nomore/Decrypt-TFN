Fix-the-Errors Puzzle #7 — Organizer Pack
================================================

Files included:
  - solution.py          : Fixed script that decodes secret.bin (organizer reference only)
  - verifier.py          : Command-line tool to check participant submissions
  - secret.bin           : The encoded secret (same file given to participants)

Hidden Word  : NEBULA
XOR Key      : 0x66
Encoded Bytes: [40, 35, 36, 51, 42, 39]

Usage:
  1) Reveal the decoded secret (for your reference):
       python solution.py
     Output: Decoded message -> NEBULA

  2) Verify a participant submission:
       python verifier.py NEBULA
     Output: ✅ Correct submission.

       python verifier.py WRONGWORD
     Output: ❌ Incorrect. Expected: NEBULA

  3) Batch verify from a list (one submission per line in submissions.txt):
       python verifier.py $(cat submissions.txt | head -1)

Security Notes:
  - Keep solution.py and verifier.py secure; do NOT share with participants.
  - Distribute only: buggy_puzzle.py, secret.bin, README_participant.txt
  - The verifier check is case-insensitive.

Expected participant deliverable format:
  FIXKEY: <WORD>
  Example: FIXKEY: NEBULA
