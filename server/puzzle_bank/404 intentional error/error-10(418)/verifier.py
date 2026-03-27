# Verifier for Puzzle 418 (I'm a Teapot)
# The answer is the HTTP status code itself.

SECRET = "418"

def verify(answer):
    return answer.strip() == SECRET
