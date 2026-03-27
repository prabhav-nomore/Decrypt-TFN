import sys
EXPECTED = "ZENITH"
def main():
    print("Puzzle 7 — Mission Control Verifier")
    print("Enter the abort code found in the JavaScript source:")
    user = sys.stdin.readline().strip().upper()
    if user == EXPECTED:
        print("✅ Abort code accepted. Launch sequence halted. Well done.")
        sys.exit(0)
    else:
        print("❌ Incorrect code. Check the JavaScript variables in the page source.")
        sys.exit(2)
if __name__ == "__main__":
    main()
