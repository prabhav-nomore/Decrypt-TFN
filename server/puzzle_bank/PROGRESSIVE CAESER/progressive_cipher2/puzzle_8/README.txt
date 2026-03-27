Progressive Caesar Cipher — Puzzle 8
========================================

Rule:
- Each letter in the plaintext is shifted by its position index (1st letter +1, 2nd +2, etc.)
- Spaces and punctuation are copied unchanged and do NOT advance the shift counter.
- Alphabet wraps around (Z + 2 -> B).

Cipher to decode:
    TGQH MKSX WYH

Progressive shifts (letters only):
    S(+1) E(+2) N(+3) D(+4)   H(+5) E(+6) L(+7) P(+8)   N(+9) O(+10) W(+11)

Plaintext:
    SEND HELP NOW

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
   Should output: SEND HELP NOW

2) Verify your answer interactively:
       python verifier.py

3) Encode your own text:
       python encrypt.py "YOUR TEXT HERE"

Notes:
- Shifts wrap around modulo 26.
- Only A-Z letters are shifted; digits, spaces, punctuation pass through unchanged.
