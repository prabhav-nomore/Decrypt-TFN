# verifier.py — input check for puzzle 1
SECRET = "HIDE THE KEY"
attempt = input("Enter the decoded phrase: ").strip().upper()
if attempt == SECRET:
    print("✅ Correct! The plaintext is: HIDE THE KEY")
else:
    print("❌ Incorrect. Try again.")
