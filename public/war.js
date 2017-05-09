//this is the JS code for the game war
$(function(){

  //Some variable that are needed:
  var busy = 0;
  var winner = 0;
  var empty = [];
  var Spades = '<div class="spadeMiddle"></div><div class="spadeLeft"></div><div class="spadeRight"></div><div class="spadeBottom">';
  var Hearts = '<div class="heartMiddle"></div><div class="heartLeft"></div><div class="heartRight"></div>';
  var Clubs = '<div class="clubTop"></div><div class="clubLeft"></div><div class="clubRight"></div><div class="clubBottom"></div>';
  var Diamonds = '<div class="diamond"></div>';
  var pic = [Spades, Clubs, Hearts, Diamonds];
  var center = [0, 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

  //the game uses a 52 card deck...
  var deck = buildDeck(empty);
  //...which is newPiled...
  var shuffled = shuffle(deck);
  //...and dealt evenly to two players (26 cards each)
  var playerDeck = [];
  var comDeck = [];
  deal(shuffled, playerDeck, comDeck);
  //The players draw and compare cards...
  var playerDraw = [];
  var comDraw = [];
  //...and the winner adds both cards to their trophy pile.
  var playerTrophy = [];
  var comTrophy = [];
  //During a tie, three(or less) cards are added to the loot pile and a new card is drawn/compared.
  var playerLoot = [];
  var comLoot = [];
  //When their deck runs out, they reshuffle their trophy pile and use that. The winner is whomever owns all 52 cards in their collective deck/trophy piles


  //This function builds the decks, including all relevant information including a card's numeric value, it's representative value, it's suit, a picture of that suit, and the suit's "color code"(0-1 for black, 2-3 for red)
  function buildDeck(arr){

    // It makes four loops, each time building a different suit
    for(i=0; i<4; i++){

      // For each suit, it makes thirteen loops, one for each card value
      for(j=1; j<14; j++){
        arr.push({
          num: j,
          suit: i
        });
      };
    };

    //the end result is a 52 card deck, in order
    return arr;
  };

  //this function shuffles things
  function shuffle(input){

    var oldPile = input;
    var newPile = [];

      //a card is randomly pulled from the built deck and placed at the top of the new deck
      for(i=0; oldPile.length !=0; i++){
        var num= Math.floor(Math.random()*oldPile.length);
        newPile.push(oldPile[num]);
        oldPile.splice(num, 1);
      };

      //the end result is a randomized version of builtDeck
      return newPile;
  };

  //this function deals cards evenly between two players
  function deal(source, player1, player2) {

    //the source is divided in half
    var half = source.length/2;

    //half of the cards go to player1
    for(i=0; source.length != half; i++){
      player1.push(source[i]);
      source.splice(i, 1);
    };

    //and the rest go to player2
    source.forEach(function(element){
      player2.push(element);
    });
  };

  //This function runs the comparison feature of the game. When a button is pushed, the cards are drawn, then their values are compared, then the winner is decided. At a tie, a do-over round is completed. Then, if either player has no deck, their trophy pile is shuffled into a new one. If they have no trophy pile, they loose.
  $('.drawButton').on('click', function(){

    //the busy var prevents the function from running while it is running
    if (busy) {
      return;
    };
    busy = true;
    console.log(busy);


    //The top cards are moved from the deck to the draw pile
    playerDraw.unshift(playerDeck[0]);
    comDraw.unshift(comDeck[0]);
    playerDeck.shift();
    comDeck.shift();


    console.log(pic[playerDraw[0].suit]);
    console.log(center[playerDraw[0].num]);
    //An animation makes it look like the cards are being drawn
    $('.pTL').html(pic[playerDraw[0].suit]);
    $('.pTR').html(pic[playerDraw[0].suit]);
    $('.pBL').html(pic[playerDraw[0].suit]);
    $('.pBR').html(pic[playerDraw[0].suit]);
    $('.pCardNum').html(center[playerDraw[0].num]);

    $('.cTL').html(pic[comDraw[0].suit]);
    $('.cTR').html(pic[comDraw[0].suit]);
    $('.cBL').html(pic[comDraw[0].suit]);
    $('.cBR').html(pic[comDraw[0].suit]);
    $('.cCardNum').html(center[comDraw[0].num]);

    $('.pDraw').toggleClass('pflip');
    $('.cDraw').toggleClass('cflip');


    //declare winner as player(true) or com(false)
    winner = compare(playerDraw[0].num, comDraw[0].num);

    console.log(playerDraw[0].num);
    console.log(winner);
    console.log(playerDeck.length);

  });

  //move cards to trophy pile depending on winner
  $('.collectButton').on('click', function(){

    if (busy) {
      toTrophy(winner);
      reshuffle();
      busy = 0;
    } else {
      return
    };

    console.log(playerDraw);
    console.log(playerDeck);

    console.log(comDraw);
    console.log(comDeck);

  });

  //this function compares two drawn cards
  function compare(card1, card2) {

    //If cards are identical, a 'war' occurs. If either card is an ace, special rules apply. Every other case, higher card value wins. If player wins, return true. if com wins, return false.
    if (card1 == card2) {
      tie()
    } else if (card1 == 1) {
      if (card2 == 2){
        return 0
      } else {
        return 1
      }
    } else if (card2 == 1) {
      if (card1 == 2){
        return 1
      } else {
        return 0
      }
    } else {
      if (card1 > card2) {
        return 1
      } else {
        return 0
      }
    };

  };

  function tie() {


  };

  function toTrophy(input) {

    if (input) {
      playerTrophy.push(playerDraw[0], comDraw[0]);
      playerDraw.shift();
      comDraw.shift();

      $('.pDraw').toggleClass('pflip');
      $('.cDraw').toggleClass('cflip');

      playerLoot.forEach(function(element){
        playerTrophy.push(element);
        playerLoot.splice(element, 1);
      });

      comLoot.forEach(function(element){
        playerTrophy.push(element);
        comLoot.splice(element, 1);
      });
    } else {
      comTrophy.push(playerDraw[0], comDraw[0]);
      playerDraw.shift();
      comDraw.shift();

      playerLoot.forEach(function(element){
        comTrophy.push(element);
        playerLoot.splice(element, 1);
      });

      comLoot.forEach(function(element){
        comTrophy.push(element);
        comLoot.splice(element, 1);
      });
    }

    console.log(playerTrophy.length);
    console.log(comTrophy.length);
  };

  function reshuffle() {

    if (playerDeck == 0) {
      if (playerTrophy != 0){
        playerDeck = shuffle(playerTrophy)
      } else {
        $('.outcome').html("You lose :(");
      }
    };

    if (comDeck == 0) {
      if (comTrophy != 0){
        comDeck = shuffle(comTrophy)
      } else {
        $('.outcome').html("You win :)");
      }
    };
  };

})
