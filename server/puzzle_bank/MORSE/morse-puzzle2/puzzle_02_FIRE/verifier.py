# verifier.py - Audio Morse Cipher puzzle #2
SECRET = "FIRE"
ans = input("Enter the decoded word: ").strip().upper()
if ans == SECRET:
    print("Correct! Well done!")
else:
    print("Incorrect. Try again.")
