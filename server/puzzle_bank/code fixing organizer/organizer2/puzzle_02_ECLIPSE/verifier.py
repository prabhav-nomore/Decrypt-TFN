# verifier.py — Organizer verifier for Puzzle #2: ECLIPSE
# Usage: python verifier.py <PARTICIPANT_SUBMISSION>
# Do NOT share this file with participants.
import sys

EXPECTED = "ECLIPSE"   # organizer-only

def check(sub):
    return sub.strip().upper() == EXPECTED

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python verifier.py <YOUR_SUBMISSION>")
        sys.exit(1)
    sub = " ".join(sys.argv[1:])
    ok = check(sub)
    if ok:
        print("✅ Correct submission.")
    else:
        print(f"❌ Incorrect. Expected: {EXPECTED}")
