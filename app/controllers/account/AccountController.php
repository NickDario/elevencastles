<?php
/**
 * Author:  ndario
 * Date:    7/7/15   
 */

class AccountController extends WalledController{

    public function showIndex()
    {
        return View::make('login');
    }

    public function authenticate()
    {
        return View::make('castle.index');
    }
}