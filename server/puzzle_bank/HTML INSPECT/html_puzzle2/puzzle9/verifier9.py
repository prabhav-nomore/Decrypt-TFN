import sys
EXPECTED = "OBSIDIAN"
def main():
    print("Puzzle 9 — The Antique Shop Verifier")
    print("Enter the safe code found hidden on an item's tag:")
    user = sys.stdin.readline().strip().upper()
    if user == EXPECTED:
        print("✅ Click. The safe swings open. You read the tag others ignored!")
        sys.exit(0)
    else:
        print("❌ Wrong code. Inspect the title attributes on the item price tags.")
        sys.exit(2)
if __name__ == "__main__":
    main()
