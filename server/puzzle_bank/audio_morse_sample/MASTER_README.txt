
================================================================================
  AUDIO MORSE CIPHER - MASTER GUIDE & DICTIONARY
================================================================================

WHAT IS MORSE CODE?
-------------------
Morse code is a method of encoding text using sequences of two signals:
  DOT  (.)  = a SHORT beep / signal
  DASH (-)  = a LONG  beep / signal  (3x the length of a dot)

Samuel Morse and Alfred Vail developed it in the 1830s for telegraph
communication. Today it is still used in aviation, amateur radio, and
emergency signalling (e.g., SOS = ... --- ...).

HOW TO LISTEN & DECODE
-----------------------
Timing used in these puzzles (identical for all 5):

  Signal type          Duration
  ─────────────────────────────────────
  Dot  (.)             0.12 s
  Dash (-)             0.36 s  (= 3 dots)
  Gap between symbols  0.12 s  (within same letter)
  Gap between letters  0.36 s  (= 3 dots)
  Gap between words    0.84 s  (= 7 dots)

Steps to decode:
  1. Play the WAV file.
  2. Listen: a short beep = dot (.), a long beep = dash (-).
  3. A short pause between beeps = same letter continues.
  4. A longer pause = new letter starts.
  5. A very long pause = new word (not used in single-word puzzles).
  6. Match the dot/dash sequence to the table below.
  7. Enter your answer into verifier.py.

QUICK REFERENCE - DOT/DASH MEANING
-------------------------------------
  One dot  (.)   = the letter E
  One dash (-)   = the letter T
  Short sequences tend to be common letters (E, T, A, I, N, M, S, R, H, ...).
  Long sequences are rarer letters (Q, Z, X, J, ...) or numbers.

================================================================================
  MORSE CODE COMPLETE DICTIONARY
================================================================================

  LETTERS
  ────────────────────────────────────────────────────────────────────────────
  A  .-      = dit dah
  B  -...    = dah dit dit dit
  C  -.-.    = dah dit dah dit
  D  -..     = dah dit dit
  E  .       = dit
  F  ..-.    = dit dit dah dit
  G  --.     = dah dah dit
  H  ....    = dit dit dit dit
  I  ..      = dit dit
  J  .---    = dit dah dah dah
  K  -.-     = dah dit dah
  L  .-..    = dit dah dit dit
  M  --      = dah dah
  N  -.      = dah dit
  O  ---     = dah dah dah
  P  .--.    = dit dah dah dit
  Q  --.-    = dah dah dit dah
  R  .-.     = dit dah dit
  S  ...     = dit dit dit
  T  -       = dah
  U  ..-     = dit dit dah
  V  ...-    = dit dit dit dah
  W  .--     = dit dah dah
  X  -..-    = dah dit dit dah
  Y  -.--    = dah dit dah dah
  Z  --..    = dah dah dit dit

  NUMBERS
  ────────────────────────────────────────────────────────────────────────────
  0  -----   = dah dah dah dah dah
  1  .----   = dit dah dah dah dah
  2  ..---   = dit dit dah dah dah
  3  ...--   = dit dit dit dah dah
  4  ....-   = dit dit dit dit dah
  5  .....   = dit dit dit dit dit
  6  -....   = dah dit dit dit dit
  7  --...   = dah dah dit dit dit
  8  ---.    = dah dah dah dit dit   (---..)
  9  ----.   = dah dah dah dah dit

  PROSIGNS & SPECIAL
  ────────────────────────────────────────────────────────────────────────────
  SOS   ...---...  (distress signal - no letter gaps, sent as one group)
  AR    .-.-.      end of message
  SK    ...-.-     end of contact

================================================================================
  VISUAL COMPARISON: DOT vs DASH
================================================================================

  DOT  ▏███▏ (short, ~0.12 s)
  DASH ▏█████████▏ (long, ~0.36 s = 3x dot)

  Example - word "HELP":
    H  = ....    (4 dots)
    E  = .       (1 dot)
    L  = .-..    (dot dash dot dot)
    P  = .--.    (dot dash dash dot)

  That is what morse_HELP.wav encodes (the sample file).

================================================================================
  THE 5 PUZZLE FILES
================================================================================

  Puzzle 01 | morse_CODE.wav  | 4-letter word
  Puzzle 02 | morse_FIRE.wav  | 4-letter word
  Puzzle 03 | morse_WAVE.wav  | 4-letter word
  Puzzle 04 | morse_STORM.wav | 5-letter word
  Puzzle 05 | morse_RADIO.wav | 5-letter word

  Each puzzle folder contains:
    morse_<WORD>.wav         - the audio puzzle (play this!)
    verifier.py              - enter your answer to check
    decode_with_python.py    - helper script to print pulse timings
    decode_with_audacity.txt - visual decoding guide using Audacity
    morse_table.txt          - quick letter reference card
    README.txt               - puzzle-specific instructions

  HOW TO RUN THE VERIFIER:
    Open a terminal/command prompt
    Navigate to the puzzle folder:  cd <path_to_folder>
    Run:  python verifier.py

================================================================================
  TIPS FOR BEGINNERS
================================================================================

  1. Start by listening to morse_HELP.wav (the sample) to train your ear.
     You already know the answer is HELP, so focus on recognising dot vs dash.

  2. Short beeps = dots. Long beeps = dashes. Simple!

  3. Count carefully: H = 4 dots (....),  S = 3 dots (...) - easy to confuse.

  4. Use decode_with_python.py to print the exact timing of pulses:
       python decode_with_python.py morse_CODE.wav
     Tones under ~0.2s are dots; tones over ~0.2s are dashes.

  5. Audacity (free) lets you SEE the waveform - zoom in and you can literally
     count dots and dashes visually. See decode_with_audacity.txt.

  6. The gap between letters is 3x the dot length. Listen for a noticeable
     pause to know when one letter ends and the next begins.

Good luck!
================================================================================
