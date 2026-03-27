"""
PROBLEM STATEMENT:
A travel agency needs a program to book flight tickets.
1. The program starts with an empty list of passengers.
2. It should take a name and an age for each booking.
3. If the age is below 12, they get a "Child Discount".
4. The program must add the passenger's name to the 'confirmed' list.
5. Finally, it should print the total number of passengers booked.

FIX 8 ERRORS TO MAKE THE CODE RUN CORRECTLY.
"""

def add_passenger(passenger_list, name, age)
    if age < 12:
        print("Discount Applied for " + name)
        status = "Discounted"
    else:
        status = "Standard"

    passenger_list.add(name)
    return Status

# Booking Data
confirmed_passengers = []
booking_info = [["Rahul", 25], ["Sneha", 9], ["Arjun", "31"]]

for i in range(len(booking_info)):
    p_name = booking_info[i][0]
    p_age = booking_info[i][1]
    
    current_status = add_passenger(confirmed_passengers, p_name, P_age)
    print("Passenger " + p_name + " is " + current_status)

print("Total passengers booked: " + confirmed_passengers)