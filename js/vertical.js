var currentPage = 0;
var perPage = 8;

var menu = JSON.parse(localStorage["menu"]);
var index = JSON.parse(localStorage["index"]);
var maxPages = menu.length/perPage;

$('#container .rectangle').hover(        	
    function(e) {
        var element = $(this);
        var progressbar = $(element).find('.progress');

		progressbar.show();

        this.onDone = setTimeout(function(){
            element.click();
            
            progressbar.hide();
            clearInterval(this.interval);
            clearInterval(this.onDone);
            progressbar.css('webkitAnimationName', '');
        },2000);

        this.interval = setTimeout(function(){
            progressbar.css('webkitAnimationName', 'progress');
        },500);
    }, 
    function(e){
        var progressbar = $(this).find('.progress');
        progressbar.hide();
        clearInterval(this.interval);
        clearInterval(this.onDone);
        progressbar.css('webkitAnimationName', '');
    }
);

function loadMenu(pageNo) {
    var i;
    var offset = pageNo*perPage;
    for(i=0+offset; i<perPage+offset; i++){
        var menuItem = $('#container .rectangle')[i-offset + 1];
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
$('#prevPage').click(
    function(){
        this.interval = setTimeout(function(){

            ++currentPage;
            currentPage %= maxPages;

            $('#container').hide();
            $('#container').slideDown("slow");
            loadMenu(currentPage);
            
        },100);
    }
);

$('#nextPage').click(
    function(){
        this.interval = setTimeout(function(){
            
            --currentPage;
            if (currentPage < 0)
                currentPage = maxPages-1;

            $('#container').hide();
            $('#container').slideDown("slow");
            loadMenu(currentPage);
            
        },100);
    }
);

$("#container .rectangle .progress").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){ 
    var menuElement = $(this).parent()[0];    
    var menuId = $(menuElement).attr('id');
    menu[index[menuId]].count++;
    localStorage.setItem("menu", JSON.stringify(menu));
});

setPageNumbers();
loadMenu(0);
