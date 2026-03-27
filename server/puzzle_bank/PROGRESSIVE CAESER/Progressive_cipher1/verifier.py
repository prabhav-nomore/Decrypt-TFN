# verifier.py for Progressive_cipher1
import sys

SOLUTIONS = {
    "1": "THE MOON SHINES BRIGHT.",
    "2": "LET'S GO FOR HITCHHIKING",
    "3": "THE SENTENCE, INNOVATION CHANGES THE WORLD.",
    "4": "JAVASCRIPT MAKES THE PAGE INTERACTIVE.",
    "5": "QUASAR",
    "6": "PRACTICE MAKES PERFECT",
    "7": "BETTER LATE THAN NEVER.",
    "8": "A STITCH IN TIME SAVES NINE.",
    "9": "BETTER LATE THAN NEVER.",
    "10": "TIME HEALS ALL."
}

def main():
    print("Verifier — Progressive Caesar Progressive_cipher1")
    print("Enter the puzzle number (1-10):")
    puzzle_num = sys.stdin.readline().strip()
    
    if puzzle_num not in SOLUTIONS:
        print(f"❌ Invalid puzzle number: {puzzle_num}")
        sys.exit(2)
        
    print(f"Enter the decoded text for Cipher {puzzle_num}:")
    user = sys.stdin.readline().strip().upper()
    
    if user == SOLUTIONS[puzzle_num]:
        print("✅ Correct! You decoded the message.")
        sys.exit(0)
    else:
        print("❌ Wrong, try again!")
        sys.exit(2)

if __name__ == '__main__':
    main()
