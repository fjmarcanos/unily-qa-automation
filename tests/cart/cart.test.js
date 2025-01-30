const { initDriver, quitDriver } = require("../../config/driver");
const { baseUrl } = require("../../config/config");
const assert = require("assert");

// Page Objects
const HomePage = require("../../pages/HomePage");
const ProductsPage = require("../../pages/ProductsPage");
const CartPage = require("../../pages/CartPage");

describe("Add products to cart and verify", function () {
  let driver;
  let homePage;
  let productsPage;
  let cartPage;

  before(async () => {
    driver = await initDriver();
    homePage = new HomePage(driver, baseUrl);
    productsPage = new ProductsPage(driver);
    cartPage = new CartPage(driver);
  });

  after(async () => {
    await quitDriver();
  });

  it("Should add two products to cart and verify details", async function () {
    // 1. Navigate to URL
    await homePage.open();

    // 2. Verify home page is visible
    const homeVisible = await homePage.isHomePageVisible();
    assert.ok(homeVisible, "Home page is not displayed correctly");

    // 3. Click 'Products'
    const productsLink = await homePage.getProductsLink();
    await productsLink.click();

    // 4. Hover over product #1 and add to cart
    await productsPage.hoverProductAndAddToCart(1);

    // 5. Click 'Continue Shopping'
    await productsPage.clickContinueShopping();

    // 6. Hover over product #2 and add to cart
    await productsPage.hoverProductAndAddToCart(2);

    // 7. Click 'View Cart'
    await productsPage.clickViewCart();

    // 8. Verify both products are added to cart
    const rowCount = await cartPage.getNumberOfCartRows();
    assert.strictEqual(
      rowCount,
      2,
      `Expected 2 products in cart, found ${rowCount}`
    );

    // 10. Verify their prices, quantity, and total
    const cartItemsData = await cartPage.getCartItemsData();
    cartItemsData.forEach((item, index) => {
      console.log(`Cart Row ${index + 1}`, item);
      assert.ok(item.price.length > 0, `Price is empty for row ${index + 1}`);
      assert.ok(
        item.quantity.length > 0,
        `Quantity is empty for row ${index + 1}`
      );
      assert.ok(item.total.length > 0, `Total is empty for row ${index + 1}`);
    });
  });
});
