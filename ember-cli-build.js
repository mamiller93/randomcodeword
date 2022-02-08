'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const SOURCEMAPS = true;
  let environment = EmberApp.env();
  let isProduction = environment === 'production';

  console.info(`
    Building:
      SOURCEMAPS: ${SOURCEMAPS}
      NODE_ENV: ${process.env.NODE_ENV}
      isProduction: ${isProduction}
  `);

  let app = new EmberApp(defaults, {
    sourcemaps: {
      enabled: SOURCEMAPS,
    },
    'ember-cli-favicon': {
      enabled: environment != 'test', // By default favicons are NOT generated in TEST env to speedup builds

      iconPath: 'favicon.png', // icon path related to `public` folder

      // See the [favicons](https://github.com/itgalaxy/favicons) module for details on the available configuration options.
      faviconsConfig: {
        icons: {
          favicons: true,
          android: isProduction,
          appleIcon: isProduction,
          appleStartup: isProduction,
          coast: isProduction,
          firefox: isProduction,
          windows: isProduction,
          yandex: isProduction,
        },
      },
    },
    postcssOptions: {
      compile: {
        map: SOURCEMAPS,
        plugins: [
          require('tailwindcss')('./tailwind.config.js'),
          require('autoprefixer')(),
        ],
        cacheInclude: [/.*\.(css|hbs|html|ts|js)$/, /.tailwind\.config\.js$/],
      },
    },
    // },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
