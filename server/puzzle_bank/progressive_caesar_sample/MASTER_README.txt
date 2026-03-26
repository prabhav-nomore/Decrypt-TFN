Progressive Caesar Cipher — COMPLETE PUZZLE PACK (9 Puzzles)
=============================================================

HOW THE CIPHER WORKS
---------------------
- Each letter is shifted by its position number in the message (ignoring spaces/punctuation).
- 1st letter shifts by +1, 2nd by +2, 3rd by +3 ... and so on.
- Spaces and punctuation are copied unchanged and do NOT advance the shift counter.
- The alphabet wraps around modulo 26 (e.g. Z + 2 = B).

Example (from the original sample):
    Plaintext:  MEET AT NOON
    Shifts:     M(+1) E(+2) E(+3) T(+4)  A(+5) T(+6)  N(+7) O(+8) O(+9) N(+10)
    Ciphertext: NGHX FZ UWXX

=============================================================
ALL 9 PUZZLES — QUICK REFERENCE (organizer only!)
=============================================================

Puzzle | Ciphertext                  | Plaintext
-------|-----------------------------|----------------------
  1    | IKGI YNL SNI                | HIDE THE KEY
  2    | ECZR GXLITC DABB            | DAWN BREAKS SOON
  3    | GQOPTC APN BTHRF            | FOLLOW THE RIVER
  4    | TVUMPK HB VSOZVUWJ          | STRIKE AT MIDNIGHT
  5    | MQFO YNL NAYYF TOIU         | LOCK THE FRONT GATE
  6    | UJH IFMSM QKD XNBSUU        | THE EAGLE HAS LANDED
  7    | CWUR FRS BQO WQGHTHJ        | BURN ALL THE LETTERS
  8    | TGQH MKSX WYH               | SEND HELP NOW
  9    | UTXWY TV WWO SQES           | TRUST NO ONE HERE

=============================================================
HOW EACH PUZZLE FOLDER IS STRUCTURED
=============================================================

Each puzzle_N/ folder contains:
  cipher.txt      — the ciphertext participants must decode
  plaintext.txt   — the answer (KEEP HIDDEN from participants)
  encrypt.py      — encodes any text with Progressive Caesar
  decrypt.py      — decodes Progressive Caesar back to plaintext
  verifier.py     — interactive answer checker
  README.txt      — puzzle-specific instructions and step breakdown

=============================================================
HOW TO RUN
=============================================================

Decode a cipher:
    cd puzzle_1
    python decrypt.py cipher.txt

Verify an answer interactively:
    python verifier.py

Encode your own message:
    python encrypt.py "YOUR SECRET MESSAGE"

=============================================================
SUGGESTED CHAIN ORDER
=============================================================

Use as a sequence — each puzzle's plaintext is the clue/key to unlock
the next envelope/folder:

  [Puzzle 1] HIDE THE KEY
      -> [Puzzle 2] DAWN BREAKS SOON
          -> [Puzzle 3] FOLLOW THE RIVER
              -> [Puzzle 4] STRIKE AT MIDNIGHT
                  -> [Puzzle 5] LOCK THE FRONT GATE
                      -> [Puzzle 6] THE EAGLE HAS LANDED
                          -> [Puzzle 7] BURN ALL THE LETTERS
                              -> [Puzzle 8] SEND HELP NOW
                                  -> [Puzzle 9] TRUST NO ONE HERE -> FINISH

=============================================================
ORGANIZER TIPS
=============================================================

- Delete or hide plaintext.txt from each folder before handing out to participants.
- For extra difficulty, do NOT share this MASTER_README.txt — keep it organizer-only.
- Participants can use decrypt.py to check their work, or verifier.py for a yes/no check.
- The shift rule is always the same across all puzzles — only the message changes.
- You can increase difficulty by giving only cipher.txt and no script files,
  forcing participants to decode manually using pen and paper.
- Combine with the HTTP puzzle packs: use an HTTP status code as a numeric hint
  (e.g. "shift count starts at the answer to the 404 puzzle").
