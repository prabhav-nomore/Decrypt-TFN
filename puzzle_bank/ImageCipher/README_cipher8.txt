Image Cipher #8 — Even Scanlines
================================

Files included:
  • cipher8.png          — the puzzle image
  • README_cipher8.txt   — this file

Participant instructions:
  1) Open cipher8.png using an image editor or script
  2) Extract only the EVEN-numbered rows (row 0, 2, 4, 6 ...)
     and discard all ODD rows (row 1, 3, 5, 7 ...)
  3) Boost brightness/contrast on the remaining rows
  4) The hidden message will become visible

  Quick Python solve:
      from PIL import Image
      import numpy as np
      img = np.array(Image.open("cipher8.png"))
      even = img[::2, :, :]          # keep only even rows
      Image.fromarray(even).save("solved.png")

Hidden message format:  ROW: <WORD>

Hint: The image says "SCAN THE STATIC." Think about how a TV scan works.
      Half the lines carry the real signal.
