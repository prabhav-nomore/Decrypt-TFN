# buggy_puzzle.py  — Puzzle #8: "ECLIPSE" edition
# Fix-the-Errors Challenge (Participant Version)
#
# This script reads 'secret.bin', XOR-decodes each byte, and prints the hidden word.
# XOR key: 0x7E
#
# YOUR TASK: Find and fix ALL bugs so the program runs and prints the decoded word.
# DO NOT modify secret.bin.

def read_data(path):
    with open(path, "rb") as f:
        data = f.read()
    return data

def decode(data):
    out = ""
    KEY = "0x7E"                 # BUG 1: KEY is a string "0x7E", not the integer 0x7E
    for b in data:
        val = b ^ KEY
        out += chr(val)
    return out

def main():
    raw = read_data("secret.bin")
    msg = decode(raw)
    print("Decoded message = " + msg)

if __name__ == "__main__":
    mian()                       # BUG 2: typo — 'mian' should be 'main'
