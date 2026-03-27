Audio Morse Cipher - Puzzle #3

Files included:
- morse_WAVE.wav             : audio file encoding the secret word in Morse code.
- morse_table.txt         : quick Morse code table for letters.
- decode_with_audacity.txt: step-by-step instructions to view and decode using Audacity.
- decode_with_python.py   : Python script to print pulse timings (not an auto-decoder).
- verifier.py             : enter your answer to check if it is correct.

Hint: 4-letter word. Motion in water or signal.

What is Morse code?
- Morse uses dots (.) and dashes (-). Each letter is a sequence of dots & dashes.
- In this puzzle, timing is:
    dot                            = 0.12 s
    dash                           = 0.36 s  (3x dot)
    gap between symbols (in letter)= 0.12 s
    gap between letters            = 0.36 s
    gap between words              = 0.84 s
- Audio duration of this puzzle: 3.96 s

How to decode (beginner, using only your ears):
1. Play morse_WAVE.wav (double-click or use any media player).
2. Listen: short beep = dot (.), long beep = dash (-).
3. Pause between beeps = same letter. Longer pause = new letter.
4. Convert the dots/dashes to letters using morse_table.txt.
5. Enter the decoded word into verifier.py to check.

How to decode (visual method using Audacity - recommended):
1. Install Audacity (free) from https://www.audacityteam.org/
2. Open morse_WAVE.wav in Audacity.
3. Zoom in to see short (dot) and long (dash) pulses.
4. Translate pulses to dots/dashes, then to letters.

Simple Python helper:
- Run:  python decode_with_python.py
- It prints each tone and silence duration to help you identify dots and dashes.

Verifier:
How to run the verifier:
Open a terminal/command prompt -> navigate to the folder using cd <your_folder_path> -> run:
python verifier.py

Good luck!
