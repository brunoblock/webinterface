const
  gulp = require('gulp'),
  babel = require('gulp-babel'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),

  prod = {
    build: {
      dir: `${ __dirname }/build`,
    },
    bundle: {
      dir: `${ __dirname }/dist`,
      name: `./index.js`
    }
  },
  dev = {
    build: {
      dir: `${ __dirname }/build-dev`
    }
  },

  webpackConfig = {
    entry: './index.js',
    output: {
      libraryTarget: 'umd',
      filename: prod.bundle.name,
      path: prod.bundle.dir
    },
    resolve: {
      modules: [prod.build.dir],
      alias: {
        '@component': `${ prod.build.dir }/Components`,
        '@widget': `${ prod.build.dir }/Widgets`,
        '@scene': `${ prod.build.dir }/Scenes`,

        'themes': `themes.js`,
        'media-queries': `media-queries.js`
      }
    },
    context: prod.build.dir,
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-router': 'ReactRouterDOM',
      'styled-components': 'styled',
      'tinycolor': 'tinycolor',
      'filesaver': 'FileSaver',
      'oyster-streamable': 'Oyster'
    },
    plugins: [
      new UglifyJsPlugin()
    ]
  }



gulp.task('set-env-production', function() {
    return process.env.NODE_ENV = 'production'
})

gulp.task('set-env-development', function() {
    return process.env.NODE_ENV = 'development'
})



gulp.task('production', ['set-env-production'], () => {
  [
    _ => new Promise((resolve, reject) => {
      gulp.src('src/**')
        .pipe(babel())
        .pipe(gulp.dest(prod.build.dir))
        .on('end', resolve)
    }),

    _ => new Promise((resolve, reject) => {
      console.log(new Array(50).join('\n'))

      gulp.src(`${ prod.build.dir }/index.js`)
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulp.dest(prod.bundle.dir))
        .on('end', resolve)
    })

  ].reduce((acc, cur, i) => {
    acc().then(cur)
    return cur
  })
})

gulp.task('development', ['set-env-development'], () => {
  [
    _ => new Promise((resolve, reject) => {
      gulp.src('src/**')
        .pipe(babel())
        .pipe(gulp.dest(dev.build.dir))
        .on('end', resolve)
    })

  ].reduce((acc, cur, i) => {
    acc().then(cur)
    return cur
  }, _ => Promise.resolve())
})