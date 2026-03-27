Fix-the-Errors Puzzle #3 (Participant)
=============================================

Files included:
  - buggy_puzzle.py   : Python script with intentional bugs.
  - secret.bin        : Encoded binary data (DO NOT edit).

Goal:
  Fix all bugs in buggy_puzzle.py so it runs correctly.
  When fixed, it should print the hidden decoded word.

XOR Key: 0x71

Rules:
  - DO NOT modify secret.bin
  - Work only on buggy_puzzle.py (Python 3.8+)
  - No AI assistance unless using an official lifeline

Hints:
  1. Call f.read() with parentheses — without them you get the function object, not data.
  2. Return ''.join(out) from decode(), not the raw list.
  3. Indentation matters — the main() call must be indented inside the if block.

How to run (after fixing):
  cd path/to/puzzle_03_CIPHER/
  python buggy_puzzle.py

Deliverable format:
  FIXKEY: <WORD>
  Example: FIXKEY: TREASURE

Good luck!
