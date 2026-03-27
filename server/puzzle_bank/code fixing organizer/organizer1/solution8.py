# Employee Salary System - Fixed Version

def calculate_salary(name, hours, rate):  # FIX 1: Added colon
    if hours > 40:
        overtime = hours - 40
        salary = (40 * rate) + (overtime * rate * 1.5)
    else:  # FIX 2: Added colon
        salary = hours * rate
    
    if salary < 2000:
        status = "Low Paid"
    else:
        status = "Well Paid"
    
    # FIX 3: Convert salary to string
    print(name + " salary is: " + str(salary) + " Status: " + status)
    
    return status  # FIX 4: Status → status


employees = [
    ["Aman", 45, 50],
    ["Riya", 38, 40],
    ["Kabir", 42, 30]
]

low_paid_count = 0

for emp in employees:
    name = emp[0]
    hours = emp[1]
    rate = emp[2]
    
    result = calculate_salary(name, hours, rate)  # FIX 5: Name → name
    
    if result == "Low Paid":  # FIX 6: Added colon
        low_paid_count += 1

# FIX 7: Convert int to string
print("Total low paid employees: " + str(low_paid_count))