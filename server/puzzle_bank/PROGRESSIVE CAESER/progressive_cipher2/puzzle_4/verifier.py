# verifier.py — input check for puzzle 4
SECRET = "STRIKE AT MIDNIGHT"
attempt = input("Enter the decoded phrase: ").strip().upper()
if attempt == SECRET:
    print("✅ Correct! The plaintext is: STRIKE AT MIDNIGHT")
else:
    print("❌ Incorrect. Try again.")
