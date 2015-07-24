
@extends('...layouts.project')
@section('content')
<div id="musicpath" class="project" data-script="musicpath">

    <div id="project-controls">
        <div class="source">
            @foreach($assets['audio'] as $file_type => $audio_files)
                @foreach($audio_files as $index => $file)
                    <audio id="mp-audio" controls>
                        <source src="{{URL::asset('assets/audio/'. $file . '.' . $file_type);}}" type="audio/{{$file_type}}"/>
                    </audio>
                @endforeach
            @endforeach
        </div>
    </div>

    <div class="display">
            <canvas id="mp-canvas"></canvas>
            <div class="scoreboard">
                <span class="high">0</span>
                <span class="current">0</span>
            </div>
    </div>
    <div class="path">
        <canvas id="path-canvas"></canvas>
    </div>

</div>
@stop