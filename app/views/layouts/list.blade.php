<?php
/**
 * Author:  ndario
 * Date:    5/24/15   
 */
?>

@extends('...layouts.default')
@section('content')
    <div id="{{$list_id or ''}}"  class="default-main" data-script="{{$list_script or 'main'}}">
        <div class="list col-sm-offset-4 col-sm-4">
            <?php foreach($rooms as $room):?>
            <div class="row">
                <a href="<?php echo $room['url'];?>" class="col-xs-12">
                    <span class="col-xs-5 nogutter text-right"><?php echo $room['title'];?></span>
                    <span class="col-xs-2">--</span>
                    <span class="col-xs-5 nogutter text-left"><?php echo $room['type'];?></span>
                </a>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
@stop