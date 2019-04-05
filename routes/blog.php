<?php

Route::get('/', [
    'as' => 'blog.index',
    'uses' => 'BlogController@index',
]);