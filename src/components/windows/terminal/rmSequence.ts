// rmSequence.ts — Dramatic rm -rf / animation

export function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

export async function typeText(target: HTMLElement, text: string, speed = 35): Promise<void> {
  for (const ch of text) {
    target.innerHTML += ch === "\n" ? "<br>" : ch.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    target.scrollTop = target.scrollHeight;
    await sleep(speed);
  }
}

interface RmElements {
  termRoot: HTMLElement;
  output: HTMLElement;
  inputLine: HTMLElement;
  input: HTMLInputElement;
}

export async function rmRfSequence(
  els: RmElements,
  setLocked: (v: boolean) => void
): Promise<void> {
  setLocked(true);
  els.input.disabled = true;
  els.inputLine.style.display = "none";

  // 1. Fake "deleting" lines
  const dirs = [
    "/home/abel/2025", "/home/abel/2024", "/home/abel/2023",
    "/home/abel/2021-2022", "/home/abel/2020-2021", "/home/abel/.secreto",
    "/home/abel", "/home", "/etc", "/usr", "/var", "/",
  ];
  for (const d of dirs) {
    els.output.innerHTML += `<span class="term-error">rm: eliminando '${d}'...</span>\n`;
    els.output.scrollTop = els.output.scrollHeight;
    await sleep(120);
  }

  // 2. Flash
  els.termRoot.classList.add("rm-flash");
  await sleep(500);
  els.termRoot.classList.remove("rm-flash");

  // 3. White screen
  els.output.innerHTML = "";
  els.termRoot.classList.add("rm-white");
  await sleep(2000);

  // 4. Rebuild
  els.termRoot.classList.remove("rm-white");
  els.termRoot.classList.add("rm-rebuild");
  els.termRoot.style.background = "";
  await sleep(600);

  // 5. Type rebuild lines
  const lines = [
    "Reconstruyendo sistema...",
    "",
    "████████████████████ 100%",
    "",
    "Sistema restaurado.",
    "",
  ];
  for (const line of lines) {
    await typeText(els.output, line + "\n", 25);
    await sleep(200);
  }
  await sleep(400);

  // 6. Final warning
  const warning = "No vuelvas a hacer eso.";
  const warningEl = document.createElement("span");
  warningEl.className = "term-error";
  warningEl.style.fontSize = "15px";
  warningEl.style.fontWeight = "bold";
  els.output.appendChild(warningEl);
  await typeText(warningEl, warning, 60);
  els.output.innerHTML += "\n\n";
  els.output.scrollTop = els.output.scrollHeight;

  await sleep(800);

  // 7. Restore terminal
  els.termRoot.classList.remove("rm-rebuild");
  els.inputLine.style.display = "";
  els.input.disabled = false;
  els.input.focus();
  setLocked(false);
}
