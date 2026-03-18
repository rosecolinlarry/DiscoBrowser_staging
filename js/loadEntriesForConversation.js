import {
  isInitialNavigation,
  pushHistoryState,
  updateUrlWithRoute,
  handleEntryClick,
  setNavigationHistory,
  setCurrentConvoId,
  setCurrentEntryId,
  getIsHandlingPopState,
} from "./navigation.js";
import {
  homePageContainer,
  dialogueContent,
} from "./scripts.js";
import {
  chatLogEl,
  currentEntryContainerEl,
  entryListEl,
  convoRootBtn,
  entryOverviewEl,
  moreDetailsEl,
  entryListHeaderEl,
} from "./openMobileNavSidebar.js";
import { getCurrentConvoId } from "./navigation.js";
import {
  toggleElementVisibility,
  renderConversationOverview,
  getStringOrDefault,
  createCardItem,
} from "./uiHelpers.js";
import {
  closeAllSidebars,
} from "./closeAllSidebars.js";
import { updateMobileNavButtons } from "./openMobileNavSidebar.js";
import { showConvoDetails } from "./showConvoDetails.js";
import {
  getConversationById,
  getEntriesForConversation,
  getParentsChildren,
  getEntriesBulk,
  execRows,
} from "./sqlHelpers.js";
import {
  alwaysShowMoreDetails,
  showHidden,
} from "./userSettings.js";
import {
  setCurrentSearchFilteredCount,
  setCurrentSearchOffset,
  setCurrentSearchTotal,
} from "./handleInfiniteScroll.js";

/* Load entries listing for conversation */

