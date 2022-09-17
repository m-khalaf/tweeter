$(document).ready(function () {
  $('#tweet-text').on('input', function (e) {
    let totalChar = $(`#${this.id}`).val().length;
    $(`#${this.id}`).parent().find('.counter').val(140 - totalChar);
    let counter = $(`#${this.id}`).parent().find('.counter');
    let counterValue = counter.val();

    if (counterValue < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  })
  $(window).scroll(function (e) {
    let st = $(this).scrollTop();
    console.log('scrolld')
    console.log(st)
    if (st > 200) {
      $('#scroll-button').css('display', 'block');
      $('#scroll-button').click(() => {
        $('#tweet-text').focus();
        $(this).scrollTop(0)

      })
    } else {
      $('#scroll-button').css('display', 'none');

    }

  })


});