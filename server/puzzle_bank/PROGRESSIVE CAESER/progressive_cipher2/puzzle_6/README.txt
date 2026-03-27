Progressive Caesar Cipher — Puzzle 6
========================================

Rule:
- Each letter in the plaintext is shifted by its position index (1st letter +1, 2nd +2, etc.)
- Spaces and punctuation are copied unchanged and do NOT advance the shift counter.
- Alphabet wraps around (Z + 2 -> B).

Cipher to decode:
    UJH IFMSM QKD XNBSUU

Progressive shifts (letters only):
    T(+1) H(+2) E(+3)   E(+4) A(+5) G(+6) L(+7) E(+8)   H(+9) A(+10) S(+11)   L(+12) A(+13) N(+14) D(+15) E(+16) D(+17)

Plaintext:
    THE EAGLE HAS LANDED

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
   Should output: THE EAGLE HAS LANDED

2) Verify your answer interactively:
       python verifier.py

3) Encode your own text:
       python encrypt.py "YOUR TEXT HERE"

Notes:
- Shifts wrap around modulo 26.
- Only A-Z letters are shifted; digits, spaces, punctuation pass through unchanged.
