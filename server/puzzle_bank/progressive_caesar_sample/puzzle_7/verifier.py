# verifier.py — input check for puzzle 7
SECRET = "BURN ALL THE LETTERS"
attempt = input("Enter the decoded phrase: ").strip().upper()
if attempt == SECRET:
    print("✅ Correct! The plaintext is: BURN ALL THE LETTERS")
else:
    print("❌ Incorrect. Try again.")
