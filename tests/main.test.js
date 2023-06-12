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


//test the number of the elements in card class is 5
test('Number of elements with the .card class', () => {
    // Create a new DOM element to represent the parent container
    const parentContainer = document.createElement('div');
    parentContainer.setAttribute('class', 'parent');

    // Create five card elements and add them to the parent container
    for (let i = 0; i < 5; i++) {
        const cardElement = document.createElement('div');
        cardElement.setAttribute('class', 'card');
        parentContainer.appendChild(cardElement);
    }

    // Append the parent container to the document body
    document.body.appendChild(parentContainer);

    // Get the elements with the .card class
    const cardElements = document.getElementsByClassName('card');

    // Check the number of elements
    expect(cardElements.length).toBe(5);
});

// // Mock the Audio elements used in the main.js file
window.HTMLMediaElement.prototype.play = jest.fn();

// Create a mock function for the audio click sound
const mockAudioClick = jest.fn();

// Mock the getElementById function to return the mock audio click element
document.getElementById = jest.fn().mockImplementation((id) => {
    if (id === 'sound') {
        return {
            play: mockAudioClick,
        };
    }
});
//check if the background image change when click
test('Background image changes when a card is clicked', () => {
    // Create a new DOM element to represent the card
    const cardElement = document.createElement('div');
    cardElement.setAttribute('class', 'card');
    cardElement.style.backgroundImage = 'url("old_image.png")';

    // Add the click event listener to the card element
    cardElement.addEventListener('click', () => {
        cardElement.style.backgroundImage = 'url("new_image.png")';
    });

    // Trigger the click event on the card element
    cardElement.click();
    // Check if the background image has changed
    expect(cardElement.style.backgroundImage).toBe("url(new_image.png)");
});

// check if the background image change when click twice(it should not change)
test('Background image stay the same when clicking twice', () => {
    const cardElement = document.createElement('div');
    cardElement.setAttribute('class', 'card');
    cardElement.style.backgroundImage = 'url("old_image1.png")';
    cardElement.addEventListener('click', () => {
        cardElement.style.backgroundImage = 'url("new_image1.png")';
    });
    cardElement.click();
    cardElement.click();
    expect(cardElement.style.backgroundImage).toBe("url(new_image1.png)");
});

// check if the background image change when click 3 times(it should not change)
test('Background image stay the same when clicking twice', () => {
    const cardElement = document.createElement('div');
    cardElement.setAttribute('class', 'card');
    cardElement.style.backgroundImage = 'url("old_image2.png")';
    cardElement.addEventListener('click', () => {
        cardElement.style.backgroundImage = 'url("new_image2.png")';
    });
    cardElement.click();
    cardElement.click();
    cardElement.click();
    expect(cardElement.style.backgroundImage).toBe("url(new_image2.png)");
});
//test changed function
describe('Card', () => {
    // Test the constructor
    const name = 'Ace of Spades';
    const fortunes = ['Good fortune 1', 'Good fortune 2', 'Good fortune 3', 'Good fortune 4', 'Good fortune 5'];
    const img = 'path/to/image.png';
    const alt = 'Alt description';
    const card = new Card(name, fortunes, img, alt);
    describe('constructor', () => {
        it('should create a new Card object with the provided properties', () => {
            expect(card.name).toBe(name);
            expect(card.fortunes).toEqual(fortunes);
            expect(card.img).toBe(img);
            expect(card.alt).toBe(alt);
        });
    });
  
    // Test the getName() method
    describe('getName', () => {
        it('should return the name of the Card', () => {
            expect(card.getName()).toBe(name);
        });
    });
    // Test the getFortunes() method
    describe('getFortunes', () => {
        it('should return an array of 5 fortunes', () => {
            expect(card.getFortunes()).toEqual(fortunes);
        });
    });
  
    // Test the getImg() method
    describe('getImg', () => {
        it('should return the local path of the Card\'s image', () => {
            expect(card.getImg()).toBe(img);
        });
    });
    // Test the getAlt() method
    describe('getAlt', () => {
        it('should return the alt description of the Card', () => {
            expect(card.getAlt()).toBe(alt);
        });
    });
});

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync(path.resolve(__dirname, '../html/index.html'), 'utf8');
let dom;
let container;

beforeEach(() => {
    dom = new JSDOM(html);
    container = dom.window.document.querySelector('.parent');
});

test('It has a title of #c0ffee', () => {
    expect(dom.window.document.querySelector('title').textContent).toBe('#c0ffee');
});

test('It has a title of #c0ffee', () => {
    expect(dom.window.document.querySelector('title').textContent).toBe('#c0ffee');
});

test('It has a favicon', () => {
    expect(dom.window.document.querySelector('link[rel="icon"]').getAttribute('href')).toBe('../assets/favicon.png');
});

test('It has a logo', () => {
    expect(dom.window.document.querySelector('img[id="logo"]').getAttribute('src')).toBe('../assets/receipt_logo.png');
});

test('It has five hidden cards', () => {
    expect(container.querySelectorAll('.card[hidden]').length).toBe(5);
});

test('Welcome message is correct', () => {
    expect(dom.window.document.querySelector('#welcome-msg').textContent).toBe('Welcome to our Tarot Card Reading Page!');
});

test('Start reading button exists', () => {
    expect(dom.window.document.querySelector('#start-button').textContent).toBe('Start Reading!');
});

test('Volume button exists', () => {
    expect(dom.window.document.querySelector('#volume-button')).not.toBeNull();
});

test('Home button exists', () => {
    expect(dom.window.document.querySelector('#home-button')).not.toBeNull();
});