const gulp = require('gulp'),
      gulpSass = require('gulp-sass'),
      minifyCss = require('gulp-minify-css'),
      htmlMin = require('gulp-htmlmin'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      connect = require('gulp-connect');


//制定CSS任务
gulp.task('css',() => {
    gulp.src('src/css/*.scss')
        .pipe(gulpSass())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
})

//html任务
gulp.task('html',() => {
    gulp.src('src/**/*.html')
        .pipe(htmlMin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: false,//不删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
})

//js任务
gulp.task('js',() => {
    //首先用babel 把ES6转为ES5
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
})

//libs任务
gulp.task('libs',() => {
    gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'))
        .pipe(connect.reload());
})

//images任务
gulp.task('images',() => {
    gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'))
        .pipe(connect.reload());
})

//开启服务器任务
gulp.task('server',() => {
    connect.server({
        root: "dist",
        port: 1902,
        livereload: true
    });
})

//监听任务
gulp.task('watch',() => {
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/css/**/*.scss',['css']);
    gulp.watch('src/js/**/*.js',['js']);
})

//集中执行任务
gulp.task('default',['html','css','js','libs','images','server','watch']);