const config = require('./protractor.conf').config;

config.capabilities = {
  directConnect: true,
  browserName: 'chrome',
  chromeOptions: {args: ["--headless", "--disable-gpu", "--window-size=800x600", "--no-sandbox"]}
};

exports.config = config;