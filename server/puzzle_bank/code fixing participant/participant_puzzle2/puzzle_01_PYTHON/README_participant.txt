Fix-the-Errors Puzzle #1 (Participant)
=============================================

Files included:
  - buggy_puzzle.py   : Python script with intentional bugs.
  - secret.bin        : Encoded binary data (DO NOT edit).

Goal:
  Fix all bugs in buggy_puzzle.py so it runs correctly.
  When fixed, it should print the hidden decoded word.

XOR Key: 0x3F

Rules:
  - DO NOT modify secret.bin
  - Work only on buggy_puzzle.py (Python 3.8+)
  - No AI assistance unless using an official lifeline

Hints:
  1. Open 'secret.bin' in binary mode ('rb'), not text mode.
  2. Iterating over bytes gives integers — do NOT call ord() on them.
  3. Check all variable names carefully for typos.

How to run (after fixing):
  cd path/to/puzzle_01_PYTHON/
  python buggy_puzzle.py

Deliverable format:
  FIXKEY: <WORD>
  Example: FIXKEY: TREASURE

Good luck!
