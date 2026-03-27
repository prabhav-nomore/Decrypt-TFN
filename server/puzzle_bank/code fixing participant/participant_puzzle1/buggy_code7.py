"""
PROBLEM STATEMENT:
A wallet system tracks user transactions.

1. Input: List of (User Name, Initial Balance, List of Transactions)
2. Transactions can be positive (deposit) or negative (withdrawal)
3. If balance goes below 0 → "Overdrawn"
4. Otherwise → "Active"
5. Print final balance of each user
6. Count how many users are "Overdrawn"

"""

def process_account(name, balance, transactions)
    for t in transactions
        balance = balance + t
        
        if balance < 0:
            status = "Overdrawn"
        else:
            status = "Active"
    
    print(name + " final balance: " + balance)
    return Status

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
    
    result = process_account(Name, balance, transactions)
    
    if result = "Overdrawn":
        overdrawn_count = overdrawn_count + 1

print("Total overdrawn users: " + overdrawn_count)