define(function(){


    var open = 0;
    $('.portal').hover(function(){
        var t = $(this);
        $('.portal').addClass('lit');
        $('.background').hide();
        $('#bg-'+t.data('portal')).fadeIn(200);
        window.clearTimeout(open);
    }, function(){
        open = window.setTimeout(function(){
            $('.portal').removeClass('lit');
            $('.background').fadeOut(200);
        }, 200);
    });

});
