//this is the JS code for the game war
$(function(){

  //the game uses a 52 card deck...
  var deck = buildDeck(empty);
  //...which is shuffled...
  var shuffled = shuffleDeck(deck);
  //...and dealt evenly to two players (26 cards each)
  var playerDeck =
  var comDeck =
  //The players draw and compare cards...
  var playerDraw = playerDeck[0];
  var comDraw = comDeck[0];
  //...and the winner adds both cards to their trophy pile. When their deck runs out, they reshuffle their trophy pile and use that. The winner is whomever owns all 52 cards in their collective deck/trophy piles
  var playerTrophy = [];
  var comTrophy = [];

  //Some variable that are needed:
  var empty = [];

  //This function builds the decks, including all relevant information including a card's numeric value, it's representative value, it's suit, a picture of that suit, and the suit's "color code"(0-1 for black, 2-3 for red)
  function buildDeck(arr){

    // It makes four loops, each time building a different suit
    for(i=0; i<suit.length; i++){

      // For each suit, it makes thirteen loops, one for the ace, nine for 2-10, and three for the face cards
      for(j=1; j<14; j++){
        if(j<2){
          arr.push({
            num: j,
            value: ace[j],
            suit: suit[i],
            pic: pic[i],
            color: i
          });
        } else if(j<11) {
          arr.push({
            num: j,
            value: j,
            suit: suit[i],
            pic: pic[i],
            color: i
          });
        } else {
          arr.push({
            num: j,
            value: court[j-11],
            suit: suit[i],
            pic: pic[i],
            color: i
          });
        };
      };
    };

    //the end result is a 52 card deck, in order
    return arr;
  };

})
