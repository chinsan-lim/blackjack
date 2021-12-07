Pseudocode for Blackjack

CREATE 52 card deck

DECLARE constants for deck, bust, blackjack
DECLARE state variables for betAmt, bankroll, deckSize
DECLARE object for player/dealer with cardTotal

REFERENCE hitBtn, standBtn, startBtn, howToPlayBtn, startModalBtn, closeHowToPlayBtn, reDealBtn

INITIALIZE J, Q, K cards with value of '10'
INITIALIZE ACE cards with value of '1' IF cardTotal <= 17 or '11' IF cardTotal > 17

ATTACH event listener to: - START - HOWTOPLAY - HIT - STAND - DOUBLE - SPLIT - REDEAL

DECLARE function to:

- DEAL
  randomly assign card to player (face up), dealer (face up), player (face up), dealer (face down)
- HIT
  add card
- STAND
  end player turn
- DEALER HIT
  add cards until dealer.cardTotal > 17
- COMPARE
  player.cardTotal and dealer.cardTotal

SUBTRACT betAmt from bankroll IF player.cardTotal > 21 OR dealer.cardTotal > player.cardTotal
ADD betAmt to bankroll IF dealer.cardTotal > 21 OR dealer.cardTotal < player.cardTotal

CLICK REDEAL btn to restart the game, with updated bankroll

# Blackjack

## Description

A browser-based Blackjack game coded in HTML, CSS, JavaScript

## Planning Process

### User Stories

#### MVP

- As a user, I want to be able to place a bet, so I can win money from the dealer.
- As a user, I want the game to deal 2 cards face up to me, and one card face up and one face down for the dealer.
- As a user, I want to able to hit or add a card, so I can get closer to 21.
- As a user, I want to able to double my bet for a one card hit, so I can get closer to 21 and win (or lose) twice my original ante.
- As a user, I want to able to stand, so I can end my turn.
- As a user, I want the dealer to hit until his cards add up to more than 17 (and hopefully more than 21).
- As a user, I want the game to compare our card totals, so I can see who the winner is.
- As a user, I want to able to restart the game with my updated bankroll, so I can keep playing

#### Bronze

- As a user, I want to able to split my hand if I am dealt a pair, so I can double my bet and get to play two different hands.
  As a user, I want to able to split my hand if I am dealt a pair, so I can double my bet and get to play two different hands.
  As a user, I want to able to surrender my hand and half my bet, if I want to end the round.
  As a user, I want to able to be able buy insurance (Blackjack insurance odds pay out at 2/1 and the maximum bet allowed is generally half of the player’s main bet) when the dealer's top card is an Ace.

#### Silver

#### Gold

As a user, I want to able to be able to play with another player.

### Wireframes
