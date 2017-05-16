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
  $('.drawButton').on('click', draw );

  function draw() {

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

    $('.pDraw').toggleClass('flip');
    $('.cDraw').toggleClass('flip');


    //declare winner as player(true) or com(false)
    winner = compare(playerDraw[0].num, comDraw[0].num);
  };

  //move cards to trophy pile depending on winner
  $('.collectButton').on('click', collection);

  function collection() {

    if (busy) {
      var win2 = toTrophy(winner);
      reshuffle(win2);
    } else {
      return
    };

    console.log(playerDraw);
    console.log(playerDeck);

    console.log(comDraw);
    console.log(comDeck);

    setTimeout(function(){busy = 0;}, 1000);
  };

  //this function compares two drawn cards
  function compare(card1, card2) {

    //If player wins, return true. if com wins, return false.
    if (card1 == card2) {

      //if Cards are of equal value, a 'war' occurs. Three(or as many as possible) cards are drawn into a 'loot' pile...
      var tie = tie();
      if(tie == 'stalemate'){return};

      busy = 0;

      //..then a new card is drawn for each player
      draw();

    } else if (card1 == 1) {

      //if either card is an ace, special rules apply. Ace beats everything except a two
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

      //In all other cases, higher card wins.
      if (card1 > card2) {
        return 1
      } else {
        return 0
      }
    };

  };

  //special rules occur if there is a tie
  function tie() {

    //the drawn cards are moved into the loot pile
    playerLoot.push(playerDraw[0]);
    comLoot.push(comDraw[0]);
    playerDraw.shift();
    comDraw.shift();

    //If either deck is empty, shuffle the trophy pile into it. If there is a tie and one player is unable to play another card, then a stalemate is declared.
    if (playerDeck.length == 0){
      if (playerTrophy.length != 0){
        playerDeck = shuffle(playerTrophy);
      } else {
        $('.outcome').html("Stalemate!");
        return 'stalemate';
      }
    };
    if (comDeck.length == 0){
      if (comTrophy.length != 0){
        comDeck = shuffle(comTrophy);
      } else {
        $('.outcome').html("Stalemate!");
        return 'stalemate';
      }
    };

    //If at least four cards can be drawn, three cards are moved from the deck to the loot pile
    if (playerDeck.length > 4 && comDeck.length > 4){

      for (i=0; i < 3; i++) {
        playerLoot.push(playerDeck[i]);
        comLoot.push(comDeck[i]);
      };

      playerDeck.splice(0, 3);
      comDeck.splice(0, 3);

      return
    };

    //if either deck has one card, no cards are moved to the loot pile
    if (playerDeck.length == 1 || comDeck.length == 1){
      return
    };

    //if either deck has two cards, one card is moved to loot pile
    if (playerDeck.length == 2 || comDeck.length == 2){
      playerLoot.push(playerDeck[0]);
      comLoot.push(comDeck[0]);

      playerDeck.shift();
      comDeck.shift();

      return;
    };

    //if either deck has three cards, two cards are moved to the loot pile
    if (playerDeck.length == 3 || comDeck.length == 3){

      for (i=0; i < 2; i++) {
        playerLoot.push(playerDeck[i]);
        comLoot.push(comDeck[i]);
      };

      playerDeck.splice(0, 2);
      comDeck.splice(0, 2);

      return
    };

  };

  //Once a winner is defined, all cards in the loot and draw piles are moved to the winner's trophy pile
  function toTrophy(input) {

    //If player wins:
    if (input) {
      playerTrophy.push(playerDraw[0], comDraw[0]);
      playerDraw.shift();
      comDraw.shift();

      $('.pDraw').toggleClass('flip toMyTrophy');
      $('.cDraw').toggleClass('flip toTheirTrophy');

      playerLoot.forEach(function(element){
        playerTrophy.push(element);
        playerLoot.splice(element, 1);
      });

      comLoot.forEach(function(element){
        playerTrophy.push(element);
        comLoot.splice(element, 1);
      });

      return 1;
    } else {

      //if com wins:
      comTrophy.push(playerDraw[0], comDraw[0]);
      playerDraw.shift();
      comDraw.shift();

      $('.cDraw').toggleClass('flip toMyTrophy');
      $('.pDraw').toggleClass('flip toTheirTrophy');

      playerLoot.forEach(function(element){
        comTrophy.push(element);
        playerLoot.splice(element, 1);
      });

      comLoot.forEach(function(element){
        comTrophy.push(element);
        comLoot.splice(element, 1);
      });

      return 0;
    };

    console.log("wtf?");
  };

  function reshuffle(input) {

    if(input){
      setTimeout(function(){
        $('.pDraw').toggleClass('toMyTrophy');
        $('.cDraw').toggleClass('toTheirTrophy');
      }, 600);
    } else {
      setTimeout(function(){
        $('.cDraw').toggleClass('toMyTrophy');
        $('.pDraw').toggleClass('toTheirTrophy');
      }, 600);
    };

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
