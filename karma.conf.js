/* eslint-env node */
module.exports = config => {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'client/tests/setup.js',
      'client/tests/**/*Tests.js'
    ],
    preprocessors: { ['client/tests/**/*.js']: ['webpack'] },
    webpack: require('./webpack.config'),
    webpackMiddleware: { stats: 'errors-only' },
    browsers: ['Chrome'],
    browserNoActivityTimeout: 600000,
    reporters: ['spec'],
    autoWatch: false,
    singleRun: true
  });
};
