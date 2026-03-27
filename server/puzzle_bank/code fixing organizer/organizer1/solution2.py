# Library Book Tracker - Fixed Version
def calculate_fine(days_kept, book_name): # FIX 1: Added colon
    fine = 0
    
    if days_kept > 7:
        extra_days = days_kept - 7
        fine = extra_days * 5 # FIX 2: Corrected indentation
        # FIX 3: Converted 'fine' to string for printing
        print("Late fee for " + book_name + " is: " + str(fine)) 
    else:
        print(book_name + " has no late fee.")
        
    return fine

my_books = [["Physics", 10], ["Maths", 5], ["History", 12]]
total_fine = 0

# FIX 4: Added colon at the end of the for loop
for i in range(len(my_books)): 
    book = my_books[i][0]
    # FIX 5: Indexing error. Days are at index [1], not [2]
    days = my_books[i][1] 
    
    current_fine = calculate_fine(days, book)
    total_fine = total_fine + current_fine

# FIX 6: Converted 'total_fine' to string for printing
print("Total library fine to pay: " + str(total_fine))

# FIX 7 (Logic): If fine = extra_days * 5 is outside the if-block, 
# extra_days might be undefined for books kept < 7 days. 
# (Included in Indentation fix above).

# FIX 8 (Syntax): Ensure all variables used (like extra_days) 
# are defined before use in all logical paths.