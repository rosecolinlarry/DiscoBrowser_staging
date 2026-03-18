import { sidebarOverlay } from "./openMobileNavSidebar.js";
import { $, toggleElementVisibility } from "./uiHelpers.js";

function openModal() {
  const conversationTypesModalOverlay = $("conversationTypesModalOverlay");
  toggleElementVisibility(conversationTypesModalOverlay, true);
}
function closeModal() {
  const conversationTypesModalOverlay = $("conversationTypesModalOverlay");
  conversationTypesModalOverlay.classList.remove("open");
  toggleElementVisibility(conversationTypesModalOverlay, false);
}

export function setupConversationTypesModal() {
  const helpIcon = $("helpIcon");
  const conversationTypeModalOverlay = $("conversationTypesModalOverlay");
  const closeBtn = conversationTypeModalOverlay.querySelector(".modal-close");

  helpIcon.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  function handleConvoTypeModalOverlayClick(e) {
    const modal = $("conversationTypesModalOverlay");
    if (e.target == modal) {
      closeModal();
    }
  }
  conversationTypeModalOverlay.addEventListener(
    "click",
    handleConvoTypeModalOverlayClick
  );

  // ESC key to close
  function handleDocumentKeyDownEvent(e) {
    const conversationTypesModalOverlay = $("conversationTypesModalOverlay");
    if (e.key === "Escape" &&
      conversationTypesModalOverlay.style.display !== "none") {
      closeModal();
    }
  }
  document.addEventListener("keydown", handleDocumentKeyDownEvent);
}
export function closeAllSidebars() {
  const modals = document.querySelectorAll(".sidebar");
  modals.forEach((modal) => toggleElementVisibility(modal, false));
  toggleElementVisibility(sidebarOverlay, false);
}

export function closeAllModals() {
  const modals = document.querySelectorAll(".modal-overlay");
  modals.forEach((modal) => toggleElementVisibility(modal, false));
}
