export function renderMentalModel(els, curriculum) {
  els.mentalModel.innerHTML = curriculum.mentalModel.map((item) => `<li>${item}</li>`).join("");
}
