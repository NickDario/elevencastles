<?php
/**
 * Created by PhpStorm.
 * User: ndario
 * Date: 4/26/15
 * Time: 6:44 PM
 */

class ScienceController extends WalledController {

    public function showIndex()
    {
        $rooms = array();
        $rooms[] = array(
            'title' => 'Artificial Intelligence',
            'type'  => 'hub',
            'url'   => URL::to('C8/ai/hub'),
        );
        return View::make('science.index', array(
            'rooms' => $rooms,
            'sidebar_title' => 'Science'
        ));
    }

} 