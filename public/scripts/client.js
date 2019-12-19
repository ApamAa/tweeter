// when documnet is fully loaded the following code will then be executed
$(document).ready(function() {

  // handling the new-tweet toggle
  $(".new-tweet").hide();
  $(".errormsg").hide();
  $(".Arrow-down").click(function() {
    $(".new-tweet").slideToggle();
  });
  

  // handling the tweets section - dynamic adding the tweets and showing them in real time
  let $tweetForm = $('.new-tweet-form');
  $tweetForm.on('submit', function(event) {
    event.preventDefault();
    console.log($tweetForm.serialize());
    let tweetData = $(this).find('textarea').val();
    console.log("tweeet data -=-->>>", tweetData);
    if (tweetData === null || tweetData === "") {
      $(".errormsg").text("empty tweet!!!") .slideDown();
    } else if (tweetData.length > 140) {
        $(".errormsg").text("MESSAGE IS TOO LONG!!!") .slideDown();   
    } else {
      return $.ajax('/tweets', { method: 'POST', data:$tweetForm.serialize()})
        .then(function() {
          loadtweets();
          console.log('Success ');
          $(".errormsg").hide();
          $('.tweet-box').val("");
        });
    }
  });
  //escape function to make sure no faults are input to the code data base
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // render tweets by looping through them
  const renderTweets = function(tweets) {
   

    $(".tweetarea").empty();
    for (let twt of tweets) {
      const $tweet = createTweetElement(twt);
      $(".tweetarea").prepend($tweet);
    }
  };
  
  // load the tweets using ajax call for /tweets page to load the tweets data-base objects
  const loadtweets = function() {
    $.ajax({
      url: "/tweets"
    }).then(renderTweets);
  };

  loadtweets(); // one time call of the function to load all the tweets already called from /tweet
 
  // a function to creat a tweet elemnt using jQuery to build html element from string
  const createTweetElement = function(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    $tweet = $(
      `<article class="tweet">
        <div class = "tweet-owner">
          <div>
            <img src="${tweet.user.avatars}" class="pic"> 
            ${tweet.user.name}
          </div>
          <h3 class = "komaki">${tweet.user.handle}</h3>
        </div>

        <p>${escape(tweet.content.text)}</p>
        <div class = "footer-area">    
          <footer>
            ${moment(tweet.created_at).fromNow()}
          </footer>
          <div>
            <span class="fas fa-flag"></span>
            <span class="fas fa-retweet"></span>
            <span class="fas fa-heart"></span>
          </div>
        </div>
      </article>`
    );


    return $tweet;
  };
});
