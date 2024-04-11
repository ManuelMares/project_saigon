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
    "Declarative": [
        ["SimpleSentence"],
    ],
    "SimpleSentence": [
        ["Subject", "PredicateList"],
        []
    ],
    "VerbList": [
        ["VerbPartial", "VerbList"],
        ["Empty"]
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
        ["Empty"]
    ],
    "AdverbPartial": [
        ["T_Adverb", ","],
        ["T_Adverb"],
        ["T_Adverb", "and"]
    ],
    "AdjectiveList": [
        ["AdjectivePartial", "AdjectiveList"],
        ["Empty"]
    ],
    "AdjectivePartial": [
        ["T_adjective", ","],
        ["T_adjective"],
        ["T_adjective", "and"]
    ],
    "SubjectList": [
        ["SubjectPartial", "SubjectList"],
        ["Empty"]
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
function bfs(graph, startNode, targetNode, position) {
    const queue = [startNode];
    const visited = new Set();
    const parent = {};

    console.log(startNode)


    let counter = 0;
    let tokenCounter = 0;
    while (queue.length > 0) {
        counter++;
        if(counter > 100)
            return;

        const currentNode = queue.shift();
        visited.add(currentNode);

        console.log("Node: ", currentNode);

        if (currentNode === targetNode) {
            console.log("FOUND!!!")
            return getPath(startNode, targetNode, parent);
        }

        if(currentNode.startsWith("T_"))
            continue;

        //Each metanode contains nodes. This double for loop just adds all nodes in the queue.
        let edges = graph[currentNode];

        if(!edges)
            continue;

        for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
            let metaNode = edges[edgeIndex];
            for (let nodeIndex = 0; nodeIndex < metaNode.length; nodeIndex++) {
                let node = metaNode[nodeIndex]
                //add each node to the queue
                queue.push(node);

            }
        }

    }
    return null; // Path not found
}

// function getPath(startNode, targetNode, parent) {
//     const path = [targetNode];
//     let current = targetNode;

//     while (current !== startNode) {
//         if (!parent[current]) {
//             return null; // Target node is not reachable from start node
//         }
//         current = parent[current];
//         path.unshift(current);
//     }

//     return path;
// }

// // Example usage:
// const startNode = "PresentSimple";
// const targetNode = "T_Subject";
// let position = 1 //the position of the token we are looking for

// const path = bfs(dict_presentSimple, startNode, targetNode, position);
// console.log("Optimal Path:", path);


function bfs2(graph, startNode, targetNode, position) {
    const queue = [startNode];
    const visited = new Set();
    const parent = {};

    console.log(startNode)


    let counter = 0;
    let tokenCounter = 0;
    while (queue.length > 0) {
        counter++;
        if(counter > 100)
            return;

        const currentNode = queue.shift();
        visited.add(currentNode);

        console.log("Node: ", currentNode);

        if (currentNode === targetNode) {
            console.log("FOUND!!!")
            return getPath(startNode, targetNode, parent);
        }

        if(currentNode.startsWith("T_"))
            continue;

        //Each metanode contains nodes. This double for loop just adds all nodes in the queue.
        let edges = graph[currentNode];

        if(!edges)
            continue;

        for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
            let metaNode = edges[edgeIndex];
            for (let nodeIndex = 0; nodeIndex < metaNode.length; nodeIndex++) {
                let node = metaNode[nodeIndex]
                //add each node to the queue
                queue.push(node);

            }
        }

    }
    return null; // Path not found
}

// function getPath(startNode, targetNode, parent) {
//     const path = [targetNode];
//     let current = targetNode;

//     while (current !== startNode) {
//         if (!parent[current]) {
//             return null; // Target node is not reachable from start node
//         }
//         current = parent[current];
//         path.unshift(current);
//     }

//     return path;
// }

// Example usage:
const startNode2 = "PresentSimple";
const targetNode2 = "T_Subject";
let position2 = 1 //the position of the token we are looking for

const path2 = bfs(dict_presentSimple, startNode2, targetNode2, position);
console.log("Optimal Path:", path2);
