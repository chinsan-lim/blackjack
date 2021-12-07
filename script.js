console.log('meow meow');

// CREATE 52 card deck

const Cards = function (suit, rank, score) {
	this.suit = suit;
	this.rank = rank;
	this.score = score;
};

const suits = ['spades', 'diamonds', 'clubs', 'hearts'];
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

let FiftyTwoCards = [];

for (let i = 0; i < suits.length; i++) {
	for (let z = 0; z < ranks.length; z++) {
		FiftyTwoCards.push(new Cards(suits[i], ranks[z], z + 1));
	}
}

console.log(FiftyTwoCards);

//CREATE 8 DECKS

// DECLARE constants for deck, blackjack

const deck = FiftyTwoCards;
const blackjack = 21;

// DECLARE state variables for bankroll, betAmt, deckSize

let bankroll = 100;
let betAmt;
let deckSize;
let cardTotal;

// DECLARE object for player/dealer with cardTotal

let player;
let dealer;

// REFERENCE hitBtn, standBtn, startBtn, howToPlayBtn, startModalBtn, closeHowToPlayBtn, reDealBtn

const hitBtn = document.querySelector('.hit');
const dblBtn = document.querySelector('.double');
const standBtn = document.querySelector('.stand');
const startBtn = document.querySelector('.start-game');
const reDealBtn = document.querySelector('.redeal');

// make sure html classes match these event listeners
// const howToPlayBtn = document.querySelector('.how-to-play');
// const startModalBtn = document.querySelector('.start-from-modal');
// const closeHowToPlayBtn = document.querySelector('.close-from-htp');

// INITIALIZE J, Q, K cards with value of '10'
// INITIALIZE ACE cards with value of '1' IF cardTotal <= 17 or '11' IF cardTotal > 17

// ATTACH event listener to: - START - HOWTOPLAY - HIT - STAND - DOUBLE - SPLIT - REDEAL

hitBtn.addEventListener('click', addCard);
dblBtn.addEventListener('click', dblBet);
standBtn.addEventListener('click', stand);
startBtn.addEventListener('click', deal);
reDealBtn.addEventListener('click', redeal);
// DECLARE function to:

// - DEAL
//   randomly assign card to player (face up), dealer (face up), player (face up), dealer (face down)

function deal() {
	console.log('deal meow');
}

// - HIT
//   add card

function addCard() {
	console.log('add meow card');
}

// - DOUBLE
//   double bet and add one card

function dblBet() {
	console.log('double meow');
}

// - STAND
//   end player turn

function stand() {
	console.log('meow stand');
}

// - REDEAL
//   round has ended, alter bankroll, remove played cards from divs/deck and redeal new cards

function redeal() {
	console.log('redeal right meow');
}

// - DEALER HIT
//   add cards until dealer.cardTotal > 17
// - COMPARE
//   player.cardTotal and dealer.cardTotal

// SUBTRACT betAmt from bankroll IF player.cardTotal > 21 OR dealer.cardTotal > player.cardTotal
// ADD betAmt to bankroll IF dealer.cardTotal > 21 OR dealer.cardTotal < player.cardTotal

// CLICK REDEAL btn to restart the game, with updated bankroll
