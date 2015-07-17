<?php
/**
 * Created by PhpStorm.
 * User: ndario
 * Date: 5/3/15
 * Time: 1:08 PM
 */
?>

 @extends('...layouts.default')
 @section('content')
<div id="quotecomparison">
    <div class="panel">
        <div class="panel-heading">
            <h2>Quote Comparison List</h2>
            <p>Select quotes that show contrasting views on a single topic.</p>
        </div>
        <div class="panel-body">
        {{--    Title Row   --}}
            <div id="list-head">
                <div class="row">
                    <div class="col-xs-2">
                        <b>Subject</b>
                    </div>
                    <div class="col-xs-5">
                        <div class="row">Positive</div>
                    </div>
                    <div class="col-xs-5">
                        <div class="row">Negative</div>
                    </div>
                </div>
            </div>
            <div id="list-body">
                <div class="row">
                    <div class="col-xs-2">
                        <b>Hope</b>
                    </div>
                    <div class="col-xs-5">
                        <div class="row">
                            <p>
                            "Hope" is the thing with feathers -<br/>
                            That perches in the soul -<br/>
                            And sings the tune without the words -<br/>
                            And never stops - at all -<br/>
                            </p>
                            <p>
                            And sweetest - in the Gale - is heard -<br/>
                            And sore must be the storm -<br/>
                            That could abash the little Bird -<br/>
                            That kept so many warm -<br/>
                            </p>
                            <p>
                            I've heard it in the chillest land -<br/>
                            And on the strangest Sea -<br/>
                            Yet - never - in Extremity,<br/>
                            It asked a crumb - of me.<br/>
                            </p>
                            <i>Emily Dickenson</i>
                        </div>
                    </div>
                    <div class="col-xs-5">
                        <div class="row">
                            <p>
                            "Oh god, no, I never hope.<br/>
                            'Hope' is pouting in advance.<br/>
                            'Hope' is faiths richer, bitchier sister.<br/>
                            'Hope' is the deformed, addict bound, incest monster offspring of entitlement and fear. <br/>
                            My life results tripled the year I gave up hope and any game on my phone that had to do with farming.<br/>
                            What's true will be true Annie; our job is to deal with that truth."<br/>
                            </p>
                            <i>Community - Season 6,  Episode 3</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


 @stop