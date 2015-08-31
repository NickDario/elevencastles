<?php
/**
 * Created by PhpStorm.
 * User: ndario
 * Date: 4/18/15
 * Time: 11:29 AM
 */

class CastleController extends BaseController{

    public $assets = array();
    public $projects = array();

    public function __construct()
    {
        $this->assets['css'][] = 'styles.css';
        $this->assets['js'][]  = 'castle.js';
        $this->projects = array(
            array(
                'id' => 0,
                'name' => 'MusicPath'
            ),
            array(
                'id' => 1,
                'name' => 'MusicPath 2'
            ),
            array(
                'id' => 2,
                'name' => 'Pursue And Flee'
            ),
            array(
                'id' => 3,
                'name' => 'Vehicles'
            ),
            array(
                'id' => 4,
                'name' => 'Life'
            )
        );
    }

    public function showIndex()
    {
        return View::make('castle.index',array(
            'assets' => $this->assets
        ));
    }

    public function showProject($pid = null)
    {
        $prompt = false;
        if(is_null($pid)) {
            $pid = 2;
            $prompt = true;
        }
        switch($pid) {
            case 0:
                $assets['audio']['wav'][] = 'Rhapsody_in_Blue';
                return View::make('projects.musicpath', array(
                    'assets' => $assets,
                    'current' => $this->projects[$pid],
                    'projects' => $this->projects,
                ));
                break;
            case 1:
                $assets['audio']['mp3'][] = 'Fur_Elise';
                return View::make('projects.musicpath2', array(
                    'assets' => $assets,
                    'current' => $this->projects[$pid],
                    'projects' => $this->projects,
                ));
                break;
            case 2:
                return View::make('projects.pursueandflee', array(
                    'current' => $this->projects[$pid],
                    'projects' => $this->projects,
                ));
            case 3:
                return View::make('projects.vehiclesiv', array(
                    'prompt' => $prompt,
                    'current' => $this->projects[$pid],
                    'projects' => $this->projects,
                ));
            case 4:
                return View::make('projects.life', array(
                    'current' => $this->projects[$pid],
                    'projects' => $this->projects
                ));
            default:
                break;
        }
    }
}