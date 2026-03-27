"""
PROBLEM STATEMENT:
A shopping cart system calculates total bill.

1. Input: List of (Item Name, Price, Quantity)
2. Ignore items where price <= 0 or quantity <= 0
3. If total bill >= 500 → apply 10% discount
4. Otherwise no discount
5. Print final bill amount
6. Count how many items were ignored

"""

def calculate_bill(cart)
    total = 0
    ignored = 0
    
    for item in cart
        name = item[0]
        price = item[1]
        qty = item[2]
        
        if price <= 0 or qty <= 0
            ignored = ignored + 1
        else:
            total = total + price * qty
    
    if total >= 500
        discount = total * 0.1
    else:
        discount = 0
    
    final_amount = total - discount
    
    print("Final Bill: " + final_amount)
    
    return final_amount, Ignored


cart = [
    ["Pen", 10, 5],
    ["Notebook", 50, 4],
    ["Bag", 300, 1],
    ["Bottle", -20, 2],
    ["Pencil", 5, 0]
]

ignored_items = 0

ignored_items, bill = calculate_bill(Cart)

print("Ignored items: " + ignored_items)
print("Amount to pay: " + bill)