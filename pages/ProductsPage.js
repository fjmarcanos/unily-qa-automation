const { By, until } = require("selenium-webdriver");

class ProductsPage {
  constructor(driver) {
    this.driver = driver;

    // Locators
    this.allProductsTitle = By.xpath("//h2[contains(text(), 'All Products')]");
    this.searchInput = By.id("search_product");
    this.searchButton = By.id("submit_search");
    this.searchedProductsTitle = By.xpath(
      "//h2[contains(text(),'Searched Products')]"
    );
    this.productNames = By.css(".productinfo.text-center p");
    this.productContainer = (index) =>
      By.xpath(`(//div[@class='product-image-wrapper'])[${index}]`);
    this.addToCartButton = By.xpath(".//a[contains(@class,'add-to-cart')]");
    this.continueShoppingBtn = By.xpath(
      "//button[contains(text(),'Continue Shopping')]"
    );
    this.viewCartBtn = By.xpath("//u[contains(text(),'View Cart')]");
    this.overlayAddToCartButton = By.xpath(
      ".//div[@class='product-overlay']//a[contains(@class,'add-to-cart')]"
    );
  }

  // Getters
  async getAllProductsTitle() {
    return this.driver.findElement(this.allProductsTitle);
  }

  async getSearchInput() {
    return this.driver.findElement(this.searchInput);
  }

  async getSearchButton() {
    return this.driver.findElement(this.searchButton);
  }

  async getSearchedProductsTitle() {
    return this.driver.findElement(this.searchedProductsTitle);
  }

  async getProductNames() {
    return this.driver.findElements(this.productNames);
  }

  // Actions
  async hoverProductAndAddToCart(index) {
    const productElement = await this.driver.wait(
      until.elementLocated(this.productContainer(index)),
      5000,
      "Product container not found in"
    );

    await this.driver.wait(
      until.elementIsVisible(productElement),
      5000,
      "Product container not visible in"
    );

    await this.driver
      .actions({ bridge: true })
      .move({ origin: productElement })
      .perform();

    const overlayButton = await this.driver.wait(
      until.elementLocated(this.overlayAddToCartButton),
      5000,
      "Overlay Add to Cart button not visible in"
    );

    await this.driver.wait(
      until.elementIsVisible(overlayButton),
      5000,
      "Overlay Add to Cart button is not interactable"
    );

    await overlayButton.click();
  }

  async clickContinueShopping() {
    const continueBtn = await this.driver.wait(
      until.elementLocated(this.continueShoppingBtn),
      5000
    );

    await this.driver.wait(
      until.elementIsEnabled(continueBtn),
      5000,
      "Continue shopping button is not enabled"
    );

    await continueBtn.click();
  }

  async clickViewCart() {
    const viewCartButton = await this.driver.wait(
      until.elementLocated(this.viewCartBtn),
      5000
    );

    await this.driver.wait(
      until.elementIsEnabled(viewCartButton),
      5000,
      "Click view cart button is not enabled"
    );

    await viewCartButton.click();
  }
}

module.exports = ProductsPage;
