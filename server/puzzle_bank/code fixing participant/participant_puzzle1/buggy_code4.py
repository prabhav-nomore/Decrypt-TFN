"""
PROBLEM STATEMENT:
A local cricket tournament needs a program to track team scores.
1. The program starts with a dictionary of teams and their current scores.
2. It should take a list of 'new runs' scored in the latest match.
3. The program must update the team's total score.
4. If a team's score exceeds 200, it should print "Qualified for Finals".
   
FIX 8 ERRORS TO MAKE THE CODE RUN CORRECTLY.
"""

def update_scores(score_card, team_name, new_runs)
    if team_name in score_card:
        score_card[team_name] = score_card[team_name] + new_runs
    else:
        print("Team not found!")

    if score_card[team_name] > 200
        print(team_name + " has Qualified for Finals!")
        status = "Qualified"
    else:
        status = "Playing"
        
    return status

# Current scores: {Team Name: Runs}
tournament_scores = {"Lions": 150, "Tigers": 180, "Eagles": 90}

# Match Results to update: [Team Name, New Runs]
match_results = [["Lions", 60], ["Tigers", "30"], ["Eagles", 40]]

for i in range(len(match_results)):
    team = match_results[i][0]
    runs = match_results[i][1]
    
    # Update the score and get status
    current_status = update_scores(tournament_scores, team, runs)
    
print("Update Complete. Final Scores: " + tournament_scores)