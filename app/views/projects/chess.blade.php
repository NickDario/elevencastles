<?php
/**
 * Created by PhpStorm.
 * User: nick
 * Date: 3/27/16
 * Time: 12:53 AM
 */

?>

@extends('...layouts.project')
@section('content')
    <div id="chess" class="project" data-script="chess">
        <div id="project-controls">
            <div class="control-bar">
                <a id="new-game" class="btn-ctrl" href="#">
                    <span>New Game</span>
                </a>
                <a id="undo" class="btn-ctrl disabled" href="#">
                    <span>Undo</span>
                </a>
                <a id="redo" class="btn-ctrl disabled" href="#">
                    <span>Redo</span>
                </a>
                <a id="color-aid" class="colors btn-ctrl" href="#">
                    <span>Color Aid</span>
                </a>
            </div>
        </div>
        <div id="chess-stage" class="full-stage">
            <canvas id="top-pit"></canvas>
            <div id="board-stage">
                <canvas id="chess-canvas"></canvas>
            </div>
            <canvas id="bot-pit"></canvas>
        </div>
        <div id="rules-overlay" class="project-overlay" style="display: none">

        </div>
    </div>
@stop