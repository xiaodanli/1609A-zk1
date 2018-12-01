/*
 * @Author: 李晓丹 
 * @Date: 2018-12-01 10:00:20 
 * @Last Modified by: 李晓丹
 * @Last Modified time: 2018-12-01 10:34:28
 */

var gulp = require('gulp');

var sass = require('gulp-sass');

var minCss = require('gulp-clean-css');

var server = require('gulp-webserver');

var url = require('url');

var fs = require('fs');

var path = require('path');

var swiper = require('./mock/swiper.json');

//开发 css
gulp.task('devScss',function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(minCss())
    .pipe(gulp.dest('./src/css'))
})

//监听 scss
gulp.task('watch',function(){
    return gulp.watch('./src/scss/*.scss',gulp.series('devScss'))
})

//起服务
gulp.task('server',function(){
    return gulp.src('src')
    .pipe(server({
        port:9090,
        middleware:function(req,res,next){
            var pathname = url.parse(req.url).pathname;

            if(pathname === '/favicon.ico'){
                res.end('');
                return 
            }

            if(pathname === '/api/swiper'){  // /api/swiper
                res.end(JSON.stringify({code:1,data:swiper}))
            }else{ //读文件
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname,'src',pathname)));
            }
            
        }
    }))
})

//开发环境
gulp.task('dev',gulp.series('devScss','server','watch'))
