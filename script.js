const questions = [
  { category: "Ownership", question: "Does every new inquiry have one clearly accountable owner?", issue: "Unclear ownership", detail: "New inquiries can sit between teams when responsibility is shared but not assigned." },
  { category: "Language", question: "Does each intake stage have one written, shared definition?", issue: "Ambiguous stages", detail: "When every prospect is called the same thing, handoffs and reports lose meaning." },
  { category: "Response", question: "Can you reliably measure time from inquiry to first human response?", issue: "Invisible response time", detail: "The firm cannot improve speed-to-lead if response behavior is not visible." },
  { category: "Qualification", question: "Does the team apply the same qualification criteria to every inquiry?", issue: "Inconsistent qualification", detail: "Different standards create unreliable funnel data and uneven client experiences." },
  { category: "Follow-up", question: "Does every open opportunity have a defined next action and due date?", issue: "Unowned follow-up", detail: "Qualified opportunities leak when the next step exists only in someone’s memory." },
  { category: "Attribution", question: "Can a signed matter be traced back to its original marketing source?", issue: "Broken attribution", detail: "Lead counts cannot guide investment when signed matters are disconnected from source data." },
  { category: "Adoption", question: "Is one person responsible for CRM quality, training, and ongoing adoption?", issue: "No system steward", detail: "Without an accountable operator, even a well-built CRM gradually becomes unreliable." }
];
const responses = new Array(questions.length).fill(null);
let currentQuestion = 0;
const form = document.querySelector("#intake-diagnostic");
const stage = document.querySelector("#question-stage");
const count = document.querySelector("#question-count");
const progress = document.querySelector("#progress-fill");
const next = document.querySelector("#next-question");
const back = document.querySelector("#back-question");
const result = document.querySelector("#diagnostic-result");

function renderQuestion() {
  const item = questions[currentQuestion];
  count.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  progress.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  back.disabled = currentQuestion === 0;
  next.disabled = responses[currentQuestion] === null;
  next.innerHTML = currentQuestion === questions.length - 1 ? 'See my result <span aria-hidden="true">→</span>' : 'Next <span aria-hidden="true">→</span>';
  stage.innerHTML = `<div class="question-wrap"><span class="question-category">${item.category}</span><h3>${item.question}</h3><div class="answer-list" role="radiogroup" aria-label="Choose an answer">${[["yes", "Yes, consistently"], ["unsure", "Not sure"], ["no", "No, not yet"]].map(([value, label]) => `<label class="answer-option"><input type="radio" name="question-${currentQuestion}" value="${value}" ${responses[currentQuestion] === value ? "checked" : ""} /><span>${label}</span></label>`).join("")}</div></div>`;
  stage.querySelectorAll("input").forEach(input => input.addEventListener("change", event => { responses[currentQuestion] = event.target.value; next.disabled = false; }));
}

function showResult() {
  const weights = { yes: 1, unsure: 0.5, no: 0 };
  const score = Math.round((responses.reduce((sum, response) => sum + weights[response], 0) / questions.length) * 100);
  const gaps = questions.map((question, index) => ({ ...question, response: responses[index] }));
  const title = score >= 85 ? "Your foundation is unusually strong." : score >= 60 ? "Your system works, but key handoffs remain exposed." : "Your intake has preventable gaps.";
  const summary = score >= 85 ? "Most foundations appear defined. The next opportunity is validating adoption, data quality, and whether reporting changes real decisions." : score >= 60 ? "The firm has pieces of a working system, but inconsistent ownership or definitions may still distort conversion and attribution." : "The immediate opportunity is not more automation. Start by defining stages, assigning ownership, and making the current process measurable.";
  document.querySelector("#result-score").textContent = score;
  document.querySelector("#result-title").textContent = title;
  document.querySelector("#result-summary").textContent = summary;
  document.querySelector("#leak-grid").innerHTML = gaps.map(gap => `<div class="leak-item ${gap.response === "yes" ? "low" : "high"}"><strong>${gap.response === "yes" ? "✓" : "!"} ${gap.issue}</strong><span>${gap.response === "yes" ? "No immediate concern indicated." : gap.detail}</span></div>`).join("");
  form.hidden = true; result.hidden = false; result.focus();
}
next.addEventListener("click", () => { if (responses[currentQuestion] === null) return; if (currentQuestion < questions.length - 1) { currentQuestion += 1; renderQuestion(); } else showResult(); });
back.addEventListener("click", () => { if (currentQuestion > 0) { currentQuestion -= 1; renderQuestion(); } });
document.querySelector("#restart-diagnostic").addEventListener("click", () => { responses.fill(null); currentQuestion = 0; result.hidden = true; form.hidden = false; renderQuestion(); form.scrollIntoView({ behavior: "smooth", block: "center" }); });

document.querySelectorAll(".state-button").forEach(button => button.addEventListener("click", () => {
  const selectedState = button.dataset.state;
  document.querySelectorAll(".state-button").forEach(item => { const active = item === button; item.classList.toggle("active", active); item.setAttribute("aria-pressed", active ? "true" : "false"); });
  document.querySelector(".journey").dataset.systemState = selectedState;
  document.querySelectorAll(".state-copy").forEach(item => { item.textContent = selectedState === "designed" ? item.dataset.designed : item.dataset.broken; });
  document.querySelector(".alert-copy").textContent = selectedState === "designed" ? "Every handoff has an owner and measurable next step." : "Three handoffs have no accountable owner.";
  document.querySelector(".system-alert").style.color = selectedState === "designed" ? "#2f6959" : "#84442b";
}));
const runPlayButton = document.querySelector("#run-play");
const playDiagram = document.querySelector("#play-diagram");
runPlayButton.addEventListener("click", () => { playDiagram.classList.remove("playing"); void playDiagram.offsetWidth; playDiagram.classList.add("playing"); });
renderQuestion();
