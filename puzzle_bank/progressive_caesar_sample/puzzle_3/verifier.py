# verifier.py — input check for puzzle 3
SECRET = "FOLLOW THE RIVER"
attempt = input("Enter the decoded phrase: ").strip().upper()
if attempt == SECRET:
    print("✅ Correct! The plaintext is: FOLLOW THE RIVER")
else:
    print("❌ Incorrect. Try again.")
