# verifier.py - Audio Morse Cipher puzzle #1
SECRET = "CODE"
ans = input("Enter the decoded word: ").strip().upper()
if ans == SECRET:
    print("Correct! Well done!")
else:
    print("Incorrect. Try again.")
