// --------------------------------- DECK CREATION --------------------------------- //

// CREATE 52 card deck

const Cards = function (suit, rank, score, image) {
	this.suit = suit;
	this.rank = rank;
	this.score = score;
	this.image = image;
};

const suits = ['CLUB', 'DIAMOND', 'HEART', 'SPADES'];
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

// INITIALIZE J, Q, K cards with value of '10', A '11

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

let FiftyTwoCards = [];

//create rect card element here
for (let i = 0; i < suits.length; i++) {
	for (let z = 0; z < ranks.length; z++) {
		FiftyTwoCards.push(new Cards(suits[i], ranks[z], score[ranks[z]]));
	}
}

console.log(FiftyTwoCards);

//CREATE 8 DECKS
// ---------------------------------- CARD API ---------------------------------- //

// const url = 'http://deckofcardsapi.com/api/deck/new/';

// ---------------------------------- VARIABLES ---------------------------------- //
// DECLARE constants for deck, blackjack

const deck = FiftyTwoCards;
const blackjack = 21;
const playerHandArr = [];
const dealerHandArr = [];

// DECLARE state variables for bankroll, betAmt, deckSize

let bankroll = 100;
let betAmt;
let deckSize;
let cardTotal;

// DECLARE object for player/dealer with cardTotal

let playerSum = 0;
let dealerSum = 0;

const sum = (previousCard, currentCard) => previousCard + currentCard;

// REFERENCE hitBtn, standBtn, startBtn, howToPlayBtn, startModalBtn, closeHowToPlayBtn, reDealBtn, card divs for dealer and player

// ---------------------------------- DOM ELEMENTS ---------------------------------- //

const hitBtn = document.querySelector('.hit');
const dblBtn = document.querySelector('.double');
const standBtn = document.querySelector('.stand');
const startBtn = document.querySelector('.start-game');
const reDealBtn = document.querySelector('.redeal');

let playerHand = document.querySelector('.player-container');
let dealerHand = document.querySelector('.dealer-container');

let playerBot = document.querySelector('.player-bottom-card');
let playerTop = document.querySelector('.dealer-top-card');

let dealerBot = document.querySelector('.dealer-bottom-card');
let dealerTop = document.querySelector('.dealer-top-card');

let winner = document.querySelector('.winner');

// make sure html classes match these event listeners
const howToPlayBtn = document.querySelector('.how-to-play');
const startModalBtn = document.querySelector('.start-from-modal');
const closeHowToPlayBtn = document.querySelector('.close-from-htp');

// ATTACH event listener to: - START - HOWTOPLAY - HIT - STAND - DOUBLE - SPLIT - REDEAL

// ------------------------------ EVENT LISTENERS ------------------------------ //

hitBtn.addEventListener('click', playerHit);
// dblBtn.addEventListener('click', dblBet);
standBtn.addEventListener('click', stand);
startBtn.addEventListener('click', startGame);
// reDealBtn.addEventListener('click', startGame);

// ---------------------------------- FUNCTIONS ---------------------------------- //

// SHUFFLE THE DECK
// bubblesorting cards in random locations

function shuffleCards() {
	for (let i = 0; i < FiftyTwoCards.length; i++) {
		let placeholder = FiftyTwoCards[i];
		let randomPosition = Math.floor(Math.random() * FiftyTwoCards.length);
		FiftyTwoCards[i] = FiftyTwoCards[randomPosition];
		FiftyTwoCards[randomPosition] = placeholder;
	}
}

shuffleCards();

// DEAL OUT 4 CARDS
// alternate the deal, starting with player and end with dealer
// remove dealt cards from the original deck

