# verifier.py — input check for puzzle 8
SECRET = "SEND HELP NOW"
attempt = input("Enter the decoded phrase: ").strip().upper()
if attempt == SECRET:
    print("✅ Correct! The plaintext is: SEND HELP NOW")
else:
    print("❌ Incorrect. Try again.")
