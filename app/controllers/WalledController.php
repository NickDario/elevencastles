<?php
/**
 * Manages Restricted Views
 *
 * Author:  ndario
 * Date:    7/11/15   
 */

class WalledController extends Controller {


    public function __construct()
    {
        $this->beforeFilter('auth');
    }

    /**
     * Setup the layout used by the controller.
     *
     * @return void
     */
    protected function setupLayout()
    {
        if ( ! is_null($this->layout))
        {
            $this->layout = View::make($this->layout);
        }
    }

}
