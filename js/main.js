window.addEventListener('DOMContentLoaded', init)

function init () {
    const NUM_CARDS = 5
    const PATH = '../assets/card_package/fortunes.json'
    let fiveChosenCards = []

    class Card {
        constructor (name, fortunes, img) {
            this.name = name
            this.fortunes = fortunes
            this.img = img
        }

        getFortunes () {
            return this.fortunes
        }

        getImg () {
            return this.img
        }
    }

    class Deck {
        constructor (path) {
            this.cards = []
        }

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
    }

    async function generateDeck (path, deckObj) {
        const response = await fetch(PATH)
        const data = await response.json()

        for (let i = 0; i < data.deck.card.length; i++) {
            const tempCard = new Card(data.deck.card[i].name, data.deck.card[i].fortunes, data.deck.card[i].img)
            deckObj.cards.push(tempCard)
        }
    }

    // function will wait to run until entire deck is generated
    async function main () {
        const myDeck = new Deck(PATH)

        await generateDeck(PATH, myDeck)
        const selectedCards = myDeck.draw(NUM_CARDS)
        fiveChosenCards = selectedCards

        console.log(selectedCards)
        let numCardsFlipped = 0
        const flipped = [false, false, false, false, false]

        const cards = document.getElementsByClassName('card')
        for (let i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', () => flipCard(i))
        }

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
