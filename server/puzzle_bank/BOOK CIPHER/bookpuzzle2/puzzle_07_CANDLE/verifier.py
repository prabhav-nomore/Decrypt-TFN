# verifier.py — Puzzle #7: CANDLE
SECRET = "CANDLE"   # organizer only — do not share with participants

user_input = input("Enter the decoded word: ").strip().upper()

if user_input == SECRET:
    print("✅ Correct! You found the secret word.")
else:
    print("❌ Wrong, try again!")
