<?php
/**
 * Created by PhpStorm.
 * User: nick
 * Date: 9/26/15
 * Time: 3:29 PM
 */
?>


@extends('...layouts.project')
@section('content')
<div id="test" class="project" data-script="test">
    <div class="small-stage">
        <form action="{{URL::to('/submit/consider')}}">
            <label for="sentence"></label><input name="sentence" type="text">
            <button type="submit">Submit</button>
        </form>
    </div>
</div>
@stop
