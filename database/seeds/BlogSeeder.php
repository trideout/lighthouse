<?php

use Faker\Factory;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        for ($i=0; $i < 100;$i++)
        {
            $blog = \App\Blog::create([
                'title' => $faker->words(5, true),
                'body' => $faker->paragraphs(3, true)
            ]);
            for($c = 0; $c < 5; $c++)
            {
                \App\Comment::create([
                    'commenter' => $faker->name,
                    'body' => $faker->sentence,
                    'blog_id' => $blog->id
                ]);
            }
        }
    }
}
