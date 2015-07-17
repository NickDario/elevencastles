<?php
/**
 * User: ndario
 * Date: 4/18/15
 * Time: 11:31 AM
 */
?>

@extends('...layouts.blank')
@section('content')


<div id="bg-1" class="background"><span class="portal-title">Forum</span></div>

<div id="bg-2" class="background"><span class="portal-title">Code</span></div>
<div id="bg-3" class="background"><span class="portal-title">Literature</span></div>

<div id="bg-4" class="background"><span class="portal-title">Art</span></div>
<div id="bg-5" class="background"><span class="portal-title">Film</span></div>
<div id="bg-6" class="background"><span class="portal-title">Music</span></div>

<div id="bg-7" class="background"></div>
<div id="bg-8" class="background"><span class="portal-title">Science</span></div>
<div id="bg-9" class="background"></div>
<div id="bg-10" class="background"></div>

<div id="bg-11" class="background"></div>

<div id="castle" data-script="castle-main">

    <div class="col-xs-6 col-sm-12">
        <div class="portal" data-portal="1">
            <a href="{{URL::to('C1/')}}"><span>Forum</span></a>
        </div>
    </div>


    <div class="col-xs-6 col-sm-4 col-md-6">
        <div class="portal" data-portal="2">
            <a href="{{URL::to('C2/');}}"><span>Code</span></a>
        </div>
    </div>
    <div class="col-xs-6 col-sm-4 col-md-6">
        <div class="portal" data-portal="3">
            <a href="{{URL::to('C3');}}"><span>Literature</span></a>
        </div>
    </div>


    <div class="col-xs-6 col-sm-4 col-md-4">
        <div class="portal" data-portal="4">
            <a href="{{URL::to('C4');}}"><span>Art</span></a>
        </div>
    </div>
    <div class="col-xs-6 col-sm-4 col-md-4">
        <div class="portal" data-portal="5">
            <a href="{{URL::to('C5');}}"><span>Film</span></a>
        </div>
    </div>
    <div class="col-xs-6 col-sm-4 col-md-4">
        <div class="portal" data-portal="6">
            <a href="{{URL::to('C6');}}"><span>Music</span></a>
        </div>
    </div>


    <div class="col-xs-6 col-sm-4 col-md-3">
        <div class="portal" data-portal="7">
            <a href="{{URL::to('C7');}}"><span>Religion/Philosophy</span></a>
        </div>
    </div>
    <div class="col-sm-4 col-md-3">
        <div class="portal" data-portal="8">
            <a href="{{URL::to('C8');}}"><span>Science</span></a>
        </div>
    </div>
    <div class="col-xs-6 col-sm-4 col-md-3">
        <div class="portal" data-portal="9">
            <a href="{{URL::to('C9');}}"><span>Historic & Current Events</span></a>
        </div>
    </div>
    <div class="col-xs-6 col-sm-4 col-md-3">
        <div class="portal" data-portal="10">
            <a href="{{URL::to('C10');}}"><span>Miscellaneous</span></a>
        </div>
    </div>


    <div class="col-xs-6 col-sm-12">
        <div class="portal">
            <a href="{{URL::to('C11');}}"><span>Account</span></a>
        </div>
    </div>

</div>
@stop


