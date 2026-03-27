# verifier.py for bookpuzzle1
import sys

SOLUTIONS = {
    "1": "DREAM",
    "2": "COUPED",
    "3": "FETCH",
    "4": "OBSIDIAN",
    "5": "FLICKER",
    "6": "CIPHER",
    "7": "MARIGOLD",
    "8": "EMBER",
    "9": "TUNDRA",
    "10": "LATTICE"
}

def main():
    print("Verifier — Book Cipher bookpuzzle1")
    print("Enter the puzzle number (1-10):")
    puzzle_num = sys.stdin.readline().strip()
    
    if puzzle_num not in SOLUTIONS:
        print(f"❌ Invalid puzzle number: {puzzle_num}")
        sys.exit(2)
        
    print(f"Enter the decoded word for Puzzle {puzzle_num}:")
    user = sys.stdin.readline().strip().upper()
    
    if user == SOLUTIONS[puzzle_num]:
        print("✅ Correct! You found the secret word.")
        sys.exit(0)
    else:
        print("❌ Wrong, try again!")
        sys.exit(2)

if __name__ == '__main__':
    main()
