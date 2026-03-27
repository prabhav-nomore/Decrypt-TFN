# verifier.py for html_puzzle1
import sys

SOLUTIONS = {
    "1": "MOONLIGHT",
    "2": "DAWN",
    "3": "EARTH",
    "4": "ROOT",
    "5": "OCEAN",
    "6": "SUNRISE",
    "7": "SUNRISE",
    "8": "LIGHT",
    "9": "FIRE",
    "10": "HTML"
}

def main():
    print("Verifier — HTML Inspect html_puzzle1")
    print("Enter the puzzle number (1-10):")
    puzzle_num = sys.stdin.readline().strip()
    
    if puzzle_num not in SOLUTIONS:
        print(f"❌ Invalid puzzle number: {puzzle_num}")
        sys.exit(2)
        
    print(f"Enter the hidden word for HTML {puzzle_num}:")
    user = sys.stdin.readline().strip().upper()
    
    if user == SOLUTIONS[puzzle_num]:
        print("✅ Correct! You found the hidden word.")
        sys.exit(0)
    else:
        print("❌ Wrong, try again!")
        sys.exit(2)

if __name__ == '__main__':
    main()
