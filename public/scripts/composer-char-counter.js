


$(document).ready(function() {
  $(".tweet-box").keyup(function() {
  const lengthAllowed = 140;
  let charCount = $(this).val().length;
  let remaining = lengthAllowed - charCount;
    $('.counter').text(remaining);
    if (remaining < 0) {
      $(this).siblings("span").text(remaining).addClass('exceeded');
    } else {
      $(this).siblings("span").text(remaining).removeClass('exceeded');
    }
})

});

