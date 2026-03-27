import sys
EXPECTED = "COBALT"
def main():
    print("Puzzle 2 — The Art Gallery Verifier")
    print("Enter the name of the colour that signs the painting:")
    user = sys.stdin.readline().strip().upper()
    if user == EXPECTED:
        print("✅ Brilliant! You've cracked the artist's signature.")
        sys.exit(0)
    else:
        print("❌ Wrong colour. Inspect the CSS carefully.")
        sys.exit(2)
if __name__ == "__main__":
    main()
