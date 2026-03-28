import { $, toggleElementVisibility } from "./uiHelpers.js";
import { closeAllSidebars, closeAllModals } from "./closeElementsHelpers.js";
import { sidebarOverlay } from "./sharedElements.js";

const convoSidebarToggle = $("convoSidebarToggle");
export const convoSidebar = $("convoSidebar");
export const historySidebar = $("historySidebar");
export const mobileNavBtn = $("mobileNavBtn");

export function setUpSidebarToggles() {
  convoSidebarToggle?.addEventListener("click", openConversationSidebar);
  const historySidebarToggle = $("historySidebarToggle");
  historySidebarToggle?.addEventListener("click", openHistorySidebar);
  mobileNavBtn.addEventListener("click", openMobileNavSidebar);
  sidebarOverlay.addEventListener("click", closeAllSidebars);
  sidebarOverlay.addEventListener("click", closeAllModals);
}

const mobileNavPanel = $("mobileNavPanel");

function openHistorySidebar() {
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

export function openConversationSidebar() {
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

export function openMobileNavSidebar() {
  closeAllSidebars();
  toggleElementVisibility(mobileNavPanel, true);
  toggleElementVisibility(sidebarOverlay, true);
  const mobileNavSidebarClose = $("navSidebarClose");
  mobileNavSidebarClose?.addEventListener("click", closeMobileNavSidebar);
}
function closeMobileNavSidebar() {
  toggleElementVisibility(mobileNavPanel, false);
  toggleElementVisibility(sidebarOverlay, false);
}
