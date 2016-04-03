<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

//Route::get('/', function()
//{
//	return View::make('index');
//});

Route::get('/submit/{action}', 'RestController@submittal');
Route::get('/{pid?}', 'CastleController@showProject');
Route::group(['prefix'=>'ajax'], function(){
    Route::any('news', 'CastleController@newsSentiment');
});

//
//Route::any('/', 'SiteController@checkLogin');
//
//Route::get('/C1', 'ForumController@showIndex');
//
//Route::get('/C2', 'CodeController@showIndex');
//
//Route::get('/C3', 'LiteratureController@showIndex');
//Route::get('/C3/slang', 'LiteratureController@showSlang');
//
//Route::get('/C4', 'ArtController@showIndex');
//Route::get('/C4/thewave', 'ArtController@showTheWave');
//
//Route::get('/C5', 'FilmController@showIndex');
//Route::get('/C5/quotecomparisons', 'FilmController@showQuoteComparisons');
//
//Route::get('/C6', 'MusicController@showIndex');
//Route::get('/C6/musicpath', 'MusicController@showMusicpath');
//Route::get('/C6/musicpath2', 'MusicController@showMusicpath2');
//
//Route::get('/C7', 'RPController@showMusicpath');
//
//Route::get('/C8', 'ScienceController@showIndex');
//Route::get('/C8/ai', 'AIController@showIndex');
//Route::get('/C8/ai/hub', 'AIController@showIndex');
//Route::get('/C8/ai/pnf', 'AIController@showPursueAndFlee');
//Route::get('/C8/ai/vehicles', 'AIController@showVehicles');
//Route::get('/C8/ai/vehiclesii', 'AIController@showVehiclesII');
//Route::get('/C8/ai/vehiclesiii', 'AIController@showVehiclesIII');
//Route::get('/C8/ai/vehiclesiv', 'AIController@showVehiclesIV');
//
//Route::get('/C9', 'HistoryController@showIndex');
//
//Route::get('/C10', 'MiscController@showIndex');
//
//Route::get('/C11', 'AccountController@showIndex');
//Route::post('/C11/authenticate', 'AccountController@authenticate');
//
//Route::get('studio', 'StudioController@canvas');
//Route::get('studio/canvas', 'StudioController@canvas');
