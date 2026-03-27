# Student Attendance Tracker - Fixed Version
def check_attendance(attended, name): # FIX 1: Added colon
    total_classes = 20
    percent = (attended / total_classes) * 100
    
    if percent < 75:
        status = "Ineligible" # FIX 2: Corrected indentation
        # FIX 3: Converted 'percent' to string for printing
        print(name + " attendance is: " + str(percent) + "%") 
    else:
        status = "Eligible"
        print(name + " is " + status)
        
    return status # FIX 4: Fixed case-sensitivity (Status -> status)

members = [["Yash", 18], ["Amit", 12], ["Sita", 15]]
low_attendance_count = 0

for member in members:
    name = member[0]
    attended = member[1]
    
    # FIX 5: Fixed case-sensitivity variable name (Name -> name)
    result = check_attendance(attended, name) 
    
    if result == "Ineligible":
        low_attendance_count = low_attendance_count + 1

# FIX 6: Converted 'low_attendance_count' to string for printing
print("Total members with low attendance: " + str(low_attendance_count))

# FIX 7 (Logic): Ensure 'status' is always returned correctly.
# FIX 8 (Syntax): Ensure the 'if percent < 75' block handles all logic correctly.