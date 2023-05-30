window.addEventListener('DOMContentLoaded', init)

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
        this.cards = []
    }

    /**
     * This method randomly selects a number of cards out of the Deck. This simulates
     * the user being randomly dealt a number of  tarot cards.
     * @param num Number of cards to be dealt out
     * @returns An array of the selected cards
     */
    draw (num) {
        const returnCards = []
        for (let i = 0; i < num; i++) {
            let tempCard = this.cards[Math.floor(Math.random() * this.cards.length)]
            while (returnCards.includes(tempCard)) {
                tempCard = this.cards[Math.floor(Math.random() * this.cards.length)]
            }
            returnCards.push(tempCard)
        }
        return returnCards
    }

    /**
     * This function fills the Deck with the proper cards according to which Deck
     * the user has chosen.
     * @param path The file path to the JSON file containing deck information
     * @param deckObj The Deck object that will be filled with cards
     * @returns N/A
     */
    async generateDeck () {
        const response = await fetch(this.path)
        const data = await response.json()

        for (let i = 0; i < data.deck.card.length; i++) {
            const tempCard = new Card(data.deck.card[i].name, data.deck.card[i].fortunes, data.deck.card[i].img)
            this.cards.push(tempCard)
        }
    }
}

function init () {
    const NUM_CARDS = 5
    const PATH = '../assets/card_package/fortunes.json'
    let fiveChosenCards = []

    /**
     * This function handles everything that happens after the Deck has been
     * chosen and generated.
     */
    async function main () {
        const myDeck = new Deck(PATH)

        await myDeck.generateDeck();
        const selectedCards = myDeck.draw(NUM_CARDS)
        fiveChosenCards = selectedCards

        console.log(selectedCards)
        let numCardsFlipped = 0
        const flipped = [false, false, false, false, false]

        const cards = document.getElementsByClassName('card')
        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', () => flipCard(i))
        }

        /**
         * This function flips a card
         * @param index The index of the card to be flipped from the `flipped` array
         * @returns N/A
         */
        function flipCard (index) {
            console.log('card clicked')
            if (flipped[index]) {
                return
            }

            const currentCard = document.getElementsByClassName('card')[index]
            currentCard.style.backgroundImage = `url(../assets/card_package/${selectedCards[index].img})`
            numCardsFlipped++
            currentCard.classList.toggle('card-flip')

            flipped[index] = true
            if (numCardsFlipped === 5) {
                allFlipped()
            }
        }
    }

    /**
     * This function is to present a button once the user has flipped all 5
     * cards. When the button is clicked, the proper fortunes will be
     * presented.
     */
    function allFlipped () {
        const button = document.getElementById('disp-fort-butt')
        button.style.display = 'block'

        // on click, load the fortunes and display them
        /*
        index 0 -> top card (current situation)
        1 -> right card (your initial response)
        2 -> bottom card (challenges)
        3 -> left card (what you can change)
        4 -> middle card (outcome)
        */
        button.addEventListener('click', () => {
            // clear the cards off the page
            document.body.innerHTML = ''

            const fortuneList = []

            for (let i = 0; i < 5; i++) {
                const fortunesOfCard = fiveChosenCards[i].getFortunes()
                console.log(fortunesOfCard)
                let fortuneText

                switch (i) {
                // dealing with outcome card
                case 0:
                    fortuneText = fortunesOfCard[0]
                    break

                // dealing with current situation card
                case 1:
                    fortuneText = fortunesOfCard[1]
                    break

                // dealing with challenges card
                case 2:
                    fortuneText = fortunesOfCard[2]
                    break

                // dealing with what u can change card
                case 3:
                    fortuneText = fortunesOfCard[3]
                    break

                // dealing with response card
                case 4:
                    fortuneText = fortunesOfCard[4]
                    break
                }
                fortuneList.push(fortuneText)
            }

            for (let i = 0; i < 5; i++) {
                const p = document.createElement('p')

                // Set the inner text of the paragraph to the fortune
                p.innerText = fortuneList[i]

                // Create an img element for the card image
                const img = document.createElement('img')

                // Set the src attribute of the img element to the image URL
                img.src = '../assets/card_package/' + fiveChosenCards[i].getImg()

                // Create a div to contain the image and the paragraph
                const div = document.createElement('div')

                // Append the image and the paragraph to the div
                div.appendChild(img)
                div.appendChild(p)

                // Append the div to the body
                document.body.appendChild(div)
            }
        })
    }
    main()
}

module.exports = {Card, Deck};