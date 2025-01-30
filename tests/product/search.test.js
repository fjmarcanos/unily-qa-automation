const { initDriver, quitDriver } = require("../../config/driver");
const { baseUrl } = require("../../config/config");
const assert = require("assert");

// Page Objects
const HomePage = require("../../pages/HomePage");
const ProductsPage = require("../../pages/ProductsPage");

describe("Product search", function () {
  let driver;
  let homePage;
  let productsPage;

  before(async () => {
    driver = await initDriver();
    homePage = new HomePage(driver, baseUrl);
    productsPage = new ProductsPage(driver);
  });

  after(async () => {
    await quitDriver();
  });

  it("Should search for a product and display related results", async function () {
    // 2. Navigate to the URL
    await homePage.open();

    // 3. Verify that the home page is successfully visible
    const isVisible = await homePage.isHomePageVisible();
    assert.ok(isVisible, "Home page is not displayed correctly");

    // 4. Click on the 'Products' button
    const productsLink = await homePage.getProductsLink();
    await productsLink.click();

    // 5. Verify the user is navigated to the ALL PRODUCTS page
    const allProductsTitle = await productsPage.getAllProductsTitle();
    assert.ok(
      await allProductsTitle.isDisplayed(),
      "Not on the ALL PRODUCTS page"
    );

    // 6. Enter the product name in the search input and click the search button
    const searchInput = await productsPage.getSearchInput();
    await searchInput.sendKeys("shirt");

    const searchButton = await productsPage.getSearchButton();
    await searchButton.click();

    // 7. Verify 'SEARCHED PRODUCTS' is visible
    const searchedProductsTitle = await productsPage.getSearchedProductsTitle();
    assert.ok(
      await searchedProductsTitle.isDisplayed(),
      '"SEARCHED PRODUCTS" is not displayed'
    );

    // 8. Verify all the products related to the search are visible
    const productElements = await productsPage.getProductNames();
    for (const productElement of productElements) {
      const productText = await productElement.getText();
      assert.ok(
        productText.toLowerCase().includes("shirt"),
        `The product "${productText}" does not contain the word "shirt"`
      );
    }
  });
});
