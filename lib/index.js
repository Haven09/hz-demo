const { src, dest, parallel, series, watch } = require('gulp')
//sass语言转换模块
const sass = require('gulp-sass')
//ES新特性转换模块
const babel = require('gulp-babel')
//页面模板引擎用到的模块
const swig = require('gulp-swig')
//图片及文字压缩用到的模块
const imagemin = require('gulp-imagemin')
//文件删除用到的模块
const del = require('del')
//文件引用处理用到的模块
const useRef = require('gulp-useref')
//文件压缩用到的模块
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css')
const fileIf = require('gulp-if')

const cwd = process.cwd()
const path = require('path')
let config = {
  //default config
  build: {
    src: 'src',
    dist: 'dist',
    temp: 'temp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  }
}

try {
  const loadConfig = require(path.join(cwd, 'page.config.js'))
  config = Object.assign({}, config, loadConfig)
} catch (error) {
  throw error
}

//样式编译任务
const style = () => {
  return src(config.build.paths.styles, { base: config.build.src, cwd: config.build.src })
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({stream: true}))
}

//脚本编译任务
const script = () => {
  return src(config.build.paths.scripts, { base: config.build.src, cwd: config.build.src })
    .pipe(babel({ presets: [require('@babel/preset-env')] }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({stream: true}))
}

//页面模板引擎
const page = () => {
  //  src/**/*.html 写法匹配src目录及src所有子目录下的html文件
  //  此处使用*.html是由于其他子目录下的html是作为页面组件存在的，src文件夹下的html才是应用于页面的
  return src(config.build.paths.pages, { base: config.build.src, cwd: config.build.src })
    .pipe(swig({ data: config.data, defaults: { cache: false } }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({stream: true}))
}

//图片和字体文件转换
const image = () => {
  return src(config.build.paths.images, { base: config.build.src })
    .pipe(imagemin())
    .pipe(dest(config.build.dist))
}
const font = () => {
  return src(config.build.paths.fonts, { base: config.build.src })
    .pipe(imagemin())
    .pipe(dest(config.build.dist))
}

//其他的文件及文件清除
const extra = () => {
  return src('**', { base: config.build.public, cwd: config.build.public })
    .pipe(dest(config.build.dist))
}
const clean = () => {
  return del([config.build.dist, config.build.temp])
}

//开发服务器
const browserSync = require('browser-sync')
const bs = browserSync.create()

const serve = () => {
  watch(config.build.paths.styles, { cwd: config.build.src }, style)
  watch(config.build.paths.scripts, { cwd: config.build.src }, script)
  watch(config.build.paths.pages, { cwd: config.build.src }, page)
  //对于图片和文字文件，在开发期间的打包其实就是压缩文件，
  //这样的动作在开发阶段其实不是特别必要，而且也会影响打包速度
  //所以，可以将这些文件直接连接到源文件的位置，
  //这样的话，在浏览器运行的配置中设置server.baseDir指定源文件位置就行
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)

  //针对开发环境下图片和字体文件发生变化，浏览器也需要进行更新文件操作
  watch(
    [
      'src/assets/images/**',
      'src/assets/fonts/**'
    ], { cwd: config.build.src }, bs.reload
  )

  watch(
    ['**'], { cwd: config.build.public }, bs.reload
  )


  bs.init({
    notify: false,
    // open: false,
    // port: 8080,
    // files: 'temp/*',
    server: {
      baseDir: [config.build.temp, config.build.src, config.build.public],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

const useref = () => {
  return src(config.build.paths.pages, { base: config.build.temp, cwd: config.temp })
    //针对文件引用处理
    .pipe(useRef({ searchPath: [config.build.temp, '.'] }))
    //针对html, css, js文件压缩处理
    // .pipe(fileIf(/\.js$/, uglify()))
    // .pipe(fileIf(/\.css$/, cleanCss()))
    // .pipe(fileIf(/\.html$/, htmlmin(
    //   {
    //     collapseWhitespace: true,
    //     minifyCSS: true,
    //     minifyJS: true
    //   }
    // )))
    .pipe(dest(config.build.dist))
}

const compile = parallel(style, script, page)

const build = series(clean, parallel(series(compile, useref), image, font, extra))

const develop = series(build, serve)

module.exports = {
  // style,
  // script,
  // page,
  // image,
  // font,
  // extra,
  clean,
  // serve,
  // useref,
  // compile,
  build,
  develop
}