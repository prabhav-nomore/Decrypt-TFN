Book Cipher Puzzle #8
========================================

Instructions
------------
You are given a file containing coordinates in the format:

  page:word:letter

Example: 3:5:2 → go to page 3, take the 5th word, extract its 2nd letter.

Steps:
  1. Open book.txt and navigate to the correct page.
  2. Find the correct word (words are numbered left to right, 1-based).
  3. Pick the correct letter (letters are numbered left to right, 1-based).
  4. Collect all extracted letters in order.
  5. The letters form the hidden secret word.

Your Coordinates (from coords.txt):
2:10:1
2:9:1
2:9:1
2:14:1
3:14:1

Files included:
  - book.txt               : The book used for this puzzle (6 pages)
  - coords.txt             : Your coordinate clues
  - decode_book_cipher.py  : Python decoder — run it to check your manual work
  - verifier.py            : Enter your answer to verify it

How to run the decoder:
  cd path/to/puzzle_08_ARROW/
  python decode_book_cipher.py

How to verify your answer:
  python verifier.py
  -> Enter the decoded word when prompted

Deliverable format:
  BOOKKEY: <WORD>
  Example: BOOKKEY: TREASURE

Good luck!
