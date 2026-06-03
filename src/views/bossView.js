import { getBossBattle } from "../state/selectors.js";

export function renderBossBattle(els, state, curriculum, weekId, onCompleteBoss) {
  const battle = getBossBattle(curriculum, weekId);
  const complete = Boolean(state.bossBattles[battle.month]);

  els.bossTitle.textContent = battle.title;
  els.bossPrompt.textContent = battle.prompt;
  els.bossMonth.textContent = `Month ${battle.month}`;
  els.bossButton.disabled = complete;
  els.bossButton.innerHTML = complete
    ? "Battle Complete"
    : '<span data-icon="target"></span>Complete Battle';
  els.bossButton.onclick = () => onCompleteBoss(battle.month);
}
