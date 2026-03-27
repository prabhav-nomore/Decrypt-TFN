# buggy_puzzle.py  — Puzzle #6: "CRYSTAL" edition
# Fix-the-Errors Challenge (Participant Version)
#
# This script reads 'secret.bin', XOR-decodes each byte, and prints the hidden word.
# XOR key: 0x19
#
# YOUR TASK: Find and fix ALL bugs so the program runs and prints the decoded word.
# DO NOT modify secret.bin.

def read_data(filename):
    with open(path, "rb") as f:   # BUG 1: 'path' is undefined — should be 'filename'
        data = f.read()
    return data

def decode(data, key):
    out = ""
    for b in data:
        val = b ^ key ^ key       # BUG 2: XOR applied twice cancels out — remove one ^ key
        out += chr(val)
    return out

def main():
    raw = read_data("secret.bin")
    msg = decode(raw, 0x19)
    print(f"Decoded message = {msg")   # BUG 3: f-string missing closing brace — should be {msg}

if __name__ == "__main__":
    main()
