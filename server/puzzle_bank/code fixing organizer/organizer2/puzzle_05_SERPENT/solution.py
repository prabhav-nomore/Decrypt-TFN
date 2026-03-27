# solution.py (organizer version) — Puzzle #5: SERPENT
# Fixed script that correctly decodes secret.bin for organizer reference.

def read_data(path):
    with open(path, "rb") as f:
        data = f.read()
    return data

def decode(data):
    key = 0x4A
    out_bytes = bytes([b ^ key for b in data])
    try:
        return out_bytes.decode("utf-8")
    except Exception:
        return out_bytes.decode("ascii", errors="ignore")

def main():
    raw = read_data("secret.bin")
    message = decode(raw)
    print("Decoded message ->", message)

if __name__ == "__main__":
    main()
