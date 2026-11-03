"use strict";

const assert = require("node:assert/strict");
const core = require("../core.js");

const cases = [
  {
    query: "测量误差的定义是什么？",
    check: (result) => {
      assert.equal(result.id, "basic_error");
      assert.match(result.headline, /参考量值/);
    }
  },
  {
    query: "一句话说明测量不确定度是什么。",
    check: (result) => {
      assert.equal(result.id, "uncertainty");
      assert.equal(result.tier, "brief");
    }
  },
  {
    query: "误差和不确定度有什么区别？",
    check: (result) => {
      assert.equal(result.id, "error_vs_uncertainty");
    }
  },
  {
    query: "某长度由两段相加，两段独立标准不确定度分别为0.2 mm和0.3 mm，请计算合成标准不确定度。",
    check: (result) => {
      assert.equal(result.kind, "calculation");
      assert.match(result.headline, /0\.361/);
    }
  },
  {
    query: "相关误差分量为什么不能直接平方合成？",
    check: (result) => {
      assert.equal(result.id, "correlated");
    }
  },
  {
    query: "功率 P=I²R，若电流和电阻的相对标准不确定度分别为0.5%和1.0%，计算功率的相对标准不确定度。",
    check: (result) => {
      assert.equal(result.kind, "calculation");
      assert.match(result.headline, /1\.41/);
    }
  },
  {
    query: "帮我写一首关于春天的诗。",
    check: (result) => {
      assert.equal(result.kind, "scope");
      assert.match(result.title, /超出/);
    }
  }
];

cases.forEach((testCase, index) => {
  const result = core.answer(testCase.query);
  testCase.check(result);
  console.log(`PASS ${index + 1}: ${testCase.query}`);
});

assert.ok(Math.abs(core.calculateRss([0.2, 0.3]) - 0.360555) < 0.00001);
assert.ok(Math.abs(core.calculateRelativePower(0.5, 1.0) - 0.014142) < 0.00001);
console.log("PASS calculator");
