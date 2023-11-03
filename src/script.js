const animals = ['🐿️', '🐪', '🐈', '🐙', '🐝', '🦇', '🐸', '🦍']; // list of animal emojis 
const gameGrid = animals.concat(animals).sort(() => 0.5 - Math.random()); // shuffle and duplicate the cards to create a mixed deck for the game.
let firstCard = null; //create two empty slots (variables) 
let secondCard = null; 

const memoryGame = document.getElementById('memory-game'); // (HTML element)

function createCard(animal, index) { //create a template for a single game card with an animal emoji and an index number.
    const card = document.createElement('div'); // html element
    card.classList.add('card'); //marks the HTML element as a card element for styling and functionality.
    card.dataset.animal = animal; // each card can hold a different animal
    card.dataset.index = index; //assigning a number to a card

    const frontFace = document.createElement('div'); // html element
    frontFace.classList.add('front-face'); //It's like keeping the front of the card hidden until it's flipped
    frontFace.textContent = '?';
    card.appendChild(frontFace);

    const backFace = document.createElement('div');
    backFace.classList.add('back-face'); //This label helps style and identify the back side separately from the front side.
    backFace.textContent = animal; //setting the content of the back side to an animal emoji
    card.appendChild(backFace); 

    card.addEventListener('click', flipCard); //eventlistener
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
    const isMatch = firstCard.dataset.animal === secondCard.dataset.animal; // checking if the 1sr card is the same as 2nd
    isMatch ? disableCards() : unflipCards(); // if cards match-great if not- they close and we keep choosing other crads
}

function disableCards() { //removing click event
    firstCard.removeEventListener('click', flipCard); 
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() { //If the cards don't match, you hide the animals again after a short pause.
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 600); // Delay flip for less then a second
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
    gameGrid.forEach((animal, index) => { // For each animal in the game grid,
        const card = createCard(animal, index); //create a card using the createCard function, providing the animal and its index
        memoryGame.appendChild(card); //place this card on the table (memoryGame) to set up the game
    }); 
}

initGame(); //You start the game as soon as everything is set up.


