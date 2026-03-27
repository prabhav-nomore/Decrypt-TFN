import sys
EXPECTED = "SOLSTICE"
def main():
    print("Puzzle 8 — The Library Archive Verifier")
    print("Enter the secret word hidden in a book's ARIA label:")
    user = sys.stdin.readline().strip().upper()
    if user == EXPECTED:
        print("✅ Correct! You read what the screen reader would whisper.")
        sys.exit(0)
    else:
        print("❌ Not quite. Check the aria-label attributes on each book element.")
        sys.exit(2)
if __name__ == "__main__":
    main()
