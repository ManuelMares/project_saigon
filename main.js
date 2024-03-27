/*
PresentSimple   ->  Exclamation
                    |Imperative
                    |Interrogative
                    |Declarative

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




document.addEventListener("click", (event)=>{
    const button = event.target.id;
    const buttonId = button.id;
    if (buttonId == "buttonUp"){
        console.log('button up pressed');
    }
    if (buttonId == "buttonRight"){
        console.log('buttonRight pressed');
    }
    if (buttonId == "buttonDown"){
        console.log('buttonDown pressed');
    }
    if (buttonId == "buttonLeft"){
        console.log('buttonLeft pressed');
    }
})

document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (key === 'ArrowLeft') {
            // Handle left arrow key press
            console.log('Left arrow key pressed');
        } else if (key === 'ArrowUp') {
            // Handle up arrow key press
            console.log('Up arrow key pressed');
        } else if (key === 'ArrowDown') {
            // Handle down arrow key press
            console.log('Down arrow key pressed');
        } else if (key === 'ArrowRight') {
            // Handle right arrow key press
            console.log('Right arrow key pressed');
        }
});
