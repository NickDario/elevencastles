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
            </div>
        </div>
        <div class="display">
            <canvas id="life-canvas">

            </canvas>
        </div>
    </div>
@stop

