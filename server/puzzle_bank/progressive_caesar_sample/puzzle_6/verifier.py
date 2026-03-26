# verifier.py — input check for puzzle 6
SECRET = "THE EAGLE HAS LANDED"
attempt = input("Enter the decoded phrase: ").strip().upper()
if attempt == SECRET:
    print("✅ Correct! The plaintext is: THE EAGLE HAS LANDED")
else:
    print("❌ Incorrect. Try again.")
