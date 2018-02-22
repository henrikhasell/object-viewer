var gulp = require('gulp')
var typescript = require('gulp-typescript')

gulp.task('copy', function() {
    return gulp.src([
        'node_modules/three/build/three.js',
        'node_modules/three/build/three.min.js'
    ]).pipe(gulp.dest('js'));
});

gulp.task('compile', function() {
    return gulp.src('ts/**/*.ts').pipe(typescript()).pipe(gulp.dest('ts'));
});

gulp.task('pack', ['compile'], function() {
    return gulp.src('ts/**/*.js').pipe(gulp.dest('js'));
});

gulp.task('watch', ['compile', 'pack'], function() {
    return gulp.watch('ts/**/*.ts', function() {
        gulp.start(['compile', 'pack']);
    });
});

gulp.task('default', ['copy', 'compile', 'pack']);
