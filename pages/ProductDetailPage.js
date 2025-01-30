const { By, until } = require("selenium-webdriver");

class ProductDetailPage {
  constructor(driver) {
    this.driver = driver;

    this.productDetailHeading = By.xpath(
      "//div[@class='product-information']/h2"
    );
    this.quantityInput = By.id("quantity");
    this.addToCartButton = By.css("button[class*='cart']");
    this.viewCartButton = By.xpath(
      "//div[@class='modal-content']//a[@href='/view_cart']"
    );
  }

  async isProductDetailVisible() {
    const heading = await this.driver.wait(
      until.elementLocated(this.productDetailHeading),
      5000,
      "Product detail heading not located"
    );
    return heading.isDisplayed();
  }

  async setQuantity(num) {
    const quantityField = await this.driver.wait(
      until.elementLocated(this.quantityInput),
      5000,
      "Quantity input not found"
    );
    await quantityField.clear();
    await quantityField.sendKeys(String(num));
  }

  async clickAddToCart() {
    const addBtn = await this.driver.wait(
      until.elementLocated(this.addToCartButton),
      5000,
      "Add to cart button not located"
    );
    await addBtn.click();
  }

  async clickViewCart() {
    const viewCartBtn = await this.driver.wait(
      until.elementLocated(this.viewCartButton),
      5000,
      "View Cart button not found in the modal"
    );

    await this.driver.wait(
      until.elementIsVisible(viewCartBtn),
      5000,
      "View Cart button is located but never became visible"
    );

    await viewCartBtn.click();
  }
}

module.exports = ProductDetailPage;
