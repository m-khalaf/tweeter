
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const esc = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweets) {
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

}


// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
const renderTweets = function (tweets) {
  tweets.map(tweet => {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').append($tweet);
  })

}

const loadTweets = function () {
  $.get('/tweets').then((data) => {
    $('#tweet-text').val('')
    $('#tweet-container').empty();
    renderTweets(data);
  })
}

const errMsg = function(text){
  if($(".error").css('display')==='block'){
    return;
  }
  $(".error>span").append(`${text}`)
  $(".error").slideDown("slow");
  $('.close').click(() => {
    $(".error").slideUp("slow")
    $(".error>span").empty();
  })
}

$(document).ready(function () {
  loadTweets();

  const $form = $('#tweet-form');
  $form.submit(function (event) {
    event.preventDefault();
    const submitted_Data = $(this).find('#tweet-text').val();
    if (submitted_Data === '') {
      errMsg('you are submitting an empty tweet...try again')
      
    } else if (submitted_Data.length > 140) {
      errMsg('you are exceeding the max chars...try again')

    } else {
      let data = $(this).serialize()
      $.post('/tweets', data)
        .then(() => {
          $(".error").hide();
          loadTweets()
        });


    }

  })

})




