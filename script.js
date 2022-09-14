const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const ANSWER_LENGTH = 5;

async function init() {
	let currentGuess = "";
	let currentRow = 0;

	function addLetter(letter) {
		if (currentGuess.length < ANSWER_LENGTH) {
			currentGuess += letter;
			//añade letra
			console.log("current guess: " + currentGuess);
		} else {
			//replace last letter
			currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
			console.log("else de addLetter: " + currentGuess);
		}
		letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
	}
	async function commit() {
		if (currentGuess.length !== ANSWER_LENGTH) {
			// Do nothing
		} else {
			currentRow++;
			currentGuess = "";
			// TODO validate the word
			//TODO do all the marking as "correct" "close" or "wrong"
			//TODO did they win or lose?
		}
	}
	function backspace() {
		currentGuess = currentGuess.substring(0, currentGuess.length - 1);
		// letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
		console.log(currentGuess.length);
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
	function isLetter(letter) {
		// true if it is a single letter, either upper or lowercase
		return /^[a-zA-Z]$/.test(letter);
	}
}
init();
