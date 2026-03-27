# Cricket Scoreboard - Fixed Version
def update_scores(score_card, team_name, new_runs): # FIX 1: Added colon
    if team_name in score_card:
        score_card[team_name] = score_card[team_name] + new_runs
    else:
        print("Team not found!")
        return "Unknown" # FIX 2: Handle missing team scenario

    if score_card[team_name] > 200: # FIX 3: Added colon
        print(team_name + " has Qualified for Finals!")
        status = "Qualified"
    else:
        status = "Playing"
        
    return status

tournament_scores = {"Lions": 150, "Tigers": 180, "Eagles": 90}

# FIX 4: Changed "30" (string) to 30 (integer)
match_results = [["Lions", 60], ["Tigers", 30], ["Eagles", 40]] 

for i in range(len(match_results)):
    team = match_results[i][0]
    runs = match_results[i][1]
    
    current_status = update_scores(tournament_scores, team, runs)

# FIX 5: Cannot concatenate string and dictionary. Use str() or f-string.
print("Update Complete. Final Scores: " + str(tournament_scores))

# FIX 6 (Logic): Dictionary mutation - ensure the function actually 
# updates the global dictionary (which it does in Python, but participants must know this).

# FIX 7 (Runtime): TypeError would occur at 'score_card[team_name] + new_runs' 
# if 'runs' remains a string "30".

# FIX 8 (Logic/Syntax): If 'team_name' is not in 'score_card', 
# the second 'if' will throw a KeyError. 
# (Included in the return "Unknown" fix).