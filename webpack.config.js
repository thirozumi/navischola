const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './assets'),
    publicPath: 'assets/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.woff(2)?(\?[a-z0-9]+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, './src/assets', 'data'), to: 'data' },
      { from: path.resolve(__dirname, './src/assets', 'images'), to: 'images' },
      { from: path.resolve(__dirname, './src/assets', 'fonts'), to: 'fonts' }
    ])
  ],
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname),
      outputDir: path.join(__dirname, 'prerendered'),
      routes: [
        '/',
        '/question',
        '/network',
        '/network/0/biomedical-sciences',
        '/network/1/informatics',
        '/network/2/humanities',
        '/network/3/biology',
        '/network/4/social-science',
        '/network/5/mathematical-and-physical-sciences',
        '/network/6/general-science-and-engineering',
        '/network/7/environmental-studies',
        '/network/8/chemistry',
        '/network/9/combined-fields',
        '/network/10/agriculture',
        '/network/11/engineering',
        '/result/0/biomedical-sciences',
        '/result/1/informatics',
        '/result/2/humanities',
        '/result/3/biology',
        '/result/4/social-science',
        '/result/5/mathematical-and-physical-sciences',
        '/result/6/general-science-and-engineering',
        '/result/7/environmental-studies',
        '/result/8/chemistry',
        '/result/9/combined-fields',
        '/result/10/agriculture',
        '/result/11/engineering',
      ],
      // Optional minification.
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true
      },
      postProcessHtml: function (context) {
        var titles = {
          '/': 'ナビスコラ：学問分野診断＆相関図',
          '/question': '分野診断ツール：Your Schola｜ナビスコラ：学問分野診断＆相関図',
          '/network': '分野相関図：Schola Scope｜ナビスコラ：学問分野診断＆相関図',
          '/network/0/biomedical-sciences': 'わたしは「医歯薬学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/network/1/informatics': 'わたしは「情報学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/network/2/humanities': 'わたしは「人文学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/network/3/biology': 'わたしは「生物学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/network/4/social-science': 'わたしは「社会科学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/network/5/mathematical-and-physical-sciences': 'わたしは「数物系科学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/network/6/general-science-and-engineering': 'わたしは「総合理工」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/network/7/environmental-studies': 'わたしは「環境学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/network/8/chemistry': 'わたしは「化学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/network/9/combined-fields': 'わたしは「複合領域」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/network/10/agriculture': 'わたしは「農学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/network/11/engineering': 'わたしは「工学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/result/0/biomedical-sciences': 'わたしは「医歯薬学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/result/1/informatics': 'わたしは「情報学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/result/2/humanities': 'わたしは「人文学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/result/3/biology': 'わたしは「生物学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/result/4/social-science': 'わたしは「社会科学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/result/5/mathematical-and-physical-sciences': 'わたしは「数物系科学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/result/6/general-science-and-engineering': 'わたしは「総合理工」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/result/7/environmental-studies': 'わたしは「環境学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/result/8/chemistry': 'わたしは「化学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/result/9/combined-fields': 'わたしは「複合領域」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/result/10/agriculture': 'わたしは「農学」タイプ！｜ナビスコラ：学問分野診断＆相関図',
          '/result/11/engineering': 'わたしは「工学」タイプ！｜ナビスコラ：学問分野診断＆相関図'
        }
        return context.html.replace (
          /<title>[^<]*<\/title>/i, '<title>' + titles[context.route] + '</title>'
        )
      }
    })
  ])
}
