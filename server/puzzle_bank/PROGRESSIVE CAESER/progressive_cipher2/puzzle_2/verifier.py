# verifier.py — input check for puzzle 2
SECRET = "DAWN BREAKS SOON"
attempt = input("Enter the decoded phrase: ").strip().upper()
if attempt == SECRET:
    print("✅ Correct! The plaintext is: DAWN BREAKS SOON")
else:
    print("❌ Incorrect. Try again.")
