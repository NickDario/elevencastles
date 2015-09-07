<?php
/**
 * Author:  ndario
 * Date:    8/30/15
 */
?>

@extends('...layouts.project')
@section('content')
    <div id="life" class="project" data-script="life">
        <div id="project-controls">
            <div class="control-bar">
                <a class="pp btn-ctrl" href="#">
                    <span class="pause"><i class="fa fa-pause"></i>&nbsp;Pause</span>
                    <span class="play" style="display:none"><i class="fa fa-play"></i>&nbsp;Play</span>
                </a>
                <a class="step btn-ctrl" href="#">
                    <span>Step</span>
                </a>
                <a class="reset btn-ctrl" href="#">
                    <span>Reset</span>
                </a>
                <a class="clear btn-ctrl" href="#">
                    <span>Clear</span>
                </a>
                <span class="rules btn-overlay btn-ctrl noselect" data-overlay="rules">
                    Rules
                </span>
                <span class="pattern btn-overlay btn-ctrl noselect" data-overlay="pattern">
                    Patterns
                </span>
            </div>
        </div>
        <div class="display">
            <canvas id="life-canvas">

            </canvas>
        </div>
        <div id="pattern-overlay" class="project-overlay" style="display: none">
            <span class="close-overlay glyphicon glyphicon-remove"></span>
            <br />
            <h1>General</h1>
            <div id="life-controls">
            </div>
            <h1>Select a pattern</h1>
            <span>Click to add it to the universe.</span><br>
            <span>Click and hold to change rotation.</span><br>
            <span>'Ctrl' + Click and hold to flip.</span>
            <div id="patterns">
                <span class="pattern-select btn-ctrl" data-pattern="glider">
                    Glider
                </span>
                <br>
                <span class="pattern-select btn-ctrl" data-pattern="s-spaceship">
                    Lighweight SpaceShip
                </span>
                <span class="pattern-select btn-ctrl" data-pattern="m-spaceship">
                    Middleweight SpaceShip
                </span>
                <span class="pattern-select btn-ctrl" data-pattern="l-spaceship">
                    HeavyWeight SpaceShip
                </span>
                <br>

            </div>
        </div>
        <div id="rules-overlay" class="project-overlay" style="display: none">
            <span class="close-overlay glyphicon glyphicon-remove"></span>
            <br />
            <h1>Rules</h1>
            <p>
                Conway's 'Life' is a game with simple rules that define a basic universe.
            </p>
            <p>
                The game takes place on a grid. Each cell can be in one of two possible states, on or off.
                A cell that is 'on' will die after one 'generation' unless favorable conditions are met.
            </p>
            <p>
            <ul>
                <li>
                    If a cell has exactly <b>three</b> neighbors, it will be on the next generation.
                    A neighbor is any of a cells eight surrounding cells, so both cells immediately diagonal and orthoganal
                    are valid neighbors.
                </li>
                <li>
                    If a cell has exactly <b>two</b> neighbors, it will maintain it's state. If it is on, it will stay
                    on and if it is off it will stay off.
                </li>
                <li>
                    Any cells with more than three neighbors will die or overpopulation, and cells with less than three
                    cells will die of isolation.
                </li>
            </ul>
            </p>
            <p>
                These simple rules construct a basic universe. Similar simplified universes have been used by logicians
                as tools to construct proofs, Any creation in such a universe will still obey the basic rules of logic.
            </p>
            <p>
                John Von Nuemann created a similar universe to show how a machine could construct itself. The crux to
                this problem lay in his demanding that the constructed machine must also be able to construct itself
                (in the same mannor that cells reproduce).
                Within his simplified universe he was able to construct such a machine (or rather a team of machines) that
                were capable of such a feat.
            </p>
            <p>
                He didn't know it at the time, but the process of genetic reproduction in
                cells contains all the structures he used to build his machine in his simplified universe.
            </p>
            <blockquote style="text-align: justify">
                "The exact correspondence to biology was not known at the time of Von Nuemann's work, but his proof had
                a strong philosophical impact on biologists. Von Nuemann showed that there was no magic in self-reproduction,
                that the exact process could be spelled out and programmed into a machine with a certain minimum of complexity.
                By itself Von Nuemanns work made no specific assertions about biology. Reproduction of living organisms
                might still involve an impoderable life force. Von Neumann did, however, strike down the argument that
                self-reproduction <i>must</i> proceed by supernatural means" <sup><b>1</b></sup>
            </blockquote>
            <p>
                Poundstone, William. "The Recursive Universe: Cosmic Complexity and the Limits of Scientific Knowledge".
                The Dover Edition. William Morrow and Company Inc, New York. 1984. page 191.
            </p>

        </div>
@stop

