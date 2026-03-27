Fix-the-Errors Puzzle #2 (Participant)
=============================================

Files included:
  - buggy_puzzle.py   : Python script with intentional bugs.
  - secret.bin        : Encoded binary data (DO NOT edit).

Goal:
  Fix all bugs in buggy_puzzle.py so it runs correctly.
  When fixed, it should print the hidden decoded word.

XOR Key: 0x2B

Rules:
  - DO NOT modify secret.bin
  - Work only on buggy_puzzle.py (Python 3.8+)
  - No AI assistance unless using an official lifeline

Hints:
  1. Make sure read_data() actually returns its result.
  2. The XOR key to decode is 0x2B — use the same key used to encode.
  3. Use print() as a function call, not print.write().

How to run (after fixing):
  cd path/to/puzzle_02_DRAGON/
  python buggy_puzzle.py

Deliverable format:
  FIXKEY: <WORD>
  Example: FIXKEY: TREASURE

Good luck!
