"use strict";

const path = require("node:path");
const fs = require("node:fs");
const assert = require("node:assert/strict");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

async function submitQuestion(page, text) {
  await page.locator("#question-input").fill(text);
  await page.locator("#question-form").evaluate((form) => form.requestSubmit());
}

async function run() {
  const root = path.resolve(__dirname, "..");
  const outputDir = process.argv[2] || path.resolve(root, "qa");
  fs.mkdirSync(outputDir, { recursive: true });
  const url = process.env.AGENT_URL || pathToFileURL(path.join(root, "index.html")).href;

  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });

  const errors = [];
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  desktop.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  desktop.on("pageerror", (error) => errors.push(error.message));
  await desktop.goto(url, { waitUntil: "load" });
  await desktop.waitForTimeout(350);

  assert.equal(await desktop.locator(".topic-button").count(), 6);
  assert.equal(await desktop.locator(".source-list > *").count(), 3);
  assert.equal(await desktop.locator(".welcome-card").isVisible(), true);
  assert.equal(
    await desktop.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    true,
    "Desktop page has horizontal overflow"
  );
  assert.equal((await desktop.locator("body").innerText()).toLowerCase().includes("codex"), false);
  await desktop.screenshot({ path: path.join(outputDir, "desktop-zh.png"), fullPage: true });

  await submitQuestion(desktop, "某长度由两段相加，两段独立标准不确定度分别为0.2 mm和0.3 mm，请计算合成标准不确定度。");
  await desktop.locator(".message-title").last().waitFor({ state: "visible" });
  assert.match(await desktop.locator(".message-content").last().innerText(), /0\.361/);

  await desktop.locator("#rss-values").fill("0.2, 0.3, 0.4");
  await desktop.locator("#calculator-form").evaluate((form) => form.requestSubmit());
  assert.match(await desktop.locator("#calculator-result").innerText(), /0\.539 mm/);

  await desktop.locator("#language-toggle").click();
  assert.equal(await desktop.locator("html").getAttribute("lang"), "en");
  assert.match(await desktop.locator("#page-title").innerText(), /Error Propagation Lab/);
  assert.match(await desktop.locator("#question-input").getAttribute("placeholder"), /Ask/);
  assert.match(await desktop.locator(".welcome-card").innerText(), /State the conditions/);
  await desktop.waitForTimeout(300);
  await desktop.screenshot({ path: path.join(outputDir, "desktop-en.png"), fullPage: true });

  await desktop.locator("#open-settings").click();
  assert.equal(await desktop.locator("#settings-dialog").evaluate((dialog) => dialog.open), true);
  assert.equal(await desktop.locator("#api-provider").inputValue(), "deepseek");
  assert.equal(await desktop.locator("#api-model").inputValue(), "deepseek-chat");
  await desktop.screenshot({ path: path.join(outputDir, "settings-en.png"), fullPage: false });
  await desktop.locator("#api-key").fill("sk-local-ui-test");
  await desktop.locator("#use-api").check();

  let apiCallCount = 0;
  await desktop.route("https://api.deepseek.com/chat/completions", async (route) => {
    apiCallCount += 1;
    const payload = route.request().postDataJSON();
    assert.equal(payload.model, "deepseek-chat");
    assert.equal(payload.stream, false);
    assert.equal(payload.messages[0].role, "system");
    assert.match(payload.messages.at(-1).content, /Relevant course cards/);
    if (apiCallCount === 1) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          choices: [{
            message: {
              role: "assistant",
              content: "**DeepSeek answer**\n\nCorrelated components require a covariance term when their dependence is material."
            }
          }]
        })
      });
    } else {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: { message: "Synthetic test failure" } })
      });
    }
  });

  await desktop.locator("#save-settings").click();
  await submitQuestion(desktop, "Explain correlated uncertainty.");
  await desktop.locator(".api-message").waitFor({ state: "visible" });
  assert.match(await desktop.locator(".api-message").innerText(), /DeepSeek answer/);
  assert.match(await desktop.locator("#engine-pill").innerText(), /DeepSeek/);
  await desktop.waitForTimeout(350);
  await desktop.screenshot({ path: path.join(outputDir, "api-success.png"), fullPage: true });

  await submitQuestion(desktop, "What should an uncertainty budget table contain?");
  await desktop.locator(".fallback-notice").last().waitFor({ state: "visible" });
  assert.match(await desktop.locator(".fallback-notice").last().innerText(), /Synthetic test failure/);
  assert.equal(apiCallCount, 2);

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  mobile.on("console", (message) => {
    if (message.type() === "error") errors.push(`mobile: ${message.text()}`);
  });
  mobile.on("pageerror", (error) => errors.push(`mobile: ${error.message}`));
  await mobile.goto(url, { waitUntil: "load" });
  await mobile.waitForTimeout(350);
  assert.equal(
    await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    true,
    "Mobile page has horizontal overflow"
  );
  assert.equal(await mobile.locator(".hero-visual img").isVisible(), true);
  await mobile.screenshot({ path: path.join(outputDir, "mobile-zh.png"), fullPage: true });

  await mobile.locator("#language-toggle").click();
  assert.equal(await mobile.locator("html").getAttribute("lang"), "en");
  await mobile.locator("#open-settings").click();
  assert.equal(await mobile.locator("#settings-dialog").evaluate((dialog) => dialog.open), true);
  await mobile.screenshot({ path: path.join(outputDir, "mobile-settings-en.png"), fullPage: false });
  await mobile.locator("#close-settings").click();

  await submitQuestion(mobile, "What is the difference between error and uncertainty?");
  await mobile.locator(".message-title").last().waitFor({ state: "visible" });
  assert.match(await mobile.locator(".message-content").last().innerText(), /signed deviation/i);
  await mobile.screenshot({ path: path.join(outputDir, "mobile-en-answer.png"), fullPage: true });

  await browser.close();
  const unexpectedErrors = errors.filter((message) => !message.includes("status of 500"));
  assert.deepEqual(unexpectedErrors, [], `Browser errors: ${unexpectedErrors.join(" | ")}`);
  console.log(`PASS bilingual desktop/mobile UI, local answer, calculators, API success, and fallback. Screenshots: ${outputDir}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
