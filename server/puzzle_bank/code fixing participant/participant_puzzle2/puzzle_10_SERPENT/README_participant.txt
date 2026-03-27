Fix-the-Errors Puzzle #10 (Participant)
=============================================

Files included:
  - buggy_puzzle.py   : Python script with intentional bugs.
  - secret.bin        : Encoded binary data (DO NOT edit).

Goal:
  Fix all bugs in buggy_puzzle.py so it runs correctly.
  When fixed, it should print the hidden decoded word.

XOR Key: 0x4A

Rules:
  - DO NOT modify secret.bin
  - Work only on buggy_puzzle.py (Python 3.8+)
  - No AI assistance unless using an official lifeline

Hints:
  1. Apply XOR to the integer b, then convert the result with chr() — not the other way around.
  2. A function that has no return statement returns None — add 'return out'.
  3. main() is defined with no parameters — do not pass arguments when calling it.

How to run (after fixing):
  cd path/to/puzzle_10_SERPENT/
  python buggy_puzzle.py

Deliverable format:
  FIXKEY: <WORD>
  Example: FIXKEY: TREASURE

Good luck!
