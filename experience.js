"use strict";
// All explorer text is prewritten editorial sample content; no processing service is called.
const sampleText = {
  en: ["Made for your everyday.", "Refill. Reuse. Keep moving.", "Find your everyday companion."],
  vi: ["Mang theo mỗi ngày.", "Châm thêm nước. Dùng lại. Tiếp tục hành trình.", "Tìm người bạn đồng hành mỗi ngày."],
  es: ["Hecha para tu día a día.", "Rellena. Reutiliza. Sigue adelante.", "Encuentra tu compañera de cada día."]
};
const insights = [
  "Adapt the expression while keeping the everyday-use message.",
  "Preserve the sequence of actions. Check whether the wording fits the available time.",
  "Keep the call to action natural without adding an unsupported product promise."
];
const languageSelect = document.getElementById("demo-language");
if (languageSelect) {
  const seek = document.getElementById("demo-seek");
  const segmentButtons = [...document.querySelectorAll("[data-segment]")];
  const caption = document.getElementById("demo-caption");
  const status = document.getElementById("demo-status");
  function updateExplorer(announce = false) {
    const time = Number(seek.value);
    const index = Math.min(2, Math.floor(time / 4));
    const language = languageSelect.value;
    caption.textContent = sampleText[language][index];
    caption.lang = language;
    const sampleLink = document.getElementById("download-sample");
    sampleLink.href = `assets/sample-${language}.srt`;
    sampleLink.download = `nexusengine-illustrative-sample-${language}.srt`;
    document.getElementById("demo-time").textContent = `00:${String(time).padStart(2,"0")}`;
    document.getElementById("demo-insight").textContent = insights[index];
    segmentButtons.forEach((button, position) => {
      button.setAttribute("aria-pressed", String(position === index));
      button.querySelector("em").textContent = sampleText[language][position];
      button.querySelector("em").lang = language;
    });
    if (announce) status.textContent = `${languageSelect.selectedOptions[0].text}: segment ${index + 1}. ${caption.textContent}`;
  }
  languageSelect.addEventListener("change", () => updateExplorer(true));
  seek.addEventListener("input", () => updateExplorer());
  seek.addEventListener("change", () => updateExplorer(true));
  segmentButtons.forEach((button, index) => button.addEventListener("click", () => {seek.value=String(index*4);updateExplorer(true);}));
  document.getElementById("reset-demo").addEventListener("click", () => {languageSelect.value="vi";seek.value="0";updateExplorer(true);});
  document.getElementById("download-sample").addEventListener("click", () => {
    status.textContent="Sample caption download started. This is prewritten illustrative content.";
  });
  updateExplorer();
}

const imageDialog=document.getElementById("image-dialog");
if(imageDialog){
  document.querySelectorAll(".prototype-shot").forEach(button=>button.addEventListener("click",()=>{
    const expanded=document.getElementById("expanded-image");expanded.src=button.dataset.image;expanded.alt=button.querySelector("img").alt;
    document.getElementById("image-caption").textContent=button.dataset.caption;imageDialog.showModal();
  }));
  document.getElementById("image-close").addEventListener("click",()=>imageDialog.close());
  imageDialog.addEventListener("click",event=>{const bounds=imageDialog.getBoundingClientRect();if(event.target===imageDialog&&(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom))imageDialog.close();});
}

document.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=>{
  const category=button.dataset.filter;let count=0;
  document.querySelectorAll("[data-filter]").forEach(filter=>filter.setAttribute("aria-pressed",String(filter===button)));
  document.querySelectorAll("[data-category]").forEach(card=>{card.hidden=category!=="all"&&card.dataset.category!==category;if(!card.hidden)count++;});
  document.getElementById("guide-count").textContent=`${count} ${count===1?"guide":"guides"}`;
}));

document.querySelectorAll(".copy-checklist").forEach(button=>button.addEventListener("click",async()=>{
  const tool=button.closest(".article-tool");const status=tool.querySelector(".checklist-status");
  try{await navigator.clipboard.writeText(tool.querySelector("pre").textContent);status.textContent="Template copied. Adapt it to your project.";}
  catch{status.textContent="Select and copy the template above.";}
}));
document.querySelectorAll(".print-guide").forEach(button=>button.addEventListener("click",()=>window.print()));

// Connect the existing workflow tabs to actual prototype screenshots.
const workflowImage=document.getElementById("workflow-image");
if(workflowImage){
  const evidence=[
    ["prototype-source.png","Source inspection"],
    ["prototype-subtitles.png","Subtitle extraction and segment editing"],
    ["prototype-editor.png","Editable translation tracks"],
    ["prototype-editor.png","Voiceover and subtitle timeline"],
    ["prototype-editor.png","Preview and export controls"]
  ];
  document.querySelectorAll("[data-step]").forEach(button=>{
    function updateEvidence(){const index=Number(document.querySelector('[data-step][aria-selected="true"]').dataset.step);workflowImage.src=`assets/${evidence[index][0]}`;workflowImage.alt=`Actual desktop prototype: ${evidence[index][1]}`;document.getElementById("workflow-image-caption").textContent=`Actual prototype · ${evidence[index][1].toLowerCase()} with synthetic test media`;}
    button.addEventListener("click",updateEvidence);button.addEventListener("keydown",updateEvidence);
  });
}
