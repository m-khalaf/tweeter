$(document).ready(function() {
  $('#tweet-text').on('input', function(e) {
    let totalChar= $(`#${this.id}`).val().length;
    $(`#${this.id}`).parent().find('.counter').val(140-totalChar);
    let counter= $(`#${this.id}`).parent().find('.counter');
    let counterValue =counter.val();

    if (counterValue <0){
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  })
});