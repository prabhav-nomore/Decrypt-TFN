# Verifier for Puzzle 401 (Unauthorized)
# The answer is the HTTP status code itself.

SECRET = "401"

def verify(answer):
    return answer.strip() == SECRET
