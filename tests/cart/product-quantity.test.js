const { initDriver, quitDriver } = require("../../config/driver");
const { baseUrl } = require("../../config/config");
const assert = require("assert");

// Page Objects
const HomePage = require("../../pages/HomePage");
const ProductDetailPage = require("../../pages/ProductDetailPage");
const CartPage = require("../../pages/CartPage");

describe("Test Case: Add product with specific quantity to cart", function () {
  let driver;
  let homePage;
  let productDetailPage;
  let cartPage;

  before(async () => {
    driver = await initDriver();
    homePage = new HomePage(driver, baseUrl);
    productDetailPage = new ProductDetailPage(driver);
    cartPage = new CartPage(driver);
  });

  after(async () => {
    await quitDriver();
  });

  it("Should view product details, set quantity, and add to cart", async function () {
    // 1. Navigate to URL
    await homePage.open();

    // 2. Verify home page is visible
    const homeVisible = await homePage.isHomePageVisible();
    assert.ok(homeVisible, "Home page is not displayed correctly");

    // 4. Click 'View Product' for any product on home page
    await homePage.clickViewProduct();

    // 5. Verify product detail is opened
    const detailVisible = await productDetailPage.isProductDetailVisible();
    assert.ok(detailVisible, "Product detail is not visible!");

    // 6. Increase quantity to 4
    await productDetailPage.setQuantity(4);

    // 7. Click 'Add to cart' button
    await productDetailPage.clickAddToCart();

    // 8. Click 'View Cart' button
    await productDetailPage.clickViewCart();

    // 9. Verify that product is displayed in cart page with exact quantity
    const productInCart = await cartPage.isProductInCart();
    assert.ok(productInCart, "Product is not displayed in the cart!");

    const cartQty = await cartPage.getCartQuantity();
    assert.strictEqual(
      cartQty,
      "4",
      `Expected quantity of 4 but got ${cartQty}`
    );
  });
});
