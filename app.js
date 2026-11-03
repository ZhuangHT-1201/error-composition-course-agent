(function () {
  "use strict";

  const conversation = document.getElementById("conversation");
  const questionForm = document.getElementById("question-form");
  const questionInput = document.getElementById("question-input");
  const modeSelect = document.getElementById("answer-mode");
  const clearButton = document.getElementById("clear-chat");
  const calculatorForm = document.getElementById("calculator-form");
  const calculatorResult = document.getElementById("calculator-result");
  const calculatorUnit = document.getElementById("calculator-unit");
  const sourceMap = window.AGENT_KB.sources;

  const introMarkup = conversation.innerHTML;
  let busy = false;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function nowLabel() {
    return new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(new Date());
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      conversation.scrollTop = conversation.scrollHeight;
    });
  }

  function appendUserMessage(text) {
    const article = document.createElement("article");
    article.className = "message user-message";
    article.innerHTML = `
      <div class="message-content">
        <p>${escapeHtml(text)}</p>
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
      <div class="avatar" aria-hidden="true">测</div>
      <div class="message-content">
        <div class="message-label">
          <span>课程助手</span>
          <time>正在检索</time>
        </div>
        <div class="typing" aria-label="正在生成回答"><i></i><i></i><i></i></div>
      </div>
    `;
    conversation.appendChild(article);
    scrollToBottom();
  }

  function removeTyping() {
    const typing = document.getElementById("typing-message");
    if (typing) typing.remove();
  }

  function sourceTags(sourceIds) {
    if (!sourceIds || !sourceIds.length) return "";
    return `
      <div class="answer-sources">
        <span>依据</span>
        ${sourceIds.map((id) => {
          const source = sourceMap[id];
          return source
            ? `<a class="source-tag" href="#sources" data-source="${escapeHtml(id)}">${escapeHtml(source.short)}</a>`
            : "";
        }).join("")}
      </div>
    `;
  }

  function answerMarkup(result) {
    const bullets = (result.bullets || []).length
      ? `<ul class="message-body-list">${result.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
      : "";
    const formula = result.formula
      ? `<div class="answer-formula" aria-label="公式">${escapeHtml(result.formula)}</div>`
      : "";
    const example = result.example
      ? `<div class="answer-example"><strong>示例</strong><br>${escapeHtml(result.example)}</div>`
      : "";
    const caution = result.caution
      ? `<div class="answer-caution"><strong>适用条件</strong><br>${escapeHtml(result.caution)}</div>`
      : "";

    return `
      <div class="avatar" aria-hidden="true">测</div>
      <div class="message-content ${result.kind === "scope" ? "scope-answer" : ""}">
        <div class="message-label">
          <span>课程助手</span>
          <time>${nowLabel()}</time>
        </div>
        <h3 class="message-title">${escapeHtml(result.title)}</h3>
        <p class="message-headline">${escapeHtml(result.headline)}</p>
        ${bullets}
        ${formula}
        ${example}
        ${caution}
        ${sourceTags(result.sources)}
      </div>
    `;
  }

  function appendAssistantMessage(result) {
    const article = document.createElement("article");
    article.className = "message assistant-message";
    article.innerHTML = answerMarkup(result);
    conversation.appendChild(article);
    scrollToBottom();

    article.querySelectorAll("[data-source]").forEach((tag) => {
      tag.addEventListener("click", () => {
        const sourceId = tag.getAttribute("data-source");
        const source = sourceMap[sourceId];
        if (!source) return;
        const sourceSection = document.getElementById("sources");
        sourceSection?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  function ask(text) {
    const question = String(text || "").trim();
    if (!question || busy) return;
    busy = true;
    questionInput.value = "";
    resizeInput();
    appendUserMessage(question);
    appendTyping();

    const delay = Math.min(700, 260 + question.length * 8);
    window.setTimeout(() => {
      removeTyping();
      const result = window.AgentCore.answer(question, { mode: modeSelect.value });
      appendAssistantMessage(result);
      busy = false;
      questionInput.focus();
    }, delay);
  }

  function resizeInput() {
    questionInput.style.height = "auto";
    questionInput.style.height = `${Math.min(questionInput.scrollHeight, 112)}px`;
  }

  function bindPromptButtons(scope) {
    scope.querySelectorAll("[data-prompt]").forEach((button) => {
      button.addEventListener("click", () => {
        ask(button.getAttribute("data-prompt"));
      });
    });
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
    conversation.innerHTML = introMarkup;
    bindPromptButtons(conversation);
    questionInput.focus();
  });

  calculatorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const raw = document.getElementById("component-values").value;
    const values = raw
      .split(/[,，;；\s]+/)
      .filter(Boolean)
      .map(Number);
    const valid = values.length > 0 && values.every(Number.isFinite);

    calculatorResult.classList.toggle("error", !valid);
    if (!valid) {
      calculatorResult.innerHTML = "<span>请输入以逗号或空格分隔的非负数值。</span>";
      return;
    }

    const combined = window.AgentCore.calculateRss(values.map(Math.abs));
    const result = window.AgentCore.roundSmart(combined);
    const unit = calculatorUnit.value.trim();
    calculatorResult.innerHTML = `<span>u<sub>c</sub></span><strong>${escapeHtml(result)}${unit ? ` ${escapeHtml(unit)}` : ""}</strong>`;
  });

  document.querySelectorAll(".topic-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".topic-button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  bindPromptButtons(document);
  resizeInput();
})();
