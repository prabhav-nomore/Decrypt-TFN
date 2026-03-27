# Flight Ticket Booking System - Fixed Version
def add_passenger(passenger_list, name, age): # FIX 1: Added colon
    if age < 12:
        print("Discount Applied for " + name)
        status = "Discounted"
    else:
        status = "Standard"

    # FIX 2: List method is .append(), not .add()
    passenger_list.append(name) 
    # FIX 3: Fixed case-sensitivity (Status -> status)
    return status 

confirmed_passengers = []
# FIX 4: Changed "31" (string) to 31 (integer)
booking_info = [["Rahul", 25], ["Sneha", 9], ["Arjun", 31]] 

for i in range(len(booking_info)):
    p_name = booking_info[i][0]
    p_age = booking_info[i][1]
    
    # FIX 5: Fixed case-sensitivity (P_age -> p_age)
    current_status = add_passenger(confirmed_passengers, p_name, p_age) 
    print("Passenger " + p_name + " is " + current_status)

# FIX 6: Use len() to get the count of passengers
# FIX 7: Convert integer to string for printing
print("Total passengers booked: " + str(len(confirmed_passengers))) 

# FIX 8 (Logic/Runtime): If age is passed as a string "31", 
# the 'age < 12' check will crash. (Included in Fix 4).
