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
                    |

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
        ["Article", "AdjectiveList", "T_Subject"],
        ["Article", "SubjectList"],
        [""]
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
        []
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

// const path = bfs(dict_presentSimple, startNode, targetNode, position);
// console.log("Optimal Path:", path);






const parent = {};

// Initialize parent object with arrays for each node
for (let node in dict_presentSimple) {
    parent[node] = [];
}

console.log(parent)

function bfs2(graph, startNode, targetNode, position) {
    const queue = [startNode];
    const visited = new Set();


    let counter = 0; 
    let tokenCounter = 0;
    while (queue.length > 0) {
        counter++;
        if(counter > 100)
            return;

        const currentNode = queue.shift();
        visited.add(currentNode);
        
        
        if (currentNode === targetNode) {
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
                if (metaNode.length < position || !metaNode[position]) {
                    continue;
                } else {
                    let node = metaNode[position];
                    queue.push(node);
                    if (Array.isArray(parent[node])) {
                        parent[node].push(currentNode);
                    } else {
                        parent[node] = [currentNode];
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
const targets = ["T_Verb", "T_AuxiliarVerb", "T_Subject","T_Adverb","T_Article","T_Coordinator","T_Adjective", "T_ExclamationMark", "T_InterrogationMark"]
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
