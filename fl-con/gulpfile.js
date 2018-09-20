const gulp = require('gulp');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const cleanCss =require('gulp-clean-css');

gulp.task("hello", function() {
	console.log("cc");
})
//默认方法
gulp.task("default", ['sever', 'watch']);
//拷贝文件
gulp.task("copy-html", function() {
	return gulp.src('HTML/**/*').pipe(gulp.dest('dist/html')).pipe(connect.reload());
})
gulp.task("copy-img", function() {
	return gulp.src('img/**/*').pipe(gulp.dest('dist/img')).pipe(connect.reload());
})
gulp.task("copy-js", function() {
	return gulp.src('js/*.js').pipe(gulp.dest('dist/js')).pipe(connect.reload());
})
gulp.task("copy-css", function() {
	return gulp.src('css/*.css').pipe(gulp.dest('dist/css')).pipe(connect.reload());
})
//es6转es5
gulp.task('es', function() {
	return gulp.src("js6/*.js")
		.pipe(babel({
			"presets": ["es2015"]
		}))
		.pipe(gulp.dest("js/"));
})

//侦测文件变化
gulp.task('watch', function() {
	gulp.watch('HTML/**/*', ['copy-html']);
	gulp.watch('img/**/*', ['copy-img']);
	gulp.watch('js6/**/*', ['es']);
	gulp.watch('js/**/*', ['copy-js']);
	gulp.watch('sass/**/*.scss',['sass']);
	gulp.watch('css/**/*', ['copy-css']);
})
//scss文件转css
gulp.task('sass', function() {
	return gulp.src('sass/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css/'));
});

//gulp-connect插件搭建本地服务
gulp.task('sever', function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
})

//两个文件夹同时拷贝到某一个文件夹下
gulp.task("data", function() {
	return gulp.src(['fir.php', 'thr.json', '!sec.php']).pipe(gulp.dest('dist/data'));
})

//文件合并
gulp.task('scripts', function() {
	return gulp.src('js/**/*')
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(uglify())
		.pipe(rename('vendor.min.js'))
		.pipe(gulp.dest('dist/js'));
})

//压缩
//css
gulp.task('csss', function() {
	return gulp.src('sass/**/*.scss')
		.pipe(sass())
		.pipe(cleanCss())
		.pipe(gulp.dest('dist/css'));
})
//js
gulp.task('minsc', function() {
	return gulp.src('dist/js/**/*.js')
		.pipe(gulp.dest('dist/js'))
		.pipe(uglify())
		.pipe(rename('four.min.js'))
		.pipe(gulp.dest('dist/js'));
})
//img
gulp.task('images', function() {
	return gulp.src('img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
})