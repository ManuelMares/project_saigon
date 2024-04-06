import spacy
import json
import csv

nlp = spacy.load("en_core_web_sm")

def divide_tenses(worksheet):
    #get tense of sentence
    #put in appropriate lists
    #make new files for each tense
    past_sentences = []
    future_sentences = []
    present_sentences = []

    doc = nlp(worksheet)
    sentences = list(doc.sents)
    #print(sentences)

    for sentence in sentences:
        tense = []
        for t in range(0, len(sentence)-1):
            token = sentence[t]
            if token.pos_ == 'VERB' or token.pos_ == 'AUX':
                try:
                    ten = token.morph.get('Tense')
                    tense.append(ten[0])
                except:
                    try:
                        if token.pos_ == 'AUX' and sentence[t+1].tag_ == 'VB':
                            tense.append('Future')
                    except:
                        continue

        tense.sort()
        flag = False

        for t in tense:
            if 'Past' in tense and flag == False:
                past_sentences.append([sentence])
                flag = True
                break
            elif t == 'Future' and flag == False:
                future_sentences.append([sentence])
                flag = True
                break
            else:
                if flag == False:
                    present_sentences.append([sentence])
                    flag = True
                    break

    #print(f'\nPast:: {past_sentences}')
    with open ('past_sentences', 'w', encoding='utf-8') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerows(past_sentences)

    #print(f'\nPresent:: {present_sentences}')
    with open ('present_sentences', 'w', encoding='utf-8') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerows(present_sentences)

    #print(f'\nFuture:: {future_sentences}')
    with open ('future_sentences', 'w', encoding='utf-8') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerows(future_sentences)

def main(file):
    sentences = ""
    worksheet = []
    with open(file, 'r') as json_file:
        json_list = list(json_file)

    for json_str in json_list:
        result = json.loads(json_str)
        worksheet.append(result)

    for each in worksheet:
        sentences = sentences + " " + each['knowledge']['sentence']

    divide_tenses(sentences)

main('GenericsKB-SimpleWiki-With-Context.jsonl')

'''
Tags for 'en_core_web_sm model:
VBZ verb, 3rd person singular present
VBN verb, past participle
VBG verb, gerund or present participle
VBD verb, past tense
VB verb, base form
nsubjpass nominal subject (passive)
RB adverb
CC conjunction, coordinating
NFP superfluous punctuation
NN noun, singular or mass
PDT predeterminer
UH interjection
WP wh-pronoun, personal
_SP whitespace
XX unknown
TO infinitival "to"
JJ adjective (English), other noun-modifier (Chinese)
MD verb, modal auxiliary
RP adverb, particle
RBR adverb, comparative
ADD email
-LRB- left round bracket
FW foreign word
EX existential there
'''
