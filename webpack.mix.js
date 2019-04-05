const mix = require('laravel-mix');
let PurgecssPlugin = require('purgecss-webpack-plugin');
let glob = require('glob-all');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
let tailwindcss = require('tailwindcss');

mix.react('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false,
        postCss: [tailwindcss('./tailwind.js'), require('postcss-discard-comments')()],
    }).minify('public/css/app.css', 'public/js/app.js').version();

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
    }
}

mix.webpackConfig({
    plugins: [
        new PurgecssPlugin({
            paths: glob.sync([
                path.join(__dirname, "resources/views/**/*.blade.php"),
                path.join(__dirname, "resources/js/**/*.js")
            ]),
            extractors: [{
                extractor: TailwindExtractor,
                extensions: ["html", "js", "php"]
            }],
        })
    ]
});