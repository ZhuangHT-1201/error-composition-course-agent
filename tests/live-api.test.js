"use strict";

const path = require("node:path");
const fs = require("node:fs");
const { chromium } = require("playwright");

function askSecret() {
  return new Promise((resolve, reject) => {
    process.stdout.write("API_KEY> ");
    process.stdin.setEncoding("utf8");
    process.stdin.setRawMode(true);
    process.stdin.resume();
    let value = "";

    const cleanup = () => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stdin.removeListener("data", onData);
      process.stdout.write("\n");
    };

    const onData = (chunk) => {
      for (const char of chunk) {
        if (char === "\u0003") {
          cleanup();
          reject(new Error("Cancelled"));
          return;
        }
        if (char === "\r" || char === "\n") {
          cleanup();
          resolve(value.trim());
          return;
        }
        if (char === "\u007f" || char === "\b") {
          value = value.slice(0, -1);
        } else {
          value += char;
        }
      }
    };

    process.stdin.on("data", onData);
  });
}

async function run() {
  const key = await askSecret();
  if (!key) throw new Error("No API key supplied");

  const outputDir = path.resolve(__dirname, "..", "..", "report-assets");
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  const unexpectedErrors = [];
  page.on("pageerror", (error) => unexpectedErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") unexpectedErrors.push(message.text());
  });

  const started = Date.now();
  await page.goto("https://zhuanght-1201.github.io/error-composition-course-agent/", { waitUntil: "networkidle" });
  await page.locator("#open-settings").click();
  await page.locator("#api-key").fill(key);
  await page.locator("#use-api").check();
  await page.locator("#test-api").click();

  await page.waitForFunction(() => {
    const status = document.querySelector("#dialog-status");
    return status && (status.classList.contains("success") || status.classList.contains("error"));
  }, { timeout: 60000 });

  const testStatus = await page.locator("#dialog-status").innerText();
  const testIsSuccess = await page.locator("#dialog-status").evaluate((node) => node.classList.contains("success"));
  if (!testIsSuccess) {
    await browser.close();
    throw new Error(`Connection test failed: ${testStatus}`);
  }

  await page.locator("#save-settings").click();
  await page.locator("#question-input").fill("用一句话说明测量误差和测量不确定度的区别，并写出最关键的适用提醒。");
  await page.locator("#question-form").evaluate((form) => form.requestSubmit());

  await page.waitForFunction(() => {
    return document.querySelector(".api-message") || document.querySelector(".fallback-notice");
  }, { timeout: 60000 });
  const apiMessage = page.locator(".api-message").last();

  if (await apiMessage.count()) {
    const answer = (await apiMessage.innerText()).trim();
    if (!answer) throw new Error("DeepSeek returned an empty rendered answer");
    await page.waitForTimeout(350);
    await page.locator(".chat-card").screenshot({ path: path.join(outputDir, "api-live-answer.png") });
    await apiMessage.screenshot({ path: path.join(outputDir, "api-live-crop.png") });
    console.log(`LIVE_API_PASS latency_ms=${Date.now() - started} answer_chars=${answer.length}`);
  } else {
    const fallback = await page.locator(".fallback-notice").last().innerText();
    await browser.close();
    throw new Error(`API chat failed and used local fallback: ${fallback}`);
  }

  await browser.close();
  const ignoredNetworkErrors = unexpectedErrors.filter((message) => !/Failed to load resource/.test(message));
  if (ignoredNetworkErrors.length) {
    throw new Error(`Unexpected browser errors: ${ignoredNetworkErrors.join(" | ")}`);
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
