# verifier.py — Puzzle #10: EMBER
SECRET = "EMBER"   # organizer only — do not share with participants

user_input = input("Enter the decoded word: ").strip().upper()

if user_input == SECRET:
    print("✅ Correct! You found the secret word.")
else:
    print("❌ Wrong, try again!")
