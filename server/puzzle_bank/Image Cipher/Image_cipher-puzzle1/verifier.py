# verifier.py for Image_cipher-puzzle1
import sys

SOLUTIONS = {
    "1": "PROTOCOL",
    "2": "ALGORITHM",
    "3": "LATENCY",
    "4": "DECRYPTION",
    "5": "TOKI",
    "6": "REGISTOR",
    "7": "PROXY",
    "8": "DATABASE",
    "9": "ETHERNET",
    "10": "PAYLOAD"
}

def main():
    print("Verifier — Image Cipher Image_cipher-puzzle1")
    print("Enter the puzzle number (1-10):")
    puzzle_num = sys.stdin.readline().strip()
    
    if puzzle_num not in SOLUTIONS:
        print(f"❌ Invalid puzzle number: {puzzle_num}")
        sys.exit(2)
        
    print(f"Enter the decoded word for Image {puzzle_num}:")
    user = sys.stdin.readline().strip().upper()
    
    if user == SOLUTIONS[puzzle_num]:
        print("✅ Correct! You found the secret word.")
        sys.exit(0)
    else:
        print("❌ Wrong, try again!")
        sys.exit(2)

if __name__ == '__main__':
    main()
