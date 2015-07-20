<?php
/**
 * Author:  ndario
 * Date:    7/18/15
 */

?>


@extends('...layouts.default')
@section('content')
    <div id="musicpath2" class="music-page" data-script="musicpath2">

        <div class="source">
            @foreach($assets['audio'] as $file_type => $audio_files)
                @foreach($audio_files as $index => $file)
                    <audio id="mp2-audio" controls>
                        <source src="{{URL::asset('assets/audio/'. $file . '.' . $file_type);}}" type="audio/{{$file_type}}"/>
                    </audio>
                @endforeach
            @endforeach
        </div>

        <div class="display">
            <canvas id="mp2-canvas"></canvas>
        </div>

        <script id="shader-fs" type="x-shader/x-fragment">
          varying lowp vec4 vColor;

          void main(void) {
            gl_FragColor = vColor;
          }
        </script>

        <script id="shader-vs" type="x-shader/x-vertex">
          attribute vec3 aVertexPosition;
          attribute vec4 aVertexColor;

          uniform mat4 uMVMatrix;
          uniform mat4 uPMatrix;

          varying lowp vec4 vColor;

          void main(void) {
            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
            vColor = aVertexColor;
          }
        </script>
    </div>
@stop
