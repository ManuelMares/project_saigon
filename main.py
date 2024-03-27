import spacy

# Load the small English model
nlp = spacy.load("en_core_web_sm")

# Process a text
text = "microsoft is looking at buying U.K. startup for $1 billion."
doc = nlp(text)

# Print each token in the text
for token in doc:
    print(token.text, token.pos_, token.dep_)