function dealCards() {
	playerBot = FiftyTwoCards[0];
	playerHandArr.push(FiftyTwoCards[0].score);
	document.getElementById('player-bottom-card').innerHTML =
		FiftyTwoCards[0].rank;
	FiftyTwoCards.shift();
	//
	document.getElementById('dealer-bottom-card').innerHTML =
		FiftyTwoCards[1].rank;
	dealerHandArr.push(FiftyTwoCards[1].score);
	FiftyTwoCards.shift();
	//
	playerTop = FiftyTwoCards[2];
	playerHandArr.push(FiftyTwoCards[2].score);
	document.getElementById('player-top-card').innerHTML = FiftyTwoCards[2].rank;
	FiftyTwoCards.shift();
	//
	dealerTop = FiftyTwoCards[3];
	document.getElementById('dealer-top-card').innerHTML = FiftyTwoCards[3].rank;
	dealerHandArr.push(FiftyTwoCards[3].score);
	FiftyTwoCards.shift();
}

// CHECK FOR BLACKJACK EACH ITERATION

// card totals determined from player/dealer HandArr, populated from deal and each time player hits, dealer adds a card

// initial: check for player/dealer blackjack
// in-game: check for blackjack each time a card is add

function checkForBlackjack() {
	if (playerSum === 21) {
		console.log('player blackjack');
	} else if (playerSum > 21) {
		console.log('player BUST');
	}

	if (dealerSum === 21) {
		console.log('dealer blackjack');
	} else if (dealerSum > 21) {
		console.log('dealer BUST');
	}

	if (playerSum === dealerSum) {
		console.log('PUSH');
	}
}

function checkForWinner() {
	if (playerSum === dealerSum) {
		console.log('push');
	} else if (playerSum === 21 && playerHandArr.length === 2) {
		console.log('player blackjack');
	} else if (
		dealerSum === 21 &&
		dealerHandArr.length === 2 &&
		playerSum !== 21
	) {
		console.log('dealer blackjack');
	} else if (playerSum > dealerSum && playerSum < 21 && dealerSum < 21) {
		console.log('player wins');
	} else if (dealerSum > 21) {
		console.log('dealer bust! player wins');
	} else if (playerSum < dealerSum && playerSum < 21 && dealerSum < 21) {
		console.log('dealer wins');
	} else if (playerSum > 21) {
		console.log('player bust! dealer wins');
	}
}

// PLAYER CHOOSE TO HIT OR STAND
// hit will add another card to player hand/array
// stand will move the gameplay to the dealer hit

function playerCardTotal() {
	playerSum = playerHandArr.reduce(sum);

	for (let i = 0; i < playerHandArr.length; i++) {
		if (playerHandArr[i] === 11 && playerSum > 21) {
			playerSum -= 10;
		}

		console.log(playerHandArr);
		console.log(playerSum);
	}
}

function dealerCardTotal() {
	dealerSum = dealerHandArr.reduce(sum);

	for (let i = 0; i < dealerHandArr.length; i++) {
		if (dealerSum > 21 && dealerHandArr[i] === 11) {
			dealerSum -= 10;
		}
		console.log(dealerHandArr);
		console.log(dealerSum);
	}
}

function playerHit() {
	newCardSlot = document.createElement('div');
	newCardSlot.innerHTML = FiftyTwoCards[0].rank;
	playerHand.appendChild(newCardSlot);
	playerHandArr.push(FiftyTwoCards[0].score);
	FiftyTwoCards.shift();

	playerCardTotal();

	console.log(playerSum);
}

//if the new card's value is 11 and the total is > 21, subtract 10.
function dealerHit() {
	while (dealerSum < 17) {
		newCardSlot = document.createElement('div');
		newCardSlot.innerHTML = FiftyTwoCards[0].rank;
		dealerHand.appendChild(newCardSlot);
		dealerHandArr.push(FiftyTwoCards[0].score);
		FiftyTwoCards.shift();

		dealerCardTotal();
		console.log(dealerSum);
	}
}
function stand() {
	hitBtn.disabled = true;
	dealerHit();
	checkForWinner();
}

// ---------------------------------- START GAME ---------------------------------- //

function startGame() {
	dealCards();

	playerCardTotal();
	dealerCardTotal();

	checkForBlackjack();

	//if player gets blackjack first, win

	// console.log(playerHandArr);
	// console.log(dealerHandArr);

	// console.log(dealerSum);
	// console.log(playerSum);
}

startGame();
