/*
PresentSimple   ->  Declarative
                    |Imperative
                    |Interrogative
                    |Exclamation

Exclamation     ->  Imperative T_ExclamationMark
Imperative      ->  SimpleSentence
                    |PredicateList
Interrogative   ->  T_AuxiliarVerb SimpleSentence T_InterrogationMark
SimpleSentence  ->  Subject PredicateList
                    |

VerbList        ->  VerbPartial VerbList
                    |Empty

VerbPartial     ->  T_Verb ',' | T_Verb | T_Verb 'and'

Subject         ->  AdjectiveList T_Subject
                    |SubjectList
                    |T_Article AdjectiveList T_Subject
                    |T_Article SubjectList
                    |#Emtpy#

PredicateList   ->  PredicatePartial PredicateList
                    |#Empty#

PredicatePartial->  Predicate T_Coordinator | Predicate

Predicate       ->  VerbPrefix VerbList SubjectList VerbList AdverbList

VerbPrefix      ->  T_AuxiliarVerb
                    |AdverbList
                    |#Empty#

AdverbList      ->  AdverbPartial AdverbList
                    |Empty

AdverbPartial   ->  T_Adverb ',' | T_Adverb | T_Adverb 'and'

AdjectiveList   ->  AdjectivePartial AdjectiveList
                    |Empty

AdjectivePartial->  T_adjective ',' | T_adjective | T_adjective 'and'

T_Coordinator     ->  'for' | 'and' |'nor' | 'but' | 'or' | 'yet' |'so

SubjectList      ->  SubjectPartial SubjectList
                    |Empty

SubjectPartial   ->  T_Subject ',' | T_Subject | T_Subject 'and'

T_AuxiliarVerb    ->  | 'do' | 'no' | 'does' | 'does not' | 'do not' | 'don't' | 'doesn't' | 'not' | #Empty#

Compound        ->  SimpleSentence T_Coordinator SimpleSentence
                    | SimpleSentence T_Coordinator Compound
                    | SimpleSentence T_Coordinator Complex

Complex         ->  Dependent ',' SimpleSentence
                    |SimpleSentence Dependent

Dependent       ->  T_Subordinator SimpleSentence

T_T_Subordinator   ->  STime | SCauseEffect | SContrast

Stime           ->  'after' | 'before' | 'as soon as' | 'as' | 'when' | 'until' | 'while'

SCauseEffect    ->  'since' | 'because' | 'if' | 'even though'

Contrast        ->  'although' | 'while' | 'though' | 'whereas' | 'unless'
*/



let dict_presentSimple = {
    "PresentSimple": [
        ["Declarative"],
        ["Exclamation"],
        ["Imperative"],
        ["Interrogative"],
    ],
    "Exclamation": [
        ["Imperative", "T_ExclamationMark"]
    ],
    "Imperative": [
        ["SimpleSentence"],
        ["PredicateList"]
    ],
    "Interrogative": [
        ["T_AuxiliarVerb", "SimpleSentence", "T_InterrogationMark"]
    ],
    "Declarative": [
        ["SimpleSentence"]
    ],
    "SimpleSentence": [
        ["Subject", "PredicateList"],
        []
    ],
    "VerbList": [
        ["VerbPartial", "VerbList"],
        []
    ],
    "VerbPartial": [
        ["T_Verb", ","],
        ["T_Verb"],
        ["T_Verb", "and"]
    ],
    "Subject": [
        ["AdjectiveList", "T_subject"],
        ["SubjectList"],
        ["T_Article", "AdjectiveList", "T_Subject"],
        ["T_Article", "SubjectList"],
        ["#Emtpy#"]
    ],
    "PredicateList": [
        ["PredicatePartial", "PredicateList"],
        []
    ],
    "PredicatePartial": [
        ["Predicate", "T_Coordinator"],
        ["Predicate"]
    ],
    "Predicate": [
        ["VerbPrefix", "VerbList", "SubjectList", "VerbList", "AdverbList"]
    ],
    "VerbPrefix": [
        ["T_AuxiliarVerb"],
        ["AdverbList"],
        []
    ],
    "AdverbList": [
        ["AdverbPartial", "AdverbList"],
        []
    ],
    "AdverbPartial": [
        ["T_Adverb", ","],
        ["T_Adverb"],
        ["T_Adverb", "and"]
    ],
    "AdjectiveList": [
        ["AdjectivePartial", "AdjectiveList"],
        []
    ],
    "AdjectivePartial": [
        ["T_adjective", ","],
        ["T_adjective"],
        ["T_adjective", "and"]
    ],
    "SubjectList": [
        ["SubjectPartial", "SubjectList"],
        []
    ],
    "SubjectPartial": [
        ["T_Subject", ","],
        ["T_Subject"],
        ["T_Subject", "and"]
    ],
    "Compound": [
        ["SimpleSentence", "T_Coordinator", "SimpleSentence"],
        ["SimpleSentence", "T_Coordinator", "Compound"],
        ["SimpleSentence", "T_Coordinator", "Complex"]
    ],
    "Complex": [
        ["Dependent", ",", "SimpleSentence"],
        ["SimpleSentence", "Dependent"]
    ],
    "Dependent": [
        ["T_Subordinator", "SimpleSentence"]
    ]
}

