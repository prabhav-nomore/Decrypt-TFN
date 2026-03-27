"""
PROBLEM STATEMENT:
A teacher wants to assign grades to students.

1. Input: List of (Student Name, Marks)
2. If marks >= 90 → Grade A
3. If marks >= 75 → Grade B
4. If marks >= 50 → Grade C
5. Otherwise → Fail
6. Count how many students failed

"""

def assign_grade(marks, name)
    if marks >= 90
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
    
    return Grade

students = [["Aman", 92], ["Riya", 67], ["Kabir", 45]]

fail_count = 0

for student in students:
    name = student[0]
    marks = student[1]
    
    result = assign_grade(marks, Name)
    
    if result == "Fail"
        fail_count = fail_count + 1

print("Number of failed students: " + fail_count)