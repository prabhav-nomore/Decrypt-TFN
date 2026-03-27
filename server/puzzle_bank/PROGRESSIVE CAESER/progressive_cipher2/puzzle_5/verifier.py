# verifier.py — input check for puzzle 5
SECRET = "LOCK THE FRONT GATE"
attempt = input("Enter the decoded phrase: ").strip().upper()
if attempt == SECRET:
    print("✅ Correct! The plaintext is: LOCK THE FRONT GATE")
else:
    print("❌ Incorrect. Try again.")
