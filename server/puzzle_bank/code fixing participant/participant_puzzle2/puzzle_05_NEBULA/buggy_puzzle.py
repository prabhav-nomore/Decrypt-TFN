# buggy_puzzle.py  — Puzzle #5: "NEBULA" edition
# Fix-the-Errors Challenge (Participant Version)
#
# This script reads 'secret.bin', XOR-decodes each byte, and prints the hidden word.
# XOR key: 0x66
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
        val = b ^ 0x66
        out = out . chr(val)   # BUG 1: should be += not . (dot is attribute access, not concat)
    return out

def main():
    raw = read_data("secret.bin")
    msg = decode(raw)
    print("Decoded message = " + msg)

if __name__ == "__main__"   # BUG 2: missing colon at end of if statement
    main()
