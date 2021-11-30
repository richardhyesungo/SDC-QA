module.exports = {
  launch: {
    // dumpio: true,
    headless: process.env.HEADLESS !== 'false',
    product: 'chrome',
    // slowMo: 100,
  },
  browserContext: 'default',
};
