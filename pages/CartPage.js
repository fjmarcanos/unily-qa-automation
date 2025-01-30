const { By, until } = require("selenium-webdriver");

class CartPage {
  constructor(driver) {
    this.driver = driver;

    // Locators
    this.cartRows = By.css("tbody tr[id^='product-']");
    this.priceSelector = By.css("td.cart_price p");
    this.quantitySelector = By.css("td.cart_quantity button.disabled");
    this.totalSelector = By.css("td.cart_total p.cart_total_price");
    this.cartProductRow = By.css("tr[id^='product-']");
    this.cartQuantity = By.css("td.cart_quantity button.disabled");
  }

  async getNumberOfCartRows() {
    const rows = await this.driver.wait(
      until.elementsLocated(this.cartRows),
      5000
    );
    return rows.length;
  }

  /**
   * Returns an array of objects with { price, quantity, total } for each row.
   */
  async getCartItemsData() {
    const rows = await this.driver.wait(
      until.elementsLocated(this.cartRows),
      5000
    );

    const cartData = [];
    for (const row of rows) {
      const priceElm = await row.findElement(this.priceSelector);
      const qtyElm = await row.findElement(this.quantitySelector);
      const totalElm = await row.findElement(this.totalSelector);

      const priceText = await priceElm.getText();
      const qtyText = await qtyElm.getText();
      const totalText = await totalElm.getText();

      cartData.push({
        price: priceText,
        quantity: qtyText,
        total: totalText,
      });
    }
    return cartData;
  }

  async isProductInCart() {
    const row = await this.driver.wait(
      until.elementLocated(this.cartProductRow),
      5000,
      "No product row found in cart"
    );

    await this.driver.wait(
      until.elementIsVisible(row),
      5000,
      "Product row found but never became visible"
    );

    return row.isDisplayed();
  }

  async getCartQuantity() {
    const qtyElement = await this.driver.wait(
      until.elementLocated(this.cartQuantity),
      5000,
      "Quantity element not found in cart"
    );

    await this.driver.wait(
      until.elementIsVisible(qtyElement),
      5000,
      "Quantity element is located but never became visible"
    );

    return qtyElement.getText();
  }
}

module.exports = CartPage;
