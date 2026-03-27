import sys
EXPECTED = "ECLIPSE"
def main():
    print("Puzzle 10 — The Radio Tower Verifier")
    print("Enter the operator callsign hidden in the document structure:")
    user = sys.stdin.readline().strip().upper()
    if user == EXPECTED:
        print("✅ Authentication accepted. The tower is yours. Signal clear.")
        sys.exit(0)
    else:
        print("❌ Wrong callsign. Check the HTML opening tag, page title, and comments.")
        sys.exit(2)
if __name__ == "__main__":
    main()
