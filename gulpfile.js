let project_folder = 'dist';
let source_folder = 'src';

let fs = require('fs');

let path = {
    build: {
        html: `${project_folder}/`,
        css: `${project_folder}/css/`,
        js: `${project_folder}/js/`,
        img: `${project_folder}/img/`,
        font: `${project_folder}/font/`,
    },
    src: {
        html: [`${source_folder}/*.html`, `!${source_folder}/_*.html`],
        css: `${source_folder}/scss/index.scss`,
        js: `${source_folder}/js/index.js`,
        img: `${source_folder}/img/**/*.{png,svg,ico}`,
        font: `${source_folder}/font/*.ttf`,
    },
    watch: {
        html: `${source_folder}/**/*.html`,
        css: `${source_folder}/scss/**/*.scss`,
        js: `${source_folder}/js/**/*.js`,
        img: `${source_folder}/img/**/*.{png,svg,ico}`,
    },
    clean: `./${project_folder}/`
}

let { src,dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    gulpScss = require('gulp-sass'),
    dartSass = require('sass'),
    scss = gulpScss(dartSass),
    autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    webphtml = require('gulp-webp-html'),
    webpcss = require('gulp-webpcss'),
    svgSprite = require('gulp-svg-sprite'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter')

function browserSync(){
    browsersync.init({
        server: {
            baseDir: `./${project_folder}/`
        },
        port: 3000,
        notify: false
    })
}

function html(){
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css(){
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: 'expanded'
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 versions'],
                cascade: true
            })
        )
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js(){
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images(){
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function font(){
    src(path.src.font)
        .pipe(dest(path.build.font))
    return src(path.src.font)
        .pipe(dest(path.build.font))
}

gulp.task('svgSprite', function(){
    return gulp.src([`${source_folder}/iconsprite/*.svg`])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../icons/icons.svg'
                }
            }
        }
        ))
        .pipe(dest(path.build.img))
})

function watchFiles(){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.js], images);
}

function clean(){
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, font));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.font = font;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = build;
exports.build = build;
exports.watch = watch;
exports.default = watch;
