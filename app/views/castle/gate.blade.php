<?php
/**
 * Author:  ndario
 * Date:    7/11/15   
 */

?>

@extends('...layouts.blank')
@section('content')
<div id="gate" data-script="castle-gate">
    <div class="portculus">
    </div>
    <div class="entrance">
    <?php echo Form::open(array('url' => '/')); ?>
    <?php echo Form::input('text', 'email', null, array('class'       => 'form-control', 'placeholder' => 'Email'));?>
    <?php echo Form::submit('Enter',array('class' => 'form-control'));?>
    <?php echo Form::close();?>
    </div>
</div>
@stop


