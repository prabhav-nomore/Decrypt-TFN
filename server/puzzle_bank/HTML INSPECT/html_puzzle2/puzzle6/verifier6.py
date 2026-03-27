import sys
EXPECTED = "VERMILION"
def main():
    print("Puzzle 6 — The Painter's Studio Verifier")
    print("Enter the name of the secret pigment (from the mystery swatch):")
    user = sys.stdin.readline().strip().upper()
    if user == EXPECTED:
        print("✅ Correct! The rarest pigment reveals the painter's secret.")
        sys.exit(0)
    else:
        print("❌ Wrong pigment. Inspect the data attribute of the fifth colour swatch.")
        sys.exit(2)
if __name__ == "__main__":
    main()
