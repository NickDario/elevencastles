<?php
/**
 * Author:  ndario
 * Date:    5/17/15   
 */
?>

@extends('...layouts.default')
@section('content')
    <div id="vehicles" class="vehicles-page" data-script="ai-vehicles">
        <div>

        </div>
        <div class="display">
            <div id="v1-ctrl" class="control-bar">
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
            <div id="v1-info" class="info-pane col-xs-12" style="display:none">
                <div class="panel panel-darkgrey col-xs-offset-3 col-xs-6">
                    <h3>Simulation of Sensory Perception and Behavioral Response</h3>
                    <ul class="nav nav-list">
                        <li class="tree">
                            <span class="triangle">&#9656;</span>
                            <span class="head">&nbsp;Abstract</span>
                            <ul class="nav nav-list">
                                <li>This simulation creates a simple environment inhabited by simple vehicles.</li>
                                <li>These vehicles have <b>sensory inputs</b> and <b>behavioral responses</b>.</li>
                                <li>This is the first in a series of expanding simulations to model genetic memory and knowledge accumulation.</li>
                            </ul>
                        </li>
                        <li class="tree">
                            <span class="triangle">&#9656;</span>
                            <span class="head">&nbsp;Tools</span>
                            <ul class="nav nav-list">
                                <li>JavaScript handles the computation and rendering.</li>
                                <li>The HTML5 Canvas element is the stage upon which JavaScript acts.</li>
                                <li></li>
                            </ul>
                        </li>
                        <li class="tree">
                            <span class="triangle">&#9656;</span>
                            <span class="head">&nbsp;Vectors</span>
                            <ul class="nav nav-list">
                                <li>A simple vector class was used to handle vector operations.</li>
                                <li>A vector has a private <b>x</b> and <b>y</b> value, and several methods.</li>
                                <li>Each vector instantiates the class.</li>
                            </ul>
                        </li>
                        <li class="tree">
                            <span class="triangle">&#9656;</span>
                            <span class="head">&nbsp;Segments</span>
                            <ul class="nav nav-list">
                                <li>Segments use two vectors as the <b>origin</b> and <b>direction</b> (parametric vector form).</li>
                                <li>The <b>magnitude</b> of the direction vector is the segments length.</li>
                                <li>Each Segment instantiates the Segment class.</li>
                            </ul>
                        </li>
                        <li class="tree">
                            <span class="triangle">&#9656;</span>
                            <span class="head">&nbsp;Vehicles</span>
                            <ul class="nav nav-list">
                                <li>Vehicles are composed of 5 segments: 4 body segments (as a diamond) and a tail segment.</li>
                                <li>Vehicles each have 2 <b>Senses</b> both of which are <b>Flanges</b>.</li>
                                <li>One Flange points forward, another backward.</li>
                                <li>Senses trigger <b>Behaviors</b>.</li>
                                <li class="tree">
                                    <span class="triangle">&#9656;</span>
                                    <span class="head">&nbsp;Senses</span>
                                    <ul class="nav nav-list">
                                        <li>Senses is an abstract base class.</li>
                                        <li>Specific attributes and functions are defined in uninitialized states.</li>
                                        <li>Classes that use the Senses prototype implement the 'sense' function.</li>
                                        <li>function sense(){} sets the Senses sensation attribute as a vector.</li>
                                        <li class="tree">
                                            <span class="triangle">&#9656;</span>
                                            <span class="head">&nbsp;Flanges</span>
                                            <ul class="nav nav-list">
                                                <li>The Flanges class extends the Senses class.</li>
                                                <li>Each flange sense has uses 5 segments as inputs.</li>
                                                <li>When a segment intersects a vehicles body segment, that segments <b>direction vector</b> is added to the <b>sensation vector</b>.</li>
                                                <li>Each segment that is intersecting is added to the previous one to form the complete sensation.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li class="tree">
                                    <span class="triangle">&#9656;</span>
                                    <span class="head">&nbsp;Behaviors</span>
                                    <ul class="nav nav-list">
                                        <li>After analyzing their sensory inputs, vehicles normalize each sense's <b>sensation vector</b>.</li>
                                        <li>The normalized <b>sensation vectors</b> are added to that vehicle's <b>direction vector</b>.</li>
                                        <li>When a vehicle 'senses' another vehicle it moves in that direction rapidly.</li>
                                        <li>The behavior of each vehicle is the same.</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="tree">
                            <span class="triangle">&#9656;</span>
                            <span class="head">&nbsp;Collision Detection</span>
                            <ul class="nav nav-list">
                                <li>Each flange is checked against each vehicle body segment.</li>
                                <li>Current limit for vehicles simulation is roughly 100 vehicles.</li>
                                <li class="tree">
                                    <span class="triangle">&#9656;</span>
                                    <span class="head">&nbsp;Method</span>
                                    <ul class="nav nav-list">
                                        <li>
                                            Line segments can be represented as a <b>parametric equation</b>.
                                        </li>
                                        <li>
                                            The method uses a <b>proof by contradiction</b> to determine if two segments cross.
                                        </li>
                                        <li>
                                        <p>
                                            By setting the two segment's parametric equations true, we can find where their
                                            direction vectors cross. If they never cross the lines are parallel. If they
                                            do cross, we check to see if they cross within the segments length.
                                            </p>
                                        </li>
                                        <li>
                                            This proof is simplified by assuming any collinear lines are not intersecting.
                                        </li>
                                        <li>
                                        <p>
                                            Collision detection is implemented using a simplified version of a 2-dimensional
                                            specialization of the 3D line intersection algorithm from the article "Intersection of
                                            two lines in three-space" by Ronald Goldman, published in Graphics Gems, page 304.
                                        </p>
                                        </li>
                                        <li class="tree">
                                             <span class="triangle">&#9656;</span>
                                             <span class="head">&nbsp;Parametric Form</span>
                                             <ul class="nav nav-list">
                                                <li>
                                                    We can express vectors as a single coordinate.
                                                    This coordinate (x, y) represents a vector from the origin (0, 0)
                                                    to the point (x, y).
                                                </li>
                                                <li>
                                                    Using two vectors, we can first indicate a point in space that is not
                                                    the origin, and then with the second vector provide a direction.
                                                </li>
                                                <li>
                                                    This second vector can be treated as though its origin is at (0, 0),
                                                    and we can simply add it to the first <b>position</b> vector.
                                                </li>
                                             </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li class="tree">
                                    <span class="triangle">&#9656;</span>
                                    <span class="head">&nbsp;Performance</span>
                                    <ul class="nav nav-list">
                                        <li>Each Vehicle has <b>2 senses</b> with <b>5 flanges</b> acting as a single sense.</li>
                                        <li>Each Vehicle has <b>5 body</b> segments</li>
                                        <li class="row">
                                            <span class="col-xs-4">Vehicles total</span><span class="col-xs-3">100</span>
                                        </li>
                                        <li class="row">
                                            <span class="col-xs-4">Flanges total</span><span class="col-xs-3">100 x 2 x 5 = 1,000</span>
                                        </li>
                                        <li class="row">
                                            <span class="col-xs-4">Body Segments total</span><span class="col-xs-2">5 x 100 = 500</span>
                                        </li>
                                        <li class="row">
                                            <span class="col-xs-4">Collision Checks pre Render</span><span class="col-xs-2">500,000</span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li class="tree">
                            <span class="triangle">&#9656;</span>
                            <span class="head">&nbsp;Challenges</span>
                            <ul class="nav nav-list">
                                <li>
                                <p>
                                    Creating sensory stimulation for each vehicle was the main challenge. Objects on
                                    the HTML5 canvas have no knowledge of the what elements are drawn on the canvas.
                                    In this sense, the vehicles don't exist together in the same world. Even after adding
                                    senses for the vehicles, they had <b>nothing to sense</b>. To make vehicles aware of each
                                    other and capable of sensing each other, an entire <b>framework</b> for sensation had to be
                                    developed. Light and pressure waves are the medium through which we see and hear,
                                    but they are non existent on the canvas. In order to properly simulate a sensation,
                                    some medium had to exist for this sense to use. The very simple framework that exists
                                    is <b>most akin to touch</b>. The intersection of two flanges triggering a response in the
                                    vehicle.
                                </p>
                                </li>
                            </ul>
                        </li>
                        <li class="tree">
                            <span class="triangle">&#9656;</span>
                            <span class="head">&nbsp;Observations</span>
                            <ul class="nav nav-list">
                                <li>
                                    <p>
                                        The average speed of vehicles increases over time, even though they have rear
                                        facing flanges as well. This is could be due to the fact that each vehicle speeds up
                                        past any vehicle they are colliding with, and their rear flanges don't have time to
                                        pick up as many responses.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        The simulation will reach a state over time where most of the vehicles are moving rapidly.
                                        There are often a few that remain moving at a slow pace. It seems that there is
                                        a point at which the average vehicle speed is so much greater than an individual slow
                                        vehicles speed, that the individual vehicle's speed can never reach the average
                                        vehicle speed.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        Often a pair of vehicles will fall into a figure eight sequence for a short bit.
                                        This could be due to the arrangement of their flanges such that they rush forward
                                        in front of their 'partner' causing their partner to do the same.
                                    </p>
                                </li>
                            </ul>
                        </li>
                        <li class="tree">
                            <span class="triangle">&#9656;</span>
                            <span class="head">&nbsp;Lesson</span>
                            <ul class="nav nav-list">
                                <li>
                                    <p>
                                    Several potential optimizations exist. The vector functions can be decoupled from
                                    the class attributes. Rather than instantiating hundreds of vector classes, processing
                                    power can be saved by using one instance to deal with a simple object's x and y attributes.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                    Collision detection is very expensive, requiring roughly 500,000 checks for just 100
                                    vehicles. In order to make vehicles more complex, collision detection will need to
                                    be improved. This can take the form of broad phase collision detection, where vehicles
                                    are grouped by their probability of colliding and checks are performed on various groups.
                                    </p>
                                </li>
                            </ul>
                        </li>
                        <li class="tree">
                            <span class="triangle">&#9656;</span>
                            <span class="head">&nbsp;Stats</span>
                            <ul class="nav nav-list">
                                <li>
                                    <p>
                                        Statistics about vehicles. Speed is measured in pixels moved per render.
                                    </p>
                                </li>
                                <li class="row">
                                        <span class="col-xs-3 text-right">Average Vehicle Speed: </span> <span id="v1-avg-speed" class="col-xs-9"></span>
                                        <span class="col-xs-3 text-right">Mode of Vehicle Speed: </span> <span id="v1-mode-speed" class="col-xs-9"></span>
                                        <span class="col-xs-3 text-right">Min Vehicle Speed: </span> <span id="v1-min-speed" class="col-xs-9"></span>
                                        <span class="col-xs-3 text-right">Max Vehicle Speed: </span> <span id="v1-max-speed" class="col-xs-9"></span>
                                </li>
                            </ul>
                        </li>
                        <li class="tree">
                            <span class="triangle">&#9656;</span>
                            <span class="head">&nbsp;References</span>
                            <ul class="nav nav-list">
                                <li>
                                    <p>
                                        "How do you detect where two line segments intersect". Answer to Stack Overflow Question. Gareth Rees, Feb 19'09. <<a href="http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect">http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect</a>>
                                    </p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <span class="date">5/24/15</span>
                </div>
            </div>
            <canvas id="vehicles-canvas">
            </canvas>
        </div>
    </div>

@stop