# buggy_puzzle.py  — Puzzle #7: "VOLTAGE" edition
# Fix-the-Errors Challenge (Participant Version)
#
# This script reads 'secret.bin', XOR-decodes each byte, and prints the hidden word.
# XOR key: 0x55
#
# YOUR TASK: Find and fix ALL bugs so the program runs and prints the decoded word.
# DO NOT modify secret.bin.

def read_data(path):
    with open(path, "rb") as f:
        data = f.read()
    return data

def decode(data):
    out = ""
    for b in data:
        val = ord(b) ^ 0x55      # BUG 1: b is already an int from bytes iteration; remove ord()
        out += chr(val)
    return out

def main():
    raw = read_data("secret.bin")
    msg = decode(raw)
    print("Decoded message = " + msg)

if __name__ = "__main__":   # BUG 2: single = is assignment, not comparison — use ==
    main()
