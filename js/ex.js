// store all cards
const cardImages_package = { //sun missing?
    "World": "../assets/card_package/world.png",
    "Tower": "../assets/card_package/tower.jpeg",
    "Temperance": "../assets/card_package/temperance.png",
    "Strength": "../assets/card_package/strength.png",
    "Stars": "../assets/card_package/stars.png",
    "Death": "../assets/card_package/death.png",
    "The Emperor": "../assets/card_package/emperor.png",
    "The Chariot": "../assets/card_package/chariot.png",
    "High Priest": "../assets/card_package/high priest.png", // remove spaced?
    "Moon": "../assets/card_package/moon.png",
    "Magician": "../assets/card_package/magician.png",
    "Hermit": "../assets/card_package/hermit.png",
    "Lovers": "../assets/card_package/lovers.png",
    "Hanged Man": "../assets/card_package/hanged-man.png",
    "Justice": "../assets/card_package/justice.png",
    "Fortune": "../assets/card_package/fortune.png",
    "Judgement": "../assets/card_package/judgement.png",
    "The Fool": "../assets/card_package/fool.jpeg",
    "Hierophant": "../assets/card_package/hierophant.png",
    "The Empress": "../assets/card_package/empress.png",
    "The Devil": "../assets/card_package/devil.png",
};

//play background sound
var backgroundSound = document.getElementById('backgroundSound');
backgroundSound.play();


var allFlipped = false;

// Get all card names (this will be an array of strings)
const allCardNames = Object.keys(cardImages_package);

// Function to get a random card name
function getRandomCardName() {
    const randomIndex = Math.floor(Math.random() * allCardNames.length);
    return allCardNames[randomIndex];
}

// Array for card names
let selectedCardNames = [];

// FIlls the of card names
for (let i = 0; i < 5; i++) {
    let curr = getRandomCardName();
    // While loop ensures no duplicates
    while (selectedCardNames.includes(curr)) {
        curr = getRandomCardName();
    }
    selectedCardNames.push(curr);
}

// Get the file path for each tarot card and put it in cardImages
let cardImages = [];
for (let i = 0; i < 5; i++) {
    cardImages[i] = cardImages_package[selectedCardNames[i]]
}

  // Array to store flipped state of each card
  var flippedCards = [false, false, false, false, false];
  var numCardsFlipped = 0;

  // Function to handle card click event
  function flipCard(index) {
    // Play the sound
    var sound = document.getElementById('sound');
    sound.play();
    // Check if card has already been flipped
    if (flippedCards[index]) {
      // If already flipped, do nothing
    } 
    else {
      // Flip to a random card image
      let card = document.getElementsByClassName('card')[index];
      card.style.backgroundImage = `url("${cardImages[index]}")`;
      numCardsFlipped++;
      card.classList.toggle('card-flip');
    }

    // Update flipped state
    flippedCards[index] = true;

    // Make button appear once all cards have been flipped
    // let condition = true;
    // for (let i = 0; i < flippedCards.length; i++) {
    //     if (flippedCards[i] == false) {
    //         condition = false;
    //     }
    // }

    if(numCardsFlipped == 5){
        allFlipped = true;
    }

    if (allFlipped) {
        allCardsFlipped();
    }
  }

  // Add click event listener to each card
  const cards = document.getElementsByClassName('card');
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => flipCard(i));
  }

function allCardsFlipped(){
    if(document.getElementById('disp-fort-butt')){
        return;
    }
    // Create a new button element.
    let button = document.createElement('button');
    button.id = 'disp-fort-butt';

    // Set the inner text of the button.
    button.innerHTML = 'See Fortunes';

    // Append the button to the body of the document.
    // You can also append it to any other element on the page.
    let container = document.getElementById('button-container');

    // Append the button to the container.
    container.appendChild(button);

    // Add event listener to button
    button.addEventListener('click', function() {
        // This will clear all HTML inside the body, including the button itself
        document.body.innerHTML = '';

        // Fetch the fortunes from the JSON file
        fetch('../assets/fortunes.json')
        .then(response => response.json())
        .then(data => {
            // Select only the fortunes for the cards that have been chosen
            let filteredData = data.filter(fortune => selectedCardNames.includes(fortune.card));

            let selectedFortunes = [];

            // Selects the fortunes that have the correct orientation
            for(let i = 0; i < selectedCardNames.length; i++) {
                const cardFortunes = filteredData.filter(item => item.card === selectedCardNames[i]);
                const selectedFortune = cardFortunes.find(item => item.orientation === i);

                selectedFortunes.push(selectedFortune);
            }

            selectedFortunes.forEach(fortune => {
                // Create a p element for the fortune
                let p = document.createElement('p');
                
                // Set the inner text of the paragraph to the fortune
                p.innerText = fortune.fortune;
                
                // Create an img element for the card image
                let img = document.createElement('img');

                // Set the src attribute of the img element to the image URL
                img.src = cardImages_package[fortune.card];
                
                // Create a div to contain the image and the paragraph
                let div = document.createElement('div');

                // Append the image and the paragraph to the div
                div.appendChild(img);
                div.appendChild(p);

                // Append the div to the body
                document.body.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
    });
}