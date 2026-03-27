# buggy_puzzle.py  — Puzzle #3: "CIPHER" edition
# Fix-the-Errors Challenge (Participant Version)
#
# This script reads 'secret.bin', XOR-decodes each byte, and prints the hidden word.
# XOR key: 0x71
#
# YOUR TASK: Find and fix ALL bugs so the program runs and prints the decoded word.
# DO NOT modify secret.bin.

def read_data(path):
    f = open(path, "rb")
    data = f.read
    # BUG 1: f.read should be f.read() — missing parentheses (call the function!)
    f.close()
    return data

def decode(data):
    out = []
    for b in data:
        val = b ^ 0x71
        out.append(chr(val))
    return out          # BUG 2: returns a list, not a string — should be "".join(out)

def main():
    raw = read_data("secret.bin")
    msg = decode(raw)
    print("Decoded message = " + msg)

if __name__ == "__main__":
main()              # BUG 3: missing indentation for main() call