let dict_heuristics = {
    "PresentSimple":[
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "Exclamation": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "Imperative": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "Interrogative": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "Declarative": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "SimpleSentence": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "VerbList": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "VerbPartial": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "Subject": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "PredicateList": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "PredicatPartial": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "Predicate": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "VerbPrefix": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "AdverbList": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "AdverbPartial": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "AdjectiveList": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "AdjectivePartial": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "SubjectList": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "SubjectPartial": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "Compound": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "Complex": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ],
    "Dependent": [
        {"token": "T_Verb", "distance": 0, "path": "nextnode"},
        {"token": "T_AuxiliarVerb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subject", "distance": 0, "path": "nextnode"},
        {"token": "T_Adverb", "distance": 0, "path": "nextnode"},
        {"token": "T_Subordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Article", "distance": 0, "path": "nextnode"},
        {"token": "T_Coordinator", "distance": 0, "path": "nextnode"},
        {"token": "T_Adjective", "distance": 0, "path": "nextnode"},
        {"token": "T_ExclamationMark", "distance": 0, "path": "nextnode"},
        {"token": "T_InterrogationMark", "distance": 0, "path": "nextnode"}
    ]
}







const parent = {};

// Initialize parent object with arrays for each node
for (let node in dict_presentSimple) {
    parent[node] = [];
}

function bfs2(graph, startNode, targetNode, position) {
    const queue = [startNode];
    const visited = new Set();
    let visitPL = true;


    let counter = 0;
    let tokenCounter = 0;
    while (queue.length > 0) {
        counter++;
        if(counter > 50)
            return;

        const currentNode = queue.shift();
        visited.add(currentNode);
        
        // console.log(`parent: ${currentNode}`);
        
        if (currentNode === targetNode) {
            // console.log("Target was found: ", targetNode);
            return getPath2(startNode, targetNode, parent);
        }
        // console.log(currentNode)
        if(currentNode.startsWith("T_"))
            continue;

        //Each metanode contains nodes. This double for loop just adds all nodes in the queue.
        let edges = graph[currentNode];

        if(!edges)
            continue;

            for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
                let metaNode = edges[edgeIndex];
                for (let metaNodeIndex = 0; metaNodeIndex < metaNode.length; metaNodeIndex++) {
                    let childNode = metaNode[metaNodeIndex];
                    // console.log("-", childNode)

                    if(targetNode === "T_Verb" || targetNode === "T_AuxiliarVerb" || targetNode === "T_Adverb"){
                        if(visitPL === true && childNode === "PredicateList"){
                            //add child
                            queue.push(childNode);
                            if (Array.isArray(parent[childNode])) {
                                parent[childNode].push(currentNode);
                            } else {
                                parent[childNode] = [currentNode];
                            }
                            visitPL = false;
                        }
                        if(childNode !== "PredicateList"){
                            queue.push(childNode);
                            if (Array.isArray(parent[childNode])) {
                                parent[childNode].push(currentNode);
                            } else {
                                parent[childNode] = [currentNode];
                            }
                        }
                        if(currentNode === "T_Verb" || currentNode === "T_AuxiliarVerb" || currentNode === "T_Adverb"){
                            visitPL = true;
                        }

                    }else{
                        //add
                        queue.push(childNode);
                        if (Array.isArray(parent[childNode])) {
                            parent[childNode].push(currentNode);
                        } else {
                            parent[childNode] = [currentNode];
                        }
                    }


                }
            }
    }
    return null; // Path not found
}

function getPath2(startNode, targetNode, parent) {
    const path = [];
    let current = targetNode;
    let counter = 0; 
    while (current !== startNode) {
        counter++;
        if(counter > 100)
            break;

        path.unshift(current);
        current = parent[current] ? parent[current][0] : null; // Check if parent[current] exists
        if (!current) {
            console.error("No parent found for node:", current);
            return null;
        }
    }
    path.unshift(startNode); // Add start node to path

    return path;
}


console.log(parent)

// Example usage:
const startNode2 = "PresentSimple";
const targetNode2 = "T_Subject";
// const targets = ["T_Verb", "T_AuxiliarVerb", "T_Subject","T_Adverb","T_Article","T_Coordinator","T_Adjective", "T_ExclamationMark", "T_InterrogationMark"]
const targets = ["T_Verb"]
let position2 = 0 //the position of the token we are looking for

for (let index = 0; index < targets.length; index++) {
    let target = targets[index];
    console.log("FINDING TARGET=========: ", target)
    const path2 = bfs2(dict_presentSimple, startNode2, target, position2);
    console.log("Optimal Path:", path2);
    
}

















function main(){
    /*
        path = graph[first node]                //the first path is the origin node. Then, it is the previous path
        For newTargetToken in tokens:
            for newRoot in heuristic:           //heuristic sorts the nodes we will start looking from:
                path = bfs2(graph, newRoot, newTargetToken)


    */
}
