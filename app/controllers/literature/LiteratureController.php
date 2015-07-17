<?php
/**
 * Created by PhpStorm.
 * User: ndario
 * Date: 5/8/15
 * Time: 6:26 PM
 */

class LiteratureController extends WalledController
{

    public function showIndex()
    {
        $rooms = array();
        $rooms[] = array(
            'title' => 'Slang Origins',
            'type'  => 'list',
            'url'   => URL::to('C3/slang'),
        );
        return View::make('literature.index', array(
            'rooms' => $rooms,
            'sidebar_title' => 'Literature'
        ));
    }

    public function showSlang()
    {
        return View::make('literature.slang', array(

        ));
    }

}
