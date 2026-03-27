import sys
EXPECTED = "CIPHER"
def main():
    print("Puzzle 3 — Daily Weather Report Verifier")
    print("Enter the secret code hidden in the page's HEAD:")
    user = sys.stdin.readline().strip().upper()
    if user == EXPECTED:
        print("✅ Correct! You found what others overlooked in the metadata.")
        sys.exit(0)
    else:
        print("❌ Wrong code. The answer is not in the body. Try the meta tags.")
        sys.exit(2)
if __name__ == "__main__":
    main()
