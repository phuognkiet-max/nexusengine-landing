"use strict";
const navigation = document.getElementById("navigation");
const menuToggle = document.querySelector(".menu-toggle");
function closeMenu() {
  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  navigation.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    closeMenu(); menuToggle.focus();
  }
});
window.matchMedia("(min-width: 561px)").addEventListener("change", event => {
  if (event.matches) closeMenu();
});

const steps = [
  { kicker: "START WITH THE ORIGINAL", title: "Keep your source intact.", description: "Select a video in the desktop app. The engine reads its media streams and prepares audio for speech recognition while keeping the original file unchanged.", detail: "Desktop media inspection & audio extraction", left: "▶", right: "≋" },
  { kicker: "TURN SPEECH INTO TIMED TEXT", title: "Review what was said.", description: "Use speech recognition or OCR for on-screen text. Inspect the resulting subtitles, correct wording, and review the timing before translation.", detail: "Whisper ASR · OCR · editable subtitles", left: "≋", right: "CC" },
  { kicker: "KEEP MEANING IN FOCUS", title: "Translate, then refine.", description: "Translate with a selected provider, using style and glossary guidance. Review the wording before voice generation. Claude-based contextual transcreation is planned; it is not yet part of the prototype.", detail: "Current providers: Gemini & DeepSeek · Claude planned", left: "文", right: "A" },
  { kicker: "GIVE THE MESSAGE A VOICE", title: "Align speech to the timeline.", description: "Generate synthetic speech with an installed local voice and fit it to subtitle timing. Review the result and shorten text when necessary. Voice and language availability depends on the installed models.", detail: "Local Piper TTS · sentence timing · audio review", left: "CC", right: "≋" },
  { kicker: "REVIEW THE FINAL RESULT", title: "Bring the pieces together.", description: "Combine the video, styled subtitles, and voiceover. Check the preview and export a final video with FFmpeg. The engine verifies output files before reporting completion.", detail: "Captions + voice + video · verified export", left: "CC", right: "▶" }
];
const tabs = [...document.querySelectorAll("[data-step]")];
const compactWorkflow = window.matchMedia("(max-width: 560px)");
function setTabOrientation() {
  document.querySelector(".workflow-tabs").setAttribute("aria-orientation", compactWorkflow.matches ? "horizontal" : "vertical");
}
setTabOrientation();
compactWorkflow.addEventListener("change", setTabOrientation);
function selectStep(index, focus = false) {
  const step = steps[index];
  tabs.forEach((tab, position) => {
    tab.setAttribute("aria-selected", String(position === index));
    tab.tabIndex = position === index ? 0 : -1;
  });
  document.getElementById("step-panel").setAttribute("aria-labelledby", `step-${index}`);
  document.getElementById("step-kicker").textContent = step.kicker;
  document.getElementById("step-title").textContent = step.title;
  document.getElementById("step-description").textContent = step.description;
  document.getElementById("step-detail").textContent = step.detail;
  document.getElementById("step-count").textContent = `0${index + 1} / 05`;
  const symbols = document.querySelectorAll(".graphic-file");
  symbols[0].textContent = step.left; symbols[1].textContent = step.right;
  if (focus) tabs[index].focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectStep(index));
  tab.addEventListener("keydown", event => {
    let next;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % tabs.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index + tabs.length - 1) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectStep(next, true); }
  });
});

const privacyDialog = document.getElementById("privacy-dialog");
document.getElementById("privacy-open").addEventListener("click", () => privacyDialog.showModal());
document.getElementById("privacy-close").addEventListener("click", () => privacyDialog.close());
privacyDialog.addEventListener("click", event => {
  const bounds = privacyDialog.getBoundingClientRect();
  if (event.target === privacyDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) privacyDialog.close();
});
document.getElementById("copy-email").addEventListener("click", async () => {
  const status = document.getElementById("copy-status");
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText("founder@nexusengine.id.vn");
    status.textContent = "Email address copied.";
  } catch {
    status.textContent = "Please select and copy the email address above.";
  }
});
document.getElementById("year").textContent = new Date().getFullYear();
