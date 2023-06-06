const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("https://css-tricks.com/");
});

test.describe("CSS-TRICKS - home page", () => {
  test("should load home page with newletter and almanac navbar links", async ({
    page,
  }) => {
    const newletterLinkText = await page
      .locator("nav.main-nav>ul>li.newsletter>a")
      .textContent();
    const almanacLinkText = await page
      .locator("nav.main-nav>ul>li.almanac>a")
      .textContent();

    expect(newletterLinkText.trim()).toBe("Newsletter");
    expect(almanacLinkText.trim()).toBe("Almanac");
  });

  test("should navigate to Newsletter page on clicking on main nav bar newsletter link", async ({
    page,
  }) => {
    const newletterLink = await page.locator("nav.main-nav>ul>li.newsletter>a");

    await newletterLink.click();

    const pageTitle = await page.innerText("h1.page-title");

    expect(page.url()).toEqual("https://css-tricks.com/newsletters/");
    expect(pageTitle).toEqual("NEWSLETTERS");
  });

  test("should navigate to Almanac page on clicking on main nav bar almanac link", async ({
    page,
  }) => {
    const almanacLink = await page.locator("nav.main-nav>ul>li.almanac>a");

    await almanacLink.click();

    const pageTitle = await page.innerText("h1.page-title");

    expect(page.url()).toEqual("https://css-tricks.com/almanac/");
    expect(pageTitle).toEqual("ALMANAC");
  });
});
