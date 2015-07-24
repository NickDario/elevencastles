<?php
/**
 * Author:  ndario
 * Date:    7/18/15
 */

?>


@extends('...layouts.project')
@section('content')
    <div id="musicpath2" class="project" data-script="musicpath2">
        <div id="project-controls">
            <div class="source">
                @foreach($assets['audio'] as $file_type => $audio_files)
                    @foreach($audio_files as $index => $file)
                        <audio id="mp2-audio" controls>
                            <source src="{{URL::asset('assets/audio/'. $file . '.' . $file_type);}}" type="audio/{{$file_type}}"/>
                        </audio>
                    @endforeach
                @endforeach
            </div>
        </div>

        <div class="display">
            <canvas id="mp2-canvas"></canvas>
        </div>

        <script id="shader-vs" type="x-shader/x-vertex">
          attribute vec3 aVertexPosition;
          attribute vec4 aVertexColor;

          uniform mat4 uMVMatrix;
          uniform mat4 uPMatrix;

          varying lowp vec4 vColor;

          void main(void) {
            gl_Position = aVertexPosition;
            {{--gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);--}}
            vColor = aVertexColor;
          }
        </script>

        <script id="shader-fs" type="x-shader/x-fragment">
          varying lowp vec4 vColor;
          void main(void) {
            gl_FragColor = vColor;
          }
        </script>
    </div>
@stop
