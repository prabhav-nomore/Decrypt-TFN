# buggy_puzzle.py  — Puzzle #10: "SERPENT" edition
# Fix-the-Errors Challenge (Participant Version)
#
# This script reads 'secret.bin', XOR-decodes each byte, and prints the hidden word.
# XOR key: 0x4A
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
        val = chr(b) ^ 0x4A     # BUG 1: chr(b) gives a string; XOR needs int — remove chr() here
        out += chr(val)
    # BUG 2: no return statement — function returns None implicitly

def main():
    raw = read_data("secret.bin")
    msg = decode(raw)
    print("Decoded message = " + msg)

if __name__ == "__main__":
    main("secret.bin")          # BUG 3: main() takes no arguments
