/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const { src, dest } = require("gulp");
const fs = require("fs");
const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const del = require("del");
const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const groupmedia = require("gulp-group-css-media-queries");
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const webphtml = require("gulp-webp-html");
// const webpcss = require('gulp-webp-css');
const svgsprite = require("gulp-svg-sprite");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");

// Названия папок
const project_folder = "dist";
const source_folder = "src";

// Пути к файлам
const path = {
  build: {
    html: `${project_folder}/`,
    style: `${project_folder}/style/`,
    js: `${project_folder}/js/`,
    images: `${project_folder}/images/`,
    fonts: `${project_folder}/fonts/`,
    video: `${project_folder}/video`,
  },
  src: {
    html: [`${source_folder}/pages/*.html`, `!${source_folder}/pages/_*.html`],
    style: `${source_folder}/style/style.scss`,
    js: `${source_folder}/js/script.js`,
    images: `${source_folder}/images/**/*.+(png|jpg|gif|ico|svg|webp|jpeg)`,
    fonts: `${source_folder}/fonts/*.ttf`,
    video: `${source_folder}/video/*`,
  },
  watch: {
    html: `${source_folder}/**/*.html`,
    style: `${source_folder}/style/**/*.scss`,
    styleComponents: `${source_folder}/components/**/*.scss`,
    js: `${source_folder}/js/**/*.js`,
    images: `${source_folder}/images/**/*.+(png|jpg|gif|ico|svg|webp|jpeg)`,
    video: `${source_folder}/video/*`,
  },
  clean: `./${project_folder}/`,
};
// Функции
function browserSync() {
  browsersync.init({
    server: {
      baseDir: `./${project_folder}/`,
    },
    port: 3000,
    // notify: false
  });
}

function htmlHandler() {
  return src(path.src.html)
    .pipe(fileinclude({
      prefix: "@@",
      basepath: "@file",
    }))
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream({ stream: true }));
}

function styleHandler() {
  return src(path.src.style)
    .pipe(
      scss({
        outputStyle: "expanded",
      }),
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: false,
      }),
    )
    .pipe(groupmedia())
    // .pipe(webpcss({webpClass: '.webp',noWebpClass: '.no-webp'}))
    .pipe(dest(path.build.style))
    .pipe(cleancss())
    .pipe(
      rename({
        extname: ".min.css",
      }),
    )
    .pipe(dest(path.build.style))
    .pipe(browsersync.stream({ stream: true }));
}

function jsHandler() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(
      babel({
        presets: ["@babel/env"],
      }),
    )
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      }),
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream({ stream: true }));
}

function imagesHandler() {
  return src(path.src.images)
    .pipe(
      webp({
        quality: 80,
      }),
    )
    .pipe(dest(path.build.images))
    .pipe(src(path.src.images))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 2, // 0 to 7
      }),
    )
    .pipe(dest(path.build.images))
    .pipe(browsersync.stream({ stream: true }));
}
function videoHandler() {
  return src(path.src.video)
    .pipe(dest(path.build.video))
    .pipe(browsersync.stream({ stream: true }));
}
function fontsHandler() {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));
}

function callback() { }
function fontsCreator() {
  const file_content = fs.readFileSync(`${source_folder}/style/fonts.scss`);
  // eslint-disable-next-line eqeqeq
  if (file_content == "") {
    fs.writeFile(`${source_folder}/scss/fonts.scss`, "", callback);
    return fs.readdir(path.build.fonts, (err, items) => {
      if (items) {
        let c_fontname;
        for (let i = 0; i < items.length; i++) {
          let fontname = items[i].split(".");
          fontname = fontname[0];
          if (c_fontname !== fontname) {
            fs.appendFile(`${source_folder}/style/fonts.scss`, `@include font("${fontname}", "${fontname}", "400", "normal");\r\n`, callback);
          }
          c_fontname = fontname;
        }
      } else {
        console.log(err);
      }
    });
  }
}

function watchFiles() {
  gulp.watch([path.watch.html], htmlHandler);
  gulp.watch([path.watch.style], styleHandler);
  gulp.watch([path.watch.styleComponents], styleHandler);
  gulp.watch([path.watch.images], imagesHandler);
  gulp.watch([path.watch.video], videoHandler);
  gulp.watch([path.watch.js], jsHandler);
}

function clean() {
  return del(path.clean);
}

gulp.task("create-svg-sprite", () => gulp.src([`${source_folder}/icons/svg-sprite/*.svg`])
  .pipe(
    svgsprite({
      mode: {
        stack: {
          sprite: "../icons/sprite.svg",
          example: false,
        },
      },
    }),
  )
  .pipe(dest(path.build.images)));
// Сценарии выполнения
const build = gulp.series(
  clean,
  gulp.parallel(
    styleHandler,
    htmlHandler,
    jsHandler,
    imagesHandler,
    videoHandler,
    fontsHandler,
  ), fontsCreator,
);
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsCreator = fontsCreator;
exports.fontsHandler = fontsHandler;
exports.imagesHandler = imagesHandler;
exports.videoHandler = videoHandler;
exports.styleHandler = styleHandler;
exports.htmlHandler = htmlHandler;
exports.jsHandler = jsHandler;
exports.watch = watch;
exports.build = build;
exports.default = watch;
