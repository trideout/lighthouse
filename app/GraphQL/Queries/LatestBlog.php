<?php
namespace App\GraphQL\Queries;

use App\Blog;
use GraphQL\Type\Definition\ResolveInfo;

class LatestBlog {
    public function resolve($rootValue, array $args, $context, ResolveInfo $resolveInfo): Blog
    {
        return Blog::orderBy('created_at', 'desc')->first();
    }
}