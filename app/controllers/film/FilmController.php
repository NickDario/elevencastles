<?php
/**
 * Created by PhpStorm.
 * User: ndario
 * Date: 5/3/15
 * Time: 1:03 PM
 */

class FilmController extends WalledController{

    public function showIndex()
    {
        $rooms = array();
        $rooms[] = array(
            'title' => 'Quote Comparisons',
            'type'  => 'list',
            'url'   => URL::to('C5/quotecomparisons')
        );
        return View::make('film.index', array(
            'rooms' => $rooms
        ));
    }

    public function showQuoteComparisons()
    {
        return View::make('film.quotecomparisons', array(
        ));
    }


}