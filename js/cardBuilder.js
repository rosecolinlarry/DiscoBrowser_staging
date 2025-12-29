export function buildHistoryItemCard() {
  const chatLogEl = $("chatLog");

  const item = document.createElement("div");
  item.className = "card-item history-item";
    
  // If no onClick handler, this is the current (non-clickable) entry
  if (!onClick) {
    item.classList.add("current-entry");
    item.style.cursor = "default";
  } else {
    item.style.cursor = "pointer";
  }

  item.dataset.historyIndex = historyIndex; // TODO Get from navigationHistory.length - 1

  const titleDiv = document.createElement("div");
  titleDiv.className = "card-title";
  // TODO KA currently is: <parseSpeakerFromTitle> - #<entryId>
  titleDiv.innerHTML = `<span>${title}</span>`;

  const textDiv = document.createElement("div");
  textDiv.className = "card-text";
  textDiv.textContent = getStringOrDefault(text);

  item.appendChild(titleDiv);
  item.appendChild(textDiv);

  if (onClick) item.addEventListener("click", onClick);
  chatLogEl.appendChild(item);
  chatLogEl.scrollTop = chatLogEl.scrollHeight;
  
  return item;
}