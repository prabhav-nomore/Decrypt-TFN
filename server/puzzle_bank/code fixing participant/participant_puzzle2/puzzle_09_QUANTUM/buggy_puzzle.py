# buggy_puzzle.py  — Puzzle #9: "QUANTUM" edition
# Fix-the-Errors Challenge (Participant Version)
#
# This script reads 'secret.bin', XOR-decodes each byte, and prints the hidden word.
# XOR key: 0x38
#
# YOUR TASK: Find and fix ALL bugs so the program runs and prints the decoded word.
# DO NOT modify secret.bin.

def read_data(path):
    with open("Secret.bin", "rb") as f:   # BUG 1: wrong filename case "Secret.bin" vs "secret.bin"
        data = f.read()
    return data

def decode(data):
    out = ""
    for i in range(len(data)):
        val = data[i] ^ 0x38
        out += chr(val)
    return out                # this one is actually OK (just verbose)

def main():
    raw = read_data("secret.bin")
    msg = decode(raw
    )                         # BUG 2: closing paren on wrong line — causes SyntaxError
    print("Decoded message = " + msg)

if __name__ == "__main__":
    main()
