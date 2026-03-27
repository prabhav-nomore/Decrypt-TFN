# verifier.py for morse_puzzle1
import sys

SOLUTIONS = {
    "DUCK": "DUCK",
    "HIDE": "HIDE",
    "COME WHAT WAY": "COME WHAT WAY",
    "FORTUNE FAVOURS BOLD": "FORTUNE FAVOURS BOLD",
    "GREAT MINDS THINK ALIKE": "GREAT MINDS THINK ALIKE",
    "HASTE MAKES WASTE": "HASTE MAKES WASTE",
    "LOOK BEFORE YOU LEAP": "LOOK BEFORE YOU LEAP",
    "ESCAPE": "ESCAPE",
    "PARROT": "PARROT",
    "SUN SHINES BRIGHTER": "SUN SHINES BRIGHTER"
}

def main():
    print("Verifier — Morse Code morse_puzzle1")
    print("Enter the name of the audio file (e.g., 'morse duck'):")
    file_name = sys.stdin.readline().strip().lower()
    
    # Map filenames to keys
    key = None
    if "duck" in file_name: key = "DUCK"
    elif "hide" in file_name: key = "HIDE"
    elif "come" in file_name: key = "COME WHAT WAY"
    elif "fortune" in file_name: key = "FORTUNE FAVOURS BOLD"
    elif "great" in file_name: key = "GREAT MINDS THINK ALIKE"
    elif "haste" in file_name: key = "HASTE MAKES WASTE"
    elif "look" in file_name: key = "LOOK BEFORE YOU LEAP"
    elif "escape" in file_name: key = "ESCAPE"
    elif "parrot" in file_name: key = "PARROT"
    elif "sun" in file_name: key = "SUN SHINES BRIGHTER"
    
    if not key:
        print(f"❌ Invalid file name: {file_name}")
        sys.exit(2)
        
    print(f"Enter the decoded text for {file_name}:")
    user = sys.stdin.readline().strip().upper()
    
    # Remove punctuation for comparison
    clean_user = "".join(c for c in user if c.isalnum() or c.isspace())
    clean_sol = "".join(c for c in SOLUTIONS[key] if c.isalnum() or c.isspace())
    
    if clean_user == clean_sol:
        print("✅ Correct! You decoded the Morse code.")
        sys.exit(0)
    else:
        print(f"❌ Wrong, try again! (Expected something like '{SOLUTIONS[key]}')")
        sys.exit(2)

if __name__ == '__main__':
    main()
