<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'blog_id',
        'commenter',
        'body',
    ];
}
