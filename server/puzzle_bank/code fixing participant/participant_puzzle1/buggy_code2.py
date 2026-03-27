"""
PROBLEM STATEMENT:
The college library tracks how many days a student keeps a book.
1. Books can be kept for 7 days for free.
2. If kept longer, a fine of 5 per extra day is charged.
3. The program should loop through a list of borrowed books, calculate 
   individual fines, and then print the grand total fine for the student.

FIX 8 ERRORS TO MAKE THE CODE RUN CORRECTLY.
"""

def calculate_fine(days_kept, book_name)
    fine = 0
    
    if days_kept > 7:
        extra_days = days_kept - 7
    fine = extra_days * 5
        print("Late fee for " + book_name + " is: " + fine)
    else:
        print(book_name + " has no late fee.")
        
    return fine

# List of books and days kept [Book Name, Days]
my_books = [["Physics", 10], ["Maths", 5], ["History", 12]]

total_fine = 0

for i in range(len(my_books))
    book = my_books[i][0]
    days = my_books[i][2]
    
    current_fine = calculate_fine(days, book)
    total_fine = total_fine + current_fine

print("Total library fine to pay: " + total_fine)