export async function loadEntriesForConversation(
  convoId,
  resetHistory = false,
) {
  // If we're coming from home (no current conversation), ensure home state exists
  if (!getIsHandlingPopState() && getCurrentConvoId() === null) {
    // Replace current state with home before pushing conversation
    window.history.replaceState({ view: "home" }, "", window.location.pathname);
  }

  // Push browser history state (unless we're handling a popstate event or in initial navigation)
  if (!getIsHandlingPopState() && !isInitialNavigation) {
    pushHistoryState("conversation", { convoId });
  }

  // Close mobile sidebar when conversation is selected
  closeAllSidebars();

  // If switching conversations or resetting, clear the chat log
  if (resetHistory || (getCurrentConvoId() !== null && getCurrentConvoId() !== convoId)) {
    setNavigationHistory([{ convoId, entryId: null }]);
    if (chatLogEl) {
      chatLogEl.innerHTML = "";
    }
  }

  toggleElementVisibility(currentEntryContainerEl, true);

  // Hide homepage, show dialogue content
  toggleElementVisibility(homePageContainer, false);
  toggleElementVisibility(dialogueContent, true);

  // Remove search mode styling
  const entryListContainer = entryListEl?.closest(".entry-list");
  if (entryListContainer) entryListContainer.classList.remove("full-height");

  // Reset search state to prevent infinite scroll from loading more search results
  setCurrentSearchOffset(0);
  setCurrentSearchTotal(0);
  setCurrentSearchFilteredCount(0);

  // Update current state for conversation root
  setCurrentConvoId(convoId);
  setCurrentEntryId(null);

  // Update URL with the conversation ID
  updateUrlWithRoute(convoId, null);

  // Disable root button at conversation root
  if (convoRootBtn) {
    convoRootBtn.disabled = true;
  }

  // Update mobile nav buttons (at root, so hide both)
  updateMobileNavButtons();

  // Show conversation metadata instead of entry details
  const conversation = getConversationById(convoId);
  if (conversation) {
    renderConversationOverview(entryOverviewEl, conversation);
  }

  // Make sure current entry container is visible
  toggleElementVisibility(currentEntryContainerEl, true);

  // Auto-open More Details if setting enabled
  if (moreDetailsEl && alwaysShowMoreDetails()) {
    moreDetailsEl.open = true;
    toggleElementVisibility(moreDetailsEl, true);
  }

  // Show details lazily only when expanded
  if (moreDetailsEl && moreDetailsEl.open) {
    if (convoId) {
      await showConvoDetails(convoId);
    }
  }

  // Check conversation type - orbs and tasks often don't have meaningful entries
  entryListHeaderEl.textContent = "Next Dialogue Options";
  entryListEl.innerHTML = "";

  // For flows, remove compact class and expanded class
  entryListEl.classList.remove("compact");
  if (currentEntryContainerEl) {
    currentEntryContainerEl.classList.remove("expanded");
  }

  const rows = getEntriesForConversation(convoId, showHidden());
  const filtered = rows.filter(
    (r) => (r.title || "").toLowerCase() !== "start",
  );
  if (!filtered.length) {
    // No entries - make compact like orbs/tasks
    entryListEl.classList.add("compact");
    const entryList = entryListEl.closest(".entry-list");
    if (entryList) entryList.classList.add("compact");
    if (currentEntryContainerEl) {
      currentEntryContainerEl.classList.add("expanded");
    }
    const message = document.createElement("div");
    message.className = "hint-text";
    message.style.fontStyle = "italic";
    message.style.padding = "12px";
    message.textContent = "(no meaningful entries)";
    entryListEl.appendChild(message);
    return;
  }

  // Has entries - remove compact classes
  entryListEl.classList.remove("compact");
  const entryList = entryListEl.closest(".entry-list");
  if (entryList) entryList.classList.remove("compact");
  if (currentEntryContainerEl) {
    currentEntryContainerEl.classList.remove("expanded");
  }

  filtered.forEach((r) => {
    const entryId = r.id;
    const title = getStringOrDefault(r.title, "(no title)");

    const text = r.dialoguetext || "";
    const el = createCardItem(title, convoId, entryId, text);
    el.addEventListener("click", handleEntryClick);
    entryListEl.appendChild(el);
  });
}
// Helper: filter a list of results by a set of types (treat 'all' as no-op)
export function filterResultsByType(results, typeSet) {
  if (!typeSet || typeSet.has("all") || typeSet.size === 0) return results;
  return results.filter((r) => {
    const convo = getConversationById(r.conversationid);
    const type = convo ? convo.type || "flow" : "flow";
    return typeSet.has(type);
  });
}
export function loadChildOptions(convoId, entryId) {
  try {
    entryListHeaderEl.textContent = "Next Dialogue Options";
    entryListEl.innerHTML = "";

    const { children } = getParentsChildren(convoId, entryId);

    const pairs = [];
    for (const c of children)
      pairs.push({ convoId: c.d_convo, entryId: c.d_id });

    const destRows = getEntriesBulk(pairs, showHidden());
    const destMap = new Map(destRows.map((r) => [`${r.convo}:${r.id}`, r]));

    for (const c of children) {
      const dest = destMap.get(`${c.d_convo}:${c.d_id}`);
      if (!dest) continue;
      if ((dest.title || "").toLowerCase() === "start") continue;

      const el = createCardItem(
        dest.title,
        c.d_convo,
        c.d_id,
        dest.dialoguetext,
      );
      el.addEventListener("click", handleEntryClick);
      entryListEl.appendChild(el);
    }

    if (entryListEl.children.length === 0) {
      // No further options - make compact like orbs/tasks
      entryListEl.classList.add("compact");
      const entryList = entryListEl.closest(".entry-list");
      if (entryList) entryList.classList.add("compact");
      if (currentEntryContainerEl) {
        currentEntryContainerEl.classList.add("expanded");
      }
      const message = document.createElement("div");
      message.className = "hint-text";
      message.style.fontStyle = "italic";
      message.style.padding = "12px";
      message.textContent = "(no further options)";
      entryListEl.appendChild(message);
    }
  } catch (e) {
    console.error("Error loading child links", e);
    entryListEl.textContent = "(error loading next options)";
  }
}
// Helper: fetch conversations by type (used for type-only searches with no text)
export function getConversationsByType(type, showHidden) {
  if (!type) return [];
  let where = `type='${type}'`;
  if (!showHidden) {
    where += ` AND isHidden != 1`;
  }
  const sql = `SELECT id as conversationid, null as id, description as dialoguetext, title, actor, isHidden FROM conversations WHERE ${where} ORDER BY title;`;
  return execRows(sql);
}

