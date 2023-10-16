const animals = ['🐿️', '🐪', '🐈', '🐙', '🐝', '🦊', '🐸', '🐼'];
const gameGrid = [...animals, ...animals].sort(() => 0.5 - Math.random());
let firstCard = null;
let secondCard = null;
const memoryGame = document.getElementById('memory-game');

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
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000); 
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
}

function restartGame() {
    gameGrid.sort(() => 0.5 - Math.random());
    memoryGame.innerHTML = '';
    initGame();
}

function initGame() {
    gameGrid.forEach((animal, index) => {
        const card = createCard(animal, index);
        memoryGame.appendChild(card);
    });
}

initGame();
