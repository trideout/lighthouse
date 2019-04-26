<?php

Route::get('/{path?}', [
    'as' => 'blog.index',
    'uses' => 'BlogController@index',
])->where('path', '.*');