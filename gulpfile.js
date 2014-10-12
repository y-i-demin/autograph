var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var exec = require("child_process").exec;
var nib = require('nib');

var paths = {
    scripts: [
        'node_modules/es5-shim/es5-shim.js',
        'blocks/**/*.js',
        'blocks/*.js'
    ],
    styl: [
        'blocks/*.styl',
        'blocks/**/*.styl'
    ]
};

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('autograph.js'))
        .pipe(gulp.dest('static/js'))
        .pipe(uglify())
        .pipe(rename('_autograph.js'))
        .pipe(gulp.dest('static/js'));
});

gulp.task('css', function() {
    return gulp.src('blocks/blocks.styl')
        .pipe(stylus({
            use: nib(),
            set: ['compress']
        }))
        .pipe(rename('_autograph.css'))
        .pipe(gulp.dest('static/css'));
});

gulp.task('clean', function() {
    var cmd = 'rm -rf views static/{css,js}/';
    exec(cmd, function(err, stdout, stderr) {
        if (err) {
            cb(new Error(err), undefined);
            return;
        }
    });
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styl, ['css']);
});

gulp.task('default', ['css', 'scripts']);
