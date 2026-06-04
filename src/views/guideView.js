import { dismissGuide, isGuideDismissed } from "../state/guideStore.js";

const fallbackTargetSelector = ".sql-panel";

export function setupFeatureGuide({ guide, els, onBeforeStep, onClose }) {
  let stepIndex = 0;
  let open = false;

  function show({ force = false } = {}) {
    if (!guide || (!force && isGuideDismissed(guide.id))) return;
    open = true;
    stepIndex = 0;
    renderStep();
  }

  function close({ dismiss = true } = {}) {
    open = false;
    els.guideLayer.hidden = true;
    els.guideLayer.innerHTML = "";
    if (onClose) onClose();
    if (dismiss) dismissGuide(guide.id);
  }

  function next() {
    if (stepIndex >= guide.steps.length - 1) {
      close();
      return;
    }
    stepIndex += 1;
    renderStep();
  }

  function back() {
    stepIndex = Math.max(0, stepIndex - 1);
    renderStep();
  }

  function renderStep() {
    if (!open) return;

    const step = guide.steps[stepIndex];
    if (onBeforeStep) onBeforeStep(step, stepIndex);

    requestAnimationFrame(() => {
      const target = document.querySelector(step.target) || document.querySelector(fallbackTargetSelector);
      target?.scrollIntoView({ block: "center", inline: "nearest", behavior: "auto" });

      window.setTimeout(() => {
        const rect = target?.getBoundingClientRect() || centeredRect();
        const placement = choosePlacement(step.placement, rect);
        const cardPosition = getCardPosition(rect, placement);

        els.guideLayer.hidden = false;
        els.guideLayer.innerHTML = `
          <div class="guide-scrim" data-guide-action="close"></div>
          <div class="guide-highlight" style="${highlightStyle(rect)}"></div>
          <article class="guide-card guide-card-${placement}" style="left: ${cardPosition.left}px; top: ${cardPosition.top}px;">
            <span class="guide-arrow"></span>
            <p class="eyebrow">${guide.releaseLabel}</p>
            <h3>${escapeHtml(step.title)}</h3>
            <p>${escapeHtml(step.body)}</p>
            <div class="guide-progress">${stepIndex + 1} of ${guide.steps.length}</div>
            <div class="guide-actions">
              <button class="ghost-button" type="button" data-guide-action="close">Skip</button>
              <button class="ghost-button" type="button" data-guide-action="back" ${stepIndex === 0 ? "disabled" : ""}>Back</button>
              <button class="primary-button" type="button" data-guide-action="next">${stepIndex === guide.steps.length - 1 ? "Got It" : "Next"}</button>
            </div>
          </article>`;
      }, 220);
    });
  }

  els.guideLayer.addEventListener("click", (event) => {
    const action = event.target.closest("[data-guide-action]")?.dataset.guideAction;
    if (!action) return;
    if (action === "close") close();
    if (action === "next") next();
    if (action === "back") back();
  });

  window.addEventListener("resize", () => {
    if (open) renderStep();
  });

  return { show, close };
}

function choosePlacement(preferred, rect) {
  if (window.innerWidth < 720) return "bottom";
  if (preferred === "right" && rect.right + 380 > window.innerWidth) return "left";
  if (preferred === "left" && rect.left - 380 < 0) return "right";
  return preferred || "bottom";
}

function getCardPosition(rect, placement) {
  const margin = 18;
  const cardWidth = Math.min(360, window.innerWidth - margin * 2);
  const estimatedCardHeight = window.innerWidth < 640 ? 350 : 230;
  let left = rect.left;
  let top = rect.bottom + margin;

  if (placement === "top") {
    top = rect.top - 220;
    left = rect.left + rect.width / 2 - cardWidth / 2;
  }

  if (placement === "right") {
    top = rect.top + rect.height / 2 - 110;
    left = rect.right + margin;
  }

  if (placement === "left") {
    top = rect.top + rect.height / 2 - 110;
    left = rect.left - cardWidth - margin;
  }

  if (placement === "bottom") {
    top = rect.bottom + margin;
    left = rect.left + rect.width / 2 - cardWidth / 2;
  }

  return {
    left: clamp(left, margin, window.innerWidth - cardWidth - margin),
    top: clamp(top, margin, window.innerHeight - estimatedCardHeight - margin)
  };
}

function highlightStyle(rect) {
  const pad = 8;
  return [
    `left: ${Math.max(8, rect.left - pad)}px`,
    `top: ${Math.max(8, rect.top - pad)}px`,
    `width: ${Math.min(window.innerWidth - 16, rect.width + pad * 2)}px`,
    `height: ${Math.max(44, rect.height + pad * 2)}px`
  ].join("; ");
}

function centeredRect() {
  return {
    left: window.innerWidth / 2 - 120,
    right: window.innerWidth / 2 + 120,
    top: window.innerHeight / 2 - 80,
    bottom: window.innerHeight / 2 + 80,
    width: 240,
    height: 160
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
