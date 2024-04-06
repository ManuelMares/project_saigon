/*
PresentSimple   ->  Declarative
                    |Imperative
                    |Interrogative
                    |Exclamation

Exclamation     ->  Imperative T_ExclamationMark
Imperative      ->  SimpleSentence
                    |PredicateList
Interrogative   ->  AuxiliarVerb SimpleSentence T_InterrogationMark
SimpleSentence  ->  Subject PredicateList
                    |

VerbList        ->  VerbPartial VerbList
                    |Empty

VerbPartial     ->  T_Verb ',' | T_Verb | T_Verb 'and'

Subject         ->  AdjectiveList T_subject
                    |SubjectList
                    |Article AdjectiveList T_Subject
                    |Article SubjectList
                    |#Emtpy#

PredicateList   ->  PredicatePartial PredicateList
                    |#Empty#

PredicatePartial->  Predicate Coordinator |  Predicate

Predicate       ->  VerbPrefix VerbList SubjectList VerbList AdverbList

VerbPrefix      ->  AuxiliarVerb
                    |AdverbList
                    |#Empty#

AdverbList      ->  AdverbPartial AdverbList
                    |Empty

AdverbPartial   ->  T_Adverb ',' | T_Adverb | T_Adverb 'and'

AdjectiveList   ->  AdjectivePartial AdjectiveList
                    |Empty

AdjectivePartial->  T_adjective ',' | T_adjective | T_adjective 'and'

Coordinator     ->  'for' | 'and' |'nor' | 'but' | 'or' | 'yet' |'so

SubjectList      ->  SubjectPartial SubjectList
                    |Empty

SubjectPartial   ->  T_Subject ',' | T_Subject | T_Subject 'and'

AuxiliarVerb    ->  | 'do' | 'no' | 'does' | 'does not' | 'do not' | 'don't' | 'doesn't' | 'not' | #Empty#

Compound        ->  SimpleSentence Coordinator SimpleSentence
                    | SimpleSentence Coordinator Compound
                    | SimpleSentence Coordinator Complex

Complex         ->  Dependent ',' SimpleSentence
                    |SimpleSentence Dependent

Dependent       ->  Subordinator SimpleSentence

Subordinators   ->  STime | SCauseEffect | SContrast

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
        ["AuxiliarVerb", "SimpleSentence", "T_InterrogationMark"]
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
        ["Article", "AdjectiveList", "T_Subject"],
        ["Article", "SubjectList"],
        ["#Emtpy#"]
    ],
    "PredicateList": [
        ["PredicatePartial", "PredicateList"],
        []
    ],
    "PredicatePartial": [
        ["Predicate", "Coordinator"],
        ["Predicate"]
    ],
    "Predicate": [
        ["VerbPrefix", "VerbList", "SubjectList", "VerbList", "AdverbList"]
    ],
    "VerbPrefix": [
        ["AuxiliarVerb"],
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
    "Coordinator": [
        ["for"],
        ["and"],
        ["nor"],
        ["but"],
        ["or"],
        ["yet"],
        ["so"]
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
    "AuxiliarVerb": [
        ["do"],
        ["no"],
        ["does"],
        ["does not"],
        ["do not"],
        ["don't"],
        ["doesn't"],
        ["not"],
        []
    ],
    "Compound": [
        ["SimpleSentence", "Coordinator", "SimpleSentence"],
        ["SimpleSentence", "Coordinator", "Compound"],
        ["SimpleSentence", "Coordinator", "Complex"]
    ],
    "Complex": [
        ["Dependent", ",", "SimpleSentence"],
        ["SimpleSentence", "Dependent"]
    ],
    "Dependent": [
        ["Subordinator", "SimpleSentence"]
    ],
    "Subordinators": [
        ["STime"],
        ["SCauseEffect"],
        ["SContrast"]
    ],
    "Stime": [
        ["after"],
        ["before"],
        ["as soon as"],
        ["as"],
        ["when"],
        ["until"],
        ["while"]
    ],
    "SCauseEffect": [
        ["since"],
        ["because"],
        ["if"],
        ["even though"]
    ],
    "Contrast": [
        ["although"],
        ["while"],
        ["though"],
        ["whereas"],
        ["unless"]
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

// Example usage:
const startNode = "PresentSimple";
const targetNode = "T_Subject";
let position = 1 //the position of the token we are looking for

const path = bfs(dict_presentSimple, startNode, targetNode, position);
console.log("Optimal Path:", path);








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
