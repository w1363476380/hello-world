var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var sync = require('browser-sync').create();


gulp.task('html',function(){
	gulp.src('./src/*.html')
		.pipe(htmlmin({
			collapseWhitespace:true,
			// html去空格
			removeComments:true
			// html去注释
		}))
		.pipe(gulp.dest('dist'))
		.pipe(sync.reload({stream:true}));
});


gulp.task('css',function(){
	gulp.src('src/styles/*.less')
		.pipe(less())
		// css转译
		.pipe(concat('all.css'))
		//合并
		.pipe(cssnano())
		// css压缩
		.pipe(gulp.dest('dist/styles'))
		.pipe(sync.reload({stream:true}));
});


gulp.task('js',function(){
	gulp.src('src/js/*.js')
		.pipe(concat('all.js'))
		// 合并
		.pipe(uglify())
		// js压缩
		.pipe(gulp.dest('dist/js'))
		.pipe(sync.reload({stream:true}));
});


gulp.task('images',function(){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		// copy
		.pipe(sync.reload({stream:true}));
});

// gulp.task开启工作，并命名
// gulp.src寻找位置
// gulp.dest放置

gulp.task('work',['html','css','js','images'],function(){
	sync.init({
		server:{
			baseDir:"./dist",
			index: '1.html'
		}
	});
	gulp.watch('src/styles/*.less',['css']);
	gulp.watch('src/js/*.js',["js"]);
	gulp.watch('src/*.html',["html"]);
	gulp.watch('src/images/*.*',["images"]);
});


