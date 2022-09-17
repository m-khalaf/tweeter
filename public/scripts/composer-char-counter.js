$(document).ready(function() {
  $('#tweet-text').on('input', function(e) {//listens to input event whenever a user types something in the txt area
    let totalChar = $(`#${this.id}`).val().length;//grabs the number of chars entered in the text area
    $(`#${this.id}`).parent().find('.counter').val(140 - totalChar); //updates the value of the counter
    let counter = $(`#${this.id}`).parent().find('.counter'); //grabs the counter
    let counterValue = counter.val(); //grabs the value of the counter

    if (counterValue < 0) {
      counter.addClass('red'); //if counter value goes below zero it adds a class that turns it red
    } else {
      counter.removeClass('red'); //removes the red class
    }
  });
  $(window).scroll(function(e) { //listens to scroll event
    let st = $(this).scrollTop(); //grabs the scroll value from the top
    if (st > 45) {
      $('nav>span').css('color', '#4056A1'); //switches the twitter logo to blue when scrolled down
    }
    if (st > 200) {
      $('#scroll-button').css('display', 'block');//displays the scroll up button when scrolled down
      $('#scroll-button').click(() => {//listen to button click event
        $('#tweet-text').focus();//brings back the cursor to the text area
        $(this).scrollTop(0); //brings the window all the way up

      });
    } else {
      $('#scroll-button').css('display', 'none');// hides the button when scrolled up
    }
    if (st < 45) {
      $('nav>span').css('color', '#fff'); //turns the tweeter logo back to white when scrolled up
    }

  });


});