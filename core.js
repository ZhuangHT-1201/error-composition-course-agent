(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("./knowledge.js").entries, require("./knowledge.js").sources);
  } else {
    root.AgentCore = factory(root.AGENT_KB.entries, root.AGENT_KB.sources);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (entries, sources) {
  const scopeWords = [
    "误差", "不确定度", "合成", "灵敏系数", "标准差", "置信", "校准", "分辨力",
    "重复测量", "系统误差", "随机误差", "测量模型", "A类", "B类", "扩展不确定度",
    "覆盖因子", "相关性", "协方差", "修约", "准确度", "精密度"
  ];

  const obviousOutOfScope = [
    "天气", "股票", "菜谱", "星座", "翻译下面", "写一首", "写诗", "作文", "旅游",
    "电影", "游戏攻略", "程序代码", "历史事件", "政治", "医疗诊断"
  ];

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[，。！？、；：,!?;:()[\]{}"'“”‘’<>《》【】]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function toBigrams(text) {
    const compact = text.replace(/\s+/g, "");
    const result = new Set();
    for (let i = 0; i < compact.length - 1; i += 1) {
      result.add(compact.slice(i, i + 2));
    }
    return result;
  }

  function scoreEntry(entry, query) {
    const q = normalize(query);
    const title = normalize(entry.title);
    const bag = normalize([
      entry.title,
      ...entry.keywords,
      entry.short,
      ...(entry.detail || [])
    ].join(" "));
    let score = 0;

    entry.keywords.forEach((keyword) => {
      const k = normalize(keyword);
      if (!k) return;
      if (q.includes(k)) score += k.length >= 4 ? 8 : 5;
      if (k.includes(q) && q.length >= 3) score += 3;
    });

    if (q.includes(title)) score += 12;
    if (title.includes(q) && q.length >= 4) score += 5;

    const qBigrams = toBigrams(q);
    const bagBigrams = toBigrams(bag);
    let overlap = 0;
    qBigrams.forEach((token) => {
      if (bagBigrams.has(token)) overlap += 1;
    });
    score += overlap * 0.55;

    const domainHits = scopeWords.filter((word) => q.includes(normalize(word))).length;
    score += domainHits * 0.35;
    return score;
  }

  function detectLayer(query, preferredMode) {
    if (preferredMode === "brief" || preferredMode === "detail") return preferredMode;
    const q = normalize(query);
    if (/一句话|简短|概括|精炼|先说结论|速答/.test(q)) return "brief";
    if (/详细|展开|深入|原理|推导|为什么|完整/.test(q)) return "detail";
    return "standard";
  }

  function extractNumbers(text) {
    const matches = String(text).match(/-?\d+(?:\.\d+)?/g);
    if (!matches) return [];
    return matches.map(Number).filter(Number.isFinite);
  }

  function roundSmart(value, significant = 3) {
    if (!Number.isFinite(value) || value === 0) return "0";
    const magnitude = Math.floor(Math.log10(Math.abs(value)));
    const decimals = Math.max(0, Math.min(8, significant - magnitude - 1));
    return Number(value.toFixed(decimals)).toString();
  }

  function formulaCalculation(query) {
    const q = normalize(query);
    if (!/(计算|算一下|合成|结果是多少|求出)/.test(q)) return null;
    if (/(相关|相关系数|协方差|同源)/.test(q)) return null;

    if (/功率/.test(q) && /电流/.test(q) && /电阻/.test(q) && /%|百分/.test(q)) {
      const firstUncertainty = q.indexOf("不确定度");
      const tail = q.slice(firstUncertainty >= 0 ? firstUncertainty : 0);
      const values = extractNumbers(tail).slice(0, 2);
      if (values.length === 2) {
        const current = values[0] / 100;
        const resistance = values[1] / 100;
        const relative = Math.sqrt(Math.pow(2 * current, 2) + Math.pow(resistance, 2));
        return {
          kind: "calculation",
          title: "P = I²R 的相对不确定度",
          headline: `按独立模型计算，功率的相对标准不确定度约为 ${roundSmart(relative * 100)}%。`,
          bullets: [
            "电流在功率模型中取二次方，灵敏系数贡献为 2u(I)。",
            `代入得 sqrt((2×${roundSmart(values[0])}%)² + (${roundSmart(values[1])}%)²) = ${roundSmart(relative * 100)}%。`,
            "若题目要求绝对标准不确定度，再乘以功率的估计值。"
          ],
          formula: "u_rel(P) = sqrt((2u_rel(I))^2 + (u_rel(R))^2)",
          caution: "该结果以电流与电阻相互独立为前提；若二者使用同一源或存在明显相关，应补充相关系数。",
          sources: ["gum", "jjf"],
          tier: detectLayer(query)
        };
      }
    }

    if (/(两段|相加|长度|厚度|质量|和值|求和)/.test(q) && /不确定度/.test(q)) {
      const firstUncertainty = q.indexOf("不确定度");
      const tail = q.slice(firstUncertainty >= 0 ? firstUncertainty : 0);
      const values = extractNumbers(tail).slice(0, 4).map(Math.abs);
      if (values.length >= 2) {
        const combined = Math.sqrt(values.reduce((sum, value) => sum + value * value, 0));
        return {
          kind: "calculation",
          title: "独立分量平方合成",
          headline: `若这些分量的灵敏系数均为 1，合成标准不确定度为 ${roundSmart(combined)}。`,
          bullets: [
            `计算过程为 sqrt(${values.map((v) => `${roundSmart(v)}²`).join(" + ")})。`,
            "合成时保留题目的单位，结果位于各分量同一量纲。",
            "若实际模型不是简单相加，应先用偏导数确定灵敏系数。"
          ],
          formula: "u_c = sqrt(u_1^2 + u_2^2 + ...)",
          caution: "计算假定各分量相互独立。题目若给出相关条件，需要加入协方差项。",
          sources: ["gum", "jjf"],
          tier: detectLayer(query)
        };
      }
    }
    return null;
  }

  function makeScopeReply(kind) {
    if (kind === "domain") {
      return {
        kind: "scope",
        title: "需要进一步限定问题",
        headline: "这个问题落在课程范围内，但我还不能可靠判断你要问哪一个概念。请补充测量模型、相关条件或具体数值。",
        bullets: [
          "可以问：独立误差怎样合成、相关分量怎样处理、平均值的不确定度怎样计算。",
          "也可以给出具体表达式，例如长度由两段相加，已有各段标准不确定度。",
          "如果题目包含百分比或不同单位，请一并写出，避免计算结果失真。"
        ],
        formula: "",
        caution: "",
        sources: [],
        tier: "standard"
      };
    }
    return {
      kind: "scope",
      title: "超出本智能体的知识范围",
      headline: "我当前只回答测量误差与不确定度合成相关问题。这个问题不在课程知识库范围内，我不能据此给出可信答案。",
      bullets: [
        "可以改为询问误差合成步骤、独立与相关分量、A 类与 B 类评定或扩展不确定度。",
        "如果你提供具体的测量模型，我也可以帮助你判断灵敏系数和合成条件。"
      ],
      formula: "",
      caution: "",
      sources: [],
      tier: "standard"
    };
  }

  function answer(query, options) {
    const text = String(query || "").trim();
    if (!text) {
      return {
        kind: "scope",
        title: "请先输入问题",
        headline: "可以输入一个课程问题，也可以直接选择页面中的示例问题。",
        bullets: [],
        formula: "",
        caution: "",
        sources: [],
        tier: "standard"
      };
    }

    const q = normalize(text);
    if (obviousOutOfScope.some((word) => q.includes(normalize(word)))) {
      return makeScopeReply("out");
    }

    const calculated = formulaCalculation(text);
    if (calculated) return calculated;

    const ranked = entries
      .map((entry) => ({ entry, score: scoreEntry(entry, text) }))
      .sort((a, b) => b.score - a.score);

    if (!ranked.length || ranked[0].score < 2.2) {
      const inDomain = scopeWords.some((word) => q.includes(normalize(word)));
      return makeScopeReply(inDomain ? "domain" : "out");
    }

    if (/(误差|不确定度)/.test(q) && /(区别|不同)/.test(q) && /(误差)/.test(q) && /(不确定度)/.test(q)) {
      const entry = entries.find((item) => item.id === "error_vs_uncertainty");
      return formatEntry(entry, detectLayer(text, options && options.mode));
    }

    if (/(相关|协方差|相关系数|不独立)/.test(q)) {
      const entry = entries.find((item) => item.id === "correlated");
      return formatEntry(entry, detectLayer(text, options && options.mode));
    }

    if (/(a\s*类|b\s*类|均匀分布|分辨力|分辨率)/i.test(text) && /(怎么|如何|是什么|计算|评定)/.test(q)) {
      const targetId = /(分辨力|分辨率)/.test(q) ? "resolution" : "classes_ab";
      const entry = entries.find((item) => item.id === targetId);
      return formatEntry(entry, detectLayer(text, options && options.mode));
    }

    return formatEntry(ranked[0].entry, detectLayer(text, options && options.mode), ranked[0].score);
  }

  function formatEntry(entry, tier, matchScore) {
    const bullets = [];
    if (tier !== "brief") {
      bullets.push(...entry.detail.slice(0, tier === "detail" ? entry.detail.length : 2));
    }
    if (tier === "detail" && entry.example) {
      bullets.push(`例：${entry.example}`);
    }
    return {
      kind: "knowledge",
      id: entry.id,
      title: entry.title,
      headline: entry.short,
      bullets,
      formula: tier === "brief" && entry.id !== "rss" ? "" : entry.formula,
      example: tier === "standard" && entry.example ? entry.example : "",
      caution: tier !== "brief" ? entry.caution : "",
      sources: entry.sources.filter((id) => sources[id]),
      tier,
      matchScore: matchScore || 0
    };
  }

  function calculateRss(values) {
    if (!Array.isArray(values) || values.length === 0) return NaN;
    if (values.some((value) => !Number.isFinite(value))) return NaN;
    return Math.sqrt(values.reduce((sum, value) => sum + value * value, 0));
  }

  function calculateRelativePower(currentPercent, resistancePercent) {
    const c = Number(currentPercent) / 100;
    const r = Number(resistancePercent) / 100;
    if (!Number.isFinite(c) || !Number.isFinite(r)) return NaN;
    return Math.sqrt(Math.pow(2 * c, 2) + Math.pow(r, 2));
  }

  return {
    answer,
    calculateRss,
    calculateRelativePower,
    detectLayer,
    extractNumbers,
    normalize,
    scoreEntry,
    roundSmart
  };
});
