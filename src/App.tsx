import { useState } from "react";
import fani_words from "./fani_words.json";

interface fani_words_interface {
	adjectives: string[],
	nouns: string[],
	end: string[]
}

function randint(max: number) {
    return Math.floor(Math.random() * max)
}

function choose(choices: string[]) {
    var index = randint(choices.length);
    return choices[index];
}

function apply(words: string[], removeLast: number, addLetter: number, index: number){
    let word = words[index]
    if(removeLast){
        word.slice(0, -1)
    }
    if(addLetter){
        word = word+' '+choose(["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","z"])
    }
    return(word)
}

function generateWord(words: string[]){
    let removeLast  = 10,
        addLetter   = 10,
        index       = words.length-1,
		word 		= "";

    if (randint(removeLast) === 1) {
        removeLast = 1
    } else {
        removeLast = 0
    }
    
    if (randint(addLetter) === 1) {
        addLetter = 1
    } else {
    	addLetter = 0
    }

    index = randint(index);
    word = apply(words, removeLast, addLetter, index);

    return(word)
}

function generateSentence(adjectives: string[], nouns: string[], end: string[]){
    return generateWord(adjectives)+' '+generateWord(nouns)+' '+generateWord(end)
}

function execute(fani_words: fani_words_interface){
    return generateSentence(fani_words.adjectives, fani_words.nouns, fani_words.end)
}

function App() {
	const [headerText, changeHeaderText] = useState(execute(fani_words));

	return (
		<main style={{margin: "8px"}}>
			<h2>
				{headerText}
			</h2>
			<button onClick={() => changeHeaderText(execute(fani_words))}>
				Regenerate
			</button>
		</main>
	);
}

export default App;
