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
        ["Declarative"]
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
        ["#Empty#"]
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
        ["#Empty#"]
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
        ["#Empty#"]
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


function findOptimalPathAStar(start, target) {
    const queue = new PriorityQueue(); // Priority queue for A* search
    const visited = new Set();

    queue.enqueue([start], 0); // Enqueue start node with priority 0

    while (!queue.isEmpty()) {
        const [path, cost] = queue.dequeue();
        const currentNode = path[path.length - 1];

        if (currentNode === target) {
            return path; // Return optimal path if target is reached
        }

        if (!visited.has(currentNode)) {
            visited.add(currentNode);
            if (dict_presentSimple.hasOwnProperty(currentNode)) {
                for (const child of dict_presentSimple[currentNode]) {
                    const newPath = path.concat(child);
                    const newCost = cost + 1; // Increment cost by 1 for simplicity
                    queue.enqueue(newPath, newCost); // Enqueue child node with updated cost
                }
            }
        }
    }
    return null; // Path not found
}

// Priority queue implementation (for simplicity, assuming small number of nodes)
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item, priority) {
        this.queue.push({ item, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        if (!this.isEmpty()) {
            return this.queue.shift().item;
        }
        return null;
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

// Example usage:
const startNode = "PresentSimple";
const targetNode = "T_Subject";
const optimalPath = findOptimalPathAStar(startNode, targetNode);
console.log("Optimal Path:", optimalPath);



// function bfs(graph, startNode, target){
//     let visited = new Set();
//     let queue = [[startNode]];

//     let counter = 0
//     while(queue.length > 0){
//         let node = queue.shift();

//         if(!visited.has(node)){
//             visited.add(node);

//             let neighbors = graph[node] || []
//             queue.push(neighbors)
//             console.log(`First node is: ${node} its neighbors are: ${neighbors}`)
//             if(node === target)
//             {
//                 console.log("target FOUND!!!!!!!!!")
//                 return;
//             }
//             if(counter ==5){
//                 return;
//             }
//         }
//         counter++;
//     }

// }


// let test1 = ["T_Subject", "T_Verb"]

// let index = 0 //Each node is composed of an array of strings, if we are looking of the first element in the tokenized list, we want 
// test1.forEach(token => {
//     bfs(dict_presentSimple, "PresentSimple", token);    
// });








// document.addEventListener("click", (event)=>{
//     const button = event.target.id;
//     const buttonId = button.id;
//     if (buttonId == "buttonUp"){
//         console.log('button up pressed');
//     }
//     if (buttonId == "buttonRight"){
//         console.log('buttonRight pressed');
//     }
//     if (buttonId == "buttonDown"){
//         console.log('buttonDown pressed');
//     }
//     if (buttonId == "buttonLeft"){
//         console.log('buttonLeft pressed');
//     }
// })

// document.addEventListener('keydown', function(event) {
//         const key = event.key;
//         if (key === 'ArrowLeft') {
//             // Handle left arrow key press
//             console.log('Left arrow key pressed');
//         } else if (key === 'ArrowUp') {
//             // Handle up arrow key press
//             console.log('Up arrow key pressed');
//         } else if (key === 'ArrowDown') {
//             // Handle down arrow key press
//             console.log('Down arrow key pressed');
//         } else if (key === 'ArrowRight') {
//             // Handle right arrow key press
//             console.log('Right arrow key pressed');
//         }
// });




