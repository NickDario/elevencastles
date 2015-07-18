define(['../jquery.min'], function(jquery){

    $('[data-script="castle-main"]').each(function(){
        require(['c0/castle'], function(){
            console.log('__castles__');
        })
    });

    $('[data-script="musicpath"]').each(function(){
        require(['c6/Musicpath'], function(Musicpath){
            var mp = new Musicpath({
                canvas_id:'mp-canvas',
                audio_id :'mp-audio'
            });
            mp.init();
            $(mp).on('complete', function(){
                console.log('complete');
                mp = new Musicpath({
                    canvas_id:'mp-canvas',
                    audio_id :'mp-audio'
                }).init();
            });
        });
    });

    $('[data-script="pursue-and-flee"]').each(function(){
        require(['c8/pnf/PNF'], function(PNF){
            console.log('__pursue-and-flee__');
            var pnf = new PNF({
                canvas_id:'pnf-canvas'
            }).init();
        });
    });

    $('[data-script="ai-vehicles"]').each(function(){
        var controls = $('#v1-ctrl');
        require(['c8/vehicles1/Vehicles'], function(Vehicles){
            console.log('__vehicles__');
            var vehicles = new Vehicles({
                canvas_id:'vehicles-canvas'
            }).init();

            $('.pp', controls).on('click', function(e){
                e.preventDefault();
                $(this).toggleClass('paused');
                $(this).find('span').toggle();
                if($(this).hasClass('paused')){
                    vehicles.stop();
                } else{
                    vehicles.start();
                }
            });

            $('.info', controls).on('click', function(){
                $(this).toggleClass('on');
                $('#v1-info').toggle();
            })
        });
    });

    $('[data-script="vehiclesii"]').each(function(){
        var controls = $('#v2-ctrl');
        console.log('__vehiclesii__');
        require(['c8/vehicles2/Vehicles2'], function(Vehicles){
            var vehicles = new Vehicles({
                canvas_id:'vehiclesii-canvas',
                profiling: true
            }).init();

            $('.pp', controls).on('click', function(e){
                e.preventDefault();
                $(this).toggleClass('paused');
                $(this).find('span').toggle();
                if($(this).hasClass('paused')){
                    vehicles.stop();
                } else{
                    vehicles.start();
                }
            });

            $('.rendergrid').on('click', function(){
                vehicles.showGrid = $(this).is(':checked');
            });

            $('.rendersenses').on('click', function(){
                vehicles.showSenses = $(this).is(':checked');
            });

            $('.info', controls).on('click', function(){
                $(this).toggleClass('on');
                $('#v2-info').toggle();
            });
        });
    });

    $('[data-script="vehiclesiii"]').each(function(){
        var controls = $('#v3-ctrl');
        console.log('__vehiclesiii__');
        require(['c8/vehicles3/Vehicles3'], function(Vehicles){
            var vehicles = new Vehicles({
                canvas_id:'vehiclesiii-canvas'
            }).init();

            $('.pp', controls).on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                $(this).toggleClass('paused');
                $(this).find('span').toggle();
                if($(this).hasClass('paused')){
                    vehicles.stop();
                } else{
                    vehicles.start();
                }
            });


            $('.rendergrid', controls).on('click', function(e){
              e.stopPropagation();
              e.preventDefault();
              $(this).toggleClass('on');
              vehicles.showGrid = !vehicles.showGrid;

            });

            $('.rendersenses', controls).on('click', function(e){
              e.stopPropagation();
              e.preventDefault();
              $(this).toggleClass('on');
              vehicles.showSenses = !vehicles.showSenses;
            });
            $('.renderspores', controls).on('click', function(e){
              e.stopPropagation();
              e.preventDefault();
              $(this).toggleClass('on');
              vehicles.showSpores = !vehicles.showSpores;
            });

            $('.info', controls).on('click', function(e){
              e.stopPropagation();
              e.preventDefault();
              $(this).toggleClass('on');
              $('#v3-info').toggle();
            });
        });
    });


    $('[data-script="vehiclesiv"]').each(function(){
      var controls = $('#v4-ctrl');
      console.log('__vehiclesiii__');
      require(['c8/vehicles4/Vehicles4'], function(Vehicles){
        var vehicles = new Vehicles({
            canvas_id:'vehiclesiv-canvas'
        }).init();

        $('.pp', controls).on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('paused');
            $(this).find('span').toggle();
            if($(this).hasClass('paused')){
                vehicles.stop();
            } else{
                vehicles.start();
            }
        });

        $('#vehiclesiv-canvas').on('click', function(e){
          vehicles.addVehicle(e.pageX - vehicles.canvas_rect.left, e.pageY - vehicles.canvas_rect.top);
        });

        $('.rendergrid', controls).on('click', function(){
            $(this).toggleClass('on');
            vehicles.showGrid = !vehicles.showGrid;
        });

        $('.rendersenses', controls).on('click', function(){
            $(this).toggleClass('on');
            vehicles.showSenses = !vehicles.showSenses;
        });
        $('.renderspores', controls).on('click', function(){
            $(this).toggleClass('on');
            vehicles.showSpores = !vehicles.showSpores;
        });

        $('.info', controls).on('click', function(){
            $(this).toggleClass('on');
            $('#v3-info').toggle();
        });
      });
    });

    $('.head').on('click', function(){
        $(this).parent().toggleClass('open');
    })



});
