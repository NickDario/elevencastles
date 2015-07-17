
@extends('...layouts.default')
@section('content')
<div id="musicpath" class="music-page" data-script="musicpath">

    <div class="source">
        @foreach($assets['audio'] as $file_type => $audio_files)
            @foreach($audio_files as $index => $file)
                <audio id="mp-audio" controls>
                    <source src="{{URL::asset('assets/audio/'. $file . '.' . $file_type);}}" type="audio/{{$file_type}}"/>
                </audio>
            @endforeach
        @endforeach
    </div>

    <div class="display">
            <canvas id="mp-canvas">

            </canvas>
            <div class="scoreboard">
                <span class="high">0</span>
                <span class="current">0</span>
            </div>
    </div>

</div>
@stop