var nbOptions = 8;
var angleStart = -380;
var currentPage = 0;
var menu = JSON.parse(localStorage["menu"]);
var index = JSON.parse(localStorage["index"]);
var maxPages = Math.ceil(menu.length/8);

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

function loadMenu(pageNo) {
    var i;
    var offset = pageNo*8;
    for(i=0+offset; i<8+offset; i++){
        var menuItem = $('.selector .menu')[i-offset];
        $(menuItem).attr('id', menu[i].id);
        var menuImage = "images/menu/" + menu[i].id;
        $(menuItem).css('background-image', 'url('+menuImage +'.png)');
        $(menuItem).find('h4').text(menu[i].name);
    }

    $('#pages .pageNo').css('background-color', 'rgba(255,255,255,0.3)');
    var currentPageNo = $('#pages .pageNo')[pageNo];
    $(currentPageNo).css('background-color', 'rgba(255,255,255,1)');
}

function setPageNumbers(){
    for(var i=0; i< maxPages; i++){
        $('#pages').append('<div class="pageNo">'+ (i+1) +'</div>');    
    }
    
}

function updateMenuIndex(){
    var index = {};
    for (var i=0; i<menu.length; i++){
        index[menu[i].id] = i;
    }
    localStorage["index"] = JSON.stringify(index);
}

$('#centerButton').click(function(e) {
    toggleOptions($(this).parent());
});

$('.selector li .menu').hover(        
    function(e) {
        var element = $(this);
        this.interval = setTimeout(function(){
            element.find('wrapper').css('visibility', 'visible');
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

$(".selector li .menu .circle.left").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){ 
    var menuElement = $(this).parent().parent()[0];    
    var menuId = $(menuElement).attr('id');
    menu[index[menuId]].count++;
    localStorage.setItem("menu", JSON.stringify(menu));
});

$('#right').hover(
    function(){
        this.interval = setTimeout(function(){

            ++currentPage;
            currentPage %= maxPages;

            $('.selector').toggle('slide');                
            loadMenu(currentPage);
            $('.selector').toggle('slide');                
                           
        },1000);
    },
    function(){
        clearInterval(this.interval);
    }
);

$('#left').hover(
    function(){
        this.interval = setTimeout(function(){

            --currentPage;
            if (currentPage < 0)
                currentPage = maxPages-1;

            $('.selector').toggle('slide');
            loadMenu(currentPage);
            $('.selector').toggle('slide');  

        },1000);
    },
    function(){
        clearInterval(this.interval);
    }
);

setPageNumbers();
loadMenu(currentPage);
setTimeout(function() { 
    toggleOptions('.selector'); 
}, 100);

updateMenuIndex();





