import { sidebarOverlay } from "./sharedElements.js";
import { toggleElementVisibility } from "./uiHelpers.js";

export function closeAllSidebars() {
  const modals = document.querySelectorAll(".sidebar");
  modals.forEach((modal) => toggleElementVisibility(modal, false));
  toggleElementVisibility(sidebarOverlay, false);
}
export function closeAllModals() {
  const modals = document.querySelectorAll(".modal-overlay");
  modals.forEach((modal) => toggleElementVisibility(modal, false));
}
