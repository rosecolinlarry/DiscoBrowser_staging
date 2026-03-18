import { historySidebar, sidebarOverlay, convoSidebar } from "./openMobileNavSidebar.js";
import { toggleElementVisibility, $ } from "./uiHelpers.js";
import { closeAllSidebars } from "./closeAllSidebars.js";

export function openHistorySidebar() {
  closeAllSidebars();
  toggleElementVisibility(historySidebar, true);
  const historySidebarClose = $("historySidebarClose");
  historySidebarClose?.addEventListener("click", closeHistorySidebar);
  toggleElementVisibility(sidebarOverlay, true);
}
function closeHistorySidebar() {
  toggleElementVisibility(historySidebar, false);
  toggleElementVisibility(sidebarOverlay, false);
}
export function openConversationSection() {
  closeAllSidebars();
  toggleElementVisibility(convoSidebar, true);
  const convoSidebarClose = $("convoSidebarClose");
  convoSidebarClose?.addEventListener("click", closeConversationSection);
  toggleElementVisibility(sidebarOverlay, true);
}
function closeConversationSection() {
  toggleElementVisibility(convoSidebar, false);
  toggleElementVisibility(sidebarOverlay, false);
}
