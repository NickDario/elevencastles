/**
 * Created by nick on 11/4/15.
 */

define(function(){

    var n = 1, // number of layers
        m = 20; // number of samples per layer
        stack = d3.layout.stack().offset('none');
        //x = d3.range(n).map(function() { return simple(m, 2); }),
        //layers0 = stack(d3.range(n).map(function() { return simple(m, 5); })),
        //layers1 = stack(d3.range(n).map(function() { return simple(m, 5); }));

    var hourseries = [];
    var dayseries = [];
    var monthseries = [];
    var useries = [];

    var day = null;
    var month = null;
    var year = null;


    var minOffset = new Date().getTimezoneOffset();
    $.ajax({
        url : '/ajax/news',
        data: {minOffset:minOffset},
        success: function(response){
            var data = JSON.parse(response);
            var sentimentlist = data.ulist;

            var margin = {top:20, bottom:40, left:50, right:240};

            var dateseries = [];
            for(var i in sentimentlist){
                var date = sentimentlist[i].x.split('-');
                dateseries[i] = {};
                dateseries[i].x = new Date(date[0],date[1]-1,date[2],date[3],date[4],date[5]);
                dateseries[i].y = sentimentlist[i].y;
            }

            var chart = document.getElementById('days-chart'),
                width = chart.offsetWidth - margin.right - margin.left,
                height = chart.offsetHeight - margin.top - margin.bottom;

            var x = d3.time.scale().range([0,width]);
            var y = d3.scale.linear().range([height,0]);
            var xAxis = d3.svg.axis().scale(x).tickSize(1).ticks(d3.time.hours, 24).tickSubdivide(true);
            var yAxis = d3.svg.axis().scale(y).tickSize(1).ticks(10).orient('right');
            var area = d3.svg.area()
                .x(function(d){ return x(d.x);})
                .y0(height)
                .y1(function(d){ return y(d.y);});
            //xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true),


            x.domain([d3.min(dateseries, function(d){ return d.x;}), d3.max(dateseries, function(d){return d.x;})]);
            y.domain([d3.min(dateseries, function(d){ return d.y;}) - 5, d3.max(dateseries, function(d){return d.y;}) + 5]);

            var svg = d3.select(chart).append("svg:svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                //.attr("width", width)
                //.attr("height", height)
                .append("g")
                .attr("transform", "translate(" + margin.left + ","+ margin.top +")");

            var line = d3.svg.line()
                .x(function(d){return x(d.x);})
                .y(function(d){return y(0);});

            svg.selectAll("path")
                .data([dateseries])
                .enter().append("path")
                //.attr("clip-path", "url(#clip)")
                //.attr('axis', 'y')
                //.attr('axis', 'y')
                .attr("d", area)
                .style("fill", "steelblue")
                .style("fill-opacity", "0.8");

            svg.append("path")
                .attr('class', 'line')
                //.attr('stroke-width', 1)
                .attr('stroke', 'lightgrey')
                .attr('d', line(dateseries));

            // Add the x-axis.
           var  xaxis = svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
                //.selectAll('text')
                //.style('text-anchor', 'right');

            xaxis.selectAll('text')
                .style('text-anchor', 'right');

            xaxis.selectAll('line')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', 0)
                .attr('y2', -height)
                .attr('stroke', 'lightgrey')
                .attr('opacity', 0.5);

            xaxis.selectAll('text')
                .style('transform', 'translate(30, 0)');


            // Add the y-axis.
            svg.append("g")
                .attr("class", "axis")
                .attr("width", "1")
                .call(yAxis)
                .selectAll('text')
                .attr('transform', 'translate(-30,0)');


        },
        error: function(response){
            console.log('Failed to get rss data')
        }
    });

    //var data = [0,0,1,2,3,5,8,13];
    //
    //
    //var x = d3.scale.linear()
    //    .domain([0, d3.max(data)])
    //    .range([0, width]);
    //
    //var barheight = height / data.length;
    //
    //var chart = d3.select(stage);
    //
    //var bar = chart.selectAll('g')
    //    .data(data)
    //    .enter().append('g')
    //    .attr('transform', function(d,i){ return 'translate(0,'+ i * barheight + ')';});
    //
    //bar.append('rect')
    //    .attr('width', x)
    //    .attr('height', barheight-1)
    //    .attr('fill', 'steelblue');
    //
    //bar.append('text')
    //    .attr('x', function(d){ return x(d) - 3;})
    //    .attr('y', barheight/2)
    //    .attr('dy', '.35em')
    //    .text(function(d){return d; })
    //    .style('text-anchor','end')
    //    .style('fill','white');
    //
    ////
    ////d3.select(stage)
    ////    .selectAll('div')
    ////    .data(data)
    ////    .enter().append("div")
    ////    .style("width", function(d){return d * 10 + "px";})
    ////    .text(function(d){return d;})
    ////    .style("background-color", "lightblue")
    ////    .style("border-color", "black");
    //
    //
    ////var chart = d3.select(stage);
    //var bar = chart.selectAll('div');
    //var barUpdate = bar.data(data);
    //var barEnter = barUpdate.enter().append("div");
    //barEnter.style("width", function(d){return x(d) + "px";});
    //barEnter.text(function(d){ return d;});
    //barEnter.style('background-color', 'lightblue');

});
