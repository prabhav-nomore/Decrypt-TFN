# verifier.py — input check for puzzle 9
SECRET = "TRUST NO ONE HERE"
attempt = input("Enter the decoded phrase: ").strip().upper()
if attempt == SECRET:
    print("✅ Correct! The plaintext is: TRUST NO ONE HERE")
else:
    print("❌ Incorrect. Try again.")
