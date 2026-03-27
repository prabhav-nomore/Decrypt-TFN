# Canteen Billing System - Fixed Version
def calculate_bill(items): # FIX 1: Added colon
    total = 0
    
    for price in items:
        total += price # FIX 2: Corrected indentation
    
    if total > 500:
        print("Discount Applied!")
        final_price = total - (total * 0.1)
    else:
        final_price = total # FIX 3: Fixed case-sensitivity (Total -> total)
        
    # FIX 4: Converted float to string for concatenation
    print("Your total is: " + str(final_price)) 
    return final_price

# FIX 5: Changed string "100" to integer 100
order_list = [150, 200, 100, 300] 

# FIX 6: Assigned function return to a variable to use it later
final_price = calculate_bill(order_list)

# FIX 7: Logical fix - changed < to > (Free cookie for big spenders)
if final_price > 500: 
    print("Bonus: Free Cookie!")
# FIX 8: (Implicit) Ensure the 'final_price' variable exists in the global scope 
# by defining it from the function return.