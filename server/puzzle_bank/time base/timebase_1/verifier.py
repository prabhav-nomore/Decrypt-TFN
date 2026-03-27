# verifier.py for timebase_1
import sys

SOLUTIONS = {
    "1": "CRATER",
    "2": "ARCANE",
    "3": "NATURE",
    "4": "WINDOW",
    "5": "CIPHER",
    "6": "SYNTAX",
    "7": "MODULE",
    "8": "KERNEL",
    "9": "BINARY",
    "10": "SOCKET"
}

def main():
    print("Verifier — Time-Based OTP timebase_1")
    print("Enter the puzzle number (1-10):")
    puzzle_num = sys.stdin.readline().strip()
    
    if puzzle_num not in SOLUTIONS:
        print(f"❌ Invalid puzzle number: {puzzle_num}")
        sys.exit(2)
        
    print(f"Enter the decoded word for Clock {puzzle_num}:")
    user = sys.stdin.readline().strip().upper()
    
    if user == SOLUTIONS[puzzle_num]:
        print("✅ Correct! You found the secret word.")
        sys.exit(0)
    else:
        print("❌ Wrong, try again!")
        sys.exit(2)

if __name__ == '__main__':
    main()
