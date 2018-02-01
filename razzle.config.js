'use strict';

const autoprefixer = require("autoprefixer");

module.exports = {
  modify(baseConfig, { target, dev }, webpack) {
    const config = Object.assign({}, baseConfig);

        // CSS LOADER START

        const isServer = target !== "web";

        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing to support IE9 and above
        const postCSSLoaderOptions = {
          ident: "postcss", // https://webpack.js.org/guides/migrating/#complex-options
          plugins: () => [
            require("postcss-flexbugs-fixes"),
            autoprefixer({
              browsers: [
                ">1%",
                "last 4 versions",
                "Firefox ESR",
                "not ie < 9" // React doesn't support IE8 anyway
              ],
              flexbox: "no-2009"
            })
          ]
        };
    
        if (dev) {
          config.module.rules = config.module.rules.map(rule => {
            if (rule.test && !!".css".match(rule.test)) {
              return {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: isServer
                  ? [
                      {
                        loader: "css-loader",
                        options: {
                          importLoaders: 1
                        }
                      }
                    ]
                  : [
                      require.resolve("style-loader"),
                      {
                        loader: require.resolve("css-loader"),
                        options: {
                          importLoaders: 1
                        }
                      },
                      {
                        loader: require.resolve("postcss-loader"),
                        options: postCSSLoaderOptions
                      }
                    ]
              };
            }
            return rule;
          });
    
          config.module.rules.push({
            test: /\.module\.css$/,
            use: isServer
              ? [
                  "isomorphic-style-loader",
                  {
                    loader: require.resolve("css-loader"),
                    options: {
                      importLoaders: 1,
                      modules: true,
                      localIdentName: "[path]__[name]___[local]"
                    }
                  }
                ]
              : [
                  require.resolve("style-loader"),
                  {
                    loader: require.resolve("css-loader"),
                    options: {
                      importLoaders: 1,
                      modules: true,
                      localIdentName: "[path]__[name]___[local]"
                    }
                  },
                  {
                    loader: require.resolve("postcss-loader"),
                    options: postCSSLoaderOptions
                  }
                ]
          });
        } else if (!dev && !isServer) {
          config.module.rules = config.module.rules.map(rule => {
            if (rule.test && !!".css".match(rule.test)) {
              return {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: {
                    loader: require.resolve("style-loader"),
                    options: {
                      hmr: false
                    }
                  },
                  use: [
                    {
                      loader: require.resolve("css-loader"),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: true
                      }
                    },
                    {
                      loader: require.resolve("postcss-loader"),
                      options: postCSSLoaderOptions
                    }
                  ]
                })
              };
            }
            return rule;
          });
    
          config.module.rules.push({
            test: /\.module\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: {
                loader: require.resolve("style-loader"),
                options: {
                  hmr: false
                }
              },
              use: [
                {
                  loader: require.resolve("css-loader"),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true,
                    modules: true,
                    localIdentName: "[path]__[name]___[local]"
                  }
                },
                {
                  loader: require.resolve("postcss-loader"),
                  options: postCSSLoaderOptions
                }
              ]
            })
          });
    
          config.plugins.push(
            new ExtractTextPlugin("static/css/[name].[contenthash:8].css")
          );
        } else if (!dev && isServer) {
          config.module.rules = config.module.rules.map(rule => {
            if (rule.test && !!".css".match(rule.test)) {
              return {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                  {
                    loader: require.resolve("css-loader"),
                    options: {
                      importLoaders: 1,
                      minimize: true,
                      sourceMap: true
                    }
                  }
                ]
              };
            }
            return rule;
          });
    
          config.module.rules.push({
            test: /\.module\.css$/,
            use: [
              "isomorphic-style-loader",
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1,
                  minimize: true,
                  sourceMap: true,
                  modules: true,
                  localIdentName: "[path]__[name]___[local]"
                }
              }
            ]
          });
        }
    
        // CSS LOADER DONE

    // TYPESCRIPT START
    config.resolve.extensions = config.resolve.extensions.concat([
      '.ts',
      '.tsx',
    ]);

    config.devtool = 'cheap-module-source-map';

    // Locate eslint-loader and remove it (we're using tslint instead)
    config.module.rules = config.module.rules.filter(
      rule =>
        !(
          Array.isArray(rule.use) &&
          rule.use.length > 0 &&
          rule.use[0].options &&
          'useEslintrc' in rule.use[0].options
        )
    );

    // Safely locate Babel-Loader in Razzle's webpack internals
    const babelLoader = config.module.rules.findIndex(
      rule => rule.options && rule.options.babelrc
    );

    // Get the correct `include` option, since that hasn't changed.
    // This tells Razzle which directories to transform.
    const { include } = config.module.rules[babelLoader];

    // Declare our TypeScript loader configuration
    const tsLoader = {
      include,
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        // this will make errors clickable in `Problems` tab of VSCode
        visualStudioErrorFormat: true,
      },
    };

    const tslintLoader = {
      include,
      enforce: 'pre',
      test: /\.tsx?$/,
      loader: 'tslint-loader',
      options: {
        emitErrors: true,
        configFile: './tslint.json',
      },
    };

    config.module.rules.push(tslintLoader);

    // Fully replace babel-loader with ts-loader
    config.module.rules[babelLoader] = tsLoader;

    // If you want to use Babel & Typescript together (e.g. if you
    // are migrating incrementally and still need some Babel transforms)
    // then do the following:
    //
    // - COMMENT out line 59
    // - UNCOMMENT line 68
    //
    // config.module.rules.push(tsLoader)


    // TYPESCRIPT DONE


    return config;
  },
};
