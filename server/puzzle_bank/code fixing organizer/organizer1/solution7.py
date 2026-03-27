# Wallet System - Fixed Version

def process_account(name, balance, transactions):  # FIX 1: Added colon
    status = "Active"  # FIX 2: Initialize before loop
    
    for t in transactions:  # FIX 3: Added colon
        balance = balance + t
        
        # FIX 4: Only update status if it ever goes below 0
        if balance < 0:
            status = "Overdrawn"
    
    # FIX 5: Convert balance to string for printing
    print(name + " final balance: " + str(balance))
    
    return status  # FIX 6: Status → status


users = [
    ["Aman", 1000, [200, -500, -800]],
    ["Riya", 500, [-100, -200, 50]],
    ["Kabir", 300, [-400, 50]]
]

overdrawn_count = 0

for user in users:
    name = user[0]
    balance = user[1]
    transactions = user[2]
    
    result = process_account(name, balance, transactions)  # FIX 7: Name → name
    
    if result == "Overdrawn":  # FIX 8: = → ==
        overdrawn_count = overdrawn_count + 1

# FIX 9: Convert int to string
print("Total overdrawn users: " + str(overdrawn_count))