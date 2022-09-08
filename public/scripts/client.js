/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const createTweetElement = function (tweets) {
    let markup = `<article>
    <header>
      <div>
        <img src=${tweets.user.avatars}>
        <p>${tweets.user.name}</p>
      </div>
      <p>${tweets.user.handle}</p>
    </header>
    
    <p>${tweets.content.text}</p>
    <hr>
    
    <footer>
      <p>${tweets.created_at}</p>
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



  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  renderTweets(data);


  const $form = $('#tweet-form');
  $form.submit(function (event) {
    event.preventDefault();
    console.log('you have submitted the form');
    let data =$(this).serialize()
    $.post('/tweets',data);
    console.log('you sent ',data);

  })

})




