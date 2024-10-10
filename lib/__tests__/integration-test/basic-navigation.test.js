const portfinder = require("portfinder");
const puppeteer = require("puppeteer");
const app = require("../../../src/meadowlark.js");

let server = null;
let port = null;
beforeEach(async () => {
  port = await portfinder.getPortPromise();
  server = app.listen(port);
});
afterEach(() => {
  server.close();
});
test("strona domowa umożliwia przejście do strony O nas", async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`);
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-test-id="about"]'),
  ]);
  expect(page.url()).toBe(`http://localhost:${port}/about`);
  await browser.close();
});
