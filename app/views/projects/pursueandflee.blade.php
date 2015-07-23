<?php
/**
 * Created by PhpStorm.
 * User: ndario
 * Date: 4/26/15
 * Time: 7:24 PM
 */
?>

@extends('...layouts.project')
@section('content')
    <div id="pnf" class="pnf-page" data-script="pursue-and-flee">
        <div>

        </div>
        <div class="display">
            <div class="control-bar">
                <a class="btn-ctrl" href="{{URL::to('C8/ai')}}">
                    &larr; Back
                </a>
                <span id="show-vectors" class="btn-ctrl">
                    Vectors
                </span>
                <span id="info" class="btn-ctrl">
                    Info
                </span>
            </div>
            <canvas id="pnf-canvas">

            </canvas>
        </div>
    </div>
@stop

