<?php
/**
 * Created by PhpStorm.
 * User: ndario
 * Date: 4/19/15
 * Time: 2:35 PM
 */

class MusicController extends BaseController{

    public function showIndex()
    {
        $rooms = array();
        $rooms[] = array(
            'title' => 'musicpath',
            'type'  => 'interactive',
            'url'   => URL::to('C6/musicpath')
        );
        $rooms[] = array(
            'title' => 'musicpath2',
            'type'  => 'interactive',
            'url'   => URL::to('C6/musicpath2')
        );

        return View::make('music.index', array(
            'rooms' => $rooms,
            'sidebar_title' => 'Music'
        ));
    }

    public function showMusicpath()
    {
        $assets['audio']['wav'][] = 'Rhapsody_in_Blue';
//        $assets['audio']['mp3'][] = 'Fur_Elise';
        return View::make('music.musicpath', array(
            'assets' => $assets,
            'sidebar_title' => 'MusicPath'
        ));
    }

    public function showMusicpath2()
    {
//        $assets['audio']['wav'][] = 'Rhapsody_in_Blue';
        $assets['audio']['mp3'][] = 'Fur_Elise';
        return View::make('music.musicpath2', array(
            'assets' => $assets,
            'sidebar_title' => 'MusicPath2'
        ));
    }
}
