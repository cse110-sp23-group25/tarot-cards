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

