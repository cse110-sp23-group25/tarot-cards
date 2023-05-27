window.addEventListener('DOMContentLoaded', init);

function init() {

    const NUM_CARDS = 5;
    const PATH = "../assets/card_package/fortunes.json";

    class Card{
        constructor(name, fortunes, img){
            this.name = name;
            this.fortunes = fortunes;
            this.img = img;
        }
    }

    class Deck{
        constructor(path){
            this.cards = [];
        }
    
        draw(num){
            let returnCards = [];
            for(let i = 0; i < num; i++){
                var tempCard = this.cards[Math.floor(Math.random() * this.cards.length)];
                while(returnCards.includes(tempCard)){
                    tempCard = this.cards[Math.floor(Math.random() * this.cards.length)];
                }
                returnCards.push(tempCard);
            }
            return returnCards;
        }
    }

    async function generateDeck(path, deckObj) {
        const response = await fetch(PATH);
        const data = await response.json();

        for(let i = 0; i < data.deck.card.length; i++){
            let tempCard = new Card(data.deck.card[i].name, data.deck.card[i].fortunes, data.deck.card[i].img);
            deckObj.cards.push(tempCard);
        }
    }

    // function will wait to run until entire deck is generated
    async function main() {
        var myDeck = new Deck(PATH);
        const dummyVar = await generateDeck(PATH, myDeck);
        var selectedCards = myDeck.draw(NUM_CARDS);
        console.log(selectedCards);
        numCardsFlipped = 0;
        let flipped = [false, false, false, false, false];

        const cards = document.getElementsByClassName('card');
        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', () => flipCard(i));
        }

        function flipCard(index) {
            console.log('card clicked');
            if (flipped[index]) {
                return;
            }

            let currentCard = document.getElementsByClassName('card')[index];
            currentCard.style.backgroundImage = `url(../assets/card_package/${selectedCards[index].img})`;
            numCardsFlipped++;
            currentCard.classList.toggle('card-flip');

            flipped[index] = true;
            if (numCardsFlipped == 5) {
                allFlipped();
            }
        }

        //TO-DO: fortunes pop up when button is clicked
        function allFlipped() {
            var button = document.getElementById('disp-fort-butt');
            button.style.display = "block";
        }
    }

    main();

}