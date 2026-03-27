# Student Grade System - Fixed Version

def assign_grade(marks, name):  # FIX 1: Added colon
    if marks >= 90:  # FIX 2: Added colon
        grade = "A"
        print(name + " got grade " + grade)
    elif marks >= 75:
        grade = "B"
        print(name + " got grade " + grade)
    elif marks >= 50:
        grade = "C"
        print(name + " got grade " + grade)
    else:
        grade = "Fail"
        print(name + " got " + grade)
    
    return grade  # FIX 3: Corrected return variable (Grade → grade)


students = [["Aman", 92], ["Riya", 67], ["Kabir", 45]]

fail_count = 0

for student in students:
    name = student[0]
    marks = student[1]
    
    result = assign_grade(marks, name)  # FIX 4: Name → name
    
    if result == "Fail":  # FIX 5: Added colon + correct comparison
        fail_count = fail_count + 1

# FIX 6: Convert int to string for printing
print("Number of failed students: " + str(fail_count))