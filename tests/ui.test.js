"use strict";

const path = require("node:path");
const fs = require("node:fs");
const assert = require("node:assert/strict");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

async function run() {
  const root = path.resolve(__dirname, "..");
  const outputDir = process.argv[2] || path.resolve(root, "qa");
  fs.mkdirSync(outputDir, { recursive: true });
  const url = pathToFileURL(path.join(root, "index.html")).href;

  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });

  const errors = [];
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  desktop.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  desktop.on("pageerror", (error) => errors.push(error.message));
  await desktop.goto(url, { waitUntil: "load" });
  await desktop.screenshot({ path: path.join(outputDir, "desktop-initial.png"), fullPage: true });

  assert.equal(await desktop.locator(".topic-button").count(), 6);
  assert.equal(await desktop.locator(".source-list > *").count(), 3);
  assert.equal(
    await desktop.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    true,
    "Desktop page has horizontal overflow"
  );

  await desktop.locator("#question-input").fill("某长度由两段相加，两段独立标准不确定度分别为0.2 mm和0.3 mm，请计算合成标准不确定度。");
  await desktop.locator("#question-form").evaluate((form) => form.requestSubmit());
  await desktop.locator(".message-title").last().waitFor({ state: "visible" });
  assert.match(await desktop.locator(".message-title").last().textContent(), /平方合成/);
  assert.match(await desktop.locator(".message-headline").last().textContent(), /0\.361/);
  await desktop.screenshot({ path: path.join(outputDir, "desktop-answer.png"), fullPage: true });

  await desktop.locator("#component-values").fill("0.2, 0.3, 0.4");
  await desktop.locator("#calculator-form").evaluate((form) => form.requestSubmit());
  assert.match(await desktop.locator("#calculator-result").textContent(), /0\.539 mm/);

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  mobile.on("console", (message) => {
    if (message.type() === "error") errors.push(`mobile: ${message.text()}`);
  });
  mobile.on("pageerror", (error) => errors.push(`mobile: ${error.message}`));
  await mobile.goto(url, { waitUntil: "load" });
  assert.equal(
    await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    true,
    "Mobile page has horizontal overflow"
  );
  assert.equal(await mobile.locator(".topic-button").first().isVisible(), true);
  await mobile.screenshot({ path: path.join(outputDir, "mobile-initial.png"), fullPage: true });

  await mobile.locator("#question-input").fill("误差和不确定度有什么区别？");
  await mobile.locator("#question-form").evaluate((form) => form.requestSubmit());
  await mobile.locator(".message-title").last().waitFor({ state: "visible" });
  await mobile.screenshot({ path: path.join(outputDir, "mobile-answer.png"), fullPage: true });

  await browser.close();
  assert.deepEqual(errors, [], `Browser errors: ${errors.join(" | ")}`);
  console.log(`PASS desktop and mobile UI checks. Screenshots: ${outputDir}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
