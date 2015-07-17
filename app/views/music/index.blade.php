@extends('...layouts.default')
@section('content')
    <div id="music-main"  class="default-main" data-script="music-main">
        <div class="list col-sm-offset-4 col-sm-4">
            <?php foreach($rooms as $room):?>
            <div class="row">
                <a href="<?php echo $room['url'];?>"><?php echo $room['title'];?> -- <?php echo $room['type'];?></a>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
@stop

