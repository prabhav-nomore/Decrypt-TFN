Progressive Caesar Cipher — Puzzle 7
========================================

Rule:
- Each letter in the plaintext is shifted by its position index (1st letter +1, 2nd +2, etc.)
- Spaces and punctuation are copied unchanged and do NOT advance the shift counter.
- Alphabet wraps around (Z + 2 -> B).

Cipher to decode:
    CWUR FRS BQO WQGHTHJ

Progressive shifts (letters only):
    B(+1) U(+2) R(+3) N(+4)   A(+5) L(+6) L(+7)   T(+8) H(+9) E(+10)   L(+11) E(+12) T(+13) T(+14) E(+15) R(+16) S(+17)

Plaintext:
    BURN ALL THE LETTERS

Files in this folder:
- cipher.txt       -> the ciphertext to decode
- plaintext.txt    -> the answer (organizer reference — keep hidden from participants!)
- encrypt.py       -> encodes any text using Progressive Caesar
- decrypt.py       -> decodes Progressive Caesar back to plaintext
- verifier.py      -> asks for the decoded phrase and verifies
- README.txt       -> this file

How to use:
1) Decode the cipher:
       python decrypt.py cipher.txt
   Should output: BURN ALL THE LETTERS

2) Verify your answer interactively:
       python verifier.py

3) Encode your own text:
       python encrypt.py "YOUR TEXT HERE"

Notes:
- Shifts wrap around modulo 26.
- Only A-Z letters are shifted; digits, spaces, punctuation pass through unchanged.
