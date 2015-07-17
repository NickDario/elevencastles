<?php

class StudioController extends BaseController{

    protected $assets = array();

    public function __construct(){
        $this->assets['js'][] = 'default.js';
        $this->assets['css'][] = 'default.css';
        $this->assets['js'][] = 'canvas1.js';
        $this->assets['css'][] = 'canvas1.css';
    }

    public function canvas(){
        return View::make('studio.canvas', array(
            'assets' => $this->assets,
        ));
    }

    public function studio3(){}

} 