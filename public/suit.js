$(function(){

//This function will allow me to press a button and change the suit of the cardFront

//these variables have all the html needed for the suit image. I built the suit images out of CSS, so you should check that out. It'd be easier to use a picture, but this is more impressive and only took a few hours.
  var Spades = '<div class="spadeMiddle"></div><div class="spadeLeft"></div><div class="spadeRight"></div><div class="spadeBottom">';
  var Hearts = '<div class="heartMiddle"></div><div class="heartLeft"></div><div class="heartRight"></div>';
  var Clubs = '<div class="clubTop"></div><div class="clubLeft"></div><div class="clubRight"></div><div class="clubBottom"></div>';
  var Diamonds = '<div class="diamond"></div>';


  //when a suit is clicked,
  $('.Spades').on('click', function(){
  console.log('Spades');

  // the card is switched!]
  $('.TL').html(Spades);
  $('.TR').html(Spades);
  $('.BL').html(Spades);
  $('.BR').html(Spades);
  });

  //when a suit is clicked,
  $('.Hearts').on('click', function(){
  console.log('Hearts');

  // the card is switched!]
  $('.TL').html(Hearts);
  $('.TR').html(Hearts);
  $('.BL').html(Hearts);
  $('.BR').html(Hearts);
  });

  //when a suit is clicked,
  $('.Clubs').on('click', function(){
  console.log('Clubs');

  // the card is switched!]
  $('.TL').html(Clubs);
  $('.TR').html(Clubs);
  $('.BL').html(Clubs);
  $('.BR').html(Clubs);
  });

  //when a suit is clicked,
  $('.Diamonds').on('click', function(){
  console.log('Diamonds');

  // the card is switched!]
  $('.TL').html(Diamonds);
  $('.TR').html(Diamonds);
  $('.BL').html(Diamonds);
  $('.BR').html(Diamonds);
  });

});
