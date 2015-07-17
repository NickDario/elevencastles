<?php
/**
 * Created by PhpStorm.
 * User: ndario
 * Date: 5/8/15
 * Time: 6:29 PM
 */
?>

@extends('...layouts.default')
@section('content')
<div id="slang">
    <div class="panel">
        <div class="panel-heading">
            <h2>Slang Origins</h2>
            <p>Possible origins of slang words</p>
        </div>
        <div class="panel-body">
            <div id="list-head">
                <div class="row">
                    <div class="col-xs-2">
                        <b>Word</b>
                    </div>
                    <div class="col-xs-3">
                        Origin
                    </div>
                    <div class="col-xs-6">
                        Evidence
                    </div>
                </div>
            </div>
            <div id="list-body">
                <div class="row">
                    <div class="col-xs-2">
                        <b>Cool</b>
                    </div>
                    <div class="col-xs-3">
                        Middle East
                    </div>
                    <div class="col-xs-7">
                        <p>
                            <i>"my heart's love and coolth of my eyes"</i>
                            <br/>
                            <br/>
                            "Arab. 'Kurrat al-ayn;' coolness of eyes as oppose to a hot eye ('sakhin') <i>i.e.</i> one red with
                            tears. The term is true and picturesque so I translate it literally. All coolness is pleasant to
                            dwellers in burning lands; thus in Al-Hariri Abu Zayd says of Bassorah, 'I found there whatever
                            could fill the eye with coolness.' And a 'cool booty' (or prize) is one which has been secured
                            without plunging into the flames of war, or simply a pleasant prize."
                            <br/>
                            <br/>
                            A Plain And Literal Translation of the Arabian Nights Entertainments Vol1. - page 72 - footnote[1]
                            <br/>
                            By Richard Francis Burton
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@stop
