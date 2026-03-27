import re
import os

def load_pages(path="book.txt"):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    # Split by "--- PAGE X ---"
    pages = re.split(r"--- PAGE \d+ ---", text, flags=re.IGNORECASE)
    # Remove empty first element if it exists
    if pages and not pages[0].strip():
        pages.pop(0)
    return [p.strip() for p in pages if p.strip()]

def words_from_page(page_text):
    # Use a simple split to match common book cipher logic
    return page_text.split()

def decode(coords_path, book_path="book.txt"):
    pages = load_pages(book_path)
    letters = []
    with open(coords_path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            try:
                # Support both : and space as separators
                parts = re.split(r'[:\s]+', line)
                if len(parts) != 3:
                    continue
                p = int(parts[0]); w = int(parts[1]); l = int(parts[2])
                
                if p < 1 or p > len(pages):
                    print(f"Page {p} out of range")
                    continue
                words = words_from_page(pages[p-1])
                if w < 1 or w > len(words):
                    print(f"Word {w} out of range on page {p}")
                    continue
                word = words[w-1]
                # Clean word from punctuation for letter extraction
                clean_word = re.sub(r'[^\w]', '', word)
                if l < 1 or l > len(clean_word):
                    print(f"Letter {l} out of range in word '{word}' -> '{clean_word}' on page {p}")
                    continue
                letters.append(clean_word[l-1])
            except Exception as e:
                print(f"Error processing line '{line}': {e}")
    return "".join(letters)

if __name__ == "__main__":
    base_dir = "/server/puzzle_bank/BOOK CIPHER/bookpuzzle1"
    book_path = os.path.join(base_dir, "book.txt")
    for i in range(1, 11):
        coords_file = f"CO ORDS {i}.txt"
        coords_path = os.path.join(base_dir, coords_file)
        if os.path.exists(coords_path):
            try:
                result = decode(coords_path, book_path)
                print(f"Puzzle {i}: {result}")
            except Exception as e:
                print(f"Failed Puzzle {i}: {e}")
