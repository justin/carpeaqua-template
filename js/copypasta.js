$(document).ready(function(){
    $("#menu-icon").click(function(){
        var $list = $('nav#navigation-list');

        if ($list.hasClass("expanded")) {
            $list.slideUp(400, function() {
              $list.removeClass("expanded");
              $(this).removeClass("open");
            });
        } else {
            $list.slideDown(400);
            $list.addClass("expanded");
            $(this).addClass("open");
        }
    });
});
