/**
 * Created by nick on 11/4/15.
 */

define(function(){

    //var n = 1, // number of layers
    //    m = 20, // number of samples per layer
    //    stack = d3.layout.stack().offset('none'),
    //    x = d3.range(n).map(function() { return simple(m, 2); }),
    //    layers0 = stack(d3.range(n).map(function() { return simple(m, 5); })),
    //    layers1 = stack(d3.range(n).map(function() { return simple(m, 5); }));
    //
    var stage = document.getElementById('days-chart'),
        width = stage.offsetWidth,
        height = stage.offsetHeight;
    //
    //var x = d3.scale.linear()
    //    .domain([0, m - 1])
    //    .range([0, width]);
    //
    //var y = d3.scale.linear()
    //    .domain([0, d3.max(layers0.concat(layers1), function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
    //    .range([height, 0]);
    //
    //var y2 = d3.scale.linear()
    //    .domain([0, d3.max(layers0.concat(layers1), function(layer) {  return d3.max(layer, function(d) { return d.y0 + d.y; }); })])
    //    .range([height, 0]);
    //
    //var color = d3.scale.linear()
    //    .range(["#aad", "#556"]);
    //
    //var area = d3.svg.area()
    //    .x(function(d) { return x(d.x); })
    //    .y0(function(d) { return y(d.y); })
    //    .y1(function(d) { return y(d.y0 + 10); });
    //
    //var svg = d3.select(stage).append("svg")
    //    .attr("width", width)
    //    .attr("height", height);
    //
    //svg.selectAll("path")
    //    .data(layers0)
    //    .enter().append("path")
    //    .attr("d", area)
    //    .style("fill", function() { return color(Math.random()); });
    //
    //
    //function transition() {
    //    d3.selectAll("path")
    //        .data(function() {
    //            var d = layers1;
    //            layers1 = layers0;
    //            return layers0 = d;
    //        })
    //        .transition()
    //        .duration(2500)
    //        .attr("d", area);
    //}
    //
    //function simple(n, x){
    //    var a = []
    //    for (i=0; i<n; ++i) a[i] = x++;
    //    return a.map(function(d,i) { return {x:i,y:d}; });
    //}

    $.ajax({
        'url' : '/ajax/'
    })

    var data = [0,0,1,2,3,5,8,13];


    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, width]);

    var barheight = height / data.length;

    var chart = d3.select(stage);

    var bar = chart.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', function(d,i){ return 'translate(0,'+ i * barheight + ')';});

    bar.append('rect')
        .attr('width', x)
        .attr('height', barheight-1)
        .attr('fill', 'steelblue');

    bar.append('text')
        .attr('x', function(d){ return x(d) - 3;})
        .attr('y', barheight/2)
        .attr('dy', '.35em')
        .text(function(d){return d; })
        .style('text-anchor','end')
        .style('fill','white');

    //
    //d3.select(stage)
    //    .selectAll('div')
    //    .data(data)
    //    .enter().append("div")
    //    .style("width", function(d){return d * 10 + "px";})
    //    .text(function(d){return d;})
    //    .style("background-color", "lightblue")
    //    .style("border-color", "black");


    //var chart = d3.select(stage);
    //var bar = chart.selectAll('div');
    //var barUpdate = bar.data(data);
    //var barEnter = barUpdate.enter().append("div");
    //barEnter.style("width", function(d){return x(d) + "px";});
    //barEnter.text(function(d){ return d;});
    //barEnter.style('background-color', 'lightblue');

});
