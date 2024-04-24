import { DICT_HEURISTICS, DICT_PRESENT_SIMPLE, TOKENS } from "./assets/structures_SimplePresent.js";

const ROOT = "PresentSimple";

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
            let child = ruleList[j] //single node inside of rulelist

            //found target as a direct child
            if(child === target){
                choiceList.push([DICT_HEURISTICS[node][target]['distance'] + j, metanode[i]])
            }
            //a token or literal, but not target. Has no path to target
            else if (child.startsWith("T_") || child === ',' || child === 'and'){
                continue
            }
            //A node with potential path to target
            else if(DICT_HEURISTICS[child][target]['path'] != 'np'){
                choiceList.push([DICT_HEURISTICS[child][target]['distance'] + j, metanode[i]])
            }
        }
    }
    //sort list in ascending order
    choiceList.sort()
    console.log(choiceList)
    return choiceList
};
getHeuristic(DICT_PRESENT_SIMPLE, ROOT, 'T_Verb')






let parent_DFS = {};

// Initialize parent object with arrays for each node
for (let node in DICT_PRESENT_SIMPLE) {
    parent_DFS[node] = [];
}

function dfs(graph, startNode, targetNode, maxDepth) {
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
        // if(counter > 1000)
        //     return [];

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































/*
Given an array of strings that form a sentence, this function indicates the optimal syntax-structure to construct the sentence
@param sentence
    An array of strings
@return

*/
function deconstruct_sentence(sentence){
    let sentenceParticle    = sentence[0];
    let possibleRoots       = [ROOT];
    let newRoot             = possibleRoots[0]
    for (let indexSentence = 0; indexSentence < sentence.length; indexSentence++) {
        for (let index_possibleRoots = 0; index_possibleRoots < array.length; index_possibleRoots++) {
            newRoot             = possibleRoots[index_possibleRoots];
            possibleRoots       = dfs(DICT_PRESENT_SIMPLE, newRoot, sentenceParticle, 10);
            sentenceParticle    = sentence[indexSentence];
        }
    }
}

deconstruct_sentence(["T_Adverb", "T_Subject"]);
