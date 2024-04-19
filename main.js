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
        ["T_Adjective", ","],
        ["T_Adjective"],
        ["T_Adjective", "and"]
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
        {"token": "T_Verb", "distance": 7, "path": "Imperative"},
        {"token": "T_AuxiliarVerb", "distance": 2, "path": "Interrogative"},
        {"token": "T_Subject", "distance": 4, "path": "Declarative"},
        {"token": "T_Adverb", "distance": 7, "path": "Imperative"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": 4, "path": "Declarative"},
        {"token": "T_Coordinator", "distance": 4, "path": "Imperative"},
        {"token": "T_Adjective", "distance": 6, "path": "Declarative"},
        {"token": "T_ExclamationMark", "distance": 2, "path": "Exclamation"},
        {"token": "T_InterrogationMark", "distance": 2, "path": "Interrogative"}
    ],
    "Exclamation": [
        {"token": "T_Verb", "distance": 7, "path": "Imperative"},
        {"token": "T_AuxiliarVerb", "distance": 6, "path": "Imperative"},
        {"token": "T_Subject", "distance": 4, "path": "Imperative"},
        {"token": "T_Adverb", "distance": 7, "path": "Imperative"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": 4, "path": "Imperative"},
        {"token": "T_Coordinator", "distance": 4, "path": "Imperative"},
        {"token": "T_Adjective", "distance": 6, "path": "Imperative"},
        {"token": "T_ExclamationMark", "distance": 1, "path": "Imperative"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "Imperative": [
        {"token": "T_Verb", "distance": 6, "path": "PredicateList"},
        {"token": "T_AuxiliarVerb", "distance": 5, "path": "PredicateList"},
        {"token": "T_Subject", "distance": 3, "path": "SimpleSentence"},
        {"token": "T_Adverb", "distance": 6, "path": "PredicateList"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": 3, "path": "SimpleSentence"},
        {"token": "T_Coordinator", "distance": 3, "path": "PredicateList"},
        {"token": "T_Adjective", "distance": 5, "path": "SimpleSentence"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "Interrogative": [
        {"token": "T_Verb", "distance": 7, "path": "SimpleSentence"},
        {"token": "T_AuxiliarVerb", "distance": 1, "path": "T_AuxiliarVerb"},
        {"token": "T_Subject", "distance": 3, "path": "SimpleSentence"},
        {"token": "T_Adverb", "distance": 7, "path": "SimpleSentence"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": 3, "path": "SimpleSentence"},
        {"token": "T_Coordinator", "distance": 4, "path": "SimpleSentence"},
        {"token": "T_Adjective", "distance": 5, "path": "SimpleSentence"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": 1, "path": "T_InterrogationMark"}
    ],
    "Declarative": [
        {"token": "T_Verb", "distance": 7, "path": "SimpleSentence"},
        {"token": "T_AuxiliarVerb", "distance": 6, "path": "SimpleSentence"},
        {"token": "T_Subject", "distance": 3, "path": "SimpleSentence"},
        {"token": "T_Adverb", "distance": 7, "path": "SimpleSentence"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": 3, "path": "SimpleSentence"},
        {"token": "T_Coordinator", "distance": 4, "path": "SimpleSentence"},
        {"token": "T_Adjective", "distance": 5, "path": "SimpleSentence"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "SimpleSentence": [
        {"token": "T_Verb", "distance": 6, "path": "PredicateList"},
        {"token": "T_AuxiliarVerb", "distance": 5, "path": "PredicateList"},
        {"token": "T_Subject", "distance": 2, "path": "Subject"},
        {"token": "T_Adverb", "distance": 6, "path": "PredicateList"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": 2, "path": "Subject"},
        {"token": "T_Coordinator", "distance": 3, "path": "PredicateList"},
        {"token": "T_Adjective", "distance": 4, "path": "Subject"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "VerbList": [
        {"token": "T_Verb", "distance": 2, "path": "VerbPartial"},
        {"token": "T_AuxiliarVerb", "distance": math.inf, "path": "np"},
        {"token": "T_Subject", "distance": math.inf, "path": "np"},
        {"token": "T_Adverb", "distance": math.inf, "path": "np"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": math.inf, "path": "np"},
        {"token": "T_Coordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Adjective", "distance": math.inf, "path": "np"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "VerbPartial": [
        {"token": "T_Verb", "distance": 1, "path": "T_Verb"},
        {"token": "T_AuxiliarVerb", "distance": math.inf, "path": "np"},
        {"token": "T_Subject", "distance": math.inf, "path": "np"},
        {"token": "T_Adverb", "distance": math.inf, "path": "np"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": math.inf, "path": "np"},
        {"token": "T_Coordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Adjective", "distance": math.inf, "path": "np"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "Subject": [
        {"token": "T_Verb", "distance": math.inf, "path": "np"},
        {"token": "T_AuxiliarVerb", "distance": math.inf, "path": "np"},
        {"token": "T_Subject", "distance": 1, "path": "T_Subject"},
        {"token": "T_Adverb", "distance": math.inf, "path": "np"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": 1, "path": "T_Article"},
        {"token": "T_Coordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Adjective", "distance": 3, "path": "AdjectiveList"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "PredicateList": [
        {"token": "T_Verb", "distance": 5, "path": "PredicatePartial"},
        {"token": "T_AuxiliarVerb", "distance": 4, "path": "PredicatePartial"},
        {"token": "T_Subject", "distance": 5, "path": "PredicatePartial"},
        {"token": "T_Adverb", "distance": 5, "path": "PredicatePartial"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": math.inf, "path": "np"},
        {"token": "T_Coordinator", "distance": 2, "path": "PredicatePartial"},
        {"token": "T_Adjective", "distance": math.inf, "path": "np"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "PredicatePartial": [
        {"token": "T_Verb", "distance": 4, "path": "Predicate"},
        {"token": "T_AuxiliarVerb", "distance": 3, "path": "Predicate"},
        {"token": "T_Subject", "distance": 4, "path": "Predicate"},
        {"token": "T_Adverb", "distance": 4, "path": "Predicate"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": math.inf, "path": "np"},
        {"token": "T_Coordinator", "distance": 1, "path": "T_Coordinator"},
        {"token": "T_Adjective", "distance": math.inf, "path": "np"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "Predicate": [
        {"token": "T_Verb", "distance": 3, "path": "VerbList"},
        {"token": "T_AuxiliarVerb", "distance": 2, "path": "VerbPrefix"},
        {"token": "T_Subject", "distance": 3, "path": "nSubjectList"},
        {"token": "T_Adverb", "distance": 3, "path": "AdverbList"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": math.inf, "path": "np"},
        {"token": "T_Coordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Adjective", "distance": math.inf, "path": "np"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "VerbPrefix": [
        {"token": "T_Verb", "distance": math.inf, "path": "np"},
        {"token": "T_AuxiliarVerb", "distance":1, "path": "T_AuxiliarVerb"},
        {"token": "T_Subject", "distance": math.inf, "path": "np"},
        {"token": "T_Adverb", "distance": 3, "path": "AdverbList"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": math.inf, "path": "np"},
        {"token": "T_Coordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Adjective", "distance": math.inf, "path": "np"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "AdverbList": [
        {"token": "T_Verb", "distance": math.inf, "path": "np"},
        {"token": "T_AuxiliarVerb", "distance": math.inf, "path": "np"},
        {"token": "T_Subject", "distance": math.inf, "path": "np"},
        {"token": "T_Adverb", "distance": 2, "path": "AdverbPartial"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": math.inf, "path": "np"},
        {"token": "T_Coordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Adjective", "distance": math.inf, "path": "np"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "AdverbPartial": [
        {"token": "T_Verb", "distance": math.inf, "path": "np"},
        {"token": "T_AuxiliarVerb", "distance": math.inf, "path": "np"},
        {"token": "T_Subject", "distance": math.inf, "path": "np"},
        {"token": "T_Adverb", "distance": 1, "path": "T_Adverb"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": math.inf, "path": "np"},
        {"token": "T_Coordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Adjective", "distance": math.inf, "path": "np"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "AdjectiveList": [
        {"token": "T_Verb", "distance": math.inf, "path": "np"},
        {"token": "T_AuxiliarVerb", "distance": math.inf, "path": "np"},
        {"token": "T_Subject", "distance": math.inf, "path": "np"},
        {"token": "T_Adverb", "distance": math.inf, "path": "np"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": math.inf, "path": "np"},
        {"token": "T_Coordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Adjective", "distance": 2, "path": "AdjectivePartial"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "AdjectivePartial": [
        {"token": "T_Verb", "distance": math.inf, "path": "np"},
        {"token": "T_AuxiliarVerb", "distance": math.inf, "path": "np"},
        {"token": "T_Subject", "distance": math.inf, "path": "np"},
        {"token": "T_Adverb", "distance": math.inf, "path": "np"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": math.inf, "path": "np"},
        {"token": "T_Coordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Adjective", "distance": 1, "path": "T_Adjective"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "SubjectList": [
        {"token": "T_Verb", "distance": math.inf, "path": "np"},
        {"token": "T_AuxiliarVerb", "distance": math.inf, "path": "np"},
        {"token": "T_Subject", "distance": 2, "path": "SubjectPartial"},
        {"token": "T_Adverb", "distance": math.inf, "path": "np"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": math.inf, "path": "np"},
        {"token": "T_Coordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Adjective", "distance": math.inf, "path": "np"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "SubjectPartial": [
        {"token": "T_Verb", "distance": math.inf, "path": "np"},
        {"token": "T_AuxiliarVerb", "distance": math.inf, "path": "np"},
        {"token": "T_Subject", "distance": 1, "path": "T_Subject"},
        {"token": "T_Adverb", "distance": math.inf, "path": "np"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": math.inf, "path": "np"},
        {"token": "T_Coordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Adjective", "distance": math.inf, "path": "np"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "Compound": [
        {"token": "T_Verb", "distance": 7, "path": "SimpleSentence"},
        {"token": "T_AuxiliarVerb", "distance": 6, "path": "SimpleSentence"},
        {"token": "T_Subject", "distance": 3, "path": "SimpleSentence"},
        {"token": "T_Adverb", "distance": 7, "path": "SimpleSentence"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": 3, "path": "SimpleSentence"},
        {"token": "T_Coordinator", "distance": 1, "path": "T_Coordinator"},
        {"token": "T_Adjective", "distance": 5, "path": "SimpleSentence"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "Complex": [
        {"token": "T_Verb", "distance": 7, "path": "SimpleSentence"},
        {"token": "T_AuxiliarVerb", "distance": 6, "path": "SimpleSentence"},
        {"token": "T_Subject", "distance": 3, "path": "SimpleSentence"},
        {"token": "T_Adverb", "distance": 7, "path": "SimpleSentence"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": 3, "path": "SimpleSentence"},
        {"token": "T_Coordinator", "distance": 4, "path": "SimpleSentence"},
        {"token": "T_Adjective", "distance": 5, "path": "SimpleSentence"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ],
    "Dependent": [
        {"token": "T_Verb", "distance": 7, "path": "SimpleSentence"},
        {"token": "T_AuxiliarVerb", "distance": 6, "path": "SimpleSentence"},
        {"token": "T_Subject", "distance": 3, "path": "SimpleSentence"},
        {"token": "T_Adverb", "distance": 7, "path": "SimpleSentence"},
        {"token": "T_Subordinator", "distance": math.inf, "path": "np"},
        {"token": "T_Article", "distance": 3, "path": "SimpleSentence"},
        {"token": "T_Coordinator", "distance": 4, "path": "SimpleSentence"},
        {"token": "T_Adjective", "distance": 5, "path": "SimpleSentence"},
        {"token": "T_ExclamationMark", "distance": math.inf, "path": "np"},
        {"token": "T_InterrogationMark", "distance": math.inf, "path": "np"}
    ]
}







const parent = {};

// Initialize parent object with arrays for each node
for (let node in dict_presentSimple) {
    parent[node] = [];
}

function bfs(graph, startNode, targetNode, maxDepth) {
    const queue = [startNode];
    const visited = new Set();
    let maxDepths_Lists = {
        "SubjectList": 0,
        "AdjectiveList": 0,
        "AdverbList": 0,
        "PredicateList": 0,
        "VerbList": 0,
    }

    let counter = 0;
    while (queue.length > 0) {
        counter++;
        if(counter > 1000)
            return [];

        const currentNode = queue.shift();
        visited.add(currentNode);

        //console.log(`parent: ${currentNode}`);

        if (currentNode === targetNode) {
            //console.log("Target was found: ", targetNode);
            return getPath(startNode, targetNode, parent);
        }
        //console.log(currentNode)
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
                    //console.log("-", childNode)

                    if(childNode in maxDepths_Lists){
                        //increase counter
                        maxDepths_Lists[childNode] += 1;
                        //if less than maxDepth, add child, otherwise, don't
                        if(maxDepths_Lists[childNode] <= maxDepth){
                            queue.push(childNode);
                            if (Array.isArray(parent[childNode])) {
                                parent[childNode].push(currentNode);
                            } else {
                                parent[childNode] = [currentNode];
                            }
                        }
                    }else{
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
    return []; // Path not found
}

function getPath(startNode, targetNode, parent) {
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
            // console.error("No parent found for node:", current);
            return path;
        }
    }
    path.unshift(startNode); // Add start node to path

    return path;
}

//Parameters: node - represents current node
//            target - target token
//Output:     next - the next node the path should follow for shortest path to target
//            If the node cannot reach target, 'backtrack' is returned to tell calling
//            function to go back to predecessor node to find another path towards target.
function getHeuristic(node, target){
    let nodelist = dict_heuristics[node];
    for (let i = 0; i < nodelist.length; i++){
        token = nodelist[i]['token']
        next = nodelist[i]['path']
        distance = nodelist[i]['distance']
        if ((target === token) && (next != 'np')){
            console.log(next)
            return next
        }
    }
    return 'backtrack'
};

const targets = ["T_Verb", "T_AuxiliarVerb", "T_Subject","T_Adverb","T_Article","T_Coordinator","T_Adjective", "T_ExclamationMark", "T_InterrogationMark"]
// Object.keys(dict_heuristics).forEach(root => {
//     console.log("============SEARCHING FOR ROOT: ", root + "===============")
//     let node = dict_heuristics[root];

//     //for each node
//     // for (let indexToken = 0; indexToken < node.length; indexToken++) {
//     //     let tokenKey    = node[indexToken];
//     //     // console.log(tokenKey)
//     //     let distance    = tokenKey["distance"];
//     //     let path        = tokenKey["path"];
//     //     let name        = tokenKey["token"]
//     //     // console.log(distance, path, name)

//         for (let indexTarget = 0; indexTarget < targets.length; indexTarget++) {
//                 let target = targets[indexTarget];
//                 const path = bfs(dict_presentSimple, root, target, targets.length);
//                 if(path)
//                     console.log(`------------------Root ${root} > target ${target}:     Optimal Path: `, path.length);
//                 //Notice that path might be empty, and then length breaks
//                 //(length == 0 because root == target, or infinity because it cannot go upwards?)
//         }
//     // }
// })

















function main(){
    /*
        path = graph[first node]                //the first path is the origin node. Then, it is the previous path
        For newTargetToken in tokens:
            for newRoot in heuristic:           //heuristic sorts the nodes we will start looking from:
                path = bfs2(graph, newRoot, newTargetToken)


    */
}
