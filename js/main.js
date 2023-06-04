window.onload = function() {
    const welcomeButton = document.getElementById('start-button');
    welcomeButton.addEventListener('click', () => {
        let welcomePage = document.getElementById('welcome-page');
        welcomePage.classList.add('fade-out');
        setTimeout(function() {
            welcomePage.style.display = 'none';
            // When welcome button is clicked, go to the Tarot Cards
            shuffleCards();
            init();
        }, 2000);
    });
}


/**
This function shuffles the cards and animates them to their respective positions on the grid
@returns N/A
*/
function shuffleCards() {
    const animations = [
        { name: 'card0Animation', gridRow: 1, gridColumn: 2 }, // top
        { name: 'card1Animation', gridRow: 2, gridColumn: 3 }, // right
        { name: 'card2Animation', gridRow: 3, gridColumn: 2 }, // bottom
        { name: 'card3Animation', gridRow: 2, gridColumn: 1 }, // left
        { name: 'card4Animation', gridRow: 2, gridColumn: 2 }  // middle
    ];

    for (let i = 0; i < 5; i++) {
        let card = document.getElementById(`card${i}`);
        card.style.gridColumn = 2; // Initially set all cards to the center of the grid.
        card.style.gridRow = 2;
        card.removeAttribute('hidden');
    }

    let cards = document.querySelectorAll('.card');
    for(let i = 0; i < cards.length; i++) {
        let delay = i * 1; // 1 second delay for each card.
        setTimeout(() => {
            cards[i].style.animation = `2s ease-out 0s forwards ${animations[i].name}, 0.5s linear 2s forwards flip`;
            cards[i].style.zIndex = `${5 - i}`;
            cards[i].classList.remove('deck');
        }, delay * 1000); // convert delay to milliseconds.
    }
  }

/**
 * This class is to represent a tarot card object. Each card will a name, 5
 * associated fortunes, and an image. 
 */
class Card {
    constructor (name, fortunes, img) {
        this.name = name;
        this.fortunes = fortunes;
        this.img = img;
    }

    /**
     * This method is a getter for the Card's assigned name.
     * @returns the name of the Card
     */
    getName() {
        return this.name;
    }
    /**
     * This method is a getter for the Card's fortunes.
     * @returns an array of 5 fortunes
     */
    getFortunes () {
        return this.fortunes;
    }

    /**
     * This method is a getter for the Card's image.
     * @returns the path/name of the Card's image
     */
    getImg () {
        return this.img;
    }
}

/**
 * This class is to represent the chosen deck of Tarot card. The deck will
 * have an array which holds Card objects.
 */
class Deck {
    constructor (path) {
        this.path = path;
        this.cards = [];
    }

    /**
     * This method randomly selects a number of cards out of the Deck. This simulates
     * the user being randomly dealt a number of  tarot cards.
     * @param num Number of cards to be dealt out
     * @returns An array of the selected cards
     */
    draw (num) {
        const returnCards = [];
        for (let i = 0; i < num; i++) {
            let tempCard = this.cards[Math.floor(Math.random() * this.cards.length)];
            while (returnCards.includes(tempCard)) {
                tempCard = this.cards[Math.floor(Math.random() * this.cards.length)];
            }
            returnCards.push(tempCard);
        }
        return returnCards;
    }

    /**
     * This function fills the Deck with the proper cards according to which Deck
     * the user has chosen.
     * @param path The file path to the JSON file containing deck information
     * @param deckObj The Deck object that will be filled with cards
     * @returns N/A
     */
    async generateDeck () {
        const response = await fetch(this.path);
        const data = await response.json();

        for (let i = 0; i < data.deck.card.length; i++) {
            const tempCard = new Card(data.deck.card[i].name, data.deck.card[i].fortunes, data.deck.card[i].img);
            this.cards.push(tempCard);
        }
    }
}

