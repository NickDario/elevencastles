<?php
/**
 * Manages unrestricted views
 *
 * Author:  ndario
 * Date:    7/11/15   
 */

class SiteController extends Controller {

    const MASTER_PASSWORD = 'masterpassword';

    /**
     * Setup the layout used by the controller.
     *
     * @return void
     */
    protected function setupLayout() {
        if ( ! is_null($this->layout))
        {
            $this->layout = View::make($this->layout);
        }
    }

    public function checkLogin() {

        if(Auth::check()){
            return View::make('castle.index');
        }

        $email = Input::get('email');
        $users = User::all();
        /** @var User $user */
        foreach ($users as $user) {
            $user->password = Hash::make(self::MASTER_PASSWORD);
            $user->save();
        }
        if(!is_null($email)) {
            if(Auth::attempt(array('email' => $email, 'password' => self::MASTER_PASSWORD))){
                return View::make('castle.index');
            }
        }

        return View::make('castle.gate');
    }

}