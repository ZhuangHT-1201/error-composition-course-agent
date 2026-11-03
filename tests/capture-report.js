"use strict";

const path = require("node:path");
const fs = require("node:fs");
const { pathToFileURL } = require("node:url");
const { chromium } = require("playwright");

async function run() {
  const outputDir = path.resolve(__dirname, "..", "..", "report-assets");
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  await page.goto("https://zhuanght-1201.github.io/error-composition-course-agent/", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outputDir, "interface.png"), fullPage: false });

  await page.locator("#open-settings").click();
  await page.waitForTimeout(200);
  await page.evaluate(() => {
    const dialog = document.querySelector("#settings-dialog");
    dialog.style.borderRadius = "0";
    dialog.style.boxShadow = "none";
  });
  await page.locator("#settings-dialog").screenshot({ path: path.join(outputDir, "settings.png") });
  await page.locator("#close-settings").click();

  await page.locator("#question-input").fill("误差和不确定度有什么区别？");
  await page.locator("#question-form").evaluate((form) => form.requestSubmit());
  await page.locator(".message-title").last().waitFor({ state: "visible" });
  await page.waitForTimeout(250);
  await page.locator(".chat-card").screenshot({ path: path.join(outputDir, "chat-answer.png") });

  const architecture = await browser.newPage({ viewport: { width: 1120, height: 490 }, deviceScaleFactor: 1 });
  const architecturePath = path.resolve(__dirname, "..", "assets", "architecture.svg");
  await architecture.goto(pathToFileURL(architecturePath).href, { waitUntil: "load" });
  await architecture.screenshot({ path: path.join(outputDir, "architecture.png"), fullPage: false });
  await browser.close();
  console.log(outputDir);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
