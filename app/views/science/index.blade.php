<?php
/**
 * Created by PhpStorm.
 * User: ndario
 * Date: 4/26/15
 * Time: 6:45 PM
 */

?>

@extends('...layouts.default')
@section('content')
    <div id="science-main"  class="default-main" data-script="science-main">
        <div class="list col-sm-offset-4 col-sm-4">
            <?php foreach($rooms as $room):?>
            <div class="row">
                <a href="<?php echo $room['url'];?>"><?php echo $room['title'];?> -- <?php echo $room['type'];?></a>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
@stop

