# Voting System - Fixed Version

def count_votes(votes):  # FIX 1: function syntax (colon)
    result = {"A": 0, "B": 0, "C": 0}
    invalid = 0
    
    for v in votes:  # FIX 2: added colon
        name = v[0]
        choice = v[1]
        
        if choice not in result:  # FIX 3: added colon
            invalid = invalid + 1
        else:
            result[choice] = result[choice] + 1
    
    winner = ""
    max_votes = 0
    
    for c in result:
        if result[c] > max_votes:  # FIX 4: added colon
            max_votes = result[c]
            winner = c
    
    print("Votes:", result)  # FIX 5: proper print (no concat issue)
    print("Winner is: " + winner)
    
    return invalid, winner  # FIX 6: Winner → winner


votes = [
    ["Aman", "A"],
    ["Riya", "B"],
    ["Kabir", "D"],
    ["Neha", "A"],
    ["Arjun", "C"],
    ["Simran", "E"]
]

# FIX 7: correct variable name (Votes → votes)
invalid_votes, winner = count_votes(votes)

# FIX 8: convert int to string
print("Invalid votes: " + str(invalid_votes))
print("Final winner: " + winner)