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
            ),
            array(
                'id' => 5,
                'name' => 'Test'
            ),
            array(
                'id' => 6,
                'name' => 'News'
            ),
            array(
                'id' => 7,
                'name' => 'Story'
            ),
            array(
                'id' => 8,
                'name' => 'Chess'
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
            case 5:
                return View::make('projects.test', array(
                    'current' => $this->projects[$pid],
                    'projects' => $this->projects
                ));
            case 6:
                return View::make('projects.news', array(
                    'current' => $this->projects[$pid],
                    'projects' => $this->projects
                ));
            case 7:
                return View::make('projects.story', array(
                    'current' => $this->projects[$pid],
                    'projects' => $this->projects
                ));
            case 8:
                return View::make('projects.chess', array(
                    'current' => $this->projects[$pid],
                    'projects' => $this->projects
                ));
            default:
                break;
        }
    }

    public function newsSentiment()
    {
        $feeds = Input::get('feeds', array());
        $minOffset = Input::get('minOffset', 0);
        $agg = json_decode(Input::get('agg', '["hour", "day", "month"]'));

        $db = DB::connection('rss');
        $feeds = DB::connection('rss')->select('SELECT * FROM feeds');
        $stories = DB::connection('rss')->select('SELECT * FROM stories order by date desc');


        $aFeeds = array();
        foreach($feeds as $feed){
            $feed->stories = array();
            $aFeeds[$feed->id] = $feed;
        }

        foreach($stories as $story){
            $date = date_create_from_format('Y-m-d_H-i-s', $story->date);
            $aFeeds[$story->feeds_id]->stories[] = array(
                'id' => (int)$story->id,
                'title' => $story->title,
                'date' => $date->sub(new DateInterval('PT8H')),
                'sentiment' => (int)$story->sentiment,
            );
        }

        $now = new Datetime();
        $now->setTimezone(new DateTimeZone('America/Los_Angeles'));
//        $now_year = $now->format('Y');
//        $now_month = $now->format('m');
//        $now_day = $now->format('d');
//
//
//        $hourlist = array();
//        $daylist=array();
//        $monthlist = array();
//        for($h=0;$h<24;$h++){
//            $hourlist[] = array(
//                'x' => $h,
//                'y' => 0
//            );
//        }
//        for($d=0;$d<date('t');$d++){
//            $daylist[$d] = array(
//                'x' => $d,
//                'y' => 0
//            );
//        }
//        for($m=0;$m<12;$m++){
//            $monthlist[$m] = array(
//                'x' => $m,
//                'y' => 0
//            );
//        }

        $unixlist = array();

        $aSentimentTime = array();
        foreach ($aFeeds as $feed) {
            foreach ($feed->stories as $story) {
                $aSentimentTime[] = array(
                    'x' => $story['date']->getTimestamp(),
                    'y' => $story['sentiment']
                );
            }
        }

        usort($aSentimentTime, function($a,$b){return $a['x'] > $b['x'];});
        $timeset = $this->_aggSentiment($aSentimentTime, 3600 * 3, 'Y-m-d-H-i-s');


        echo json_encode(array(
            'ulist' => $timeset,
        ));
    }

    protected function _aggSentiment($times, $sec, $format = null){
        $aggTimes  = array();
        $sentiment = array();

        $t = 0;
        $dt = new Datetime();
        foreach($times as $time){
            if($t == 0) $t = $time['x'];
            if($time['x'] > $t + $sec){
                $aggTimes[] = array(
                    'x' => $format == null ? $t : $dt->setTimestamp($t)->format($format),
                    'y' => array_sum($sentiment)/sizeof($sentiment)
                );
                $t += $sec;
                $sentiment = array();
            }

            $sentiment[] += $time['y'];
        }

        return $aggTimes;
    }
}