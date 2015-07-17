<?php
/**
 * Author:  ndario
 * Date:    7/7/15   
 */

?>

@extends('...layouts.blank')
@section('content')
<div class="col-xs-offset-4 col-xs-4">
<?php echo Form::open(array('url' => '/C11/authenticate')); ?>
<?php echo Form::input('text', 'email', null, array('class'       => 'form-control', 'placeholder' => 'Email'));?>
<?php echo Form::submit('Enter',array('class' => 'form-control'));?>
<?php echo Form::close();?>
</div>
@stop
