class Deck{
    constructor(path){
        this.cards = [];
        // fetch('./assets/card_package/fortunes.json')
        // .then(response => response.json())
        // .then(data=> {
        //     data.forEach(function(card) {
        //         let tempCard = new Card(card.name, card.fortunes, card.img);
        //         cards.push(tempCard);
        //     });
        // });

        fetch(path)
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < data.deck.card.length; i++){
                let tempCard = new Card(data.deck.card[i].name, data.deck.card[i].fortunes, data.deck.card[i].img);
            }
            console.log(data);
        })
    }

    draw(num){
        let cards = [];
        for(let i = 0; i < num; i++){
            var tempCard = cards[Math.floor(Math.random() * cards.length)];
            while(cards.includes(tempCard)){
                tempCard = cards[Math.floor(Math.random() * cards.length)];
            }
            cards.push(tempCard);
        }
        return cards;
    }
}