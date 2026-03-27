# buggy_puzzle.py  — Puzzle #2: "DRAGON" edition
# Fix-the-Errors Challenge (Participant Version)
#
# This script reads 'secret.bin', XOR-decodes each byte, and prints the hidden word.
# XOR key: 0x2B
#
# YOUR TASK: Find and fix ALL bugs so the program runs and prints the decoded word.
# DO NOT modify secret.bin.

def read_data(path):
    with open(path, "rb") as f:
        data = f.read()
    # BUG 1: missing return statement

def decode(data):
    out = ""
    for b in data:
        val = b ^ 0x1F           # BUG 2: wrong XOR key, should be 0x2B
        out += chr(val)
    return out

def main():
    raw = read_data("secret.bin")
    msg = decode(raw)
    print.write("Decoded message = " + msg)   # BUG 3: print.write() is not valid

if __name__ == "__main__":
    main()
