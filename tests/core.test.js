"use strict";

const assert = require("node:assert/strict");
const kb = require("../knowledge.js");
const core = require("../core.js");

assert.equal(kb.entries.length, 22);
assert.equal(Object.keys(kb.sources).length, 3);
assert.equal(kb.entries.every((entry) => entry.title.zh && entry.title.en), true);

const cases = [
  {
    query: "测量误差的定义是什么？",
    language: "zh",
    check: (result) => {
      assert.equal(result.id, "basic_error");
      assert.match(result.headline, /参考量值/);
    }
  },
  {
    query: "一句话说明测量不确定度是什么。",
    language: "zh",
    check: (result) => {
      assert.equal(result.id, "uncertainty");
      assert.equal(result.tier, "brief");
    }
  },
  {
    query: "What is the difference between measurement error and uncertainty?",
    language: "en",
    check: (result) => {
      assert.equal(result.id, "error_vs_uncertainty");
      assert.match(result.headline, /signed deviation/);
    }
  },
  {
    query: "某长度由两段相加，两段独立标准不确定度分别为0.2 mm和0.3 mm，请计算合成标准不确定度。",
    language: "zh",
    check: (result) => {
      assert.equal(result.kind, "calculation");
      assert.match(result.headline, /0\.361/);
    }
  },
  {
    query: "相关误差分量为什么不能直接平方合成？",
    language: "zh",
    check: (result) => {
      assert.equal(result.id, "correlation");
    }
  },
  {
    query: "Calculate the relative uncertainty: power P=I^2R, current 0.5%, resistance 1.0%",
    language: "en",
    check: (result) => {
      assert.equal(result.kind, "calculation");
      assert.match(result.headline, /1\.41/);
    }
  },
  {
    query: "帮我写一首关于春天的诗。",
    language: "zh",
    check: (result) => {
      assert.equal(result.kind, "scope");
      assert.match(result.title, /超出/);
    }
  },
  {
    query: "不确定度A类和B类怎样区分？",
    language: "zh",
    check: (result) => {
      assert.equal(result.id, "classes_ab");
      assert.match(result.headline, /统计评定/);
    }
  },
  {
    query: "重复测量6次，单次标准差0.12，平均值的标准不确定度是多少？",
    language: "zh",
    check: (result) => {
      assert.equal(result.kind, "calculation");
      assert.match(result.headline, /0\.049/);
    }
  },
  {
    query: "What should an uncertainty budget table contain?",
    language: "en",
    check: (result) => {
      assert.equal(result.id, "model_budget");
      assert.match(result.headline, /auditable/);
    }
  },
  {
    query: "Do Type A and Type B correspond directly to random and systematic errors?",
    language: "en",
    check: (result) => {
      assert.equal(result.id, "classes_ab");
      assert.match(result.caution, /evaluation methods/);
    }
  },
  {
    query: "Write a short travel guide.",
    language: "en",
    check: (result) => {
      assert.equal(result.kind, "scope");
      assert.match(result.title, /Outside/);
    }
  }
];

cases.forEach((testCase, index) => {
  const result = core.answer(testCase.query, { lang: testCase.language });
  testCase.check(result);
  console.log(`PASS ${index + 1}: ${testCase.query}`);
});

assert.ok(Math.abs(core.calculateRss([0.2, 0.3]) - 0.360555) < 0.00001);
assert.ok(Math.abs(core.calculateRelativePower(0.5, 1.0) - 0.014142) < 0.00001);
assert.ok(Math.abs(core.calculateCorrelated(0.2, 0.2, 1) - 0.4) < 0.00001);
assert.ok(Math.abs(core.calculateMeanUncertainty(0.12, 6) - 0.04899) < 0.0001);
assert.ok(Math.abs(core.calculateExpanded(0.16, 2) - 0.32) < 0.00001);

const apiMessages = core.buildApiMessages(
  "Explain correlated uncertainty.",
  core.answer("Explain correlated uncertainty.", { lang: "en" }),
  core.retrieve("correlated uncertainty", 3),
  "en",
  [{ role: "user", content: "Earlier question" }]
);
assert.equal(apiMessages[0].role, "system");
assert.match(apiMessages.at(-1).content, /Relevant course cards/);
assert.match(apiMessages.at(-1).content, /correlated/i);

console.log("PASS bilingual knowledge base, calculators, and API context");
