"""
PROBLEM STATEMENT:
A college club needs to track attendance for its members. 
1. The program should take a list of (Member Name, Classes Attended).
2. The total number of classes held was 20.
3. If a member's attendance is below 75%, they should be marked "Ineligible".
4. The program should print each member's status and count how many are "Ineligible".
   
FIX 8 ERRORS TO MAKE THE CODE RUN CORRECTLY.
"""

def check_attendance(attended, name)
    total_classes = 20
    percent = (attended / total_classes) * 100
    
    if percent < 75:
    status = "Ineligible"
        print(name + " attendance is: " + percent + "%")
    else:
        status = "Eligible"
        print(name + " is " + status)
        
    return Status

# List of members and classes attended
members = [["Yash", 18], ["Amit", 12], ["Sita", 15]]

low_attendance_count = 0

for member in members:
    name = member[0]
    attended = member[1]
    
    result = check_attendance(attended, Name)
    
    if result == "Ineligible":
        low_attendance_count = low_attendance_count + 1

print("Total members with low attendance: " + low_attendance_count)