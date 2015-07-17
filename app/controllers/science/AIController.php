<?php
/**
 * Created by PhpStorm.
 * User: ndario
 * Date: 4/26/15
 * Time: 6:51 PM
 */

class AIController extends WalledController{

    public function showIndex()
    {
        $rooms = array();
        $rooms[] = array(
            'title' => 'pursue and flee',
            'type'  => 'interactive',
            'url'   => URL::to('C8/ai/pnf')
        );
        $rooms[] = array(
            'title' => 'vehicles',
            'type'  => 'simulation',
            'url'   => URL::to('C8/ai/vehicles')
        );
        $rooms[] = array(
            'title' => 'vehicles 2',
            'type'  => 'simulation',
            'url'   => URL::to('C8/ai/vehiclesii')
        );
        $rooms[] = array(
            'title' => 'vehicles 3',
            'type'  => 'simulation',
            'url'   => URL::to('C8/ai/vehiclesiii')
        );
        $rooms[] = array(
            'title' => 'vehicles 4',
            'type'  => 'simulation',
            'url'   => URL::to('C8/ai/vehiclesiv')
        );

        return View::make('science.ai.index', array(
            'list-id' => 'ai-main',
            'rooms' => $rooms
        ));
    }

    public function showPursueAndFlee()
    {
        return View::make('science.ai.pursueandflee', array());
    }

    public function showVehicles()
    {
        return View::make('science.ai.vehicles', array());
    }

    public function showVehiclesII()
    {
        return View::make('science.ai.vehiclesii', array());
    }

    public function showVehiclesIII()
    {
        return View::make('science.ai.vehiclesiii', array());
    }

    public function showVehiclesIV()
    {
        return View::make('science.ai.vehiclesiv', array());
    }
}