Progressive Caesar Cipher — Puzzle 2
========================================

Rule:
- Each letter in the plaintext is shifted by its position index (1st letter +1, 2nd +2, etc.)
- Spaces and punctuation are copied unchanged and do NOT advance the shift counter.
- Alphabet wraps around (Z + 2 -> B).

Cipher to decode:
    ECZR GXLITC DABB

Progressive shifts (letters only):
    D(+1) A(+2) W(+3) N(+4)   B(+5) R(+6) E(+7) A(+8) K(+9) S(+10)   S(+11) O(+12) O(+13) N(+14)

Plaintext:
    DAWN BREAKS SOON

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
   Should output: DAWN BREAKS SOON

2) Verify your answer interactively:
       python verifier.py

3) Encode your own text:
       python encrypt.py "YOUR TEXT HERE"

Notes:
- Shifts wrap around modulo 26.
- Only A-Z letters are shifted; digits, spaces, punctuation pass through unchanged.
