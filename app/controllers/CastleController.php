<?php
/**
 * Created by PhpStorm.
 * User: ndario
 * Date: 4/18/15
 * Time: 11:29 AM
 */

class CastleController extends WalledController{

    public $assets = array();

    public function __construct()
    {
        $this->assets['css'][] = 'styles.css';
        $this->assets['js'][]  = 'castle.js';
    }

    public function showIndex()
    {
        return View::make('castle.index',array(
            'assets' => $this->assets
        ));
    }

} 