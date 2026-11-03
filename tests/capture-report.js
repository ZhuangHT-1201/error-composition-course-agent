"use strict";

const path = require("node:path");
const fs = require("node:fs");
const { chromium } = require("playwright");

async function run() {
  const outputDir = path.resolve(__dirname, "..", "..", "report-assets");
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto("https://zhuanght-1201.github.io/error-composition-course-agent/", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 510));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outputDir, "interface.png"), fullPage: false });

  await page.locator("#question-input").fill("误差和不确定度有什么区别？");
  await page.locator("#question-form").evaluate((form) => form.requestSubmit());
  await page.locator(".message-title").last().waitFor({ state: "visible" });
  await page.locator(".chat-card").screenshot({ path: path.join(outputDir, "chat-answer.png") });
  await browser.close();
  console.log(outputDir);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
