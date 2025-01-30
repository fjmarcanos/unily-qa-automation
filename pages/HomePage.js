const { By, until } = require("selenium-webdriver");

class HomePage {
  constructor(driver, baseUrl) {
    this.driver = driver;
    this.baseUrl = baseUrl;

    // Locators
    this.headerLogo = By.css("div.logo img");
    this.productsLink = By.xpath("//a[contains(text(),'Products')]");
    this.firstViewProductLink = By.css("a[href='/product_details/1']");
  }

  async open() {
    await this.driver.get(this.baseUrl);
  }

  // Getters
  async getHeaderLogo() {
    return this.driver.findElement(this.headerLogo);
  }

  async getProductsLink() {
    return this.driver.findElement(this.productsLink);
  }

  // Actions
  async isHomePageVisible() {
    // Wait until the logo is present
    const logoElement = await this.driver.wait(
      until.elementLocated(this.headerLogo),
      5000
    );
    return logoElement.isDisplayed();
  }

  async clickViewProduct() {
    const viewProductLink = await this.driver.wait(
      until.elementLocated(this.firstViewProductLink),
      5000,
      "View Product link not located"
    );
    await viewProductLink.click();
  }
}

module.exports = HomePage;
