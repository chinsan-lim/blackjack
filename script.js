// --------------------------------- DECK CREATION --------------------------------- //

// CREATE 52 card deck

const Cards = function (suit, rank, score, src) {
	this.suit = suit;
	this.rank = rank;
	this.score = score;
	this.src = src;
};

const suits = ['CLUB', 'DIAMOND', 'HEART', 'SPADE'];
const ranks = [
	'A',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'J',
	'Q',
	'K',
];

// INITIALIZE J, Q, K cards with value of '10', A '11'

const score = {
	A: 11,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	10: 10,
	J: 10,
	Q: 10,
	K: 10,
};
// ---------------------------------- IMG SRC ---------------------------------- //
// SUIT - RANK

// card source images: https://totalnonsense.com/open-source-vector-playing-cards/

//create an 8 decks of 52 cards
let EightDecks = [];

//create 8 card deck
for (let j = 0; j < 8; j++) {
	for (let i = 0; i < suits.length; i++) {
		for (let z = 0; z < ranks.length; z++) {
			EightDecks.push(
				new Cards(
					suits[i],
					ranks[z],
					score[ranks[z]],
					`cards/${suits[i]}-${ranks[z]}.svg`
				)
			);
		}
	}
}

//CREATE 8 DECKS

// REFERENCE hitBtn, standBtn, startBtn, howToPlayBtn, startModalBtn, closeHowToPlayBtn, reDealBtn, card divs for dealer and player

// ---------------------------------- DOM ELEMENTS ---------------------------------- //

const hitBtn = document.querySelector('.hit');
const dblBtn = document.querySelector('.double');
const standBtn = document.querySelector('.stand');
const startBtn = document.querySelector('.start-game');
const reDealBtn = document.querySelector('.redeal');

let playerHand = document.querySelector('.player-container');
let dealerHand = document.querySelector('.dealer-container');

let playerBot = document.querySelector('#player-bottom-card');
let playerTop = document.querySelector('#dealer-top-card');

let dealerBot = document.querySelector('#dealer-bottom-card');
let dealerTop = document.querySelector('#dealer-top-card');

let winner = document.querySelector('.winner');

let betAmt = document.querySelector('.bet-amount');
let bankrollEl = document.querySelector('.bankroll');

// make sure html classes match these event listeners
const howToPlayBtn = document.querySelector('.how-to-play');
const startModalBtn = document.querySelector('.start-from-modal');
const closeHowToPlayBtn = document.querySelector('.close-from-htp');

// ---------------------------------- VARIABLES ---------------------------------- //
// DECLARE constants for hand arrays

let playerHandArr = [];
let dealerHandArr = [];

// DECLARE state variables for bankroll, deckSize
let bankroll = 100;
bankrollEl.innerText = 100;
let deckSize;
let cardTotal;

// DECLARE object for player/dealer with cardTotal

let playerSum = 0;
let dealerSum = 0;

const sum = (previousCard, currentCard) => previousCard + currentCard;

// ATTACH event listener to: - START - HOWTOPLAY - HIT - STAND - DOUBLE - SPLIT - REDEAL

// ------------------------------ EVENT LISTENERS ------------------------------ //

hitBtn.addEventListener('click', playerHit);
// dblBtn.addEventListener('click', dblBet);
standBtn.addEventListener('click', stand);
startBtn.addEventListener('click', startGame);
reDealBtn.addEventListener('click', resetGame);

// ------------------------------- SHUFFLE DECK ------------------------------- //

// bubblesorting cards in random locations

function shuffleCards() {
	for (let i = 0; i < EightDecks.length; i++) {
		let placeholder = EightDecks[i];
		let randomPosition = Math.floor(Math.random() * EightDecks.length);
		EightDecks[i] = EightDecks[randomPosition];
		EightDecks[randomPosition] = placeholder;
	}
}

shuffleCards();

// --------------------------- DEAL INITIAL CARDS --------------------------- //

function dealCards() {
	playerBot = EightDecks[0];
	playerHandArr.push(EightDecks[0].score);
	document.getElementById('player-bottom-card').src = EightDecks[0].src;
	EightDecks.shift();
	//
	document.getElementById('dealer-bottom-card').src = EightDecks[0].src;
	dealerHandArr.push(EightDecks[0].score);
	EightDecks.shift();
	//
	playerTop = EightDecks[0];
	playerHandArr.push(EightDecks[0].score);
	document.getElementById('player-top-card').src = EightDecks[0].src;
	EightDecks.shift();
	//
	dealerTop = EightDecks[0];
	document.getElementById('dealer-top-card').src = EightDecks[0].src;
	dealerHandArr.push(EightDecks[0].score);
	EightDecks.shift();
}

// ------------------------------- HAND ARRAY CALCS ------------------------------- //

function playerCardTotal() {
	playerSum = playerHandArr.reduce(sum);

	for (let i = 0; i < playerHandArr.length; i++) {
		if (playerHandArr[i] === 11 && playerSum > 21) {
			playerSum -= 10;
		}
	}
}

function dealerCardTotal() {
	dealerSum = dealerHandArr.reduce(sum);

	for (let i = 0; i < dealerHandArr.length; i++) {
		if (dealerSum > 21 && dealerHandArr[i] === 11) {
			dealerSum -= 10;
		}
	}
}

// ------------------------------- HIT OR STAND ------------------------------- //

