/**
 * @jest-environment jsdom
 */

const functions = require('../js/main.js');

test('Successful card generation with valid parameters', () => {
    let validCard = true;
    let name = 'example name';
    let fortuneStrings = ['str1','str2','str3','str4','str5'];
    let img = 'example/path/';
    const tempCard = new functions.Card(name,fortuneStrings,img);
    if(name != tempCard.getName()) {validCard = false;}
    if(fortuneStrings != tempCard.getFortunes()){validCard = false;}
    if(img != tempCard.getImg()){validCard = false;}
    expect(validCard).toBe(true);
});


// // Import the functions to be tested
const { Card, Deck} = require('../js/main.js');

// Test the Card class
describe('Card', () => {
    //test if the getfortune return the right thing
    test('getFortunes should return the array of fortunes', () => {
        const fortunes = ['fortune1', 'fortune2', 'fortune3', 'fortune4', 'fortune5'];
        const card = new Card('Test Card', fortunes, 'image.png');
        var check_equal = (card.getFortunes() == fortunes);
        expect(check_equal).toEqual(true);
    });
    //test the wrong result
    test('getFortunes should not return the other array of fortunes', () => {
        const fortunes = ['fortune1', 'fortune2', 'fortune3', 'fortune4', 'fortune5'];
        const wrong_fortunes = ['fortune1', 'fortune2', 'fortune3', 'fortune4', 'fortune5'];
        const card = new Card('Test Card', fortunes, 'image.png');
        var check_equal = (card.getFortunes() == wrong_fortunes);
        expect(check_equal).toBe(false);
    });

    //test if getImg return the img name
    test('getImg should return the image name', () => {
        const card = new Card('Test Card', ['fortune1', 'fortune2'], 'image.png');
        var check_equal = (card.getImg() == 'image.png');
        expect(check_equal).toBe(true);
    });

    //test if getImg return the other img name
    test('getImg should not return the other image name', () => {
        const card = new Card('Test Card', ['fortune1', 'fortune2'], 'image.png');
        var check_equal = (card.getImg() == 'image2.png');
        expect(check_equal).toBe(false);
    });
});

// Test the Deck class
describe('Deck', () => {
    const path = '../assets/card_package/fortunes.json';
    const deck = new Deck(path);
    const mockCards = [
        new Card('Card 1', ['fortune1', 'fortune2'], 'image1.png'),
        new Card('Card 2', ['fortune3', 'fortune4'], 'image2.png'),
        new Card('Card 3', ['fortune5', 'fortune6'], 'image3.png'),
        new Card('Card 4', ['fortune7', 'fortune8'], 'image4.png'),
        new Card('Card 5', ['fortune9', 'fortune10'], 'image5.png'),
    ];
    deck.cards = mockCards;
    //test draw return the right answer
    test('draw should return an array of selected cards', () => {
        const selectedCards = deck.draw(3);
        expect(selectedCards).toHaveLength(3);
    });
    //test draw didn't return the wrong answer
    test('will draw lost 3 cards', () => {
        const selectedCards = deck.draw(3);
        expect(selectedCards).not.toHaveLength(0);
    });
    test('will draw lost some cards', () => {
        const selectedCards = deck.draw(3);
        const check_length = (selectedCards.length < 3);
        expect(check_length).toBe(false);
    });
    test('will draw more cards', () => {
        const selectedCards = deck.draw(2);
        const check_length = (selectedCards.length > 2);
        expect(check_length).toBe(false);
    });
});

describe('Basic user flow for Website', () => {
    // First, visit the website
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5500/html/index.html');
    });


  // check if there is 5 cards total
    it('check if there is 5 cards total', async () => {
      console.log('click on not flipped card');
      var all_cards = await page.$$('card');
      // Expect there are five cards total
      expect(all_cards.length==5).toBe(true);
    });
//check if flip function works
    it('click on a card that is not flipped', async () => {
      console.log('click on not flipped card');
      var all_cards = await page.$$('card');
      //get the button of one card
      var button = await all_cards[0].$('button');
      await button.click();
      var check = (all_cards[0].getProperties("background-image")!= url("../assets/start.png"));
      expect(check).toBe(true);
    }); 

    it('click on a card that is flipped', async () => {
      console.log('click on flipped card');
      var all_cards = await page.$$('card');
      //get the button of one card
      var button = await all_cards[0].$('button');
      await button.click();
      var img_of_it = all_cards[0].getProperties("background-image")
      await button.click();
      var check = (all_cards[0].getProperties("background-image")!= img_of_it);
      expect(check).toBe(true);
    }); 


});