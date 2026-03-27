# buggy_puzzle.py  — Puzzle #4: "PHANTOM" edition
# Fix-the-Errors Challenge (Participant Version)
#
# This script reads 'secret.bin', XOR-decodes each byte, and prints the hidden word.
# XOR key: 0x4D
#
# YOUR TASK: Find and fix ALL bugs so the program runs and prints the decoded word.
# DO NOT modify secret.bin.

def read_data(path):
    with open(path, "rb") as f:
        return f.read()

def decode(data):
    out = ""
    for b in data:
        val = b ^ 0x4D
        out += val           # BUG 1: val is int, can't concatenate to str — use chr(val)
    return out

def main():
    raw = read_data("secret.bin")
    msg = decode(raw)
    result = "Decoded message = "
    result += msg
    print(result

# BUG 2: missing closing parenthesis on print()

if __name__ == "__main__":
    main()
