// store all cards
const cardImages_package = [
    "../assets/card_package/world.png",
    "../assets/card_package/tower.jepg",
    "../assets/card_package/temperance.png",
    "../assets/card_package/strength.png",
    "../assets/card_package/stars.png",
    "../assets/card_package/death.png",
    "../assets/card_package/emperor.png",
    "../assets/card_package/chariot.png",
    "../assets/card_package/high priest.png",
    "../assets/card_package/moon.png",
    "../assets/card_package/magician.png",
    "../assets/card_package/hermit.png",
    "../assets/card_package/lovers.png",
    "../assets/card_package/hanged-man.png",
    "../assets/card_package/justice.png",
    "../assets/card_package/fortune.png",
    "../assets/card_package/judgement.png",
    "../assets/card_package/fool.png",
    "../assets/card_package/hierophant.png",
    "../assets/card_package/empress.png",
    "../assets/card_package/devil.png",
  ];
  
  // Array of card images
  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * cardImages_package.length);
    return cardImages_package[randomIndex];
  }
  
  var store_cardImages = ["../assets/card_package/justice.png", "../assets/card_package/image2.png", "../assets/card_package/image3.png", "../assets/card_package/image4.png", "../assets/card_package/image5.png"];
  for (let i = 0; i <5;i++){
    let curr = getRandomImage();
    while(curr in store_cardImages){
      curr = getRandomImage();
    }
    store_cardImages[i] = curr;
  }
  const cardImages = store_cardImages;
  
  // Array to store flipped state of each card
  var flippedCards = [false, false, false, false, false];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to handle card click event
  function flipCard(index) {
    const card = document.getElementsByClassName('card')[index];
    const isFlipped = flippedCards[index];

    if (isFlipped) {
      // Flip back to start.png
      card.style.backgroundImage = 'url("../assets/start.png")';
    } 
    else {
      // Flip to a random card image
      const shuffledImages = shuffleArray(cardImages);
      card.style.backgroundImage = `url("${shuffledImages[0]}")`;
    }

    // Update flipped state
    flippedCards[index] = !isFlipped;
  }

  // Add click event listener to each card
  const cards = document.getElementsByClassName('card');
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => flipCard(i));
  }