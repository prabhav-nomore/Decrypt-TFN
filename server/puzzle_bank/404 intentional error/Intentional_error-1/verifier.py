# Verifier for Puzzle 404 (Not Found)
# The answer is the HTTP status code itself.

SECRET = "404"

def verify(answer):
    return answer.strip() == SECRET
