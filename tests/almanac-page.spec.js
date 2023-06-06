const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("https://css-tricks.com/almanac/");
});

test.describe("CSS-TRICKS - almanac page", () => {
  test("should have background property and showl copdepen iframe with html content ", async ({
    page,
  }) => {
    // test.slow();
    const backgroundPropertyLink = page.locator(
      'ol>li>a:text-is("background")'
    );
    const backgroundPropertyLinkText = await backgroundPropertyLink.innerText();

    await backgroundPropertyLink.click();

    const demoSection = page.locator("h3#demo");

    expect(demoSection).toHaveCount(1);

    const iframeElement = page.frameLocator("#cp_embed_emBzRd");
    const iframeHTMLTab = await iframeElement.locator(
      "ul>li.code-type>a#html-link"
    );

    await iframeHTMLTab.click();

    const htmlCodeBox = await iframeElement.locator("#html-box");

    expect(htmlCodeBox).toBeTruthy();
    expect(backgroundPropertyLinkText).toEqual("background");
  });
});
