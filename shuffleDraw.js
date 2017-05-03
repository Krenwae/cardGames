
$(function(){

  // These are the variables that help build the deck
  var empty = [

  ];
  var suit = ["Spades", "Hearts", "Clubs", "Diamonds"];
  var court = ["Jack", "Queen", "King"];
  var ace = [0, "Ace"];

  // This is the function that builds the deck
  function buildDeck(deck){

    // It makes four loops, each time building a different suit
    for(i=0; i<suit.length; i++){

      // For each suit, it makes thirteen loops, one for the ace, nine for 2-10, and three for the face cards
      for(j=1; j<14; j++){
        if(j<2){
          deck.push({
            num: ace[j],
            suit: suit[i]
          });
            // ace[j]+" of "+suit[i])
        } else if(j<11) {
          deck.push({
            num: j,
            suit: suit[i]
          });
            // j+" of "+suit[i])
        } else {
          deck.push({
            num: court[j-11],
            suit: suit[i]
          });
            // court[j-11]+" of "+suit[i])
        };
      };
    };

    //the end result is an array with all 52 cards
    return deck;
  };

  // A variable defines the built deck, so it can be used later
  var builtDeck = buildDeck(empty);
  console.log(builtDeck[0]);


  //This following function will shuffle the deck and display the top card on the left. It can be used multiple times.
  $('#shuffle').on('click', function(){

    //shuffles the deck
    var shuffledDeck = shuffleDeck(builtDeck);
    console.log(shuffledDeck[0]);

    //displays the top card
    $(".cardBack").html(shuffledDeck[0].num+ " of "+shuffledDeck[0].suit);

    //returns the shuffled deck as the deck to use
    builtDeck = shuffledDeck;

  });

//this function shuffles the order of the deck
  function shuffleDeck(input){

    //the variables that make this function work
    var list = input;
    var shuffle = [];

    //a card is randomly pulled from the built deck and placed at the top of the new deck
    for(i=0; list.length !=0; i++){
      var num= Math.floor(Math.random()*list.length);
      shuffle.push(list[num]);
      list.splice(num, 1);
    };

    //the end result is a randomized version of builtDeck
    return shuffle;
  };

  //This function will draw the first card and display it on the right
  $('#draw').on('click', function(){

    //The name of the card is displayed
    $(".cardFront").html(builtDeck[0].num+ " of "+builtDeck[0].suit);

    //then that card is removed from the array
    builtDeck.splice(0, 1);
    console.log(builtDeck);
  });

});
