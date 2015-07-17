<?php
/**
 * Created by PhpStorm.
 * User: ndario
 * Date: 5/17/15
 * Time: 10:29 AM
 */
?>

@extends('...layouts.default')
@section('content')
<div id="thewave-print">
    <div class="col-xs-offset-2 col-xs-8">
        <div class="frame row">
            {{HTML::image('assets/images/c4/PierreDoutreleauTheWave.png')}}
        </div>
        <div class="quotes">
            <div class="row">
                <p class="quote"><i>
                    Go and persuade the sea wave not to break <br/>
                    You will persuade me no more easily.
                </i></p>
                <p class="append">
                    Prometheus to Hermes
                </p>
            </div>
        </div>
    </div>
</div>
@stop