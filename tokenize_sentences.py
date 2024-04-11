import spacy

input = "present_sentences.txt"
nlp = spacy.load("en_core_web_sm")

def translate():
    '''Token Pairs:
            Ours                    POS                             TAG             DEP
        T_InterrogationMark         PUNCT
        T_ExclamationMark           PUNCT
        T_Verb                      VERB
        T_Subject                   NOUN, PRONOUN, PROPERNOUN
        T_Adverb                    ADV
        T_Adjective                 ADJ
        Coordinator                 CCONJ                           CC
        Article                     DET
        AuxiliarVerb                AUX                             MD
        Stime                       SCONJ
        SCauseEffect                SCONJ
        Contrast                    SCONJ
        '''
    token_pairs = [
        {"aloud": "T_Verb", "pos": ["VERB"], "tag": ["VB", "VBZ", "VBP", "VBN", "VBZ"], "dep": ["ROOT", "recl", "advcl", "conj"]},
        {"aloud": "T_AuxiliarVerb", "pos": ["AUX"], "tag": ["MD"], "dep": ["ROOT", "advcl"]},
        {"aloud": "T_Subject", "pos": ["PROPN", "NOUN", "PRON",  ], "tag": ["PRP", "PRP$", "NNS", "NNP", "NN"], "dep": ["pobj", "nsubj", "conj", "dobj"]},
        {"aloud": "T_Adverb", "pos": ["ADV"], "tag": ["RB", "RBR", "RBS"], "dep": ["advmod"]},
        {"aloud": "T_Subordinator", "pos": ["SCONJ"], "tag": ["IN"], "dep": ["mark"]},
        {"aloud": "T_Article", "pos": ["DET"], "tag": ["DT"], "dep": ["det"]},
        {"aloud": "T_Coordinator", "pos": ["CCONJ"], "tag": ["CC"], "dep": ["cc"]},
        {"aloud": "T_Adjective", "pos": ["ADJ"], "tag": ["JJ"], "dep": ["amod"]}
    ]
    #Need to talk about breaking up subject into actual subject and just nouns? 'dobj' and 'pobj'

    sentences = ["I can go to the game today.", "I can't today.", "When do you want to go to the game today?",
                 "How many people are there?", "Can you pick up George and Amy while you drive?", "Before you go, can you put away the dishes?",
                 "Do not do that!", "I can not believe it!", "Quickly and calmly find your way to the exit.",
                 "As soon as she arrives, we can go.", "Although I am tired, we are still going to the game.",
                 "While she plays tennis we are cooking her dinner because she does not have time to do it.", "I want as little as possible please.",
                 "Do Jill and Jake both play tennis and swim?", "How is that possible?", "Let me think about it!", "She beautifully decorates the room.",
                 "I want a pretty cake."]
    output = []
    # doc = nlp(sentences[1])

    # print(doc)
    # for t in range(0, len(doc)-1):
    #     token = doc[t]
    #     for tp in token_pairs:
    #         if token.pos_ in tp['pos'] and token.dep_ in tp['dep']:
    #             tokenized_sentence.append(tp['aloud'])
    #             break
    # tokenized_sentence.append(str(doc[-1]))
    # output.append(tokenized_sentence)

#get morphology of sentence - and translate into tokens and put into file

    for each in sentences:
        tokenized_sentence = []
        tokenized_sentence.append(each)
        sentence = nlp(each)
        # print(sentence[-1]) #this gets you punctuation for token

        for t in range(0, len(sentence)-1):
            word = sentence[t]
            # print(word)
            # print(word.pos_, word.tag_, word.dep_)
            for tp in token_pairs:
                if word.pos_ in tp['pos'] and word.dep_ in tp['dep']:
                    tokenized_sentence.append(tp['aloud'])
                    break

        if str(sentence[-1]) == '!':
            tokenized_sentence.append('T_ExclamationMark')
        if str(sentence[-1]) == '?':
            tokenized_sentence.append('T_InterrogationMark')
        output.append(tokenized_sentence)

    print(output)
translate()
