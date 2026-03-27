# Shopping Cart System - Fixed Version

def calculate_bill(cart):  # FIX 1: Added colon
    total = 0
    ignored = 0
    
    for item in cart:  # FIX 2: Added colon
        name = item[0]
        price = item[1]
        qty = item[2]
        
        if price <= 0 or qty <= 0:  # FIX 3: Added colon
            ignored = ignored + 1
        else:
            total = total + price * qty
    
    if total >= 500:  # FIX 4: Added colon
        discount = total * 0.1
    else:
        discount = 0
    
    final_amount = total - discount
    
    # FIX 5: Convert number to string
    print("Final Bill: " + str(final_amount))
    
    return final_amount, ignored  # FIX 6: Ignored → ignored


cart = [
    ["Pen", 10, 5],
    ["Notebook", 50, 4],
    ["Bag", 300, 1],
    ["Bottle", -20, 2],
    ["Pencil", 5, 0]
]

# FIX 7: Correct variable name (Cart → cart)
bill, ignored_items = calculate_bill(cart)  # FIX 8: Correct return order

# FIX 9: Convert int/float to string
print("Ignored items: " + str(ignored_items))
print("Amount to pay: " + str(bill))