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
    test('getImg should return the image name', () => {
        const card = new Card('Test Card', ['fortune1', 'fortune2'], 'image22.png');
        var check_equal = (card.getImg() == 'image22.png');
        expect(check_equal).toBe(true);
    });
    test('getImg should return the image name', () => {
        const card = new Card('Test Card', ['fortune1', 'fortune2'], 'image33.png');
        var check_equal = (card.getImg() == 'image33.png');
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
    test('will lost some cards', () => {
        const selectedCards = deck.draw(3);
        const check_length = (selectedCards.length < 3);
        expect(check_length).toBe(false);
    });
    test('will lost some cards2', () => {
        const selectedCards = deck.draw(2);
        const check_length = (selectedCards.length < 2);
        expect(check_length).toBe(false);
    });
    test('will lost some cards3', () => {
        const selectedCards = deck.draw(1);
        const check_length = (selectedCards.length < 1);
        expect(check_length).toBe(false);
    });
    test('will draw more cards', () => {
        const selectedCards = deck.draw(2);
        const check_length = (selectedCards.length > 2);
        expect(check_length).toBe(false);
    });
    test('will draw more cards2', () => {
        const selectedCards = deck.draw(3);
        const check_length = (selectedCards.length > 3);
        expect(check_length).toBe(false);
    });
    test('will draw more cards2', () => {
        const selectedCards = deck.draw(4);
        const check_length = (selectedCards.length > 4);
        expect(check_length).toBe(false);
    });
});