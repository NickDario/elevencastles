<?php
?>

<div class="sidebar">
    <div class="sidebar-title">
        {{ $sidebar_title or 'Castles'}}
    </div>
    <div class="sidebar-link">
        <a href="{{URL::to('/C1')}}">
            <span class="num">I</span>
            <span class="name">forum</span>
        </a>
    </div>
    <div class="sidebar-link">
        <a href="{{URL::to('/C2')}}">
            <span class="num">II</span>
            <span class="name">code</span>
        </a>
    </div>
    <div class="sidebar-link">
        <a href="{{URL::to('/C3')}}">
            <span class="num">III</span>
            <span class="name">literature</span>
        </a>
    </div>
    <div class="sidebar-link">
        <a href="{{URL::to('/C4')}}" class="{{Request::is('C4*') ? 'current' : ''}}">
            <span class="num">IV</span>
            <span class="name">art</span>
        </a>
    </div>
    <div class="sidebar-link">
        <a href="{{URL::to('/C5')}}" class="{{Request::is('C5*') ? 'current' : ''}}">
            <span class="num">V</span>
            <span class="name">film</span>
        </a>
    </div>
    <div class="sidebar-link">
        <a href="{{URL::to('/C6')}}" class="{{Request::is('C6*') ? 'current' : ''}}">
            <span class="num">VI</span>
            <span class="name">music</span>
        </a>
    </div>
    <div class="sidebar-link">
        <a href="{{URL::to('/C7')}}">
            <span class="num">VII</span>
            <span class="name">religion/philosophy</span>
        </a>
    </div>
    <div class="sidebar-link">
        <a href="{{URL::to('/C8')}}" class="{{Request::is('C8*') ? 'current' : ''}}">
            <span class="num">IIX</span>
            <span class="name">science</span>
        </a>
    </div>
    <div class="sidebar-link">
        <a href="{{URL::to('/C9')}}">
            <span class="num">IX</span>
            <span class="name">historic/current events</span>
        </a>
    </div>
    <div class="sidebar-link">
        <a href="{{URL::to('/C10')}}">
            <span class="num">X</span>
            <span class="name">misc</span>
        </a>
    </div>
    <div class="sidebar-link">
        <a href="{{URL::to('/C11')}}">
            <span class="num">XI</span>
            <span class="name">account</span>
        </a>
    </div>

</div>