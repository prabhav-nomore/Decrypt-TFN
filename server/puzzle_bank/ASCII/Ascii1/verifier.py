# Verifier for Numeric ASCII Art Puzzle — Ascii1
# Usage: python3 verifier.py
import sys

SOLUTIONS = {
    "1": "ADAM 078",
    "2": "APPLE S01W",
    "3": "ORCA S980",
    "4": "COS 3I8",
    "5": "2709 STAR",
    "6": "0117 EATV",
    "7": "AKPU 6970",
    "8": "AZER 2930",
    "9": "SKET 295L",
    "10": "DESL A9C5"
}

def main():
    print("Verifier — Numeric ASCII Art Ascii1")
    print("Enter the puzzle number (1-10):")
    puzzle_num = sys.stdin.readline().strip()
    
    if puzzle_num not in SOLUTIONS:
        print(f"❌ Invalid puzzle number: {puzzle_num}")
        sys.exit(2)
        
    print(f"Enter your final answer for Puzzle {puzzle_num} (case-sensitive):")
    user = sys.stdin.readline().strip()
    
    if user == SOLUTIONS[puzzle_num]:
        print("✅ Correct! Nicely done.")
        sys.exit(0)
    else:
        print("❌ Not correct. Try viewing the puzzle in a monospaced font and read the big shapes.")
        if user.lower() == SOLUTIONS[puzzle_num].lower():
            print("(Close — check letter casing and exact format.)")
        sys.exit(2)

if __name__ == '__main__':
    main()
