<?php

// Main interface
Route::get('/', 'InterfaceController@index');
Route::get('/timeslots', 'InterfaceController@timeslots');

// User actions
Route::post('/choose', 'InterfaceController@choose');