function playerHit() {
	newCardSlot = document.createElement('img');
	newCardSlot.src = EightDecks[0].src;
	playerHand.appendChild(newCardSlot);
	playerHandArr.push(EightDecks[0].score);
	EightDecks.shift();

	playerCardTotal();
}

function dealerHit() {
	while (dealerSum < 17) {
		newCardSlot = document.createElement('img');
		newCardSlot.src = EightDecks[0].src;
		dealerHand.appendChild(newCardSlot);
		dealerHandArr.push(EightDecks[0].score);
		EightDecks.shift();

		dealerCardTotal();
	}
}
function stand() {
	hitBtn.disabled = true;
	betAmt.disabled = true;

	//unflip dealer bot card

	dealerHit();
	checkForWinner();
}

// ------------------------------- CHECK FOR WINNER ------------------------------- //

// CHECK FOR BLACKJACK EACH ITERATION

// card totals determined from player/dealer HandArr, populated from deal and each time player hits, dealer adds a card

// initial: check for player/dealer blackjack
// in-game: check for blackjack each time a card is add

//create bankrollEl

function checkForBlackjack() {
	//initial check for blackjack after deal
	if (playerHandArr.length === 2 && playerSum === 21) {
		winner.innerHTML = 'auto player blackjack pays 3 to 2'; //auto player blackjack
		bankroll += 1.5 * Number(betAmt.value);
		bankrollEl.innerHTML = bankroll;
	} else if (
		dealerHandArr.length === 2 &&
		dealerSum === 21 &&
		playerSum !== 21
	) {
		winner.innerHTML = 'auto dealer blackjack'; //auto dealer blackjack when player doesn't have 21
		bankroll -= Number(betAmt.value);
		bankrollEl.innerHTML = bankroll;
	} else if (
		playerHandArr.length === 0 &&
		playerSum === 21 &&
		dealerHandArr.length === 0 &&
		dealerSum === 21
	) {
		winner.innerHTML = 'auto player blackjack pays 3 to 2'; //auto player blackjack before dealer gets blackjack
		bankroll += 1.5 * Number(betAmt.value);
		bankrollEl.innerHTML = bankroll;
	}
}
function checkForWinner() {
	//in-game winner check when player stands and after dealer has stood/hit
	if (playerSum === 21) {
		winner.innerHTML = 'player blackjack!'; //player hits to bust
		bankroll += Number(betAmt.value);
		bankrollEl.innerHTML = bankroll;
	} else if (dealerSum === 21 && playerSum !== 21) {
		winner.innerHTML = 'dealer blackjack!'; //player hits to bust
		bankroll -= Number(betAmt.value);
		bankrollEl.innerHTML = bankroll;
	} else if (playerSum > 21) {
		winner.innerHTML = `player bust with ${playerSum}! dealer wins`; //player hits to bust
		bankroll -= Number(betAmt.value);
		bankrollEl.innerHTML = bankroll;
	} else if (playerSum < 21 && dealerSum > 21) {
		winner.innerHTML = `dealer bust with ${dealerSum}! player wins`; //player stands under 21 and dealer busts
		bankroll += Number(betAmt.value);
		bankrollEl.innerHTML = bankroll;
	} else if (playerSum > dealerSum && playerSum < 21 && dealerSum < 21) {
		winner.innerHTML = `player wins with ${playerSum}`; //player and dealer stand under 21, and playerSum is larger
		bankroll += Number(betAmt.value);
		bankrollEl.innerHTML = bankroll;
	} else if (playerSum < dealerSum && playerSum < 21 && dealerSum < 21) {
		winner.innerHTML = `dealer wins with ${dealerSum}`; //player and dealer stand under 21, and dealerSum is larger
		bankroll -= Number(betAmt.value);
		bankrollEl.innerHTML = bankroll;
	} else if (playerSum < 21 && dealerSum < 21 && playerSum === dealerSum) {
		winner.innerHTML = 'push'; ////player and dealer stand under 21, and playerSum = dealerSum
	}
}
// ---------------------------------- RESET GAME ---------------------------------- //

function resetGame() {
	//reset sums
	playerSum = 0;
	dealerSum = 0;

	//remove added cards

	while (playerHand.childNodes.length > 5) {
		playerHand.removeChild(playerHand.lastChild);
	}

	while (dealerHand.childNodes.length > 6) {
		dealerHand.removeChild(dealerHand.lastChild);
	}

	//reset hand Arrays
	playerHandArr = [];
	dealerHandArr = [];

	//reset winner button
	winner.innerHTML = '';
	//turn on hit button/betamt input

	hitBtn.disabled = false;
	betAmt.disabled = false;

	//deal cards
	dealCards();

	playerCardTotal();
	dealerCardTotal();

	checkForBlackjack();
}

// ---------------------------------- START GAME ---------------------------------- //

function startGame() {
	bankrollEl.innerText = 100;
	shuffleCards();
	resetGame();
}

startGame();

// -------------------------------- HOW TO PLAY -------------------------------- //
// adapted from class notes //

const openBtn = document.getElementById('openModal');
const modal = document.getElementById('modal');
const close = document.getElementById('close');
const openModal = () => {
	modal.style.display = 'block';
};
const closeModal = () => {
	modal.style.display = 'none';
};
openBtn.addEventListener('click', openModal);
close.addEventListener('click', closeModal);
