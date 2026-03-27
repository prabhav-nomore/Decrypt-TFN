# buggy_puzzle.py  — Puzzle #1: "PYTHON" edition
# Fix-the-Errors Challenge (Participant Version)
#
# This script reads 'secret.bin', XOR-decodes each byte, and prints the hidden word.
# XOR key: 0x3F
#
# YOUR TASK: Find and fix ALL bugs so the program runs and prints the decoded word.
# DO NOT modify secret.bin.

def read_data(path):
    with open(path, "r") as f:   # BUG 1: wrong file mode, should be "rb"
        data = f.read()
    return data

def decode(data):
    out = []
    for b in data:
        val = ord(b) ^ 0x3F      # BUG 2: ord() not needed; iterating bytes gives int
        out.append(chr(val))
    return "".join(out)

def main():
    raw = read_data("secret.bin")
    msg = decode(raw)
    print("Decoded message = " + messge)   # BUG 3: typo — 'messge' should be 'msg'

if __name__ == "__main__":
    main()
