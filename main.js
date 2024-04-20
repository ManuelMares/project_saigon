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
        ["AdjectiveList", "T_Subject"],
        ["SubjectList"],
        ["T_Article", "AdjectiveList", "T_Subject"],
        ["T_Article", "SubjectList"],
        []
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
    "PresentSimple":{
        "T_Verb": {"distance": 7, "path": "Imperative"},
        "T_AuxiliarVerb": {"distance": 2, "path": "Interrogative"},
        "T_Subject": {"distance": 4, "path": "Declarative"},
        "T_Adverb": {"distance": 7, "path": "Imperative"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": 4, "path": "Declarative"},
        "T_Coordinator": {"distance": 4, "path": "Imperative"},
        "T_Adjective": {"distance": 6, "path": "Declarative"},
        "T_ExclamationMark": {"distance": 2, "path": "Exclamation"},
        "T_InterrogationMark": {"distance": 2, "path": "Interrogative"}
    },
    "Exclamation": {
        "T_Verb": {"distance": 7, "path": "Imperative"},
        "T_AuxiliarVerb": {"distance": 6, "path": "Imperative"},
        "T_Subject": {"distance": 4, "path": "Imperative"},
        "T_Adverb": {"distance": 7, "path": "Imperative"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": 4, "path": "Imperative"},
        "T_Coordinator": {"distance": 4, "path": "Imperative"},
        "T_Adjective": {"distance": 6, "path": "Imperative"},
        "T_ExclamationMark": {"distance": 1, "path": "Imperative"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "Imperative": {
        "T_Verb": {"distance": 6, "path": "PredicateList"},
        "T_AuxiliarVerb": {"distance": 5, "path": "PredicateList"},
        "T_Subject": {"distance": 3, "path": "SimpleSentence"},
        "T_Adverb": {"distance": 6, "path": "PredicateList"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": 3, "path": "SimpleSentence"},
        "T_Coordinator": {"distance": 3, "path": "PredicateList"},
        "T_Adjective": {"distance": 5, "path": "SimpleSentence"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "Interrogative": {
        "T_Verb": {"distance": 7, "path": "SimpleSentence"},
        "T_AuxiliarVerb": {"distance": 1, "path": "T_AuxiliarVerb"},
        "T_Subject": {"distance": 3, "path": "SimpleSentence"},
        "T_Adverb": {"distance": 7, "path": "SimpleSentence"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": 3, "path": "SimpleSentence"},
        "T_Coordinator": {"distance": 4, "path": "SimpleSentence"},
        "T_Adjective": {"distance": 5, "path": "SimpleSentence"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": 1, "path": "T_InterrogationMark"}
    },
    "Declarative": {
        "T_Verb": {"distance": 7, "path": "SimpleSentence"},
        "T_AuxiliarVerb": {"distance": 6, "path": "SimpleSentence"},
        "T_Subject": {"distance": 3, "path": "SimpleSentence"},
        "T_Adverb": {"distance": 7, "path": "SimpleSentence"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": 3, "path": "SimpleSentence"},
        "T_Coordinator": {"distance": 4, "path": "SimpleSentence"},
        "T_Adjective": {"distance": 5, "path": "SimpleSentence"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "SimpleSentence": {
        "T_Verb": {"distance": 6, "path": "PredicateList"},
        "T_AuxiliarVerb": {"distance": 5, "path": "PredicateList"},
        "T_Subject": {"distance": 2, "path": "Subject"},
        "T_Adverb": {"distance": 6, "path": "PredicateList"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": 2, "path": "Subject"},
        "T_Coordinator": {"distance": 3, "path": "PredicateList"},
        "T_Adjective": {"distance": 4, "path": "Subject"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "VerbList": {
        "T_Verb": {"distance": 2, "path": "VerbPartial"},
        "T_AuxiliarVerb": {"distance": Infinity, "path": "np"},
        "T_Subject": {"distance": Infinity, "path": "np"},
        "T_Adverb": {"distance": Infinity, "path": "np"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": Infinity, "path": "np"},
        "T_Coordinator": {"distance": Infinity, "path": "np"},
        "T_Adjective": {"distance": Infinity, "path": "np"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "VerbPartial": {
        "T_Verb": {"distance": 1, "path": "T_Verb"},
        "T_AuxiliarVerb": {"distance": Infinity, "path": "np"},
        "T_Subject": {"distance": Infinity, "path": "np"},
        "T_Adverb": {"distance": Infinity, "path": "np"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": Infinity, "path": "np"},
        "T_Coordinator": {"distance": Infinity, "path": "np"},
        "T_Adjective": {"distance": Infinity, "path": "np"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "Subject": {
        "T_Verb": {"distance": Infinity, "path": "np"},
        "T_AuxiliarVerb": {"distance": Infinity, "path": "np"},
        "T_Subject": {"distance": 1, "path": "T_Subject"},
        "T_Adverb": {"distance": Infinity, "path": "np"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": 1, "path": "T_Article"},
        "T_Coordinator": {"distance": Infinity, "path": "np"},
        "T_Adjective": {"distance": 3, "path": "AdjectiveList"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "PredicateList": {
        "T_Verb": {"distance": 5, "path": "PredicatePartial"},
        "T_AuxiliarVerb": {"distance": 4, "path": "PredicatePartial"},
        "T_Subject": {"distance": 5, "path": "PredicatePartial"},
        "T_Adverb": {"distance": 5, "path": "PredicatePartial"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": Infinity, "path": "np"},
        "T_Coordinator": {"distance": 2, "path": "PredicatePartial"},
        "T_Adjective": {"distance": Infinity, "path": "np"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "PredicatePartial": {
        "T_Verb": {"distance": 4, "path": "Predicate"},
        "T_AuxiliarVerb": {"distance": 3, "path": "Predicate"},
        "T_Subject": {"distance": 4, "path": "Predicate"},
        "T_Adverb": {"distance": 4, "path": "Predicate"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": Infinity, "path": "np"},
        "T_Coordinator": {"distance": 1, "path": "T_Coordinator"},
        "T_Adjective": {"distance": Infinity, "path": "np"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "Predicate": {
        "T_Verb": {"distance": 3, "path": "VerbList"},
        "T_AuxiliarVerb": {"distance": 2, "path": "VerbPrefix"},
        "T_Subject": {"distance": 3, "path": "nSubjectList"},
        "T_Adverb": {"distance": 3, "path": "AdverbList"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": Infinity, "path": "np"},
        "T_Coordinator": {"distance": Infinity, "path": "np"},
        "T_Adjective": {"distance": Infinity, "path": "np"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "VerbPrefix": {
        "T_Verb": {"distance": Infinity, "path": "np"},
        "T_AuxiliarVerb": {"distance":1, "path": "T_AuxiliarVerb"},
        "T_Subject": {"distance": Infinity, "path": "np"},
        "T_Adverb": {"distance": 3, "path": "AdverbList"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": Infinity, "path": "np"},
        "T_Coordinator": {"distance": Infinity, "path": "np"},
        "T_Adjective": {"distance": Infinity, "path": "np"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "AdverbList": {
        "T_Verb": {"distance": Infinity, "path": "np"},
        "T_AuxiliarVerb": {"distance": Infinity, "path": "np"},
        "T_Subject": {"distance": Infinity, "path": "np"},
        "T_Adverb": {"distance": 2, "path": "AdverbPartial"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": Infinity, "path": "np"},
        "T_Coordinator": {"distance": Infinity, "path": "np"},
        "T_Adjective": {"distance": Infinity, "path": "np"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "AdverbPartial": {
        "T_Verb": {"distance": Infinity, "path": "np"},
        "T_AuxiliarVerb": {"distance": Infinity, "path": "np"},
        "T_Subject": {"distance": Infinity, "path": "np"},
        "T_Adverb": {"distance": 1, "path": "T_Adverb"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": Infinity, "path": "np"},
        "T_Coordinator": {"distance": Infinity, "path": "np"},
        "T_Adjective": {"distance": Infinity, "path": "np"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "AdjectiveList": {
        "T_Verb": {"distance": Infinity, "path": "np"},
        "T_AuxiliarVerb": {"distance": Infinity, "path": "np"},
        "T_Subject": {"distance": Infinity, "path": "np"},
        "T_Adverb": {"distance": Infinity, "path": "np"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": Infinity, "path": "np"},
        "T_Coordinator": {"distance": Infinity, "path": "np"},
        "T_Adjective": {"distance": 2, "path": "AdjectivePartial"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "AdjectivePartial": {
        "T_Verb": {"distance": Infinity, "path": "np"},
        "T_AuxiliarVerb": {"distance": Infinity, "path": "np"},
        "T_Subject": {"distance": Infinity, "path": "np"},
        "T_Adverb": {"distance": Infinity, "path": "np"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": Infinity, "path": "np"},
        "T_Coordinator": {"distance": Infinity, "path": "np"},
        "T_Adjective": {"distance": 1, "path": "T_Adjective"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "SubjectList": {
        "T_Verb": {"distance": Infinity, "path": "np"},
        "T_AuxiliarVerb": {"distance": Infinity, "path": "np"},
        "T_Subject": {"distance": 2, "path": "SubjectPartial"},
        "T_Adverb": {"distance": Infinity, "path": "np"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": Infinity, "path": "np"},
        "T_Coordinator": {"distance": Infinity, "path": "np"},
        "T_Adjective": {"distance": Infinity, "path": "np"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "SubjectPartial": {
        "T_Verb": {"distance": Infinity, "path": "np"},
        "T_AuxiliarVerb": {"distance": Infinity, "path": "np"},
        "T_Subject": {"distance": 1, "path": "T_Subject"},
        "T_Adverb": {"distance": Infinity, "path": "np"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": Infinity, "path": "np"},
        "T_Coordinator": {"distance": Infinity, "path": "np"},
        "T_Adjective": {"distance": Infinity, "path": "np"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "Compound": {
        "T_Verb": {"distance": 7, "path": "SimpleSentence"},
        "T_AuxiliarVerb": {"distance": 6, "path": "SimpleSentence"},
        "T_Subject": {"distance": 3, "path": "SimpleSentence"},
        "T_Adverb": {"distance": 7, "path": "SimpleSentence"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": 3, "path": "SimpleSentence"},
        "T_Coordinator": {"distance": 1, "path": "T_Coordinator"},
        "T_Adjective": {"distance": 5, "path": "SimpleSentence"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "Complex": {
        "T_Verb": {"distance": 7, "path": "SimpleSentence"},
        "T_AuxiliarVerb": {"distance": 6, "path": "SimpleSentence"},
        "T_Subject": {"distance": 3, "path": "SimpleSentence"},
        "T_Adverb": {"distance": 7, "path": "SimpleSentence"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": 3, "path": "SimpleSentence"},
        "T_Coordinator": {"distance": 4, "path": "SimpleSentence"},
        "T_Adjective": {"distance": 5, "path": "SimpleSentence"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    },
    "Dependent": {
        "T_Verb": {"distance": 7, "path": "SimpleSentence"},
        "T_AuxiliarVerb": {"distance": 6, "path": "SimpleSentence"},
        "T_Subject": {"distance": 3, "path": "SimpleSentence"},
        "T_Adverb": {"distance": 7, "path": "SimpleSentence"},
        "T_Subordinator": {"distance": Infinity, "path": "np"},
        "T_Article": {"distance": 3, "path": "SimpleSentence"},
        "T_Coordinator": {"distance": 4, "path": "SimpleSentence"},
        "T_Adjective": {"distance": 5, "path": "SimpleSentence"},
        "T_ExclamationMark": {"distance": Infinity, "path": "np"},
        "T_InterrogationMark": {"distance": Infinity, "path": "np"}
    }
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

//Parameters:   graph - present simple graph
//              node - represents current node
//              target - target token
//Output:       list of nodes to explore next. List is sorted in ascending order.
//              if there is not a path to target, returns empty list.
function getHeuristic(graph, node, target){

    //children holds children of current node and represents all potential paths from current node
    let metanode = graph[node]
    let choiceList = []

    for (let i = 0; i < metanode.length; i++){
        let ruleList = metanode[i] //the list of nodes in one rule of a metanode

        for (let j = 0; j < ruleList.length; j++){
            child = metanode[i][j] //single node inside of rulelist

            //found target as a direct child
            if(child === target){
                choiceList.push([dict_heuristics[node][target]['distance'] + j, metanode[i]])
            }
            //a token or literal, but not target. Has no path to target
            else if (child.startsWith("T_") || child === ',' || child === 'and'){
                continue
            }
            //A node with potential path to target
            else if(dict_heuristics[child][target]['path'] != 'np'){
                choiceList.push([dict_heuristics[child][target]['distance'] + j, metanode[i]])
            }
        }
    }

    //sort list in ascending order
    choiceList.sort()
    console.log(choiceList)
    return choiceList
};
getHeuristic(dict_presentSimple, 'PresentSimple', 'T_Verb')


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












const parent_DFS = {};

// Initialize parent object with arrays for each node
for (let node in dict_presentSimple) {
    parent_DFS[node] = [];
}

function dfs_DFS(graph, startNode, targetNode, maxDepth) {
    const stack = [startNode];
    const visited = new Set();
    let maxDepths_Lists = {
        "SubjectList": 0,
        "AdjectiveList": 0,
        "AdverbList": 0,
        "PredicateList": 0,
        "VerbList": 0,
    }

    let counter = 0;
    while (stack.length > 0) {
        counter++;
        if(counter > 1000)
            return [];

        const currentNode = stack.pop();
        visited.add(currentNode);

        if (currentNode === targetNode) {
            return getPath_DFS(startNode, targetNode, parent_DFS);
        }

        if(currentNode.startsWith("T_"))
            continue;

        let edges = graph[currentNode];

        if(!edges)
            continue;

        for (let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
            let metaNode = edges[edgeIndex];
            for (let metaNodeIndex = 0; metaNodeIndex < metaNode.length; metaNodeIndex++) {
                let childNode = metaNode[metaNodeIndex];

                if(childNode in maxDepths_Lists){
                    maxDepths_Lists[childNode] += 1;
                    if(maxDepths_Lists[childNode] <= maxDepth){
                        stack.push(childNode);
                        if (Array.isArray(parent_DFS[childNode])) {
                            parent_DFS[childNode].push(currentNode);
                        } else {
                            parent_DFS[childNode] = [currentNode];
                        }
                    }
                }else{
                    stack.push(childNode);
                    if (Array.isArray(parent_DFS[childNode])) {
                        parent_DFS[childNode].push(currentNode);
                    } else {
                        parent_DFS[childNode] = [currentNode];
                    }
                }
            }
        }
    }
    return []; // Path not found
}

function getPath_DFS(startNode, targetNode, parent_DFS) {
    const path = [];
    let current = targetNode;
    let counter = 0;
    while (current !== startNode) {
        counter++;
        if(counter > 100)
            break;

        path.unshift(current);
        current = parent_DFS[current] ? parent_DFS[current][0] : null; // Check if parent[current] exists
        if (!current) {
            return path;
        }
    }
    path.unshift(startNode); // Add start node to path

    return path;
}


































function main(){
    /*
        path = graph[first node]                //the first path is the origin node. Then, it is the previous path
        For newTargetToken in tokens:
            for newRoot in heuristic:           //heuristic sorts the nodes we will start looking from:
                path = bfs2(graph, newRoot, newTargetToken)


    */
}


<button onclick="f1()"/>