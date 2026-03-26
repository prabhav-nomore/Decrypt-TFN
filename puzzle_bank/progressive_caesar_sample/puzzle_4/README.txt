Progressive Caesar Cipher — Puzzle 4
========================================

Rule:
- Each letter in the plaintext is shifted by its position index (1st letter +1, 2nd +2, etc.)
- Spaces and punctuation are copied unchanged and do NOT advance the shift counter.
- Alphabet wraps around (Z + 2 -> B).

Cipher to decode:
    TVUMPK HB VSOZVUWJ

Progressive shifts (letters only):
    S(+1) T(+2) R(+3) I(+4) K(+5) E(+6)   A(+7) T(+8)   M(+9) I(+10) D(+11) N(+12) I(+13) G(+14) H(+15) T(+16)

Plaintext:
    STRIKE AT MIDNIGHT

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
   Should output: STRIKE AT MIDNIGHT

2) Verify your answer interactively:
       python verifier.py

3) Encode your own text:
       python encrypt.py "YOUR TEXT HERE"

Notes:
- Shifts wrap around modulo 26.
- Only A-Z letters are shifted; digits, spaces, punctuation pass through unchanged.
