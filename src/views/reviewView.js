import { todayKey } from "../utils/date.js";

export function renderReview(els, state, week) {
  const reviewedToday = Boolean(state.reviews[todayKey()]);
  els.reviewStatus.textContent = reviewedToday ? "Done today" : "Open";
  els.reviewButton.disabled = reviewedToday;
  els.reviewList.innerHTML = week.review.map((item) => `<button class="review-chip" type="button">${item}</button>`).join("");
}
