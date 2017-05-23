//this is the JS code for the game war
$(function(){

  //player, or p, denotes the human player
  //com, or c, denotes the computer opponenet
  //Some variable that are needed:
  var busy = 0;
  var tie = 1;
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
  deal(shuffled, comDeck, playerDeck);
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

  //a few aethstetic stuff
  scoreBoard();


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
    for(i=0; i < 26; i++){
      player1.push(source[0]);
      source.splice(0, 1);
    };

    //and the rest go to player2
    source.forEach(function(element){
      player2.push(element);
    });
  };

  //this function displays the current score and adjusts the shadows of the card piles
  function scoreBoard() {
    $('.pScoreDeck').html(playerDeck.length);
    $('.pScoreTrophy').html(playerTrophy.length);
    $('.cScoreDeck').html(comDeck.length);
    $('.cScoreTrophy').html(comTrophy.length);
    $('.pDeck').css('border-bottom-width', playerDeck.length / 2);
    $('.cDeck').css('border-top-width', comDeck.length / 2);
    $('.pTrophy').css('border-right-width', playerTrophy.length / 2);
    $('.cTrophy').css('border-left-width', comTrophy.length / 2);
  }

  //This function runs the comparison feature of the game. When a button is pushed, the cards are drawn, then their values are compared, then the winner is decided. At a tie, a do-over round is completed. Then, if either player has no deck, their trophy pile is shuffled into a new one. If they have no trophy pile, they loose.
  $('.drawButton').on('click', draw );
  $('.pDeck').on('click', draw);

  function draw() {
  //  console.log("draw");
    //the busy var prevents draw or collect from running at the same time, or running multiples of either
    if (busy != 0) {
      return;
    };
    busy = 1;
  //  console.log(busy);


    //The top cards are moved from the deck to the draw pile
    playerDraw.unshift(playerDeck[0]);
    comDraw.unshift(comDeck[0]);
    playerDeck.shift();
    comDeck.shift();

    //if either deck is empty, display them as empty
    if (playerDeck.length == 0) {
      $('.pDeck').addClass('none');
    };
    if (comDeck.length == 0) {
      $('.cDeck').addClass('none');
    };

    //An animation makes it look like the cards are being drawn. It also puts the suit in the corners and the value in the center
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

    $('.pDraw').addClass('flip');
    $('.cDraw').addClass('flip');

    //busy is then changed to allow Collect to work, but not Draw
    setTimeout(function () {
      busy = 2;
    }, 500);


    //declare winner as player(true) or com(false)
    winner = compare(playerDraw[0].num, comDraw[0].num);

  };

  //move cards to trophy pile depending on winner
  $('.collectButton').on('click', collection);
  $('.pDraw').on('click', collection);

  function collection() {

    //Busy is checked to make sure that draw has run and nothing else is currently running
    if (busy == 2) {

      //busy is changed to prevent anything else from running
      busy = 3;

      //the winner from the draw function is passed into the toTrophy function, which changes the score and animates the drawn card into the trophy pile
      toTrophy(winner);

      //reshuffle does all the upkeep, including moving the drawn card back to the deck and reshuffling decks if they are empty(and are capable of being reshuffled)
      reshuffle(winner);
    } else {
      return
    };

    //busy is then changed after .8s to allow time for the animations to run
    setTimeout(function(){
      busy = 0;
      console.log("busy is" + busy);
    }, 800);
  };

  //this function reloads the page after someone wins
  $('.reloadButton').on('click', newGame);
  function newGame(){
    location.reload();
  }

  //this function compares two drawn cards. If player wins, return true. if com wins, return false.
  function compare(card1, card2) {

    //if Cards are of equal value, a 'war' occurs. Three(or as many as possible) cards are drawn into a 'loot' pile...
    if (card1 == card2) {

      //The word "War!" flashes on the screen
      $('.outcome').removeClass('none').html('War!');

      //the drawn cards are moved into the loot pile
      playerLoot.push(playerDraw.shift());
      comLoot.push(comDraw.shift());

      $('.draw').addClass('toLoot1');

      //If either deck is empty, shuffle the trophy pile into it. If there is a tie and one player is unable to play another card, then a stalemate is declared.
      if (playerDeck.length == 0){
        if (playerTrophy.length != 0){
          playerDeck = shuffle(playerTrophy);
          $('.playerDeck').removeClass('none');
          $('.playerTrophy').addClass('none');
        } else {
          $('.outcome').html("Stalemate!");
          $('.reloadButton').removeClass('none');
          return;
        }
      };
      if (comDeck.length == 0){
        if (comTrophy.length != 0){
          comDeck = shuffle(comTrophy);
          $('.comDeck').removeClass('none');
          $('.comTrophy').addClass('none');
        } else {
          $('.outcome').html("Stalemate!");
          $('.reloadButton').removeClass('none');
          return;
        }
      };

      $('.tie').removeClass('none');

      setTimeout(function(){

      //If at least four cards can be drawn, three cards are moved from the deck to the loot pile
      if (playerDeck.length >= 4 && comDeck.length >= 4){
        for (i=1; i < 4; i++) {
          playerLoot.push(playerDeck.shift());
          comLoot.push(comDeck.shift());

          $('.tie'+i).addClass('toLoot'+i);
        };

        tie = 4;
      } else if(playerDeck.length == 2 || comDeck.length == 2) {
        //if either deck has two cards, one card is moved to loot pile
        playerLoot.push(playerDeck.shift());
        comLoot.push(comDeck.shift());

        $('.tie1').addClass('toLoot1');
        $('.tie2').addClass('none');
        $('.tie3').addClass('none');

        tie = 2;
      } else if (playerDeck.length == 3 || comDeck.length == 3){
        //if either deck has three cards, two cards are moved to the loot pile
        for (i=1; i < 3; i++) {
          playerLoot.push(playerDeck.shift());
          comLoot.push(comDeck.shift());

          $('.tie'+i).addClass('toLoot'+i);
        };

        $('.tie3').addClass('none');

        tie = 3;
      };

      $('.outcome').html('').addClass('none');

      busy = 0;
      $('.draw').removeClass('flip toLoot1');

      scoreBoard();
      return;
    }, 1000);

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

  //Once a winner is defined, all cards in the loot and draw piles are moved to the winner's trophy pile
  function toTrophy(input) {

    //If player wins:
    if (input) {
      if (playerTrophy.length == 0){
        var trophy = 1;
      }
      playerTrophy.push(playerDraw.shift(), comDraw.shift());

      $('.pDraw').removeClass('flip').addClass('toMyTrophy');
      $('.cDraw').removeClass('flip').addClass('toTheirTrophy');
      if (trophy) {
        $('.pTrophy').removeClass('none');
      };

      for (i=1; i != tie; i++){
        $('.pLoot .tie'+i).removeClass('toLoot'+i).addClass('toMyTrophy');
        $('.cLoot .tie'+i).removeClass('toLoot'+i).addClass('toTheirTrophy');
      };

      while(playerLoot.length) {
        playerTrophy.push(playerLoot.shift());
        playerTrophy.push(comLoot.shift());
      };

    } else {

      //if com wins:
      if (comTrophy.length == 0){
        var trophy = 1;
      }
      comTrophy.push(playerDraw.shift(), comDraw.shift());

      $('.cDraw').removeClass('flip').addClass('toMyTrophy');
      $('.pDraw').removeClass('flip').addClass('toTheirTrophy');
      if (trophy) {
        $('.cTrophy').removeClass('none');
      };

      for (i=1; i != tie; i++){
        $('.cLoot .tie'+i).removeClass('toLoot'+i).addClass('toMyTrophy');
        $('.pLoot .tie'+i).removeClass('toLoot'+i).addClass('toTheirTrophy');
      };

      while(playerLoot.length) {
        comTrophy.push(playerLoot.shift());
        comTrophy.push(comLoot.shift());
      };

      playerLoot.forEach(function(element){
        comTrophy.push(element);
        playerLoot.splice(element, 1);
      });

      comLoot.forEach(function(element){
        comTrophy.push(element);
        comLoot.splice(element, 1);
      });

    };

    scoreBoard();
  };

  function reshuffle(input) {

    if (playerDeck.length == 0) {
      if (playerTrophy.length) {
        $('.pDeck').removeClass('none');
        $('.pTrophy').addClass('none');
        playerDeck = shuffle(playerTrophy);
      } else {
        $('.outcome').removeClass('none').html('You lose :(')
        $('.reloadButton').removeClass('none');
      };
    };

    if (comDeck.length == 0) {
      if (comTrophy.length) {
        $('.cDeck').removeClass('none');
        $('.cTrophy').addClass('none');
        comDeck = shuffle(comTrophy);
      } else {
        $('.outcome').removeClass('none').html('You win :)')
        $('.reloadButton').removeClass('none');
      };
    };

    if(input){
      setTimeout(function(){
        $('.pDraw').removeClass('toMyTrophy');
        $('.cDraw').removeClass('toTheirTrophy');
        $('.tie').addClass('none');

        for (i=1; i != tie; i++){
          $('.pLoot .tie'+i).removeClass('toMyTrophy');
          $('.cLoot .tie'+i).removeClass('toTheirTrophy');
        };
      }, 600);
    } else {
      setTimeout(function(){
        $('.cDraw').removeClass('toMyTrophy');
        $('.pDraw').removeClass('toTheirTrophy');
        $('.tie').addClass('none');

        for (i=1; i != tie; i++){
          $('.cLoot .tie'+i).removeClass('toMyTrophy');
          $('.pLoot .tie'+i).removeClass('toTheirTrophy');
        };
      }, 600);
    };

    scoreBoard();
  };

})
