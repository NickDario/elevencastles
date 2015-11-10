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
            default:
                break;
        }
    }

    public function newsSentiment()
    {
        $feeds = Input::get('feeds', array());
        $agg = json_decode(Input::get('agg', '[hour, day, month]'));

        $feeds = DB::connection('rss')->select('SELECT * FROM feeds');
        $stories = DB::connection('rss')->select('SELECT * FROM stories');

        $aFeeds = array();
        foreach($feeds as $feed){
            $feed->stories = array();
            $aFeeds[$feed->id] = $feed;

        }
        foreach($stories as $story){
            $aFeeds[$story->feeds_id]->stories[] = array(
                'id' => (int)$story->id,
                'title' => $story->title,
                'date' => date_create_from_format('Y-m-d_H-i-s', $story->date),
                'sentiment' => (int)$story->sentiment,
            );
        }

        $serieslist = array();
        foreach ($aFeeds as $feed) {
            foreach ($feed->stories as $story) {
                $hour = (int)$story['date']->format('H');
                $day = (int)$story['date']->format('d');
                $month = (int)$story['date']->format('m');
                $year = (int)$story['date']->format('Y');
                if(in_array('hour', $agg)){
                    if( isset($serieslist['hour'][$hour]) ){
                        $serieslist['hour'][$year][$month][$day][$hour] += $story['sentiment'];
                    } else {
                        $serieslist['hour'][$year][$month][$day][$hour] = $story['sentiment'];
                    }
                }
                if(in_array('day', $agg)){
                    if( isset($serieslist['day'][$day]) ) {
                        $serieslist['day'][$year][$month][$day] += $story['sentiment'];
                    } else {
                        $serieslist['day'][$year][$month][$day] = $story['sentiment'];
                    }
                }
                if(in_array('month', $agg)){
                    if( isset($serieslist['day'][$month ]) ) {
                        $serieslist['month'][$year][$month] += $story['sentiment'];
                    } else {
                        $serieslist['month'][$year][$month] += $story['sentiment'];
                    }
                }
            }
        }


        echo json_encode($serieslist);
    }




}