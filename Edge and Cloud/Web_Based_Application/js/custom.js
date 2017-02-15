$(document).ready(function(){

	$('#gettemp').click(function(e){
		 console.log('in get temp');

        make_ajax('gettemp');
      });

  $(".submenu > a").click(function(e) {
    e.preventDefault();
    var $li = $(this).parent("li");
    var $ul = $(this).next("ul");

    if($li.hasClass("open")) {
      $ul.slideUp(350);
      $li.removeClass("open");
    } else {
      $(".nav > li > ul").slideUp(350);
      $(".nav > li").removeClass("open");
      $ul.slideDown(350);
      $li.addClass("open");
    }
  });
  
});

function make_ajax(device){
  $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:3000/'+device,
            success: function (msg) {
                console.log(msg);            
                $('#'+device).text(msg);
            } 
    });
}
