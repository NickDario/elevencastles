<?php
/**
 * Created by PhpStorm.
 * User: nick
 * Date: 9/26/15
 * Time: 3:43 PM
 */

class RestController extends BaseController {

    public function submittal($action){
        call_user_func(array($this, $action));
    }

    protected function consider(){
        $sentence = Input::get('sentence', '');
        $val = array();
        exec('python /home/nick/repos/stories/consider.py ' . $sentence, $val);
//        var_dump($val[0]);
        $array = json_decode($val[0], true);

        var_dump($array[2]);

//        response:
//          0:term
//          1:titles[]
//          2:info[]
//          3:urls[]



    }

}