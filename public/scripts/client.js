
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const esc = function(str) { //function to prevent cross site scripting from users inputs
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweets) { //function to create dynamic html article from user tweet
  let markup = `<article>
    <header>
      <div>
        <img src=${esc(tweets.user.avatars)}>
        <p>${esc(tweets.user.name)}</p>
      </div>
      <p>${esc(tweets.user.handle)}</p>
    </header>
    
    <p>${esc(tweets.content.text)}</p>
    <hr>
    
    <footer>
      <p>${esc(timeago.format(tweets.created_at))}</p>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
    </article>`;

  return markup;

};


// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
const renderTweets = function(tweets) {
  tweets.map(tweet => {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').append($tweet);
  });

};

//sends a get request to fetch the tweets
//empties the value of the text container
//empties the tweet container to remmove all the tweets
//renders all the tweets again inclding the new tweet
//resets the value of the counter
const loadTweets = function() {
  $.get('/tweets').then((data) => {
    $('#tweet-text').val('');
    $('#tweet-container').empty();
    renderTweets(data);
    $('.counter').val(140);
  });
};

//function to display error to user
//checks if the error is already displayed so to does nothing
//appends the error text passed by the user
//displays the error message to the user and if user clicks on the x button it slides it back up
const errMsg = function(text) {
  if ($(".error").css('display') === 'block') {
    return;
  }
  $(".error>span").append(`${text}`);
  $(".error").slideDown("slow");
  $('.close').click(() => {
    $(".error").slideUp("slow");
    $(".error>span").empty();
  });
};

$(document).ready(function() {//wait till the page is loaded before excuting any of the code
  loadTweets(); //load all tweets stored in data base

  const $form = $('#tweet-form');
  $form.submit(function(event) {
    event.preventDefault(); //prevents the form from submtting when clicked on the button
    const submitted_Data = $(this).find('#tweet-text').val(); //grabs the number of charachters in the tex area
    if (submitted_Data === '') {
      errMsg('you are submitting an empty tweet...try again'); //if user submits empty tweet it calls error function and pass the error message

    } else if (submitted_Data.length > 140) {
      errMsg('you are exceeding the max chars...try again'); //if user exceeds chars limit calls error message function

    } else {
      let data = $(this).serialize(); //seralizes the date submitted by the form
      $.post('/tweets', data) //sends a post request to the server
        .then(() => {
          $(".error").hide();//  hides the error message if displayed
          loadTweets(); //calls the load tweet function
        });
    }
  });

  const writeNewTweet = $('.tweet-icon>.nav-tweet');
  writeNewTweet.click(function(event) {
    event.stopPropagation();
    if ($('.new-tweet').css('display') === 'flex') {//slides up the new tweet area when clicked (Stretch)
      $('.new-tweet').slideUp('slow');
    } else if ($('.new-tweet').css('display') === 'none') {//slides down the new tweet area when clicked (Stretch)
      $('.new-tweet').slideDown('slow');
      $('#tweet-text').focus();// brings the cursor in the text area

    }
  });
});




