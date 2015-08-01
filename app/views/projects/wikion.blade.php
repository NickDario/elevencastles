<?php
/**
 * Author:  ndario
 * Date:    7/30/15
 */

?>


@extends('...layouts.project')
@section('content')
<div id="wikion" class="project" data-script="wikion">
    <div id="project-controls">
        <div class="control-bar">
            <a class="pp btn-ctrl" href="{{URL::to('C8/ai')}}">
                <span class="pause"><i class="fa fa-pause"></i>&nbsp;Pause</span>
                <span class="play" style="display:none"><i class="fa fa-play"></i>&nbsp;Play</span>
            </a>
                <span id="show-vectors" class="btn-ctrl">
                    Vectors
                </span>
        </div>
    </div>
    <div class="display">
        <canvas id="pnf-canvas">

        </canvas>
    </div>
</div>
@stop

