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
            audio_id :'mp2-audio'
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

  $('[data-script="life"]').each(function(){
    var controls = $('#project-controls');
    require(['projects/Life'], function(Life){
      var life = new Life({
        canvas_id : 'life-canvas'
      }).init();

      document.getElementById('life-canvas').addEventListener('mousewheel', function(e){
        if(event.wheelDelta > 0){
          //life.
        }
        return false;
      }, false);


      $('.pp', controls).on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('paused');
        $(this).find('span').toggle();
        if($(this).hasClass('paused')){
          life.pause();
        } else{
          life.play();
        }
      });
      $('.step', controls).on('click', function(e) {
        life.nextStep();
      });
      $('.reset', controls).on('click', function(e) {
        life.reset();
      });
      $('.clear', controls).on('click', function(e) {
        life.clear();
      });

      $('.pattern-select').on('click', function(e) {
        if($(this).hasClass('on')){
          $(this).removeClass('on');
          life.pattern = '';
        } else {
          $('.pattern-select').removeClass('on');
          $(this).addClass('on');
          life.pattern = $(this).data('pattern');
        }
      });

      $(document).on('scroll', function(e){
        console.log('scroll');
      });

      var custom = $('#life-controls');
      var div = document.createElement('div');
      var slider = document.createElement('div');
      var title  = document.createElement('span');
      var value  = document.createElement('span');
      title.innerText = "generation (ms)";
      value.id = "generation-value";
      value.innerText = 150;
      value.className = "life-counter";
      div.id = "life-generation";
      div.className = 'life-setting';
      div.setAttribute('data-name', 'generation');
      div.appendChild(title);
      div.appendChild(slider);
      div.appendChild(value);
      $(slider).slider({
        max: 10000,
        min: 10,
        value: 100,
        step : 10,
        change: function(e, ui){
          var p = $(this).parent();
          $('.life-counter', p).text(ui.value);
          life.generation = ui.value;
        }
      });
      custom.append(div);
    });
  });


  $('[data-script="news"]').each(function(){
      require(['../resources/d3.min'], function(){
        require(['projects/News'], function() {

        });
      });
  });

    $('[data-script="chess"]').each(function(){
        require(['projects/Chess'], function(Chess) {
            var chess = new Chess({
                'canvas_id' : 'chess-canvas'
            });
            chess.init();

            $('#color-aid').on('click', function(){
                if($(this).hasClass('on')) {
                    $(this).removeClass('on');
                    chess.coloraid = false;
                    console.log(chess.coloraid);
                    chess.render();
                } else {
                    $(this).addClass('on');
                    chess.coloraid = true;
                    console.log(chess.coloraid);
                    chess.render();
                }
            });

            $('#new-game').on('click', function(){

            });

            chess.onendturn = function(){$('#undo').removeClass('disabled');};

            $('#undo').on('click', function(){
                chess.undo();
                if(chess.movecount == 0){
                    $(this).addClass('disabled');
                } else {
                    $(this).removeClass('disabled');
                }
                if(chess.movecount < chess.history.length){
                    $('#redo').removeClass('disabled');
                }
            });

            $('#redo').on('click', function(){
                chess.redo();
                if(chess.movecount == chess.history.length){
                    $(this).addClass('disabled');
                } else {
                    $(this).removeClass('disabled');
                }

                if(chess.movecount > 0){
                    $('#undo').removeClass('disabled');
                }
            });

        });
    });

  $('.head').on('click', function(){
      $(this).parent().toggleClass('open');
  });

  $('#nav-toggle').on('click', function(){
    $(this).toggleClass('on');
    if($(this).hasClass('on')) {
      //$('#nav-menu').show();
        $('#nav-menu').show();
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
      if($('#project-'+i).length == 0){
          return;
      }
      $('#project-'+i).addClass('show');
      window.setTimeout(showMenuItem.bind(this, ++i), 50);
    }

    function hideMenuItem(i) {
      if($('#project-'+i).length == 0){
          $('#nav-menu').hide();
          return;
      }
      $('#project-'+i).removeClass('show');
      window.setTimeout(hideMenuItem.bind(this, --i), 50);
    }
});
