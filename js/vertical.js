$('#container .rectangle').hover(        	
    function(e) {
        var element = $(this);
        var progressbar = $(element).find('.progress');
		progressbar.show();
        this.interval = setTimeout(function(){
            progressbar.css('webkitAnimationName', 'progress');
        },500);
    }, 
    function(e){
        var progressbar = $(this).find('.progress');
        progressbar.hide();
        clearInterval(this.interval);
        progressbar.css('webkitAnimationName', '');
    }
);