function init () {
    const NUM_CARDS = 5;
    const PATH = '../assets/card_package/fortunes.json';
    let fiveChosenCards = [];

    /**
     * This function handles everything that happens after the Deck has been
     * chosen and generated.
     */
    async function main () {
        const myDeck = new Deck(PATH);

        await myDeck.generateDeck();
        const selectedCards = myDeck.draw(NUM_CARDS);
        fiveChosenCards = selectedCards;

        let numCardsFlipped = 0;
        const flipped = [false, false, false, false, false];

        const cards = document.getElementsByClassName('card');
        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', () => flipCard(i));
        }

        /**
         * This function flips a card
         * @param index The index of the card to be flipped from the `flipped` array
         * @returns N/A
         */
        function flipCard (index) {
            if (flipped[index]) {
                return;
            }

            const currentCard = document.getElementsByClassName('card')[index];
            currentCard.style.backgroundImage = `url(../assets/card_package/${selectedCards[index].img})`;
            numCardsFlipped++;
            currentCard.classList.toggle('card-flip');

            currentCard.scrollIntoView({
                behavior: 'smooth'
            });

            flipped[index] = true;
            if (numCardsFlipped === 5) {
                allFlipped();
            }
        }
    }

    /**
     * This function is to present a button once the user has flipped all 5
     * cards. When the button is clicked, the proper fortunes will be
     * presented.
     */
    function allFlipped () {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card) => {
            card.classList.add('fade-out-cards');
        });

        const button = document.getElementById('disp-fort-butt');
        setTimeout(() => {
            // button.style.display = 'block';
            cards.forEach((card) => {
                card.removeEventListener('click', () => flipCard(i));
                card.style.cursor = 'default';
            });
            button.removeAttribute('hidden');
        }, 5000);


        // on click, load the fortunes and display them
        /*
        index 0 -> top card (current situation)
        1 -> right card (your initial response)
        2 -> bottom card (challenges)
        3 -> left card (what you can change)
        4 -> middle card (outcome)
        */
        button.addEventListener('click', () => {

            // clear the cards off the page and change background
            document.getElementById('card-page').style.display = 'none';
            document.body.style.backgroundImage = "none";
            document.body.style.backgroundColor = "tan";
            const fortuneList = [];

            // set up receipt
            document.getElementById('fortune-page').style.backgroundColor = "#f5f0f0";
            document.getElementById('fortune-page').style.boxShadow = "2px 2px 4px 8px rgba(0, 0, 0, 0.2)";

            document.getElementById('receipt-header').removeAttribute('hidden');
            document.getElementById('receipt-footer').removeAttribute('hidden');

            // populate the fortuneList array with the proper fortunes
            for (let i = 0; i < 5; i++) {
                const fortunesOfCard = fiveChosenCards[i].getFortunes();
                let fortuneText;

                switch (i) {
                // dealing with outcome card
                case 0:
                    fortuneText = fortunesOfCard[0];
                    break;

                // dealing with current situation card
                case 1:
                    fortuneText = fortunesOfCard[1];
                    break;

                // dealing with challenges card
                case 2:
                    fortuneText = fortunesOfCard[2];
                    break;

                // dealing with what u can change card
                case 3:
                    fortuneText = fortunesOfCard[3];
                    break;

                // dealing with response card
                case 4:
                    fortuneText = fortunesOfCard[4];
                    break;
                }
                fortuneList.push(fortuneText);
            }

            // display the fortunes
            for (let i = 0; i < 5; i++) {

                let cardImageToDisplay;
                let cardFortuneToDisplay;
                let cardNameToDisplay;

                switch (i) {
                // dealing with outcome card
                case 0:
                    cardImageToDisplay = document.getElementById('top-card-image');
                    cardFortuneToDisplay = document.getElementById('top-card-fortune');
                    cardNameToDisplay = document.getElementById('top-card-name');
                    break;

                // dealing with current situation card
                case 1:
                    cardImageToDisplay = document.getElementById('right-card-image');
                    cardFortuneToDisplay = document.getElementById('right-card-fortune');
                    cardNameToDisplay = document.getElementById('right-card-name');
                    break;

                // dealing with challenges card
                case 2:
                    cardImageToDisplay = document.getElementById('bottom-card-image');
                    cardFortuneToDisplay = document.getElementById('bottom-card-fortune');
                    cardNameToDisplay = document.getElementById('bottom-card-name');
                    break;

                // dealing with what u can change card
                case 3:
                    cardImageToDisplay = document.getElementById('left-card-image');
                    cardFortuneToDisplay = document.getElementById('left-card-fortune');
                    cardNameToDisplay = document.getElementById('left-card-name');
                    break;

                // dealing with response card
                case 4:
                    cardImageToDisplay = document.getElementById('middle-card-image');
                    cardFortuneToDisplay = document.getElementById('middle-card-fortune');
                    cardNameToDisplay = document.getElementById('middle-card-name');
                    break;
                }

                // set image to correct image
                cardImageToDisplay.src = '../assets/card_package/' + fiveChosenCards[i].getImg();

                // set fortune to correct fortune
                cardFortuneToDisplay.textContent = fortuneList[i];

                // set quantity and name
                cardNameToDisplay.textContent = fiveChosenCards[i].getName();

                cardImageToDisplay.removeAttribute('hidden');
                cardFortuneToDisplay.removeAttribute('hidden');
                cardNameToDisplay.removeAttribute('hidden');
                cardImageToDisplay.scrollIntoView({
                    behavior: 'smooth'
                });
            }

        });
    }
    main();
}

module.exports = {Card, Deck};