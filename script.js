const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const ANSWER_LENGTH = 5;

async function init() {
	let currentGuess = "";
	let currentRow = 0;

	const res = await fetch("https://words.dev-apis.com/word-of-the-day");
	const resObj = await res.json();
	const word = resObj.word.toUpperCase();
	const wordParts = word.split("");
	isLoading = false;
	setLoading(isLoading);

	function addLetter(letter) {
		if (currentGuess.length < ANSWER_LENGTH) {
			currentGuess += letter;

			//añade letra
		} else {
			//replace last letter
			currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
		}
		letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
	}
	async function commit() {
		if (currentGuess.length !== ANSWER_LENGTH) {
			// Do nothing
			return;
		}
		// TODO validate the word
		//TODO do all the marking as "correct" "close" or "wrong"
		const guessParts = currentGuess.split("");

		// first pass just finds correct letters so we can mark those as
		// correct first
		for (let i = 0; i < ANSWER_LENGTH; i++) {
			if (guessParts[i] === wordParts[i]) {
				console.log("here");
				// mark as correct
				letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
			}
		}
		currentRow++;
		currentGuess = "";
		//TODO did they win or lose?
	}
	function backspace() {
		currentGuess = currentGuess.substring(0, currentGuess.length - 1);
		letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
	}

	document.addEventListener("keydown", handleKeypress); //keydown (includes all non printable characters) because we need to use backspace
	function handleKeypress(event) {
		const action = event.key;

		if (action === "Enter") {
			commit();
		} else if (action === "Backspace") {
			backspace();
		} else if (isLetter(action)) {
			//porque isLetter nos regresa true or false
			addLetter(action.toUpperCase());
		} else {
			//do nothing
		}
	}
}
function isLetter(letter) {
	// true if it is a single letter, either upper or lowercase
	return /^[a-zA-Z]$/.test(letter);
}
function setLoading(isLoading) {
	loadingDiv.classList.toggle("hidden", !isLoading);
}
init();
