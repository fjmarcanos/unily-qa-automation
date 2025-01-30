const { Builder } = require("selenium-webdriver");

let driver;

async function initDriver() {
  if (!driver) {
    driver = await new Builder().forBrowser("chrome").build();
  }
  return driver;
}

async function quitDriver() {
  if (driver) {
    await driver.quit();
    driver = null;
  }
}

module.exports = {
  initDriver,
  quitDriver,
};
