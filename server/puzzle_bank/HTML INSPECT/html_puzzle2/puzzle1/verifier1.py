import sys
EXPECTED = "DRAGONFLY"
def main():
    print("Puzzle 1 — The Lost Expedition Verifier")
    print("Enter the combined key (combine all 3 fragments, no spaces):")
    user = sys.stdin.readline().strip().upper()
    if user == EXPECTED:
        print("✅ Correct! The vault opens. The expedition's secret is yours.")
        sys.exit(0)
    else:
        print("❌ Not quite. Find all three fragments and combine them in order.")
        sys.exit(2)
if __name__ == "__main__":
    main()
