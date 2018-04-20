// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

const path = require('path');

module.exports = function (config) {
  var customizableOptions = {
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    angularCli: {
      environment: 'dev'
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: './reports/coverage', // base output directory
      'report-config': {
        html: { // any options here are valid: https://github.com/istanbuljs/istanbul-reports/blob/master/lib/html/index.js#L134-L139
          subdir: 'html'
        },
        lcovonly: {
          // options from here are valid: https://github.com/istanbuljs/istanbul-reports/blob/master/lib/lcovonly/index.js#L7-L10
          file: 'coverage.lcov'
        }
      },
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  }

  if (process.env.TRAVIS) {
    customizableOptions.customLaunchers = {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    customizableOptions.browsers = [
      "Chrome_travis_ci",
    ];
  }

  config.set(customizableOptions);
};
