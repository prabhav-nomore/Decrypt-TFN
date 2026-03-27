import sys
EXPECTED = "AMBERSTONEGATE"
def main():
    print("Puzzle 4 — Museum of Curiosities Verifier")
    print("Combine the exhibit fragments in order (no spaces):")
    user = sys.stdin.readline().strip().upper()
    if user == EXPECTED:
        print("✅ The inscription is complete. You've read the exhibits correctly!")
        sys.exit(0)
    else:
        print("❌ Incorrect. Inspect the data attributes of each exhibit div, in order.")
        sys.exit(2)
if __name__ == "__main__":
    main()
