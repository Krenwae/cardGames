$(function(){
  // These are the variables that help build the deck
  var empty=[];
  var suit =["Spades", "Hearts", "Clubs", "Diamonds"];
  var court =["Jack", "Queen", "King"];
  var ace =[0, "Ace"];
  // This is the function that builds the deck
  function buildDeck(deck){
    // It makes four loops, each time building a different suit
    for(i=0; i<suit.length; i++){

      // For each suit, it makes thirteen loops, one for the ace, nine for 2-10, and three for the face cards
      for(j=1; j<14; j++){
        if(j<2){
          deck.push(ace[j]+" of "+suit[i])
        } else if(j<11) {
          deck.push(j+" of "+suit[i])
        } else {
          deck.push(court[j-11]+" of "+suit[i])
        };
      };
    };
    //the end result is an array with all 52 cards
    return deck;
  };

  // A variable defines the built deck, so it can be used later
  var builtDeck=buildDeck(empty);
  console.log(builtDeck[0])


  //This following function will display the name of the first suffled card when the box is clicked

  $('.cardBack').on('click', function(){

    var shuffledDeck=shuffleDeck(builtDeck);
    console.log(shuffledDeck[0])
    $(".cardBack").html("<div>"+shuffledDeck[0]+"</div>");

  });




  function shuffleDeck(list){

    var shuffle = [];

    for(i=0; list.length !=0; i++){
      var num= Math.floor(Math.random()*list.length);
      shuffle.push(list[num]);
      list.splice(num, 1);
    };

    return shuffle;
  };

})
