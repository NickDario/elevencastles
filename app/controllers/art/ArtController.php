<?php
/**
 * Created by PhpStorm.
 * User: ndario
 * Date: 4/26/15
 * Time: 5:03 PM
 */


class ArtController extends BaseController{

    public function __construct(){
    }

    public function showIndex()
    {
        $rooms = array();
        $rooms[] = array(
            'title' => 'Isaac Madwed',
            'type'  => 'webpage',
            'url'   => "https://www.isaacmadwed.com"
        );
        $rooms[] = array(
            'title' => 'The Wave',
            'type'  => 'Print',
            'url'   => URL::to('C4/thewave')
        );

        return View::make('art.index', array(
            'rooms' => $rooms,
            'sidebar_title' => 'Art'
        ));
    }

    public function showTheWave()
    {
        return View::make('art.thewave', array(
            'sidebar_title' => 'Art'
        ));
    }
}