'use strict';

///////////////////////////////////////////////////////////
//--------------------All the Variables--------------------

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

///////////////////////////////////////////////////////////
//--------------------Starting Conditions------------------
let scores, currentScore, ActivePlayer, playing;
init();

///////////////////////////////////////////////////////////
//---------------- Function Blocks---------------

function init() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  ActivePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

function SwitchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${ActivePlayer}`).textContent =
    currentScore;
  ActivePlayer = ActivePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function win() {
  playing = false;
  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${ActivePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${ActivePlayer}`)
    .classList.remove('player--active');
}

///////////////////////////////////////////////////////////
//----------------Rolling Dice Functionality---------------

btnRoll.addEventListener('click', function () {
  if (playing) {
    //Genarating Random Number Between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display the Dice acording to the Random Number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    diceEl.style.transform += ' rotateX(-720deg) rotateZ(-720deg)';
    diceEl.style.transition = '0.45s';

    //Check for Rolled 1: if true switch to next player
    if (dice !== 1) {
      //Add Dice to Current Score
      currentScore += dice;
      document.getElementById(`current--${ActivePlayer}`).textContent =
        currentScore;
    } else {
      SwitchPlayer(); //Switch to the Next Player
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add Current Score to Active Player's Score
    scores[ActivePlayer] += currentScore;

    document.getElementById(`score--${ActivePlayer}`).textContent =
      scores[ActivePlayer];

    // Check if Player's Score is >=100
    if (scores[ActivePlayer] >= 20) {
      win(); // Finish The Game
    } else {
      SwitchPlayer(); //Switch To The Next Player
    }
  }
});

btnNew.addEventListener('click', init);
