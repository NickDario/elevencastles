<?php
/**
 * Author:  ndario
 * Date:    5/24/15   
 */
?>

@extends('...layouts.default')
@section('content')
<div id="vehiclesii" class="vehicles-page" data-script="vehiclesii">

    <div class="display">
        <div id="v2-ctrl" class="control-bar">
            <a class="btn-ctrl" href="{{URL::to('C8/ai')}}">
                &larr; Back
            </a>
            <a class="pp btn-ctrl" href="{{URL::to('C8/ai')}}">
                <span class="pause"><i class="fa fa-pause"></i>&nbsp;Pause</span>
                <span class="play" style="display:none"><i class="fa fa-play"></i>&nbsp;Play</span>
            </a>
            <span class="info btn-ctrl noselect">
                Info
            </span>
        </div>
        <div id="v2-info" class="info-pane col-xs-12" style="display:none">
            <div class="panel panel-darkgrey col-xs-offset-3 col-xs-6">
                <h3>Simulation of Sensory Perception and Behavioral Response II</h3>
                <ul class="nav nav-list">
                    <li class="tree">
                        <span class="triangle">&#9656;</span>
                        <span class="head">&nbsp;Abstract</span>
                        <ul class="nav nav-list">
                            <li>
                            <p>
                                This simulation is the seconds stage of the 'Vehicles' simulation. In the first stage,
                                an environment for basic sensory perception was established, and vehicles were given
                                a limited number of unique traits, and simple sensory perception and response. This stage
                                focuses on improvements in the collision detection algorithms used for vehicle perception.
                                Four optimizations were considered of the four, three were found to offer improvements.
                                The most noticable improvements involve
                            </p>
                            </li>
                        </ul>
                    </li>
                    <li class="tree">
                        <span class="triangle">&#9656;</span>
                        <span class="head">&nbsp;Goals</span>
                        <ul class="nav nav-list">
                            <li>Optimize environment created in Vehicles 1.</li>
                            <li>Begin to add traits to differentiate vehicles.</li>
                        </ul>
                    </li>
                    <li class="tree">
                        <span class="triangle">&#9656;</span>
                        <span class="head">&nbsp;Tools</span>
                        <ul class="nav nav-list">
                            <li>JavaScript handles the computation and rendering.</li>
                            <li>The HTML5 Canvas element is the stage upon which JavaScript acts.</li>
                        </ul>
                    </li>
                    <li class="tree">
                        <span class="triangle">&#9656;</span>
                        <span class="head">&nbsp;Optimizations</span>
                        <ul class="nav nav-list">
                            <li>Several areas were optimized in the code. Major optimizations came from collision detection techniques.</li>
                            <li>Other optimizations attempts proved less effective. Trying to optimize vector handling for instance.</li>
                            <li class="tree">
                                <span class="triangle">&#9656;</span>
                                <span class="head">&nbsp;Collision Detection Improvements</span>
                                <ul class="nav nav-list">
                                    <li>
                                        <p>
                                            <b>Before</b>, collision detection was implemented by <b>checking each vehicle flange to
                                            each vehicle body segment.</b>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            This is obviously not optimal. If we have <b><i>n</i></b> vehicles, each with
                                            <b><i>m</i></b> senses and <b><i>l</i></b> body segments, then the number of checks
                                            performed is on the order of <b><i>O(n<sup>3</sup>)</i></b>.
                                        </p>
                                    </li>
                                    <li class="row">
                                        <p class="col-xs-12">
                                            <span class="col-xs-4 text-right">Total Checks Per Vehicle</span> <span class="col-xs-8">(n * l) * (n * m) = l*m*n<sup>2</sup></span>
                                            <span class="col-xs-4 text-right">Total Checks Per Render</span> <span class="col-xs-8">n * (l*m*n<sup>2</sup>) = l*m*n<sup>3</sup></span>
                                        </p>
                                    </li>
                                    <li>
                                        <p>
                                            To improve upon this, 3 optimizations were applied.
                                        </p>
                                    </li>
                                    <li class="tree">
                                        <span class="triangle">&#9656;</span>
                                        <span class="head">&nbsp; Circular Bodies</span>
                                        <ul class="nav nav-list">
                                            <li>
                                                <p>
                                                    One of the simplest optimizations made was to use circular vehicle bodies
                                                    rather than diamond shaped ones. This required using a method to check for
                                                    line segment intersects with circles. A line segment can be found to intersect
                                                    a circle by comparing 1) the vector between the segments origin & the circles
                                                    center, 2) the direction and length of the segment, and 3) the radius of the
                                                    circle.
                                                </p>
                                                <p>

                                                </p>
                                            </li>
                                            <li class="row">

                                            </li>
                                        </ul>
                                    </li>
                                    <li class="tree">
                                        <span class="triangle">&#9656;</span>
                                        <span class="head">&nbsp; Region Check</span>
                                        <ul class="nav nav-list">
                                        </ul>
                                    </li>
                                    <li class="tree">
                                        <span class="triangle">&#9656;</span>
                                        <span class="head">&nbsp; Proximity Check</span>
                                        <ul class="nav nav-list">
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="tree">
                        <span class="triangle">&#9656;</span>
                        <span class="head">&nbsp;Results</span>
                        <ul class="nav nav-list">
                            <li>
                                <p class="col-xs-12">
                                    To measure the time for each render, 3 sets of 10,000 measurements were taken.
                                </p>
                            </li>
                            <li>
                                <p class="col-xs-12">
                                    <b>l</b> = number of body segments per vehicle (constant within a simulation)
                                    <b>m</b> = number of senses per vehicle (variable between 2 and 70)
                                    <b>n</b> = number of vehicles (constant)
                                </p>
                            </li>
                            <li class="tree">
                                <span class="triangle">&#9656;</span>
                                <span class="head">&nbsp; No Optimizations</span>
                                <ul class="nav nav-list">
                                <li>
                                    <p class="col-xs-12">
                                        Without any of the 3 optimizations applied the rendering calculations have a cubic time complexity.
                                    </p>
                                </li>
                                <li class="row">
                                    <p class="col-xs-12">
                                        <span class="col-xs-4 text-right">Total Checks Per Vehicle</span> <span class="col-xs-8">(n * l) * (n * m) = l*m*n<sup>2</sup></span>
                                        <span class="col-xs-4 text-right">Total Checks Per Render</span> <span class="col-xs-8">n * (l*m*n<sup>2</sup>) = l*m*n<sup>3</sup></span>
                                        <span class="col-xs-4 text-right">Time Complexity</span> <span class="col-xs-8"><b><i>O(n<sup>3</sup>)</i></b></span>
                                    </p>
                                </li>
                                <li class="row">
                                    <p class="col-xs-12">
                                        <span class="col-xs-4 text-right">Average renders per second</span><span class="col-xs-8">6.9118</span>
                                        <span class="col-xs-4 text-right">Mean seconds per render</span> <span class="col-xs-8">.14468</span>
                                        <span class="col-xs-4 text-right">Median seconds per render</span> <span class="col-xs-8">.14445</span>
                                        <span class="col-xs-4 text-right">Standard Deviation of seconds per render</span> <span class="col-xs-8">.89068</span>
                                    </p>
                                </li>
                                </ul>
                            </li>
                            <li class="tree">
                                <span class="triangle">&#9656;</span>
                                <span class="head">&nbsp; Circular Bodies</span>
                                <ul class="nav nav-list">
                                <li><p>
                                    This optimization reduced the number of checks needed when testing a vehicles
                                    individual flanges to other vehicles. There is no impact on the overall time
                                    complexity of the calculations done each render. The total number of checks each sense
                                    must perform is cut to approximately 1/4th however.
                                </p></li>
                                <li>
                                    <p class="col-xs-12">
                                        <span class="col-xs-4 text-right">Total Checks Per Vehicle</span> <span class="col-xs-8">(n) * (n * m) = m*n<sup>2</sup></span>
                                        <span class="col-xs-4 text-right">Total Checks Per Render</span> <span class="col-xs-8">n * (m*n<sup>2</sup>) = m*n<sup>3</sup></span>
                                        <span class="col-xs-4 text-right">Time Complexity</span> <span class="col-xs-8"><b><i>O(n<sup>3</sup>)</i></b></span>
                                    </p>
                                </li>
                                <li class="row">
                                    <p class="col-xs-12">
                                        <span class="col-xs-4 text-right">Average renders per second</span><span class="col-xs-8">72.453267</span>
                                        <span class="col-xs-4 text-right">Mean seconds per render</span> <span class="col-xs-8">.013802</span>
                                        <span class="col-xs-4 text-right">Median seconds per render</span> <span class="col-xs-8">.013758</span>
                                        <span class="col-xs-4 text-right">Standard Deviation of seconds per render</span> <span class="col-xs-8">.48540</span>
                                    </p>
                                </li>
                                </ul>
                            </li>
                            <li class="tree">
                                <span class="triangle">&#9656;</span>
                                <span class="head">&nbsp; Region Check</span>
                                <ul class="nav nav-list">
                                    <li><p>
                                        This optimization divided the JavaScript canvas into sections. Each section is
                                        200 pixels by 200 pixels. The sections begin at (0,0) and repeat until they have
                                        covered the canvas.
                                        </p><p>
                                        All vehicles are in some region at all times. When performing checks for vehicle
                                        senses, each vehicle is checked against the vehicles in its own and neighboring
                                        regions.
                                       </p><p>
                                        We assume a worst case where every vehicle is in the same region. We assume a
                                        theoretical best case where each region contains its only a single vehicle. Note
                                        that this is only theoretical. The average number of vehicles in a region depends
                                        on the number of vehicle generated, and the size of the javascript canvas, as well
                                        as the size of the regions it is divided into.
                                    </p></li>
                                    <li>
                                        <p class="col-xs-12">
                                            <span class="col-xs-5 text-right">Total Checks Per Vehicle - worst case</span> <span class="col-xs-7">(n) * (n * m) = m*n<sup>2</sup></span>
                                            <span class="col-xs-5 text-right">Total Checks Per Vehicle - best case</span> <span class="col-xs-7">(n) * (n * m) = m*n<sup>2</sup></span>

                                            <span class="col-xs-5 text-right">Total Checks Per Render - worst case</span> <span class="col-xs-7">n * (m*n<sup>2</sup>) = m*n<sup>3</sup></span>
                                            <span class="col-xs-5 text-right">Total Checks Per Render - best case</span> <span class="col-xs-7">n * (m*n<sup>2</sup>) = m*n<sup>3</sup></span>

                                            <span class="col-xs-5 text-right">Time Complexity - worst case</span> <span class="col-xs-7"><b><i>O(n<sup>3</sup>)</i></b></span>
                                            <span class="col-xs-5 text-right">Time Complexity - best case</span> <span class="col-xs-7"><b><i>O(n<sup>3</sup>)</i></b></span>
                                        </p>
                                    </li>
                                    <li class="row">
                                        <p class="col-xs-12">
                                            <span class="col-xs-5 text-right">Average renders per second</span><span class="col-xs-8">72.453267</span>
                                            <span class="col-xs-5 text-right">Mean seconds per render</span> <span class="col-xs-8">.013802</span>
                                            <span class="col-xs-5 text-right">Median seconds per render</span> <span class="col-xs-8">.013758</span>
                                            <span class="col-xs-5 text-right">Standard Deviation of seconds per render</span> <span class="col-xs-8">.48540</span>
                                        </p>
                                    </li>
                                </ul>
                            </li>
                            <li class="tree">
                                <span class="triangle">&#9656;</span>
                                <span class="head">&nbsp; Proximity Check</span>
                                <ul class="nav nav-list">
                                </ul>
                            </li>
                            <li class="tree">
                                <span class="triangle">&#9656;</span>
                                <span class="head">&nbsp; All Optimizations</span>
                                <ul class="nav nav-list">
                                </ul>
                            </li>
                            <li class="tree">
                                <span class="triangle">&#9656;</span>
                                <span class="head">&nbsp; Test Conditions</span>
                                <ul class="nav nav-list">
                                    <li><p>
                                         These tests were not performed under rigorous conditions. Each test was run in
                                         a single tab within google chrome. No other applications were running on the computer.
                                         The results here simply provide <b>general time scales</b> to accompany calculated
                                         complexity of each render.
                                    </p></li>
                                    <li>
                                        <span class="col-xs-3 text-right">Browser</span><span class="col-xs-7">Google Chrome</span>
                                        <span class="col-xs-3 text-right">Browser Version</span><span class="col-xs-7">41.0.2272.118 (Official Build)</span>
                                        <span class="col-xs-3 text-right">JavaScript Version</span><span class="col-xs-7">V8 4.1.0.27</span>
                                        <span class="col-xs-3 text-right">Operating System</span><span class="col-xs-7">Ubuntu 14.04</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="tree">
                        <span class="triangle">&#9656;</span>
                        <span class="head">&nbsp;Controls</span>
                        <ul class="nav nav-list">
                            <li class="row">
                                <label class="col-xs-4" for="rendergrid">Show Canvas Grid</label><input type="checkbox" name="rendergrid" id="rendergrid" class="rendergrid"/>
                                <p class="col-xs-12">
                                    Draw region lines on canvas. Regions are used for broad phase hit detection.
                                </p>
                            </li>
                            <li class="row">
                                <label class="col-xs-4" for="rendersenses">Show Vehicle Senses(Flanges)</label><input type="checkbox" name="rendersenses" id="rendersenses" class="rendersenses"/>
                                <p class="col-xs-12">
                                    Draw vehicle senses. Red is a repulsive sense. Green is an attractive sense.
                                </p>
                            </li>
                        </ul>
                    </li>
                </ul>

            </div>
        </div>
        <canvas id="vehiclesii-canvas">
        </canvas>
    </div>

</div>
@stop
