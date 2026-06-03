import { earnedBadges } from "../state/selectors.js";

export function renderBadges(els, state, curriculum) {
  const earned = new Set(earnedBadges(state, curriculum).map((badge) => badge.id));
  els.badgeCount.textContent = `${earned.size} earned`;
  els.badgeGrid.innerHTML = curriculum.badges
    .map((badge) => `<article class="badge ${earned.has(badge.id) ? "earned" : ""}">
      <strong>${badge.name}</strong>
      <span>${badge.text}</span>
    </article>`)
    .join("");
}
