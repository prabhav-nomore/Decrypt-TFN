import sys
EXPECTED = "NIGHTWATCH"
def main():
    print("Puzzle 5 — The Login Vault Verifier")
    print("Enter the hidden override token found in the form:")
    user = sys.stdin.readline().strip().upper()
    if user == EXPECTED:
        print("✅ Access granted. You found the hidden bypass token!")
        sys.exit(0)
    else:
        print("❌ Access denied. Inspect the hidden input fields in the form.")
        sys.exit(2)
if __name__ == "__main__":
    main()
