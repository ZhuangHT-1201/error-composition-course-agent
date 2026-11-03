(function () {
  "use strict";

  const translations = {
    zh: {
      skip: "跳到问答区",
      brandSub: "测量课程知识助手",
      navAsk: "课程问答",
      navTools: "计算工具",
      navSources: "知识依据",
      heroKicker: "测量误差与不确定度 · 双语知识智能体",
      heroTitle: "误差合成实验室",
      heroSubtitle: "从测量模型到最终不确定度，边问边算，并把每个假设讲清楚。",
      heroIntro: "内置 22 张双语知识卡和一套可核验的本地推理规则。需要更灵活的问答时，可以连接 DeepSeek；未连接时也能完整使用。",
      startAsking: "开始提问",
      connectModel: "接入大模型",
      statCards: "双语知识卡",
      statEngines: "工作引擎",
      statCalculators: "计算工具",
      liveFormula: "实时公式",
      apiTitle: "接入 DeepSeek，获得更灵活的解释",
      apiTitleConnected: "DeepSeek 已连接，正在使用混合引擎",
      recommended: "推荐",
      apiBody: "默认本地引擎无需密钥。连接后，模型会基于当前检索到的课程知识回答；接口失败时自动回退。",
      apiBodyConnected: "当前回答会调用 DeepSeek，并自动附带本地知识卡和来源。关闭开关即可恢复本地模式。",
      localAlwaysReady: "本地模式可用",
      apiReady: "DeepSeek 已连接",
      connectDeepSeek: "连接 DeepSeek",
      manageApi: "管理 API",
      knowledgeMap: "知识地图",
      knowledgeMapHint: "点击问题，直接开始。",
      topicWorkflow: "合成流程",
      topicWorkflowSub: "模型、分量、相关性与结果",
      topicConcept: "概念辨析",
      topicConceptSub: "误差、分散性与可信程度",
      topicEvaluation: "评定方法",
      topicEvaluationSub: "A 类、B 类与分布换算",
      topicCorrelation: "相关分量",
      topicCorrelationSub: "协方差与同源误差",
      topicBudget: "不确定度预算",
      topicBudgetSub: "来源、灵敏系数与贡献",
      topicExam: "考点整理",
      topicExamSub: "概念、计算与文字题",
      scopeNote: "范围外问题会明确拒答；计算条件不足时会指出缺少的信息。",
      chatTitle: "课程问答",
      localEngineReady: "本地知识引擎已就绪",
      apiEngineReady: "DeepSeek 增强模式已开启",
      localEngine: "本地引擎",
      apiEngine: "DeepSeek",
      answerDepth: "回答深度",
      modeAuto: "自动判断",
      modeBrief: "一句话概括",
      modeDetail: "详细讲解",
      questionLabel: "输入课程问题",
      questionPlaceholder: "输入问题，例如：相关误差怎样合成？",
      composerHint: "按 Enter 发送，Shift + Enter 换行。涉及相关性或单位时，请补充题目条件。",
      welcomeTitle: "先把条件讲清楚，再给结果。",
      welcomeBody: "我会区分独立与相关、误差与不确定度，并把公式、条件和依据放在同一段回答里。中文或英文提问都可以。",
      tryOne: "试试这些问题",
      promptOneLabel: "概念",
      promptOne: "误差和不确定度有什么区别？",
      promptTwoLabel: "理解",
      promptTwo: "相关误差分量为什么不能直接平方合成？",
      promptThreeLabel: "计算",
      promptThree: "两段独立长度误差分别为 0.2 mm 和 0.3 mm，合成结果是多少？",
      promptFourLabel: "应用",
      promptFour: "不确定度预算表应该包含哪些内容？",
      thinkingLocal: "正在检索知识卡",
      thinkingApi: "DeepSeek 正在组织回答",
      localLabel: "本地知识引擎",
      apiLabel: "DeepSeek 增强回答",
      sourcesLabel: "依据",
      exampleLabel: "示例",
      cautionLabel: "适用条件",
      apiNote: "已结合本地知识卡回答，数值和术语仍可回到知识依据核对。",
      fallbackNotice: "API 调用失败，已自动使用本地知识引擎。原因：",
      apiError: "无法连接 API。",
      calculatorTitle: "快速计算",
      methodLabel: "计算类型",
      methodRss: "独立分量平方合成",
      methodCorrelation: "两个相关分量",
      methodMean: "重复测量平均值",
      methodExpanded: "扩展不确定度",
      rssValues: "标准不确定度分量",
      unitLabel: "统一单位",
      componentOne: "分量 u₁",
      componentTwo: "分量 u₂",
      correlationCoefficient: "相关系数 r",
      sampleStandardDeviation: "单次标准差 s",
      sampleCount: "重复次数 n",
      combinedUncertainty: "合成标准不确定度 u_c",
      coverageFactor: "覆盖因子 k",
      calculate: "计算",
      calculatorNote: "工具采用标准公式并保留三位有效数字。相关性和乘除模型可在问答区继续展开。",
      calcInvalid: "请输入有效且满足条件的数值。",
      sourcesTitle: "知识依据",
      sourceGum: "测量不确定度评定与表示",
      sourceJjf: "国内计量技术规范",
      sourceVim: "测量学术语国际词汇",
      sourceFoot: "中文回答与英文回答使用同一知识库",
      methodOneTitle: "先看条件",
      methodOneBody: "独立、相关、A 类、B 类和已修正误差不混用。",
      methodTwoTitle: "再做传递",
      methodTwoBody: "测量模型确定灵敏系数，计算器负责可验证的数值。",
      methodThreeTitle: "最后核对",
      methodThreeBody: "答案给出单位、适用条件与 GUM / JJF / VIM 依据。",
      footerScope: "知识范围：测量误差、不确定度评定与误差传递",
      apiSettings: "API 与引擎设置",
      settingsTitle: "API 与引擎设置",
      deepSeekDescription: "适合更自由的解释与多轮追问，推荐使用。",
      enableApi: "启用 API",
      provider: "接口类型",
      providerDeepSeek: "DeepSeek（推荐）",
      providerCustom: "OpenAI 兼容接口",
      modelName: "模型",
      endpoint: "接口地址",
      apiKey: "API Key",
      getApiKey: "获取 DeepSeek 密钥 ↗",
      securityNote: "密钥只保存在当前标签页的会话存储中，关闭标签页后清除；不会写入 GitHub 仓库。请仅使用自己的有效密钥。",
      clearKey: "清除密钥",
      testConnection: "测试连接",
      saveSettings: "保存设置",
      testing: "正在测试连接...",
      testSuccess: "连接成功，接口可以使用。",
      testFailed: "连接失败，请检查密钥、模型和接口地址。",
      keyRequired: "启用 API 前请填写 API Key。",
      settingsSaved: "API 设置已保存到当前标签页。",
      keyCleared: "已清除当前标签页中的 API Key。",
      apiOffline: "已切换为本地知识引擎。",
      invalidEndpoint: "接口地址必须以 http:// 或 https:// 开头。",
      languageSwitched: "界面语言已切换。",
      emptyQuestion: "请先输入问题。",
      connectionLabel: "连接状态",
      serviceUnavailable: "接口不可用",
      genericApiError: "请求未完成"
    },
    en: {
      skip: "Skip to conversation",
      brandSub: "Measurement course assistant",
      navAsk: "Ask",
      navTools: "Calculators",
      navSources: "Sources",
      heroKicker: "Measurement error and uncertainty · bilingual course agent",
      heroTitle: "Error Propagation Lab",
      heroSubtitle: "Move from a measurement model to a defensible uncertainty, with every assumption in view.",
      heroIntro: "Explore 22 bilingual knowledge cards and a verifiable local reasoning engine. Connect DeepSeek when you want a more flexible tutor; the course tools remain available without a key.",
      startAsking: "Start asking",
      connectModel: "Connect a model",
      statCards: "bilingual cards",
      statEngines: "answer engines",
      statCalculators: "calculators",
      liveFormula: "Live formula",
      apiTitle: "Connect DeepSeek for more flexible explanations",
      apiTitleConnected: "DeepSeek is connected to the hybrid engine",
      recommended: "Recommended",
      apiBody: "The local tutor needs no key. With an API connected, DeepSeek answers from the retrieved course context and automatically falls back if the request fails.",
      apiBodyConnected: "DeepSeek now answers with retrieved course cards and source labels. Turn off the switch to return to the local engine.",
      localAlwaysReady: "Local mode ready",
      apiReady: "DeepSeek connected",
      connectDeepSeek: "Connect DeepSeek",
      manageApi: "Manage API",
      knowledgeMap: "Knowledge map",
      knowledgeMapHint: "Choose a question to begin.",
      topicWorkflow: "Propagation workflow",
      topicWorkflowSub: "Model, components, dependence, result",
      topicConcept: "Core concepts",
      topicConceptSub: "Error, dispersion, confidence",
      topicEvaluation: "Evaluation",
      topicEvaluationSub: "Type A, Type B, distributions",
      topicCorrelation: "Correlation",
      topicCorrelationSub: "Covariance and shared sources",
      topicBudget: "Uncertainty budget",
      topicBudgetSub: "Sources, sensitivity, contributions",
      topicExam: "Exam review",
      topicExamSub: "Concepts, calculations, explanations",
      scopeNote: "Out-of-scope questions are declined. Missing calculation conditions are requested instead of invented.",
      chatTitle: "Ask the lab",
      localEngineReady: "Local knowledge engine ready",
      apiEngineReady: "DeepSeek enhancement enabled",
      localEngine: "Local engine",
      apiEngine: "DeepSeek",
      answerDepth: "Answer depth",
      modeAuto: "Auto",
      modeBrief: "One sentence",
      modeDetail: "Detailed",
      questionLabel: "Enter a course question",
      questionPlaceholder: "Ask, for example: how do correlated errors combine?",
      composerHint: "Enter to send, Shift + Enter for a new line. Include units and dependence conditions for calculations.",
      welcomeTitle: "State the conditions first, then produce the result.",
      welcomeBody: "I distinguish independent from correlated inputs and error from uncertainty, then keep the formula, assumptions, and evidence together. Questions can be in Chinese or English.",
      tryOne: "Try a question",
      promptOneLabel: "Concept",
      promptOne: "What is the difference between error and uncertainty?",
      promptTwoLabel: "Reason",
      promptTwo: "Why can't correlated uncertainty components use a simple root sum square?",
      promptThreeLabel: "Calculate",
      promptThree: "Two independent length errors are 0.2 mm and 0.3 mm. What is the combined uncertainty?",
      promptFourLabel: "Apply",
      promptFour: "What should an uncertainty budget table contain?",
      thinkingLocal: "Retrieving course cards",
      thinkingApi: "DeepSeek is composing an answer",
      localLabel: "Local knowledge engine",
      apiLabel: "DeepSeek enhanced answer",
      sourcesLabel: "Sources",
      exampleLabel: "Example",
      cautionLabel: "Conditions",
      apiNote: "DeepSeek used the retrieved course context. Numerical results and terminology can be checked against the source panel.",
      fallbackNotice: "The API request failed and the local knowledge engine completed the answer. Reason: ",
      apiError: "Unable to connect to the API.",
      calculatorTitle: "Quick calculators",
      methodLabel: "Calculation type",
      methodRss: "Independent root sum square",
      methodCorrelation: "Two correlated components",
      methodMean: "Uncertainty of a repeated mean",
      methodExpanded: "Expanded uncertainty",
      rssValues: "Standard uncertainty components",
      unitLabel: "Common unit",
      componentOne: "Component u₁",
      componentTwo: "Component u₂",
      correlationCoefficient: "Correlation r",
      sampleStandardDeviation: "Single-reading standard deviation s",
      sampleCount: "Number of readings n",
      combinedUncertainty: "Combined standard uncertainty u_c",
      coverageFactor: "Coverage factor k",
      calculate: "Calculate",
      calculatorNote: "The tools use standard formulas and display three significant figures. Continue in the conversation for correlation or nonlinear models.",
      calcInvalid: "Enter valid values that satisfy the model conditions.",
      sourcesTitle: "Knowledge sources",
      sourceGum: "Uncertainty evaluation and expression",
      sourceJjf: "Chinese metrology specification",
      sourceVim: "International metrology vocabulary",
      sourceFoot: "Chinese and English answers use the same knowledge base",
      methodOneTitle: "Check assumptions",
      methodOneBody: "Independence, correlation, Type A/B, and corrections stay distinct.",
      methodTwoTitle: "Propagate carefully",
      methodTwoBody: "The model determines sensitivity; the calculators verify the arithmetic.",
      methodThreeTitle: "Finish with evidence",
      methodThreeBody: "Answers state units, conditions, and GUM / JJF / VIM grounding.",
      footerScope: "Scope: measurement error, uncertainty evaluation, and propagation",
      apiSettings: "API and engine settings",
      settingsTitle: "API and engine settings",
      deepSeekDescription: "A flexible explanation and follow-up layer. Recommended for API use.",
      enableApi: "Enable API",
      provider: "Provider",
      providerDeepSeek: "DeepSeek (recommended)",
      providerCustom: "OpenAI-compatible endpoint",
      modelName: "Model",
      endpoint: "Endpoint",
      apiKey: "API key",
      getApiKey: "Get a DeepSeek key ↗",
      securityNote: "The key is stored only in this tab's session storage and is cleared when the tab closes. It is never written to the GitHub repository. Use only your own key.",
      clearKey: "Clear key",
      testConnection: "Test connection",
      saveSettings: "Save settings",
      testing: "Testing the connection...",
      testSuccess: "Connection successful. The endpoint is responding.",
      testFailed: "Connection failed. Check the key, model, and endpoint.",
      keyRequired: "Enter an API key before enabling the API.",
      settingsSaved: "API settings saved for this tab.",
      keyCleared: "The API key has been cleared from this tab.",
      apiOffline: "Switched to the local knowledge engine.",
      invalidEndpoint: "The endpoint must begin with http:// or https://.",
      languageSwitched: "Interface language switched.",
      emptyQuestion: "Enter a question first.",
      connectionLabel: "Connection status",
      serviceUnavailable: "Endpoint unavailable",
      genericApiError: "The request did not complete"
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  const conversation = $("#conversation");
  const questionForm = $("#question-form");
  const questionInput = $("#question-input");
  const modeSelect = $("#answer-mode");
  const clearButton = $("#clear-chat");
  const languageToggle = $("#language-toggle");
  const settingsDialog = $("#settings-dialog");
  const settingsForm = $("#settings-form");
  const apiToggle = $("#use-api");
  const apiProvider = $("#api-provider");
  const apiEndpoint = $("#api-endpoint");
  const apiModel = $("#api-model");
  const apiKeyInput = $("#api-key");
  const dialogStatus = $("#dialog-status");
  const calculatorForm = $("#calculator-form");
  const calculatorMethod = $("#calculator-method");
  const calculatorResult = $("#calculator-result");
  const toast = $("#toast");
  const sourceMap = window.AGENT_KB.sources;
  const sessionKey = "errorPropagationLabApi";
  const languageKey = "errorPropagationLabLanguage";

  let state = {
    lang: readLanguage(),
    api: readApiConfig(),
    history: [],
    busy: false,
    toastTimer: null
  };

  function t(key) {
    return translations[state.lang][key] || translations.zh[key] || key;
  }

  function readLanguage() {
    try {
      const saved = localStorage.getItem(languageKey);
      return saved === "en" ? "en" : "zh";
    } catch {
      return "zh";
    }
  }

  function defaultApiConfig() {
    return {
      enabled: false,
      provider: "deepseek",
      endpoint: "https://api.deepseek.com/chat/completions",
      model: "deepseek-chat",
      key: ""
    };
  }

  function readApiConfig() {
    try {
      const parsed = JSON.parse(sessionStorage.getItem(sessionKey) || "null");
      if (!parsed) return defaultApiConfig();
      return {
        enabled: Boolean(parsed.enabled),
        provider: parsed.provider === "custom" ? "custom" : "deepseek",
        endpoint: String(parsed.endpoint || defaultApiConfig().endpoint),
        model: String(parsed.model || defaultApiConfig().model),
        key: String(parsed.key || "")
      };
    } catch {
      return defaultApiConfig();
    }
  }

  function saveApiConfig(config) {
    state.api = config;
    try {
      sessionStorage.setItem(sessionKey, JSON.stringify(config));
    } catch {
      // The in-memory configuration remains available for this page.
    }
  }

  function apiIsActive() {
    return Boolean(state.api.enabled && state.api.key.trim());
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function nowLabel() {
    return new Intl.DateTimeFormat(state.lang === "en" ? "en-US" : "zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(new Date());
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      conversation.scrollTop = conversation.scrollHeight;
    });
  }

  function applyLanguage(lang) {
    state.lang = lang === "en" ? "en" : "zh";
    document.documentElement.lang = state.lang === "en" ? "en" : "zh-CN";
    document.title = state.lang === "en"
      ? "Error Propagation Lab | Measurement Uncertainty"
      : "误差合成实验室 | Error Propagation Lab";

    $$("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (translations[state.lang][key]) element.textContent = translations[state.lang][key];
    });
    $$("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      if (translations[state.lang][key]) element.setAttribute("placeholder", translations[state.lang][key]);
    });

    languageToggle.textContent = state.lang === "zh" ? "EN" : "中文";
    languageToggle.setAttribute("aria-label", state.lang === "zh" ? "Switch to English" : "切换到中文");
    $("#hero-illustration").alt = state.lang === "en"
      ? "Repeated measurement points inside a tilted uncertainty ellipse"
      : "重复测量点位于倾斜的不确定度椭圆内";

    try {
      localStorage.setItem(languageKey, state.lang);
    } catch {
      // Language selection still applies for the current view.
    }
    updateApiUi();
    renderWelcome();
  }

  function renderWelcome() {
    conversation.innerHTML = `
      <article class="message assistant-message intro-message">
        <div class="avatar" aria-hidden="true">u∞</div>
        <div class="message-content">
          <div class="message-label">
            <span>${escapeHtml(t("localLabel"))}</span>
            <time>${escapeHtml(t("recommended"))}</time>
          </div>
          <div class="welcome-card">
            <h3>${escapeHtml(t("welcomeTitle"))}</h3>
            <p>${escapeHtml(t("welcomeBody"))}</p>
            <span class="message-label"><span>${escapeHtml(t("tryOne"))}</span></span>
            <div class="starter-grid">
              <button class="starter-prompt" type="button" data-prompt-zh="${escapeHtml(translations.zh.promptOne)}" data-prompt-en="${escapeHtml(translations.en.promptOne)}"><span>${escapeHtml(t("promptOneLabel"))}</span>${escapeHtml(t("promptOne"))}</button>
              <button class="starter-prompt" type="button" data-prompt-zh="${escapeHtml(translations.zh.promptTwo)}" data-prompt-en="${escapeHtml(translations.en.promptTwo)}"><span>${escapeHtml(t("promptTwoLabel"))}</span>${escapeHtml(t("promptTwo"))}</button>
              <button class="starter-prompt" type="button" data-prompt-zh="${escapeHtml(translations.zh.promptThree)}" data-prompt-en="${escapeHtml(translations.en.promptThree)}"><span>${escapeHtml(t("promptThreeLabel"))}</span>${escapeHtml(t("promptThree"))}</button>
              <button class="starter-prompt" type="button" data-prompt-zh="${escapeHtml(translations.zh.promptFour)}" data-prompt-en="${escapeHtml(translations.en.promptFour)}"><span>${escapeHtml(t("promptFourLabel"))}</span>${escapeHtml(t("promptFour"))}</button>
            </div>
          </div>
        </div>
      </article>
    `;
    state.history = [];
    bindPromptButtons(conversation);
  }

  function promptFor(button) {
    return button.getAttribute(state.lang === "en" ? "data-prompt-en" : "data-prompt-zh")
      || button.getAttribute("data-prompt-zh")
      || "";
  }

  function bindPromptButtons(scope) {
    $$("[data-prompt-zh]", scope).forEach((button) => {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";
      button.addEventListener("click", () => {
        if (button.classList.contains("topic-button")) {
          $$(".topic-button").forEach((item) => item.classList.remove("active"));
          button.classList.add("active");
        }
        ask(promptFor(button));
      });
    });
  }

  function resizeInput() {
    questionInput.style.height = "auto";
    questionInput.style.height = `${Math.min(questionInput.scrollHeight, 112)}px`;
  }

  function appendUserMessage(text) {
    const article = document.createElement("article");
    article.className = "message user-message";
    article.innerHTML = `
      <div class="message-content">
        <p>${escapeHtml(text).replace(/\n/g, "<br>")}</p>
      </div>
    `;
    conversation.appendChild(article);
    scrollToBottom();
  }

  function appendTyping() {
    const article = document.createElement("article");
    article.className = "message assistant-message";
    article.id = "typing-message";
    article.innerHTML = `
      <div class="avatar" aria-hidden="true">${apiIsActive() ? "D" : "u∞"}</div>
      <div class="message-content">
        <div class="message-label">
          <span>${escapeHtml(apiIsActive() ? t("apiLabel") : t("localLabel"))}</span>
          <time>${escapeHtml(apiIsActive() ? t("apiEngine") : t("localEngine"))}</time>
        </div>
        <div class="typing" aria-label="${escapeHtml(apiIsActive() ? t("thinkingApi") : t("thinkingLocal"))}"><i></i><i></i><i></i></div>
      </div>
    `;
    conversation.appendChild(article);
    scrollToBottom();
  }

  function removeTyping() {
    $("#typing-message")?.remove();
  }

  function sourceTags(sourceIds) {
    if (!sourceIds || !sourceIds.length) return "";
    return `
      <div class="answer-sources">
        <span>${escapeHtml(t("sourcesLabel"))}</span>
        ${sourceIds.map((id) => {
          const source = sourceMap[id];
          return source
            ? `<a class="source-tag" href="#sources" data-source="${escapeHtml(id)}">${escapeHtml(source.short)}</a>`
            : "";
        }).join("")}
      </div>
    `;
  }

  function localAnswerMarkup(result, fallbackReason = "") {
    const bullets = (result.bullets || []).length
      ? `<ul class="message-body-list">${result.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
      : "";
    const formula = result.formula
      ? `<div class="answer-formula" aria-label="Formula">${escapeHtml(result.formula)}</div>`
      : "";
    const example = result.example
      ? `<div class="answer-example"><strong>${escapeHtml(t("exampleLabel"))}</strong><br>${escapeHtml(result.example)}</div>`
      : "";
    const caution = result.caution
      ? `<div class="answer-caution"><strong>${escapeHtml(t("cautionLabel"))}</strong><br>${escapeHtml(result.caution)}</div>`
      : "";
    const fallback = fallbackReason
      ? `<div class="fallback-notice">${escapeHtml(t("fallbackNotice"))}${escapeHtml(fallbackReason)}</div>`
      : "";
    return `
      <div class="avatar" aria-hidden="true">u∞</div>
      <div class="message-content ${result.kind === "scope" ? "scope-answer" : ""}">
        <div class="message-label">
          <span>${escapeHtml(t("localLabel"))}</span>
          <time>${nowLabel()}</time>
        </div>
        <h3 class="message-title">${escapeHtml(result.title)}</h3>
        <p>${escapeHtml(result.headline)}</p>
        ${bullets}
        ${formula}
        ${example}
        ${caution}
        ${sourceTags(result.sources)}
        ${fallback}
      </div>
    `;
  }

  function appendLocalAnswer(result, fallbackReason = "") {
    const article = document.createElement("article");
    article.className = "message assistant-message";
    article.innerHTML = localAnswerMarkup(result, fallbackReason);
    conversation.appendChild(article);
    scrollToBottom();
  }

  function inlineMarkdown(text) {
    return text
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
  }

  function renderMarkdown(source) {
    const lines = escapeHtml(source).replace(/\r/g, "").split("\n");
    const output = [];
    let paragraph = [];
    let listType = "";

    const flushParagraph = () => {
      if (!paragraph.length) return;
      output.push(`<p>${inlineMarkdown(paragraph.join("<br>"))}</p>`);
      paragraph = [];
    };
    const closeList = () => {
      if (!listType) return;
      output.push(`</${listType}>`);
      listType = "";
    };

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushParagraph();
        closeList();
        return;
      }

      const heading = trimmed.match(/^#{1,4}\s+(.+)$/);
      if (heading) {
        flushParagraph();
        closeList();
        output.push(`<h4>${inlineMarkdown(heading[1])}</h4>`);
        return;
      }

      const bullet = trimmed.match(/^[-*]\s+(.+)$/);
      if (bullet) {
        flushParagraph();
        if (listType !== "ul") {
          closeList();
          output.push("<ul>");
          listType = "ul";
        }
        output.push(`<li>${inlineMarkdown(bullet[1])}</li>`);
        return;
      }

      const numbered = trimmed.match(/^\d+\.\s+(.+)$/);
      if (numbered) {
        flushParagraph();
        if (listType !== "ol") {
          closeList();
          output.push("<ol>");
          listType = "ol";
        }
        output.push(`<li>${inlineMarkdown(numbered[1])}</li>`);
        return;
      }

      closeList();
      paragraph.push(trimmed);
    });

    flushParagraph();
    closeList();
    return output.join("");
  }

  function appendApiAnswer(answer, localResult, sourceIds) {
    const article = document.createElement("article");
    article.className = "message assistant-message api-message";
    article.innerHTML = `
      <div class="avatar" aria-hidden="true">D</div>
      <div class="message-content">
        <div class="message-label">
          <span>${escapeHtml(t("apiLabel"))} · ${escapeHtml(state.api.model)}</span>
          <time>${nowLabel()}</time>
        </div>
        <h3 class="message-title">${escapeHtml(localResult.title)}</h3>
        <div class="api-answer-text">${renderMarkdown(answer)}</div>
        ${sourceTags(sourceIds)}
        <div class="api-note">${escapeHtml(t("apiNote"))}</div>
      </div>
    `;
    conversation.appendChild(article);
    scrollToBottom();
  }

  async function requestApi(question, localResult, matches, history) {
    const messages = window.AgentCore.buildApiMessages(
      question,
      localResult,
      matches,
      state.lang,
      history
    );
    const payload = {
      model: state.api.model,
      messages,
      stream: false,
      max_tokens: 1400
    };
    if (!/reasoner/i.test(state.api.model)) payload.temperature = 0.2;

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetch(state.api.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${state.api.key.trim()}`
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        credentials: "omit"
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const detail = data?.error?.message || `${response.status} ${response.statusText}`;
        throw new Error(detail || t("serviceUnavailable"));
      }
      const content = data?.choices?.[0]?.message?.content;
      if (!content || !String(content).trim()) throw new Error(t("genericApiError"));
      return String(content).trim();
    } catch (error) {
      if (error.name === "AbortError") throw new Error("Request timeout");
      throw error;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  async function ask(rawQuestion) {
    const question = String(rawQuestion || "").trim();
    if (!question || state.busy) return;
    state.busy = true;
    const sendButton = $(".send-button");
    sendButton.disabled = true;
    questionInput.value = "";
    resizeInput();
    appendUserMessage(question);
    state.history.push({ role: "user", content: question });
    appendTyping();
    await sleep(260);

    const localResult = window.AgentCore.answer(question, {
      mode: modeSelect.value,
      lang: state.lang
    });
    removeTyping();

    if (apiIsActive() && localResult.kind !== "scope") {
      const matches = window.AgentCore.retrieve(question, 3);
      try {
        const answer = await requestApi(question, localResult, matches, state.history.slice(0, -1));
        appendApiAnswer(answer, localResult, localResult.sources);
        state.history.push({ role: "assistant", content: answer });
      } catch (error) {
        const reason = error?.message || t("apiError");
        appendLocalAnswer(localResult, reason);
        state.history.push({
          role: "assistant",
          content: [localResult.headline, ...(localResult.bullets || [])].join(" ")
        });
        updateApiUi(true);
      }
    } else {
      appendLocalAnswer(localResult);
      state.history.push({
        role: "assistant",
        content: [localResult.headline, ...(localResult.bullets || [])].join(" ")
      });
    }

    state.busy = false;
    sendButton.disabled = false;
    questionInput.focus();
  }

  function updateApiUi(showFailure = false) {
    const active = apiIsActive();
    const pill = $("#engine-pill");
    const pillText = $("#engine-pill-text");
    const banner = $("#api-banner");
    const stateLabel = $("#api-state span:last-child");
    const connectButton = $(".connect-button");
    const sourceText = $("#answer-source-text");
    const chatCard = $("#chat-panel");

    pill.classList.toggle("api-on", active);
    banner.classList.toggle("connected", active);
    chatCard.classList.toggle("api-active", active);
    pillText.textContent = active
      ? `${t("apiEngine")} · ${state.api.model}`
      : t("localEngine");
    if (stateLabel) stateLabel.textContent = showFailure
      ? t("serviceUnavailable")
      : active ? t("apiReady") : t("localAlwaysReady");
    connectButton.textContent = active ? t("manageApi") : t("connectDeepSeek");
    sourceText.textContent = active ? t("apiEngineReady") : t("localEngineReady");
    $("#api-banner-title").textContent = active ? t("apiTitleConnected") : t("apiTitle");
    $("#api-banner .api-banner-copy p").textContent = active ? t("apiBodyConnected") : t("apiBody");
  }

  function setDialogStatus(message, type = "") {
    dialogStatus.textContent = message;
    dialogStatus.className = `dialog-status${type ? ` ${type}` : ""}`;
  }

  function populateSettings() {
    apiToggle.checked = Boolean(state.api.enabled);
    apiProvider.value = state.api.provider;
    apiEndpoint.value = state.api.endpoint;
    apiModel.value = state.api.model;
    apiKeyInput.value = state.api.key;
    apiKeyInput.type = "password";
    setDialogStatus("");
  }

  function openSettings() {
    populateSettings();
    if (typeof settingsDialog.showModal === "function") {
      settingsDialog.showModal();
    } else {
      settingsDialog.setAttribute("open", "");
    }
  }

  function closeSettings() {
    if (typeof settingsDialog.close === "function") {
      settingsDialog.close();
    } else {
      settingsDialog.removeAttribute("open");
    }
  }

  function validatedFormConfig() {
    const endpoint = apiEndpoint.value.trim();
    const model = apiModel.value.trim();
    const key = apiKeyInput.value.trim();
    const enabled = apiToggle.checked;
    if (!/^https?:\/\//i.test(endpoint)) {
      throw new Error(t("invalidEndpoint"));
    }
    if (!model) throw new Error("Model name is required.");
    if (enabled && !key) throw new Error(t("keyRequired"));
    return {
      enabled,
      provider: apiProvider.value,
      endpoint,
      model,
      key
    };
  }

  async function testApiFromForm() {
    const testButton = $("#test-api");
    let candidate;
    try {
      candidate = validatedFormConfig();
      if (!candidate.key) throw new Error(t("keyRequired"));
    } catch (error) {
      setDialogStatus(error.message, "error");
      return;
    }

    const oldApi = state.api;
    state.api = candidate;
    testButton.disabled = true;
    setDialogStatus(t("testing"));
    try {
      const messages = [
        { role: "system", content: "Reply with exactly OK." },
        { role: "user", content: "ping" }
      ];
      const localResult = {
        title: "Connection test",
        headline: "Connection test",
        bullets: [],
        caution: ""
      };
      await requestApi("ping", localResult, [], []);
      setDialogStatus(t("testSuccess"), "success");
    } catch (error) {
      setDialogStatus(`${t("testFailed")} ${error.message || ""}`.trim(), "error");
    } finally {
      state.api = oldApi;
      testButton.disabled = false;
    }
  }

  function handleSettingsSave(event) {
    event.preventDefault();
    try {
      const config = validatedFormConfig();
      saveApiConfig(config);
      updateApiUi();
      closeSettings();
      showToast(t("settingsSaved"));
    } catch (error) {
      setDialogStatus(error.message, "error");
    }
  }

  function clearApiKey() {
    const config = {
      ...state.api,
      enabled: false,
      key: ""
    };
    saveApiConfig(config);
    apiToggle.checked = false;
    apiKeyInput.value = "";
    setDialogStatus(t("keyCleared"), "success");
    updateApiUi();
  }

  function switchCalculatorPanel(method) {
    $$("[data-calc-panel]").forEach((panel) => {
      panel.classList.toggle("active", panel.getAttribute("data-calc-panel") === method);
    });
  }

  function numericValue(selector) {
    const value = Number($(selector).value);
    return Number.isFinite(value) ? value : NaN;
  }

  function setCalculatorError(message = t("calcInvalid")) {
    calculatorResult.classList.add("error");
    calculatorResult.innerHTML = `<span>${escapeHtml(message)}</span>`;
  }

  function handleCalculator(event) {
    event.preventDefault();
    const method = calculatorMethod.value;
    const round = window.AgentCore.roundSmart;
    let value = NaN;
    let label = "u_c";
    let unit = "";

    if (method === "rss") {
      const values = $("#rss-values").value
        .split(/[,，;；\s]+/)
        .filter(Boolean)
        .map(Number);
      value = window.AgentCore.calculateRss(values.map(Math.abs));
      unit = $("#rss-unit").value.trim();
    } else if (method === "correlation") {
      value = window.AgentCore.calculateCorrelated(
        numericValue("#corr-u1"),
        numericValue("#corr-u2"),
        numericValue("#corr-r")
      );
    } else if (method === "mean") {
      value = window.AgentCore.calculateMeanUncertainty(
        numericValue("#mean-s"),
        numericValue("#mean-n")
      );
      label = "u(x̄)";
    } else if (method === "expanded") {
      value = window.AgentCore.calculateExpanded(
        numericValue("#expanded-uc"),
        numericValue("#expanded-k")
      );
      label = "U";
    }

    if (!Number.isFinite(value)) {
      setCalculatorError();
      return;
    }

    calculatorResult.classList.remove("error");
    calculatorResult.innerHTML = `<span>${escapeHtml(label)}</span><strong>${escapeHtml(round(value))}${unit ? ` ${escapeHtml(unit)}` : ""}</strong>`;
  }

  questionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    ask(questionInput.value);
  });
  questionInput.addEventListener("input", resizeInput);
  questionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      questionForm.requestSubmit();
    }
  });

  clearButton.addEventListener("click", () => {
    renderWelcome();
    questionInput.focus();
  });

  languageToggle.addEventListener("click", () => {
    applyLanguage(state.lang === "zh" ? "en" : "zh");
    showToast(t("languageSwitched"));
  });

  $$("[data-open-settings]").forEach((button) => {
    button.addEventListener("click", openSettings);
  });
  $("#close-settings").addEventListener("click", closeSettings);
  settingsForm.addEventListener("submit", handleSettingsSave);
  $("#test-api").addEventListener("click", testApiFromForm);
  $("#clear-api").addEventListener("click", clearApiKey);
  $("#toggle-key").addEventListener("click", () => {
    apiKeyInput.type = apiKeyInput.type === "password" ? "text" : "password";
  });
  apiProvider.addEventListener("change", () => {
    if (apiProvider.value === "deepseek") {
      apiEndpoint.value = "https://api.deepseek.com/chat/completions";
      apiModel.value = "deepseek-chat";
    } else if (apiEndpoint.value.includes("api.deepseek.com")) {
      apiEndpoint.value = "";
      apiModel.value = "";
    }
  });
  settingsDialog.addEventListener("click", (event) => {
    if (event.target === settingsDialog) closeSettings();
  });

  calculatorMethod.addEventListener("change", () => {
    switchCalculatorPanel(calculatorMethod.value);
  });
  calculatorForm.addEventListener("submit", handleCalculator);
  bindPromptButtons(document);
  applyLanguage(state.lang);
  resizeInput();
})();
