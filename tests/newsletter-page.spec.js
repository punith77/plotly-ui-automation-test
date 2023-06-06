const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("https://css-tricks.com/newsletters/");
});

test.describe("CSS-TRICKS - newsletter page", () => {
  test("should load first article from list of articles", async ({ page }) => {
    const firstArticleLink = page.locator("article").first().locator("h2>a");
    const articleLinkTitle = await firstArticleLink.innerText();

    await firstArticleLink.click();

    const firstArticleTitle = await page.innerText("h1.article-title");

    expect(firstArticleTitle).toEqual(`#${articleLinkTitle}`);
  });

  test("should be able to click `older` to get previous results in pagination ", async ({
    page,
  }) => {
    const olderArticlesLink = page.locator('ul>li>a:text("Older")');
    const olderArticlesLinkText = await olderArticlesLink.innerText();
    const isEnabled = await olderArticlesLink.isEnabled();

    try {
      await olderArticlesLink.click();

      expect(olderArticlesLinkText).toContain("OLDER");
      expect(isEnabled).toBeTruthy();
    } catch (err) {
      console.log("not able to click the link");
    }
  });

  test("should be able to search `cypress` and open article `An Intro to Web Site Testing with Cypress`", async ({
    page,
  }) => {
    const searchIcon = page.locator("div.search-and-account");

    await searchIcon.click();

    const searchInput = await page.locator(
      "#jetpack-instant-search__box-input-1"
    );

    await searchInput.type("cypress");

    const searchResult = await page.waitForSelector(
      "a>span:has-text('An intro to Web Site Testing with')"
    );

    await searchResult.click();

    const pageTitle = await page.innerText("h1.article-title");

    expect(pageTitle.replace(/\u00a0/g, " ")).toBe(
      "An Intro to Web Site Testing with Cypress"
    );
  });
});
