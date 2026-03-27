# verifier.py for reverse_text_puzzle1
import sys

SOLUTIONS = {
    "1": "TECHFESTAI",
    "2": "INNOVATION",
    "3": "CYBERSECURE",
    "4": "DATASCIENCE",
    "5": "PROGRAMMING",
    "6": "HACKATHONFUN",
    "7": "DEBUGMASTER",
    "8": "SMARTCODER",
    "9": "LOGICPUZZLE",
    "10": "SOFTWAREBUILD"
}

def main():
    print("Verifier — Simple Reverse Text reverse_text_puzzle1")
    print("Enter the puzzle number (1-10):")
    puzzle_num = sys.stdin.readline().strip()
    
    if puzzle_num not in SOLUTIONS:
        print(f"❌ Invalid puzzle number: {puzzle_num}")
        sys.exit(2)
        
    print(f"Enter the final code for Puzzle {puzzle_num}:")
    user = sys.stdin.readline().strip().upper()
    
    if user == SOLUTIONS[puzzle_num]:
        print("✅ Correct! You found the secret code.")
        sys.exit(0)
    else:
        print("❌ Wrong, try again!")
        sys.exit(2)

if __name__ == '__main__':
    main()
