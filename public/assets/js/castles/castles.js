define(['../jquery.min', '../jquery-ui.min'], function(jquery, jqueryui){

    $('[data-script="castle-main"]').each(function(){
        require(['c0/castle'], function(){
            console.log('__castles__');
        })
    });

    $('[data-script="musicpath"]').each(function(){
        require(['c6/Musicpath'], function(Musicpath){
            var mp = new Musicpath({
              canvas_id:'mp-canvas',
              audio_id :'mp-audio',
              pathcanvas_id: 'path-canvas'
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

    $('[data-script="musicpath2"]').each(function(){
        require(['c6/Musicpath2'], function(MP2){
            var mp = new MP2({
              canvas_id:'mp2-canvas',
              audio_id :'mp2-audio',
              /*
              vsSrc : "                     \
                attribute vec4 aPosition;   \
                attribute float aPointSize; \
                attribute vec4 aColor;      \
                \
                \
                attribute float xPos;\
                attribute float yPos;\
                attribute float zPos;\
                attribute float fStep;\
                attribute float fOffset;\
                \
                uniform float pi2;\
                uniform mat4 uModelMatrix;  \
                uniform mat4 uViewMatrix;   \
                uniform mat4 uProjMatrix;   \
                \
                varying vec4 vColor;        \
                \
                void main() {               \
                   float m = mod((fStep + fOffset), 20.0);\
                   vec4 p = aPosition + vec4(0.0, 0.0, m, 0.0);\
                   vec4 c = vec4(xPos / pi2 - 12.5, sin(xPos), zPos + m, 1.0);\
                   gl_Position = uProjMatrix * uViewMatrix * uModelMatrix * c; \
                   \
                   gl_PointSize = 3.0;\
                   vColor = vec4(0.5, 0.1, 0.1, 0.9);         \
                }                           \
              ",*/
              vertShaderSrc : ["\
              attribute vec4 aPosition;\
              attribute float step;\
              \
              uniform mat4 uModelMatrix;  \
              uniform mat4 uViewMatrix;   \
              uniform mat4 uProjMatrix;   \
              varying vec4 vColor;\
                \
              void main() {\
                vec4 p = aPosition + vec4(0.0, 0.0, mod((step + aPosition.z), 1.0), 1.0);\
                gl_Position = uProjMatrix * uViewMatrix * uModelMatrix * p; \
                gl_PointSize = 10.0;\
                vColor = vec4(0.2, 0.4, 0.8, 0.9);\
              }\
              ", "\
              attribute vec4 bPosition;\
              \
              uniform mat4 uModelMatrix;  \
              uniform mat4 uViewMatrix;   \
              uniform mat4 uProjMatrix;   \
              varying vec4 vColor;\
              \
              void main() {\
                vec4 b = bPosition + vec4(mod((step + aPosition.x), 1.0), 0.0, 0.0, 1.0);\
                gl_Position = uProjMatrix * uViewMatrix * uModelMatrix * b; \
                gl_PointSize = 10.0;\
                vColor = vec4(0.8, 0.4, 0.2, 0.9);\
              }\
              \
              "],
              fragShaderSrc : ["                     \
                precision mediump float;    \
                varying vec4 vColor;        \
                \
                void main () {              \
                  gl_FragColor = vColor;    \
                }                           \
              "]
            });
            mp.init();
        });
    });

    $('[data-script="pursue-and-flee"]').each(function(){
      var controls = $('#project-controls');
      require(['c8/pnf/PNF'], function(PNF){
        console.log('__pursue-and-flee__');
        var pnf = new PNF({
            canvas_id:'pnf-canvas'
        });

        $('.pp', controls).on('click', function(e){
          e.preventDefault();
          e.stopPropagation();
          $(this).toggleClass('paused');
          $(this).find('span').toggle();
          if($(this).hasClass('paused')){
            pnf.stop();
          } else{
            pnf.start();
          }
        });

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
              if($(this).hasClass('paused')) {
                vehicles.stop();
              } else {
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
      var controls = $('#project-controls');
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

        var genome = vehicles.uv.genes;
        var custom = $('#customv-controls');
        for(var g in genome) {
          var div = document.createElement('div');
          if(genome[g].type != 'genome') {
            var slider = document.createElement('div');
            var title  = document.createElement('span');
            var value  = document.createElement('span');
            title.innerText = genome[g].name;
            value.id = genome[g].name + "-value";
            value.innerText = genome[g].val;
            value.className = "customv-counter";
            div.id = "customv-" + genome[g].name;
            div.className = 'customv-setting';
            div.setAttribute('data-name', genome[g].name);
            div.appendChild(title);
            div.appendChild(slider);
            div.appendChild(value);
            $(slider).slider({
              max: genome[g].maxv != null ? genome[g].maxv : genome[g].ms * 25 + genome[g].val,
              min: genome[g].minv != null ? genome[g].minv : genome[g].ms * -25 + genome[g].val,
              value: genome[g].val,
              step : genome[g].ms,
              change: function(e, ui){
                var p = $(this).parent();
                $('.customv-counter', p).text(ui.value);
                vehicles.uv.setGene(p.data('name'), ui.value);
              }
            });
            div.addEventListener('change', function(){
              console.log('ding');
            });
            custom.append(div);

          } else {

          }
        }

      });
    });

    $('.head').on('click', function(){
        $(this).parent().toggleClass('open');
    });

    $('#nav-toggle').on('click', function(){
      $(this).toggleClass('on');
      if($(this).hasClass('on')){
        $('nav-menu').show();
        showMenuItem(0);
      } else {
        hideMenuItem($('.btn-menu[id^="project"]').length-1);
      }
    });

    $('.close-overlay').on('click', function(){
      $('.btn-overlay').removeClass('on');
      $('.project-overlay').hide();
    });

  $('.btn-overlay').on('click', function(){
    var on = $(this).hasClass('on');
    $('.project-overlay').hide();
    $('.btn-overlay').removeClass('on');
    if(on){
      $(this).remove('on');
    } else {
      $(this).addClass('on');
      $('#' + $(this).data('overlay') + '-overlay').show();
    }
  });

    function showMenuItem(i) {
      if($('#project-'+i).length == 0) return;
      $('#project-'+i).addClass('show');
      window.setTimeout(showMenuItem.bind(this, ++i), 50);
    }

    function hideMenuItem(i) {
      if($('#project-'+i).length == 0) return;
      $('#project-'+i).removeClass('show');
      window.setTimeout(hideMenuItem.bind(this, --i), 50);
    }
});
