<?php
/**
 * Author:  ndario
 * Date:    6/28/15   
 */

?>
@extends('...layouts.project')
@section('content')
<div id="vehicles" class="project" data-script="vehiclesiv">
    <div id="project-controls">
        <div id="v1-ctrl" class="control-bar">
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
          <span class="info btn-ctrl noselect on">
              Info
          </span>
        </div>
    </div>
    <div class="display">
        <canvas id="vehiclesiv-canvas">
        </canvas>
    </div>
    <div id="project-info">
        <span class="close-info glyphicon glyphicon-remove"></span>
        <h1>Vehicles</h1>
        <br>
        <p>
            This project is an attempt to simulate genetic memory. Genetic memory is knowledge that is pass down through
            a genome. genes that help a creature survive are 'remembered' in future generations, genes that aren't are
            'forgotten'.
        </p>
        <p>
            This process is simulated by placing 'vehicles' in an environment where they must eat to survive. Vehicles
            can eat plants or smaller vehicles. Larger vehicles with more senses must eat more to survive.
        </p>
        <p>
            Survival offers more opportunities to breed. breeding allows the continuation of a vehicles genome, and the
            retention of its genetic memory.
        </p>
        <p>
            A vehicles traits are retained in it's genome as genes. When a vehicle is replicated its genome is copied.
            during this copy each gene has a chance to change slightly. This variation will be retained in the new vehicle
            and potentially to vehicles that are replicated from it.
        </p>
        <p>
            Use the controls at the top to pause or play the simulation, view information about vehicle senses, plant
            spawning (each plant also has a genome) and the grid that is used for optimization.
        </p>
    </div>
</div>
@stop
