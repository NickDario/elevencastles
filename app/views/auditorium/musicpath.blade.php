
@extends('...layouts.default')
@section('content')
    <div id="auditorium">
        @foreach($assets['audio'] as $file_type => $audio_files)
            @foreach($audio_files as $index => $file)
                <audio id="audio-{{$file_type}}-{{$index}}" controls>
                    <source src="{{URL::asset('assets/audio/'. $file . '.' . $file_type);}}" type="audio/{{$file_type}}"/>
                </audio>
            @endforeach
        @endforeach
        <div class="sheet">
            <canvas id="sheet-canvas" class="canvas"></canvas>
            <div id="scoreboard">
                <span class="high">0</span>
                <span class="current">0</span>
            </div>
        </div>
    </div>
@stop