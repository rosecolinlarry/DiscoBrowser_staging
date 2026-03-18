import { $ } from "./uiHelpers.js";
import { closeAllSidebars, closeAllModals } from "./closeAllSidebars.js";
import { openConversationSection, openHistorySidebar } from "./openConversationSection.js";
import { openMobileNavSidebar } from "./openMobileNavSidebar.js";
import { mobileNavBtn, sidebarOverlay } from "./openMobileNavSidebar.js";

export function setUpSidebarToggles() {
  const convoSidebarToggle = $("convoSidebarToggle");
  convoSidebarToggle?.addEventListener("click", openConversationSection);
  const historySidebarToggle = $("historySidebarToggle");
  historySidebarToggle?.addEventListener("click", openHistorySidebar);
  mobileNavBtn.addEventListener("click", openMobileNavSidebar);
  sidebarOverlay.addEventListener("click", closeAllSidebars);
  sidebarOverlay.addEventListener("click", closeAllModals);
}
