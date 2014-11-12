var nbOptions = 8;
var angleStart = -380;

// jquery rotate animation
function rotate(li,d) {
    $({d:angleStart}).animate({d:d}, {
        step: function(now) {
            $(li)
               .css({ transform: 'rotate('+now+'deg)' })
               .find('.menu')
                  .css({ transform: 'rotate('+(-now)+'deg)' });
        }, duration: 0
    });
}

// show / hide the options
function toggleOptions(s) {
    $(s).toggleClass('open');
    var li = $(s).find('li');
    var deg = $(s).hasClass('half') ? 180/(li.length-1) : 360/li.length;
    for(var i=0; i<li.length; i++) {
        var d = $(s).hasClass('half') ? (i*deg)-90 : i*deg;
        $(s).hasClass('open') ? rotate(li[i],d) : rotate(li[i],angleStart);
    }
}

$('#centerButton').click(function(e) {
    toggleOptions($(this).parent());
});

$('.selector li .menu').hover(        
    function(e) {
        var element = $(this);
        this.interval = setTimeout(function(){
            element.find('.circle.left').css('webkitAnimationName', 'left-spin');
            element.find('.circle.right').css('webkitAnimationName', 'right-spin');
            element.find('.wrapper').css('webkitAnimationName', 'close-wrapper');
        },500);
    }, 
    function(e){
        clearInterval(this.interval);
        $(this).find('.circle').css('webkitAnimationName', '');
        $(this).find('.wrapper').css('webkitAnimationName', '');
    }
);



setTimeout(function() { 
    toggleOptions('.selector'); 
}, 100);

