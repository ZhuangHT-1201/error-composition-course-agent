(function (root, factory) {
  const data = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = data;
  } else {
    root.AGENT_KB = data;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const sources = {
    gum: {
      id: "gum",
      short: "GUM",
      label: "JCGM 100:2008",
      title: "Evaluation of measurement data - Guide to the expression of uncertainty in measurement",
      detail: {
        zh: "测量不确定度评定与表示的基础性国际文件，给出测量模型、灵敏系数、合成不确定度与扩展不确定度的一般方法。",
        en: "The foundational international guide to measurement models, sensitivity coefficients, combined uncertainty, and expanded uncertainty."
      },
      url: "https://www.bipm.org/documents/20126/2071204/JCGM_100_2008_E.pdf"
    },
    jjf: {
      id: "jjf",
      short: "JJF 1059.1",
      label: "JJF 1059.1-2012",
      title: "测量不确定度评定与表示",
      detail: {
        zh: "我国测量不确定度评定与表示的计量技术规范，采用与 GUM 一致的评定框架。",
        en: "China's metrology technical specification for uncertainty evaluation, aligned with the GUM framework."
      },
      url: ""
    },
    vim: {
      id: "vim",
      short: "VIM",
      label: "JCGM 200:2012",
      title: "International Vocabulary of Metrology - Basic and General Concepts and Associated Terms",
      detail: {
        zh: "测量学术语定义的基础文件，用于区分测量误差、测量不确定度等概念。",
        en: "The international terminology reference used to distinguish measurement error, uncertainty, and related concepts."
      },
      url: "https://www.bipm.org/documents/20126/2071204/JCGM_200_2012.pdf"
    }
  };

  const entries = [
    {
      id: "overview",
      category: "concept",
      title: { zh: "误差合成怎么学", en: "How error propagation works" },
      keywords: {
        zh: ["误差合成", "介绍", "总览", "学习", "知识范围", "能做什么", "怎么学"],
        en: ["error propagation", "overview", "introduction", "what can you do", "how to learn", "uncertainty basics"]
      },
      short: {
        zh: "误差合成研究各单项误差或不确定度分量如何传递到测量结果。先写测量模型，再确定每个分量的标准不确定度与灵敏系数，最后按独立或相关情形合成。",
        en: "Error propagation shows how individual error or uncertainty components reach the final result. Write the measurement model, convert every component to standard uncertainty, apply sensitivity coefficients, then combine according to independence or correlation."
      },
      detail: {
        zh: [
          "测量模型决定灵敏系数。只有模型写对了，才能判断某项误差应按原值、按倍数，还是按偏导数传递。",
          "合成前统一口径。各分量应使用同一置信水平下的标准不确定度，并化成相同单位；不能把绝对量和相对量直接相加。",
          "是否相关决定公式。独立分量按平方和开方；存在相关时还要加入协方差项。"
        ],
        en: [
          "The measurement model determines the sensitivity coefficients. It tells you whether a component passes through unchanged, with a multiplier, or through a partial derivative.",
          "Normalize before combining. All components should be standard uncertainties in the same unit; absolute and relative values cannot be added directly.",
          "Independence changes the formula. Independent contributions are combined in quadrature, while correlated inputs require covariance terms."
        ]
      },
      formula: "y = f(x_1, ..., x_N)    u_c(y) = sqrt(sum((partial f / partial x_i * u(x_i))^2))",
      example: {
        zh: "若功率 P = I²R，则电流相对标准不确定度的贡献要乘 2，电阻的贡献仍乘 1，之后在置信水平相同的条件下平方合成。",
        en: "For P = I²R, the relative uncertainty of current is multiplied by 2, while resistance has an exponent of 1. The contributions are then combined in quadrature."
      },
      caution: {
        zh: "误差的符号与不确定度的非负性质不同。传统误差分析与不确定度评定可以互相参考，但不能混用公式和术语。",
        en: "Error has a sign; uncertainty is non-negative. Traditional error analysis and modern uncertainty evaluation can inform each other, but their formulas and terminology should not be mixed."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "basic_error",
      category: "concept",
      title: { zh: "测量误差及其表示", en: "Measurement error and its forms" },
      keywords: {
        zh: ["误差是什么", "测量误差", "绝对误差", "相对误差", "示值误差", "修正值", "误差定义"],
        en: ["measurement error", "absolute error", "relative error", "indication error", "correction", "error definition"]
      },
      short: {
        zh: "测量误差表示测得值与参考量值之间的差异。绝对误差保留同一量纲，相对误差便于比较不同量值的偏离程度。",
        en: "Measurement error is the difference between a measured value and a reference value. Absolute error keeps the unit, while relative error makes deviations comparable across scales."
      },
      detail: {
        zh: [
          "按通常约定，示值误差等于示值减参考值，因此误差可能为正，也可能为负。",
          "绝对误差与测得值有相同单位；相对误差通常等于绝对误差除以参考值，并以百分数表示。",
          "修正值与误差方向相反。对示值作修正时，应确认参考值的来源和适用范围。"
        ],
        en: [
          "Using the usual convention, indication error equals the indication minus the reference value, so it may be positive or negative.",
          "Absolute error has the same unit as the measurement. Relative error is normally the absolute error divided by the reference value and expressed as a percentage.",
          "A correction has the opposite sign to the error. Before correcting an indication, confirm the reference value and its valid range."
        ]
      },
      formula: "absolute error = x - x_ref    relative error = (x - x_ref) / x_ref × 100%",
      example: {
        zh: "真实长度为 100.0 mm，测得 100.3 mm，则绝对误差为 +0.3 mm，相对误差为 0.3%。若按该读数修正，应减去 0.3 mm。",
        en: "If the reference length is 100.0 mm and the indication is 100.3 mm, the absolute error is +0.3 mm and the relative error is 0.3%. The correction to the indication is -0.3 mm."
      },
      caution: {
        zh: "若题目用“相对误差限”描述正负范围，通常取非负幅值；计算方向时要回到题目给出的定义。",
        en: "A stated relative error limit usually describes a non-negative magnitude. Return to the problem's sign convention when calculating a correction."
      },
      sources: ["vim", "jjf"]
    },
    {
      id: "uncertainty",
      category: "concept",
      title: { zh: "测量不确定度", en: "Measurement uncertainty" },
      keywords: {
        zh: ["不确定度", "什么是测量不确定度", "标准不确定度", "分散性", "可信程度", "含义"],
        en: ["measurement uncertainty", "standard uncertainty", "dispersion", "reliability of result", "definition", "what is uncertainty"]
      },
      short: {
        zh: "测量不确定度是与测量结果关联的非负参数，用来表征合理赋予被测量值的分散性。它描述结果区间的可信程度，不表示本次测量已经偏差了多少。",
        en: "Measurement uncertainty is a non-negative parameter associated with a result that characterizes the dispersion of values reasonably attributable to the measurand. It does not say how far this particular result is from the true value."
      },
      detail: {
        zh: [
          "标准不确定度 u 以标准差形式表示；多个分量合成后得到合成标准不确定度 u_c。",
          "扩展不确定度 U = k u_c，用覆盖因子 k 指定覆盖概率。报告时应同时写明 k 或约定覆盖概率。",
          "不确定度来源可以包括重复观测、仪器校准、分辨力、环境条件、测量模型近似和参考量值等。"
        ],
        en: [
          "Standard uncertainty u is expressed as an equivalent standard deviation; combining components gives the combined standard uncertainty u_c.",
          "Expanded uncertainty is U = k u_c, where the coverage factor k corresponds to a stated coverage probability or distribution assumption.",
          "Sources include repeat observations, calibration, resolution, environmental conditions, model approximations, and reference values."
        ]
      },
      formula: "U = k × u_c",
      example: {
        zh: "若 u_c = 0.08 mm，取 k = 2，可写成 U = 0.16 mm（k = 2）。这表示按该覆盖约定得到的扩展区间，不表示误差一定等于 0.16 mm。",
        en: "If u_c = 0.08 mm and k = 2, then U = 0.16 mm (k = 2). This is an expanded interval under the stated coverage convention, not a guaranteed error of 0.16 mm."
      },
      caution: {
        zh: "“不确定度更小”不等于“误差更小”。不确定度评价结果可信程度，误差需要与参考值比较后才能得到。",
        en: "Smaller uncertainty does not automatically mean smaller error. Uncertainty describes confidence in the result; error requires comparison with a reference."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "error_vs_uncertainty",
      category: "concept",
      title: { zh: "测量误差与不确定度的区别", en: "Error versus uncertainty" },
      keywords: {
        zh: ["误差和不确定度", "误差与不确定度", "区别", "有什么不同", "是不是误差"],
        en: ["error vs uncertainty", "difference between error and uncertainty", "are they the same", "different"]
      },
      short: {
        zh: "误差是测得值相对参考值的具体偏差，有正负；不确定度是测量结果可能分散程度的非负参数，用于说明结果可信程度。",
        en: "Error is a signed deviation from a reference value. Uncertainty is a non-negative parameter describing dispersion and the confidence attached to a result."
      },
      detail: {
        zh: [
          "误差回答“这次测得偏了多少”；不确定度回答“对结果所在区间的把握有多大”。",
          "误差不能通过重复测量得到唯一确定值，因此实际工作中常估计误差范围；不确定度则按测量模型和已有信息评定。",
          "A 类与 B 类是不确定度的两种评定方法，不应简单等同于随机误差与系统误差。"
        ],
        en: [
          "Error answers how much this result differs from a reference. Uncertainty answers how well the result is known or how widely its defensible values may be distributed.",
          "Repeated measurements cannot reveal a unique error, so a useful error estimate often requires a reference or a bounded assumption.",
          "Type A and Type B are methods of evaluating uncertainty, not direct synonyms for random and systematic error."
        ]
      },
      formula: "error = x - x_ref    uncertainty is a non-negative dispersion parameter",
      example: {
        zh: "一把未校准的尺子可能有稳定偏差，因此每次读数很接近；重复性可能很好，但因校准信息有限，修正后结果仍可能有较大的不确定度。",
        en: "An uncalibrated ruler may have a stable bias. Repeated readings can look precise, yet the calibrated result may still have substantial uncertainty."
      },
      caution: {
        zh: "把“扩展不确定度”写成“最大误差”是常见错误，除非题目另有明确保证。",
        en: "Calling an expanded uncertainty a maximum error is usually incorrect unless the problem supplies an explicit bound and the necessary coverage assumptions."
      },
      sources: ["vim", "gum", "jjf"]
    },
    {
      id: "rss",
      category: "combine",
      title: { zh: "独立分量的平方合成", en: "Combining independent components" },
      keywords: {
        zh: ["误差合成", "独立误差", "随机误差", "平方和", "方和根", "独立分量", "合成公式"],
        en: ["error combination", "independent errors", "random errors", "root sum square", "quadrature", "combine uncertainty", "formula"]
      },
      short: {
        zh: "当各分量相互独立且合成模型为简单相加时，合成标准不确定度等于各分量方差之和的平方根。",
        en: "When components are independent and pass through a simple sum, the combined standard uncertainty is the square root of the sum of the component variances."
      },
      detail: {
        zh: [
          "两个独立分量 u_1、u_2 的合成不确定度为 sqrt(u_1² + u_2²)，而不是 u_1 + u_2。",
          "方差具有可加性。把分量先化成标准不确定度，再做平方和，通常比直接比较最大误差更合理。",
          "若有灵敏系数 c_i，应先计算 c_i u_i，再对这些贡献量平方合成。"
        ],
        en: [
          "For two independent components, u_c = sqrt(u_1² + u_2²), rather than u_1 + u_2.",
          "Variance is additive. Convert components to standard uncertainties first, then combine their squares.",
          "With sensitivity coefficients c_i, combine c_i u_i rather than the raw input uncertainties."
        ]
      },
      formula: "u_c = sqrt(u_1^2 + u_2^2 + ... + u_N^2)",
      example: {
        zh: "两个独立分量分别为 0.2 mm 和 0.3 mm，则 u_c = sqrt(0.2² + 0.3²) = 0.361 mm。",
        en: "For independent components of 0.2 mm and 0.3 mm, u_c = sqrt(0.2² + 0.3²) = 0.361 mm."
      },
      caution: {
        zh: "平方和公式依赖独立性假设。题目出现“同源”“同一仪器校准值”“相关系数”等条件时，不能直接套用。",
        en: "The root-sum-square rule assumes independence. Shared calibration, a common reference, or a stated correlation violates that assumption."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "general_model",
      category: "combine",
      title: { zh: "一般测量模型的误差传递", en: "General measurement-model propagation" },
      keywords: {
        zh: ["误差传递", "测量模型", "灵敏系数", "偏导数", "函数关系", "传递公式"],
        en: ["error propagation", "measurement model", "sensitivity coefficient", "partial derivative", "function", "propagation formula"]
      },
      short: {
        zh: "一般测量模型可先在测量点附近作一阶泰勒展开，通过偏导数求出各输入量的灵敏系数，再合成标准不确定度。",
        en: "A general measurement model is linearized locally by a first-order Taylor expansion. Partial derivatives give sensitivity coefficients, which transfer each input uncertainty to the output."
      },
      detail: {
        zh: [
          "对 y = f(x_1, ..., x_N)，第 i 个分量的灵敏系数为 c_i = ∂f/∂x_i。",
          "一阶近似在输入量不确定度相对较小时较可靠；明显非线性时需考虑二阶项或数值模拟。",
          "计算偏导数时其余输入量视为常量，并统一各量的量纲。"
        ],
        en: [
          "For y = f(x_1, ..., x_N), the sensitivity coefficient is c_i = ∂f/∂x_i.",
          "The first-order approximation works well when input uncertainties are small relative to the local nonlinearity; otherwise consider higher-order terms or simulation.",
          "Hold other inputs constant while differentiating and keep all units consistent."
        ]
      },
      formula: "u_c^2(y) = sum_i [c_i u(x_i)]^2    c_i = partial y / partial x_i",
      example: {
        zh: "若 y = x_1 + x_2，则 c_1 = c_2 = 1；若 y = 2x，则 c = 2，输入量 u(x) 的贡献变成 2u(x)。",
        en: "For y = x_1 + x_2, c_1 = c_2 = 1. For y = 2x, c = 2, so an input uncertainty u(x) contributes 2u(x)."
      },
      caution: {
        zh: "不能只看公式中的指数就套用相对不确定度规则；灵敏系数必须由当前测量模型确定。",
        en: "Do not infer sensitivity from an exponent alone. Derive it from the measurement model actually in use."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "correlation",
      category: "combine",
      title: { zh: "相关分量的合成", en: "Combining correlated components" },
      keywords: {
        zh: ["相关", "相关系数", "协方差", "不独立", "同源误差", "相同仪器", "相关误差"],
        en: ["correlation", "correlated uncertainty", "correlated components", "correlation coefficient", "covariance", "not independent", "common source", "same instrument"]
      },
      short: {
        zh: "各分量相关时，合成方差中还要加入协方差项。两个分量完全正相关时，其贡献按代数和传递，不能再用简单平方和。",
        en: "Correlated components add covariance terms to the combined variance. Perfectly positive correlation changes the combination from quadrature to an algebraic sum."
      },
      detail: {
        zh: [
          "两分量情形下，u_c² = (c_1u_1)² + (c_2u_2)² + 2c_1c_2u_1u_2r。",
          "完全正相关 r = 1 时，贡献按代数和；相互独立 r = 0 时回到平方和。",
          "同一次校准、同一温度传感器、同一未修正参考值等因素可能使多个输入量产生相关。"
        ],
        en: [
          "For two components, u_c² = (c_1u_1)² + (c_2u_2)² + 2c_1c_2u_1u_2r.",
          "With r = 1, signed contributions combine algebraically. With r = 0, the covariance term vanishes and the result returns to quadrature.",
          "Shared calibration, one temperature sensor, or a common uncorrected reference can create correlation."
        ]
      },
      formula: "u_c^2 = (c_1u_1)^2 + (c_2u_2)^2 + 2c_1c_2u_1u_2r",
      example: {
        zh: "若两个同号、完全正相关的贡献量均为 0.2 mm，则合成量为 0.4 mm，而不是 0.283 mm。",
        en: "Two equal positive contributions of 0.2 mm with r = 1 combine to 0.4 mm, not 0.283 mm."
      },
      caution: {
        zh: "相关系数不能凭“看起来同源”随意取 1；需要数据、实验信息或明确的共享来源支持。",
        en: "Do not set r = 1 merely because two inputs look related. Use data, experimental evidence, or a clearly identified common source."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "classes_ab",
      category: "evaluate",
      title: { zh: "不确定度的 A 类与 B 类评定", en: "Type A and Type B evaluation" },
      keywords: {
        zh: ["A类", "B类", "A 类", "B 类", "评定方法", "统计分析", "经验信息"],
        en: ["type A", "type B", "evaluation method", "statistical evaluation", "non-statistical", "calibration certificate"]
      },
      short: {
        zh: "A 类依据重复观测数据作统计评定，B 类依据校准证书、仪器资料、经验或其他非统计信息评定；两类最终都化为标准差后合成。",
        en: "Type A evaluation uses statistical analysis of repeated observations. Type B uses certificates, specifications, experience, or other non-statistical information. Both become standard uncertainties before combination."
      },
      detail: {
        zh: [
          "A 类常用样本标准差或平均值的标准不确定度；n 次独立重复观测时，均值的标准不确定度为 s/√n。",
          "B 类不等于“系统误差”。分辨力量化造成的分散性也可能用 B 类方法评定。",
          "分类依据是评定方式，不是误差性质，也不代表哪一类更可信。"
        ],
        en: [
          "Type A often uses a sample standard deviation. For n independent repeated observations, the standard uncertainty of the mean is s/√n.",
          "Type B is not synonymous with systematic error. Even a quantized resolution effect may require a Type B evaluation.",
          "The distinction concerns the information used, not whether the underlying effect is random or systematic."
        ]
      },
      formula: "Type A mean: u = s / sqrt(n)    Type B: convert each source to standard uncertainty",
      example: {
        zh: "校准证书给出 ±0.02 mm（k=2），其标准不确定度约为 0.01 mm；重复读数则按 s/√n 计算。两类贡献最终统一合成。",
        en: "If a certificate states ±0.02 mm with k = 2, its standard uncertainty is about 0.01 mm. Repeat observations contribute through s/√n. Both are then combined."
      },
      caution: {
        zh: "A 类、B 类的区分依据是评定方式，不是误差的性质。",
        en: "Type A and Type B refer to evaluation methods, not directly to random and systematic effects."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "mean",
      category: "evaluate",
      title: { zh: "重复测量平均值的标准不确定度", en: "Standard uncertainty of a repeated-mean result" },
      keywords: {
        zh: ["平均值", "重复测量", "多次测量", "样本标准差", "除以根号n", "A类评定"],
        en: ["mean", "repeated measurement", "sample standard deviation", "divide by sqrt n", "standard error", "type A"]
      },
      short: {
        zh: "对同一条件下 n 次独立重复观测，平均值的标准不确定度等于单次观测样本标准差除以 sqrt(n)。",
        en: "For n independent repeated observations under repeatability conditions, the standard uncertainty of the mean is the sample standard deviation divided by sqrt(n)."
      },
      detail: {
        zh: [
          "先算单次观测的样本标准差 s，再算 s/√n。不能把 s 直接当作最终平均值的标准不确定度。",
          "n 增大时重复性对平均值的影响下降，但其他 B 类分量不会因为多测几次而自动变小。",
          "若观测值存在漂移、显著异常或相关性，应先分析数据，不宜直接套用 s/√n。"
        ],
        en: [
          "Calculate the sample standard deviation s first, then divide by sqrt(n). Do not report s as the uncertainty of the mean.",
          "Increasing n reduces the repeatability contribution to the mean, but unrelated Type B contributions do not shrink automatically.",
          "Drift, outliers, or correlated observations should be analyzed before applying s/sqrt(n)."
        ]
      },
      formula: "s = sqrt(sum((x_i - x_bar)^2)/(n-1))    u(x_bar) = s / sqrt(n)",
      example: {
        zh: "某量 6 次重复读数得到 s = 0.12 mm，则平均值的标准不确定度为 0.12/sqrt(6) = 0.049 mm。",
        en: "If six repeated readings give s = 0.12 mm, the standard uncertainty of the mean is 0.12/sqrt(6) = 0.049 mm."
      },
      caution: {
        zh: "s/√n 是对平均值的统计评定；如果把单次观测作为结果，则不能替代 s。",
        en: "s/sqrt(n) applies to the mean. If a single observation is the reported result, its standard uncertainty is not s/sqrt(n)."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "systematic_random",
      category: "concept",
      title: { zh: "系统误差与随机误差", en: "Systematic and random errors" },
      keywords: {
        zh: ["系统误差", "随机误差", "系统误差和随机误差", "误差性质", "已定系统误差", "未定系统误差"],
        en: ["systematic error", "random error", "bias", "known correction", "uncorrected bias", "error type"]
      },
      short: {
        zh: "已定系统误差应按方向和灵敏系数进行代数修正；随机误差通常用标准差描述并按方差合成。未定系统误差应转为标准不确定度后再合成。",
        en: "A known systematic error is corrected algebraically in the direction of its model contribution. Random dispersion is characterized by standard deviations and combined through variance; uncertain bias is converted to standard uncertainty."
      },
      detail: {
        zh: [
          "有明确大小和方向的已定系统误差适合先修正，而不是把它当作随机分散塞进平方和。",
          "随机误差的方差可以相加，但前提是所比较的分量相互独立且统计口径一致。",
          "系统与随机的界限取决于已有信息和测量条件；修正掉可识别偏差，不代表该来源的不确定度消失。"
        ],
        en: [
          "Known bias with a reliable sign and magnitude should generally be corrected before the uncertainty budget is finalized.",
          "Variances add only when the modelled contributions are independent and expressed on a consistent basis.",
          "Correcting an identifiable bias does not eliminate uncertainty in the correction or in the residual bias."
        ]
      },
      formula: "known bias: apply correction    independent dispersion: u_c^2 = sum u_i^2",
      example: {
        zh: "已知电压表存在 +0.04 V 的稳定偏差，可先对读数减去 0.04 V；校准值本身的不确定度仍需作为分量参与合成。",
        en: "If a voltmeter has a stable +0.04 V bias, subtract 0.04 V from the indication. The uncertainty of the calibration value still enters the budget."
      },
      caution: {
        zh: "已定系统误差的修正值也有不确定度。修正掉可识别偏差，并不等于消除了该来源的全部风险。",
        en: "A correction is not perfectly known. Removing an identified bias does not remove uncertainty in that correction."
      },
      sources: ["gum", "jjf", "vim"]
    },
    {
      id: "relative",
      category: "application",
      title: { zh: "相对不确定度与乘除关系", en: "Relative uncertainty in products and powers" },
      keywords: {
        zh: ["相对不确定度", "乘除", "乘法", "除法", "幂", "相对误差", "百分比", "乘积"],
        en: ["relative uncertainty", "product", "quotient", "multiplication", "division", "power", "percentage"]
      },
      short: {
        zh: "对于只含乘除和幂运算的独立模型，可先求相对标准不确定度，再按各变量指数的绝对值乘以相对不确定度，最后平方合成。",
        en: "For an independent product-of-powers model, combine relative standard uncertainties in quadrature after multiplying each by the absolute exponent."
      },
      detail: {
        zh: [
          "若 y = x^m z^n 且 x、z 独立，则 u_c(y)/|y| = sqrt((m u(x)/|x|)² + (n u(z)/|z|)²)。",
          "对 P = I²R，电流指数为 2，因此其相对贡献为 2u(I)/|I|；电阻指数为 1。",
          "相对量只能在乘除或同一无量纲量之间合成。加减模型通常先保持绝对标准不确定度，再依据灵敏系数合成。"
        ],
        en: [
          "If y = x^m z^n and the inputs are independent, the output relative uncertainty is sqrt((m u(x)/|x|)² + (n u(z)/|z|)²).",
          "For P = I²R, the current contribution uses exponent 2 and the resistance contribution uses exponent 1.",
          "Relative uncertainties are convenient for products and quotients. For sums and differences, work with absolute standard uncertainties and sensitivity coefficients."
        ]
      },
      formula: "y = x^m z^n    u_r(y) = sqrt((m u_r(x))^2 + (n u_r(z))^2)",
      example: {
        zh: "电流与电阻的相对标准不确定度分别为 0.5% 和 1.0%，则功率的相对标准不确定度为 sqrt((2×0.5%)² + 1.0²) = 1.41%。",
        en: "With relative standard uncertainties of 0.5% in current and 1.0% in resistance, the power result has sqrt((2×0.5%)² + 1.0²) = 1.41% relative uncertainty."
      },
      caution: {
        zh: "不要把相对误差百分比与绝对标准不确定度直接相加。先统一口径，再看模型。",
        en: "Never add relative percentages directly to absolute standard uncertainties. Normalize the quantities and inspect the model first."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "expanded",
      category: "evaluate",
      title: { zh: "扩展不确定度与覆盖因子", en: "Expanded uncertainty and coverage factor" },
      keywords: {
        zh: ["扩展不确定度", "覆盖因子", "包含因子", "k=2", "95%", "置信区间", "结果表示"],
        en: ["expanded uncertainty", "coverage factor", "k=2", "95 percent", "confidence interval", "result reporting"]
      },
      short: {
        zh: "扩展不确定度等于合成标准不确定度乘以覆盖因子，即 U = k u_c。报告时必须说明 k 的取值及相应覆盖约定。",
        en: "Expanded uncertainty is the combined standard uncertainty multiplied by a coverage factor: U = k u_c. Report k and the corresponding coverage assumption."
      },
      detail: {
        zh: [
          "k = 2 常与近似 95% 的覆盖概率一起使用，但这通常以正态分布或有效自由度足够大为前提。",
          "自由度有限时，可依据 t 分布并考虑有效自由度选取 k；不要无条件把 k=2 称作 95% 区间。",
          "最终结果可写作 y ± U，并在同一句中注明单位、k 值和覆盖约定。"
        ],
        en: [
          "k = 2 is often associated with approximately 95% coverage, typically under a normal model or with sufficiently large effective degrees of freedom.",
          "With limited degrees of freedom, use an appropriate t-distribution and effective degrees of freedom rather than assuming k = 2 automatically.",
          "Report the result as y ± U with units, k, and the coverage convention in one place."
        ]
      },
      formula: "U = k u_c    result: y ± U (coverage factor k)",
      example: {
        zh: "u_c = 0.16 mA，取 k = 2，则 U = 0.32 mA。结果可写为 10.00 mA ± 0.32 mA（k = 2）。",
        en: "If u_c = 0.16 mA and k = 2, then U = 0.32 mA. A complete report is 10.00 mA ± 0.32 mA (k = 2)."
      },
      caution: {
        zh: "如果分布、自由度或覆盖概率没有说明，不能只凭“±”判断区间的统计含义。",
        en: "Without a stated distribution, degrees of freedom, or coverage probability, the statistical meaning of a ± interval is incomplete."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "resolution",
      category: "evaluate",
      title: { zh: "仪器分辨力的不确定度", en: "Resolution and quantization uncertainty" },
      keywords: {
        zh: ["分辨力", "分辨率", "量化误差", "最小刻度", "半宽", "均匀分布", "读数"],
        en: ["resolution", "quantization", "last digit", "half width", "rectangular distribution", "reading uncertainty"]
      },
      short: {
        zh: "数字仪表分辨力造成的量化误差通常按区间半宽处理。若以均匀分布建模，分辨力为 d 时其标准不确定度常取 d/(2sqrt(3))。",
        en: "Quantization from a digital display is often modelled as a uniform distribution over one half-step. For a resolution increment d, the standard uncertainty is commonly d/(2sqrt(3))."
      },
      detail: {
        zh: [
          "先确认 d 表示末位一个数字对应的量值，还是两个相邻显示值的间隔；表述应明确。",
          "若题目已经把分辨力写成正负半宽 a，则直接计算 a/√3，不要再除以 2。",
          "模拟仪表的估读不确定度还受刻度间距、读数习惯和观察者差异影响，不一定只用末位量化误差描述。"
        ],
        en: [
          "Clarify whether d is the value of one displayed unit or the gap between adjacent indications.",
          "If the problem already gives a half-width a, use a/sqrt(3) and do not divide by 2 again.",
          "Analog readings also include interpolation, scale spacing, and observer effects; the last-digit model may be incomplete."
        ]
      },
      formula: "u_res = d / (2 × sqrt(3))    or u_res = a / sqrt(3)",
      example: {
        zh: "数字温度计末位变化量为 0.1 ℃，按均匀分布估算时，u_res = 0.1/(2sqrt(3)) = 0.029 ℃。",
        en: "For a digital thermometer with a 0.1 °C increment, the uniform-model resolution uncertainty is 0.1/(2sqrt(3)) = 0.029 °C."
      },
      caution: {
        zh: "“分辨力数值”是否已经是半宽，必须根据仪器说明或题目定义判断。",
        en: "Check the instrument documentation or problem definition to determine whether the stated resolution is already a half-width."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "dominant",
      category: "application",
      title: { zh: "主导分量与优化方向", en: "Dominant components and improvement priorities" },
      keywords: {
        zh: ["主导误差", "主要来源", "误差来源", "哪个分量", "贡献最大", "优化", "降低不确定度"],
        en: ["dominant uncertainty", "major contribution", "error source", "largest component", "improve uncertainty", "optimization"]
      },
      short: {
        zh: "比较各分量对合成方差的贡献 c_i²u_i²，可以找出主导项。优先减小贡献最大的分量，通常比平均改善所有环节更有效。",
        en: "Compare c_i²u_i² contributions to the combined variance. Improving the dominant component usually produces a larger effect than evenly improving every stage."
      },
      detail: {
        zh: [
          "贡献占比可写成 c_i²u_i²/u_c²。该比例反映在方差中的份额，不是贡献量的简单比值。",
          "若某分量的标准不确定度减半，其方差贡献降为四分之一；实际改善还需考虑成本。",
          "课程题中不要机械套用固定阈值，应依据贡献占比与可获得改进空间说明取舍。"
        ],
        en: [
          "The contribution share is c_i²u_i²/u_c², a fraction of variance rather than a simple ratio of standard uncertainties.",
          "Halving a component's standard uncertainty reduces its variance contribution to one quarter. The practical choice also depends on cost and feasibility.",
          "Avoid quoting a universal cutoff. Use the actual contribution shares and available improvement options."
        ]
      },
      formula: "contribution_i = (c_i u_i)^2 / u_c^2",
      example: {
        zh: "合成前两个贡献分别为 0.06 与 0.08，平方贡献约为 0.0036 与 0.0064，后者约占 64%，应优先改善后者。",
        en: "If two pre-combination contributions are 0.06 and 0.08, their squared shares are proportional to 0.0036 and 0.0064. The latter is about 64% and is the first improvement target."
      },
      caution: {
        zh: "最大误差限不一定对应最大的标准不确定度贡献；应先把各来源化为可比较的标准不确定度。",
        en: "The largest stated error limit is not necessarily the largest standard-uncertainty contribution. Normalize all sources first."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "workflow",
      category: "application",
      title: { zh: "误差合成的标准步骤", en: "A complete error-propagation workflow" },
      keywords: {
        zh: ["步骤", "流程", "怎么做", "解题步骤", "合成过程", "怎么写", "评定步骤"],
        en: ["steps", "workflow", "how to solve", "calculation process", "uncertainty procedure", "method"]
      },
      short: {
        zh: "规范解题可按五步展开：明确被测量和测量模型，列出所有分量，确定标准不确定度与灵敏系数，判断相关并合成，最后按需要给出扩展不确定度和结论。",
        en: "Use a five-step process: define the measurand and model, list all components, convert them to standard uncertainties and sensitivity coefficients, check dependence and combine, then report expanded uncertainty when required."
      },
      detail: {
        zh: [
          "先写清被测量、参考值和测量条件。已有已知偏差时，先决定修正位置，避免重复计入。",
          "逐项列出来源，统一单位与标准不确定度口径；对每个输入量求偏导或确认传递倍数。",
          "检查是否独立，再选择平方和或协方差合成；最后检查量级、单位和主导贡献。"
        ],
        en: [
          "State the measurand, reference, and measurement conditions. Decide where known corrections enter so they are not double-counted.",
          "List sources, normalize units, and determine either the partial derivative or the transfer multiplier for each input.",
          "Check independence before choosing quadrature or covariance. Finish with dimensional checks, a dominant-term review, and a complete statement of the result."
        ]
      },
      formula: "model -> components -> u_i and c_i -> dependence check -> u_c -> U = k u_c",
      example: {
        zh: "长度由两段相加时，先确认两段读数的独立性和各段标准不确定度，再以 c_1 = c_2 = 1 作平方合成，最后检查是否漏计卡尺校准或温度影响。",
        en: "For a length assembled from two segments, check independence and each segment's standard uncertainty, combine with c_1 = c_2 = 1, then review calibration and temperature effects."
      },
      caution: {
        zh: "直接代公式往往只完成第三步。测量模型、相关性和单位换算通常是失分最多的位置。",
        en: "Substituting a formula covers only the middle of the workflow. The model, dependence assumptions, and units usually cause more errors than the arithmetic."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "exam",
      category: "application",
      title: { zh: "误差合成常见考点", en: "Common exam checkpoints" },
      keywords: {
        zh: ["考点", "考试", "易错点", "期末", "复习", "题型", "常见错误", "注意什么"],
        en: ["exam", "review", "common mistakes", "checkpoints", "question type", "exam tips"]
      },
      short: {
        zh: "常见考点集中在误差与不确定度的概念区分、灵敏系数、独立与相关分量合成、重复测量平均值、B 类评定、扩展不确定度及主导分量判断。",
        en: "Core exam topics include the distinction between error and uncertainty, sensitivity coefficients, independent versus correlated combination, repeated-means, Type B evaluation, expanded uncertainty, and dominant components."
      },
      detail: {
        zh: [
          "概念题要看术语是否准确，尤其是误差、修正值、标准不确定度和扩展不确定度之间的区别。",
          "计算题先检查单位和模型，再判断独立性；看到百分比不急于相加，看到同一仪器要检查相关性。",
          "文字题要能解释平方合成、主导贡献和修正后仍存在不确定度的原因。"
        ],
        en: [
          "Terminology questions turn on precise distinctions among error, correction, standard uncertainty, and expanded uncertainty.",
          "Calculation questions require a unit and model check before choosing a combination formula. Percentages are not additive by default, and shared instruments can imply correlation.",
          "Written answers should explain why quadrature applies, which component dominates, and why uncertainty remains after correction."
        ]
      },
      formula: "u_c^2 = sum_i (c_i u_i)^2 + 2 sum_{i<j} c_i c_j u_i u_j r_ij",
      example: {
        zh: "若求 P=I²R 的相对不确定度，应先写出各指数，再计算 sqrt((2u_r(I))² + (u_r(R))²)，最后按题目要求转为绝对量。",
        en: "For P = I²R, write the exponents first, combine sqrt((2u_r(I))² + (u_r(R))²), and convert to an absolute result only if the question asks for one."
      },
      caution: {
        zh: "题目没有说明独立性时，不应擅自假定为独立；可以指出该假设及其影响。",
        en: "Do not silently assume independence when the problem is silent. State the assumption and explain how it affects the result."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "model_budget",
      category: "combine",
      title: { zh: "测量模型与不确定度预算表", en: "Measurement model and uncertainty budget" },
      keywords: {
        zh: ["测量模型", "不确定度预算", "直接测量", "间接测量", "输入量", "输出量", "分量表"],
        en: ["measurement model", "uncertainty budget", "direct measurement", "indirect measurement", "input quantity", "output quantity", "budget table"]
      },
      short: {
        zh: "不确定度预算表把每个输入的估计值、标准不确定度、分布、灵敏系数与方差贡献列在一起。它的作用是让合成过程可复核，并暴露重复计入或量纲错误。",
        en: "An uncertainty budget records each input estimate, standard uncertainty, distribution, sensitivity coefficient, and variance contribution. It makes the calculation auditable and exposes double counting or unit errors."
      },
      detail: {
        zh: [
          "直接测量通常以重复观测和相关影响量构成模型；间接测量需要先写出 y=f(x_i)，再逐项求灵敏系数。",
          "同一来源只应进入预算一次。若校准值、温度修正或重复性已经包含在某项信息中，要避免重复计入。",
          "预算表末尾应检查各贡献占比、合成值、自由度或覆盖因子，以及最终结果单位和有效位数。"
        ],
        en: [
          "A direct measurement uses repeated observations plus influence quantities. An indirect measurement starts from y = f(x_i) and derives sensitivity coefficients.",
          "Enter each independent source once. If calibration, temperature correction, or repeatability is already included in another quantity, avoid double counting.",
          "Finish the budget with contribution shares, the combined value, degrees of freedom or coverage factor, and consistent units and significant figures."
        ]
      },
      formula: "u_c^2(y) = sum_i (c_i u_i)^2    c_i = partial f / partial x_i",
      example: {
        zh: "长度 L=L_1+L_2 的预算表可列出两段读数、各自标准不确定度和灵敏系数 1。若两段共用同一把未校准卡尺，还要增加一项相关或校准贡献。",
        en: "For L = L_1 + L_2, a budget can list both indications, their standard uncertainties, and sensitivity coefficients of 1. If both use one uncalibrated caliper, add the shared calibration or correlation contribution."
      },
      caution: {
        zh: "预算表不是把所有可能误差都列一遍再相加。只有与当前测量模型有关且未被其他信息包含的来源才应进入。",
        en: "A budget is not a list of every imaginable error. Include only sources relevant to the current model and not already represented by another entry."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "distributions",
      category: "evaluate",
      title: { zh: "常用分布与 B 类换算", en: "Common distributions for Type B evaluation" },
      keywords: {
        zh: ["分布", "正态分布", "三角分布", "均匀分布", "矩形分布", "最大允许误差", "置信水平"],
        en: ["distribution", "normal", "triangular", "rectangular", "uniform", "maximum permissible error", "coverage level"]
      },
      short: {
        zh: "把误差限转换为标准不确定度时，需要说明分布假设。均匀分布半宽 a 对应 a/√3，三角分布半宽 a 对应 a/√6；正态区间则按覆盖因子换算。",
        en: "Converting an error limit into standard uncertainty requires a stated distribution. A rectangular half-width a maps to a/sqrt(3), a triangular half-width to a/sqrt(6), and a normal interval uses its coverage factor."
      },
      detail: {
        zh: [
          "最大允许误差通常给出边界，并不自动等于标准不确定度。没有分布依据时，均匀或三角模型常作为保守假设，但应在报告中说明。",
          "如果证书给出 U 与 k，先计算 u=U/k；不要再次把 U 当成 95% 半宽重复换算。",
          "分布假设会影响数值结果和覆盖解释。后续选择扩展不确定度的 k 时，应与已有假设保持一致。"
        ],
        en: [
          "A maximum permissible error is a boundary, not automatically a standard uncertainty. Rectangular or triangular models are common when details are unavailable, but the assumption should be stated.",
          "If a certificate gives U and k, first compute u = U/k. Do not treat U again as a 95% half-width and divide twice.",
          "Distribution assumptions affect both numerical results and the interpretation of coverage, so keep the expanded-uncertainty treatment consistent."
        ]
      },
      formula: "rectangular: u = a/sqrt(3)    triangular: u = a/sqrt(6)    normal: u = U/k",
      example: {
        zh: "某限值为 ±0.06 mm，若按均匀分布，则 u=0.06/√3=0.0346 mm；若已有证书给出 U=0.06 mm、k=2，则 u=0.03 mm。两者含义不同。",
        en: "For a ±0.06 mm limit under a rectangular model, u = 0.06/sqrt(3) = 0.0346 mm. If a certificate gives U = 0.06 mm with k = 2, then u = 0.03 mm. These are different inputs."
      },
      caution: {
        zh: "分布不能随意挑选以获得更小的数值。应依据仪器说明、证书或实验信息说明理由。",
        en: "Do not choose a distribution merely to obtain a smaller number. Base the choice on documentation, certificates, or experimental evidence."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "weighted_mean",
      category: "evaluate",
      title: { zh: "加权平均值与不确定度", en: "Weighted mean and its uncertainty" },
      keywords: {
        zh: ["加权平均", "权重", "不等精度", "多组测量", "合并结果", "加权均值"],
        en: ["weighted mean", "weights", "unequal precision", "combine results", "multiple datasets"]
      },
      short: {
        zh: "对同一被测量的多个独立结果，可在方差已知或可估计时采用反方差加权。加权平均能提高效率，但前提是各结果针对同一量且不存在系统偏差差异。",
        en: "Several independent results for the same measurand may be combined with inverse-variance weights when their uncertainties are credible. Weighting improves precision only if the results share a common target and no relative bias remains."
      },
      detail: {
        zh: [
          "权重通常取 w_i=1/u_i²；加权均值等于 Σw_ix_i/Σw_i，合成标准不确定度为 1/√Σw_i。",
          "高不确定度结果会自动获得较低权重，但不能用来掩盖已知偏差或模型不一致。",
          "若各结果不确定度来自不同方法，应先检查是否包含共同校准和共同参考量，避免把相关结果当成独立数据。"
        ],
        en: [
          "Use w_i = 1/u_i²; the weighted mean is sum(w_i x_i)/sum(w_i), and its standard uncertainty is 1/sqrt(sum(w_i)).",
          "A less precise result receives less weight automatically, but weighting cannot remove known bias or model inconsistency.",
          "Results from different methods may share calibration or references. Check for correlation before treating them as independent."
        ]
      },
      formula: "x_w = sum(w_i x_i) / sum(w_i)    w_i = 1/u_i^2    u(x_w) = 1/sqrt(sum(w_i))",
      example: {
        zh: "两个独立结果分别为 10.00±0.02 与 10.10±0.10 mm，前者权重更高，加权结果会明显靠近 10.00 mm。",
        en: "Two independent results are 10.00 ± 0.02 mm and 10.10 ± 0.10 mm. The first receives much more weight, so the weighted mean lies close to 10.00 mm."
      },
      caution: {
        zh: "反方差加权只有在各结果的可比性和独立性合理时有效。若存在未修正偏差，先处理偏差再合并。",
        en: "Inverse-variance weighting requires comparable, credible uncertainties and independence. Address unresolved biases before combining."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "degrees_freedom",
      category: "evaluate",
      title: { zh: "有效自由度与 Welch-Satterthwaite", en: "Effective degrees of freedom" },
      keywords: {
        zh: ["自由度", "有效自由度", "Welch", "Satterthwaite", "t分布", "覆盖因子选取"],
        en: ["degrees of freedom", "effective degrees of freedom", "Welch-Satterthwaite", "t distribution", "coverage factor"]
      },
      short: {
        zh: "合成不确定度对应的有效自由度用于在自由度有限时选择覆盖因子。Welch-Satterthwaite 公式按各方差贡献的相对不确定度加权自由度。",
        en: "The effective degrees of freedom associated with a combined uncertainty supports a t-based coverage factor when information is limited. The Welch-Satterthwaite formula weights component degrees of freedom by their variance contributions."
      },
      detail: {
        zh: [
          "无直接自由度信息的 B 类分量可给近似有效自由度，或先在简化题中按足够大处理；报告要说明采用的处理。",
          "自由度越少，t 分布的覆盖因子通常越大。直接把 k=2 写成 95% 并不总成立。",
          "本工具不替代完整自由度评定；遇到复杂预算时，应提供各分量自由度或明确采用简化覆盖规则。"
        ],
        en: [
          "A Type B component without a documented degrees-of-freedom value may use an approximate value or a simplifying assumption that its degrees of freedom are large.",
          "Smaller effective degrees of freedom usually require a larger t-based coverage factor. k = 2 does not always imply 95% coverage.",
          "This tool does not replace a complete degrees-of-freedom evaluation. For a complex budget, supply component values or use an explicitly stated simplified rule."
        ]
      },
      formula: "nu_eff = u_c^4 / sum((c_i u_i)^4 / nu_i)",
      example: {
        zh: "若某一分量占主导且只有 5 个自由度，即使其他分量自由度较大，合成结果的有效自由度也不会很高，覆盖因子可能大于 2。",
        en: "If one component dominates and has only five degrees of freedom, the effective degrees of freedom of the combined result may remain modest even when other components are well characterized."
      },
      caution: {
        zh: "有效自由度需要分量自由度或合理假设；缺少信息时应说明简化处理，不假装已经完成严格评定。",
        en: "Effective degrees of freedom requires component values or an explicit simplifying assumption. Do not present an approximation as a full evaluation."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "outliers",
      category: "application",
      title: { zh: "异常值与粗大误差处理", en: "Outliers and gross errors" },
      keywords: {
        zh: ["异常值", "离群值", "粗大误差", "剔除", "Grubbs", "箱线图", "坏值"],
        en: ["outlier", "gross error", "rejection", "Grubbs", "boxplot", "abnormal value"]
      },
      short: {
        zh: "疑似异常值不应只因远离均值就删除。先检查记录、操作和仪器故障，再依据预先规定的统计准则和物理原因决定是否剔除。",
        en: "A suspected outlier should not be deleted merely because it is far from the mean. Check records, procedure, and instrument faults, then apply a pre-specified statistical rule together with physical evidence."
      },
      detail: {
        zh: [
          "先确认该值是否属于同一测量条件、同一被测量和同一数据集合。条件变化可能使“异常值”其实是有效的新信息。",
          "统计检验会受样本量、分布和重复筛选影响。反复使用剔除规则容易人为缩小不确定度。",
          "若保留异常值，应说明它对结果和不确定度的影响；若剔除，应保留原因和处理记录。"
        ],
        en: [
          "First verify that the value belongs to the same measurand, conditions, and dataset. A supposed outlier may reflect a real condition change.",
          "Statistical tests depend on sample size, distribution, and repeated screening. Applying rejection rules repeatedly can artificially reduce uncertainty.",
          "If the value is retained, explain its effect. If rejected, record the evidence and decision."
        ]
      },
      formula: "technical check first -> documented criterion -> sensitivity check",
      example: {
        zh: "某次读数突然偏离，若记录显示接线松动，则该点属于已识别的操作故障，可修正或剔除并记录原因；仅凭数值大小不能直接删除。",
        en: "If one reading deviates sharply and the log shows a loose connection, the point corresponds to an identified fault. Correct or reject it with a record; numerical distance alone is insufficient."
      },
      caution: {
        zh: "不要为了获得更小标准差而反复剔除数据。若是否需要剔除本身就存在争议，应同时报告保留和剔除后的结果。",
        en: "Do not repeatedly remove points to obtain a smaller standard deviation. If exclusion is debatable, report both retained and excluded scenarios."
      },
      sources: ["gum", "jjf"]
    },
    {
      id: "nonlinear",
      category: "combine",
      title: { zh: "非线性模型与蒙特卡洛方法", en: "Nonlinear models and Monte Carlo propagation" },
      keywords: {
        zh: ["非线性", "泰勒展开", "二阶", "蒙特卡洛", "数值模拟", "非正态", "复杂模型"],
        en: ["nonlinear", "Taylor expansion", "second order", "Monte Carlo", "simulation", "non-normal", "complex model"]
      },
      short: {
        zh: "一阶不确定度传递在明显非线性、分布偏离正态或输入不确定度较大时可能不准确。此时可使用高阶展开、蒙特卡洛抽样或经验模型。",
        en: "First-order propagation can be inaccurate for strongly nonlinear models, non-normal inputs, or large relative uncertainties. Higher-order expansion, Monte Carlo sampling, or an empirical model may be required."
      },
      detail: {
        zh: [
          "一阶方法只保留偏导数项。若函数曲率明显，忽略二阶项会漏掉均值偏置和额外方差。",
          "蒙特卡洛方法按输入分布抽样，得到输出分布。结果取决于输入分布和样本量，应报告覆盖区间及抽样设置。",
          "简单课程题通常仍用一阶线性模型；是否升级方法要看函数形式和题目给出的条件。"
        ],
        en: [
          "A first-order method retains only derivative terms. High curvature can create output bias and additional variance through second-order effects.",
          "Monte Carlo propagation samples input distributions to obtain an output distribution. Results depend on the assumed inputs and sample size; report coverage and sampling settings.",
          "Many classroom exercises still use a first-order model. Decide whether to upgrade the method from the function and available evidence."
        ]
      },
      formula: "y ≈ f(mu) + sum c_i (x_i - mu_i) + (1/2) sum H_ij (x_i - mu_i)(x_j - mu_j)",
      example: {
        zh: "若 y=1/x 且 x 接近零，偏导数变化很快，不能用单一灵敏系数可靠代表整个输入区间；此时应检查线性近似或考虑模拟。",
        en: "If y = 1/x and x is near zero, the derivative changes rapidly and one sensitivity coefficient may not represent the input range. Check the linear approximation or simulate."
      },
      caution: {
        zh: "页面的快速计算器只处理基础线性情形。复杂非线性问题需要明确函数、输入分布和所需覆盖概率。",
        en: "The quick calculator covers basic linear cases only. Complex nonlinear problems need a clear function, input distributions, and a specified coverage goal."
      },
      sources: ["gum", "jjf"]
    }
  ];

  return { sources, entries };
});
