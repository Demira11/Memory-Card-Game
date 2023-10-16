const animals = ['🐿️', '🐪', '🐈', '🐙', '🐝', '🦊', '🐸', '🐼'];
const gameGrid = [...animals, ...animals].sort(() => 0.5 - Math.random());
let firstCard = null;
let secondCard = null;
const memoryGame = document.getElementById('memory-game');
const restartButton = document.querySelector('.restart-button');

function createCard(animal, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.animal = animal;
    card.dataset.index = index;

    card.innerHTML = `
        <div class="front-face">?</div>
        <div class="back-face">${animal}</div>
    `;

    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (this === firstCard) return;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.animal === secondCard.dataset.animal;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetCards();
    }, 1000);
}

function resetCards() {
    firstCard = null;
    secondCard = null;
}

function restartGame() {
    // Logic to reset the game (if needed)
    // ...
}

restartButton.addEventListener('click', restartGame);

// Initialize the game grid
gameGrid.forEach((animal, index) => {
    const card = createCard(animal, index);
    memoryGame.appendChild(card);
});
