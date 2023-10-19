const animals = ['🐿️', '🐪', '🐈', '🐙', '🐝', '🦇', '🐸', '🦍']; // list of animal emojis written on different cards.
const gameGrid = animals.concat(animals).sort(() => 0.5 - Math.random()); // shuffle and duplicate the cards to create a mixed deck for the game.
let firstCard = null; //create two empty slots (variables) 
let secondCard = null; 

const memoryGame = document.getElementById('memory-game'); // (HTML element)

function createCard(animal, index) { //create a template for a single game card with an animal emoji and an index number.
    const card = document.createElement('div'); // html element
    card.classList.add('card');
    card.dataset.animal = animal;
    card.dataset.index = index;

    const frontFace = document.createElement('div'); // html element
    frontFace.classList.add('front-face');
    frontFace.textContent = '?';
    card.appendChild(frontFace);

    const backFace = document.createElement('div');
    backFace.classList.add('back-face');
    backFace.textContent = animal;
    card.appendChild(backFace);

    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() { //When a player clicks on a card, you flip it over to reveal the animal emoji.
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() { //You compare the animals on the first and second flipped cards to see if they match.
    const isMatch = firstCard.dataset.animal === secondCard.dataset.animal;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() { //If the cards match, you remove the ability to click on those specific cards.
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() { //If the cards don't match, you hide the animals again after a short pause.
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 600); // Delay set to 1000 milliseconds (1 second)
}

function resetBoard() { //You clear the slots, making them ready for the next pair of flipped cards.
    [firstCard, secondCard] = [null, null];
}

function restartGame() { //You reshuffle the cards and reset the game to its initial state.
    gameGrid.sort(() => 0.5 - Math.random());
    memoryGame.innerHTML = '';
    initGame();
}

function initGame() { //You set up the game by creating and arranging the cards on the table.
    gameGrid.forEach((animal, index) => {
        const card = createCard(animal, index);
        memoryGame.appendChild(card);
    });
}

initGame(); //You start the game as soon as everything is set up.


