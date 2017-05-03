$(function(){

//This function will allow me to press a button and change the suit of the cardFront

//these variables have all the html needed for the suit image. I built the suit images out of CSS, so you should check that out. It'd be easier to use a picture, but this is more impressive and only took a few hours.
  var Spades = '<div style="position: relative; top: 0; left: 0;"><div style="height: 2rem; width: 2rem; background-color: black; transform: rotate(45deg); position: relative; top: 1.25rem; left: 1.5rem;"></div><div style="height: 2rem; width: 2rem; border-radius: 1rem; background-color: black; position: relative; top: -.15rem; left: .9rem;"></div><div style="height: 2rem; width: 2rem; border-radius: 1rem; background-color: black; position: relative; top: -2.15rem; left: 2.1rem;"></div><div style="height: .5rem; width: .5rem; border-bottom-right-radius: .5rem; background-color: black; transform: rotate(45deg) skew(20deg, 20deg); position: relative; top: -2.25rem; left: 2.25rem;"></div></div><div style="position: relative; top: -6.5rem; left: -20rem;"><div style="height: 2rem; width: 2rem; background-color: black; transform: rotate(45deg); position: relative; top: 1.25rem; left: 1.5rem;"></div><div style="height: 2rem; width: 2rem; border-radius: 1rem; background-color: black; position: relative; top: -.15rem; left: .9rem;"></div><div style="height: 2rem; width: 2rem; border-radius: 1rem; background-color: black; position: relative; top: -2.15rem; left: 2.1rem;"></div><div style="height: .5rem; width: .5rem; border-bottom-right-radius: .5rem;background-color: black; transform: rotate(45deg) skew(20deg, 20deg); position: relative; top: -2.25rem; left: 2.25rem;"></div></div><div style="position: relative; top: -17rem; left: 0;"><div style="height: 2rem; width: 2rem; background-color: black; transform: rotate(45deg); position: relative; top: 1.25rem; left: 1.5rem;"></div><div style="height: 2rem; width: 2rem; border-radius: 1rem; background-color: black; position: relative; top: -.15rem; left: .9rem;"></div><div style="height: 2rem; width: 2rem; border-radius: 1rem; background-color: black; position: relative; top: -2.15rem; left: 2.1rem;"></div><div style="height: .5rem; width: .5rem; border-bottom-right-radius: .5rem;background-color: black; transform: rotate(45deg) skew(20deg, 20deg); position: relative; top: -2.25rem; left: 2.25rem;"></div></div><div style="position: relative; top: -10.5rem; left: -20rem;"><div style="height: 2rem; width: 2rem; background-color: black; transform: rotate(45deg); position: relative; top: 1.25rem; left: 1.5rem;"></div><div style="height: 2rem; width: 2rem; border-radius: 1rem; background-color: black; position: relative; top: -.15rem; left: .9rem;"></div><div style="height: 2rem; width: 2rem; border-radius: 1rem; background-color: black; position: relative; top: -2.15rem; left: 2.1rem;"></div><div style="height: .5rem; width: .5rem; border-bottom-right-radius: .5rem;background-color: black; transform: rotate(45deg) skew(20deg, 20deg); position: relative; top: -2.25rem; left: 2.25rem;"></div></div>';


  var Hearts = '<div class="suit Hearts"><div class="heartMiddle"></div><div class="heartLeft"></div><div class="heartRight"></div></div>';
  var Clubs = '<div class="suit Clubs"><div class="clubTop"></div><div class="clubLeft"></div><div class="clubRight"></div><div class="clubBottom"></div></div>';
  var Diamonds = '<div class="suit Diamonds"><div class="diamond"></div></div>';


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
