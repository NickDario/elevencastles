<?php
/**
 * Author:  ndario
 * Date:    6/28/15   
 */

?>
@extends('...layouts.project')
@section('content')
<div id="vehicles" class="vehicles-page" data-script="vehiclesiv">

  <div class="display">
      <div id="v4-ctrl" class="control-bar">
          <a class="btn-ctrl" href="{{URL::to('C8/ai')}}">
              &larr; Back
          </a>
          <a class="pp btn-ctrl" href="{{URL::to('C8/ai')}}">
              <span class="pause"><i class="fa fa-pause"></i>&nbsp;Pause</span>
              <span class="play" style="display:none"><i class="fa fa-play"></i>&nbsp;Play</span>
          </a>
          <span class="rendersenses btn-ctrl noselect">
              Senses
          </span>
          <span class="renderspores btn-ctrl noselect">
              Spores
          </span>
          <span class="rendergrid btn-ctrl noselect">
              Grid
          </span>
          <span class="info btn-ctrl noselect">
              Info
          </span>
      </div>
      <div id="v3-info" class="info-pane col-xs-12" style="display:none">
          <div class="panel panel-darkgrey col-xs-offset-3 col-xs-6">
              <h3>Simulation of Sensory Perception and Behavioral Response</h3>
              <ul class="nav nav-list">
              </ul>
          </div>
      </div>
      <canvas id="vehiclesiv-canvas">
      </canvas>
  </div>
</div>
@stop
