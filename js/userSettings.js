import { DEFAULT_APP_SETTINGS, SETTINGS_STORAGE_KEY } from "./scripts.js";
import { rebuildConversationTree } from "./conversationTree.js";
import { updateHandlePositions, updateResizeHandles } from "./resizableColumns.js";
import { updateDesktopLayout } from "./handleMediaQueryChange.js";
import { $, injectTemplate, toggleElementVisibility } from "./uiHelpers.js";

export function setupSettingsModal() {
  // Open settings modal
  const settingsBtn = $(settingsBtnId);
  const settingsModalClose = $(settingsModalCloseId);
  const settingsModalOverlay = $(settingsModalOverlayId);

  // Open settings modal
  if (settingsBtn) {
    settingsBtn.addEventListener("click", openSettings);
  }
  // Close settings modal
  if (settingsModalClose) {
    settingsModalClose.addEventListener("click", () => {
      toggleElementVisibility(settingsModalOverlay, false);
    });
  }

  function handleSettingsModalOverlayClick(e) {
    const settingsModalOverlay = $(settingsModalOverlayId);
    if (e.target === settingsModalOverlay) {
      toggleElementVisibility(settingsModalOverlay, false);
    }
  }
  // Close modal when clicking overlay
  settingsModalOverlay?.addEventListener(
    "click",
    handleSettingsModalOverlayClick
  );
}
export function disableColumnResizing() {
  return (
    appSettings?.disableColumnResizing ??
    DEFAULT_APP_SETTINGS.disableColumnResizing
  );
}
export function alwaysShowMoreDetails() {
  return (
    appSettings?.alwaysShowMoreDetails ??
    DEFAULT_APP_SETTINGS.alwaysShowMoreDetails
  );
}
export function showHidden() {
  return appSettings?.showHidden ?? DEFAULT_APP_SETTINGS.showHidden;
}
export function updateCurrentUserSettings() {
  // Update settings from checkbox values
  const currentCheckboxValues = {
    resetDesktopLayout: $(resetDesktopLayoutCheckboxId)?.checked ?? false,
    disableColumnResizing: $(disableColumnResizingCheckboxId)?.checked ?? false,
    alwaysShowMoreDetails: $(alwaysShowMoreDetailsCheckboxId)?.checked ?? false,
    showHidden: $(showHiddenCheckboxId)?.checked ?? false,
    turnOffAnimations: $(turnOffAnimationsCheckboxId)?.checked ?? false,
  };
  appSettings = currentCheckboxValues;
}
function setCurrentUserSettings() {
  // Update checkbox values from settings
  if (!appSettings) {
    // Get app settings from storage
    loadSettingsFromStorage();
  }
  const resetDesktopLayoutCheckbox = $(resetDesktopLayoutCheckboxId);
  if (resetDesktopLayoutCheckbox) {
    resetDesktopLayoutCheckbox.checked = appSettings?.resetDesktopLayout;
  }
  const disableColumnResizingCheckbox = $(disableColumnResizingCheckboxId);
  if (disableColumnResizingCheckbox) {
    disableColumnResizingCheckbox.checked = appSettings?.disableColumnResizing;
  }
  const alwaysShowMoreDetailsCheckbox = $(alwaysShowMoreDetailsCheckboxId);
  if (alwaysShowMoreDetailsCheckbox) {
    alwaysShowMoreDetailsCheckbox.checked = appSettings?.alwaysShowMoreDetails;
  }
  const showHiddenCheckbox = $(showHiddenCheckboxId);
  if (showHiddenCheckbox) {
    showHiddenCheckbox.checked = appSettings?.showHidden;
  }
  const turnOffAnimationsCheckbox = $(turnOffAnimationsCheckboxId);
  if (turnOffAnimationsCheckbox) {
    turnOffAnimationsCheckbox.checked = appSettings?.turnOffAnimations;
  }
}
export function resetCurrentUserSettings() {
  // Update app setting values to default settings
  appSettings = DEFAULT_APP_SETTINGS;
  setCurrentUserSettings();
}
export function loadSettingsFromStorage() {
  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      appSettings = { ...appSettings, ...parsed };
      return appSettings;
    }
  } catch (e) {
    appSettings = DEFAULT_APP_SETTINGS;
    console.error("Failed to load settings from storage", e);
  }
}
export function saveSettingsToStorage() {
  try {
    updateDesktopLayout();

    applySettings();
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(appSettings));
  } catch (e) {
    console.error("Failed to save settings to storage", e);
  }
}
export function openSettings() {
  setCurrentUserSettings();
  const settingsModalOverlay = $(settingsModalOverlayId);
  toggleElementVisibility(settingsModalOverlay, true);
}// Default app settings

export let appSettings = {
  resetDesktopLayout: false,
  disableColumnResizing: false,
  showHidden: false,
  turnOffAnimations: false,
  alwaysShowMoreDetails: false,
};

export async function injectUserSettingsTemplate() {
  // Create container if it does not exist
  let container = $(settingsModalOverlayId);
  if (!container) {
    container = document.createElement("div");
    container.className = "modal-overlay hidden";
    container.id = settingsModalOverlayId;
    document.body.appendChild(container);
  }
  const settingsModalTemplateFileName = "settings-modal-content.html";
  await injectTemplate(settingsModalTemplateFileName, settingsModalOverlayId);
  initializeUserSettings();
}

function setUpRestoreDefaultSettingsButton() {
  // Restore default settings and updates checkbox values.
  const restoreDefaultSettingsBtn = $(restoreDefaultSettingsBtnId);
  if (restoreDefaultSettingsBtn) {
    restoreDefaultSettingsBtn.addEventListener(
      "click",
      resetCurrentUserSettings
    );
  }
}
function initializeUserSettings() {
  loadSettingsFromStorage();
  applySettings();
  setUpCheckboxHandlers();
  setupSettingsModal();
  setUpSaveButton();
  setUpRestoreDefaultSettingsButton();
}

export function applySettings() {
  // Apply animations toggle
  updateAnimationsToggle();
  updateHandlePositions();
  updateResizeHandles();
}
function setUpCheckboxHandlers() {
  const resetDesktopLayoutCheckbox = $(resetDesktopLayoutCheckboxId);

  if (resetDesktopLayoutCheckbox) {
    function handleResetDesktopLayoutChange(e) {
      // Reset desktop layout should be unchecked once the layout is reset (upon save)
      let value = DEFAULT_APP_SETTINGS.resetDesktopLayout;
      if (e) {
        value = e.target?.checked ?? value;
      }
      appSettings.resetDesktopLayout = value;
    }
    resetDesktopLayoutCheckbox.addEventListener(
      "change",
      handleResetDesktopLayoutChange
    );
  }
  const disableColumnResizingCheckbox = $(disableColumnResizingCheckboxId);

  if (disableColumnResizingCheckbox) {
    function handleDisableColumnResizingChange(e) {
      let value = DEFAULT_APP_SETTINGS.disableColumnResizing;
      if (e) {
        value = e.target?.checked ?? value;
      }
      appSettings.disableColumnResizing = value;
    }
    disableColumnResizingCheckbox.addEventListener(
      "change",
      handleDisableColumnResizingChange
    );
  }
  const alwaysShowMoreDetailsCheckbox = $(alwaysShowMoreDetailsCheckboxId);

  if (alwaysShowMoreDetailsCheckbox) {
    function handleAlwaysShowMoreDetailsChange(e) {
      let value = DEFAULT_APP_SETTINGS.alwaysShowMoreDetails;
      if (e) {
        value = e.target?.checked ?? value;
      }
      appSettings.alwaysShowMoreDetails = value;
    }
    alwaysShowMoreDetailsCheckbox.addEventListener(
      "change",
      handleAlwaysShowMoreDetailsChange
    );
  }
  const showHiddenCheckbox = $(showHiddenCheckboxId);

  if (showHiddenCheckbox) {
    function handleShowHiddenChange(e) {
      let value = DEFAULT_APP_SETTINGS.showHidden;
      if (e) {
        value = e.target?.checked ?? value;
      }
      appSettings.showHidden = value;
    }
    showHiddenCheckbox.addEventListener("change", handleShowHiddenChange);
  }
  const turnOffAnimationsCheckbox = $(turnOffAnimationsCheckboxId);

  if (turnOffAnimationsCheckbox) {
    function handleTurnOffAnimationsChange(e) {
      let value = DEFAULT_APP_SETTINGS.turnOffAnimations;
      if (e) {
        value = e.target?.checked ?? value;
      }
      appSettings.turnOffAnimations = value;
    }
    turnOffAnimationsCheckbox.addEventListener(
      "change",
      handleTurnOffAnimationsChange
    );
  }
}
function setUpSaveButton() {
  // Handle save settings
  const saveSettingsBtn = $(saveSettingsBtnId);
  if (saveSettingsBtn) {
    function handleSaveSettingsButtonClick() {
      // Apply settings
      updateCurrentUserSettings();
      applySettings();
      saveSettingsToStorage();

      // Rebuild tree to reflect hidden/title settings
      rebuildConversationTree();

      // Save and close modal
      const settingsModalOverlay = $(settingsModalOverlayId);
      if (settingsModalOverlay) {
        toggleElementVisibility(settingsModalOverlay, false);
      }
    }
    saveSettingsBtn.addEventListener("click", handleSaveSettingsButtonClick);
  }
}
function updateAnimationsToggle() {
  if (appSettings?.turnOffAnimations) {
    document.body.classList.add("animations-disabled");
  } else {
    document.body.classList.remove("animations-disabled");
  }
}
export const settingsModalOverlayId = "settingsModalOverlay";
export const settingsModalCloseId = "settingsModalClose";
export const restoreDefaultSettingsBtnId = "restoreDefaultSettingsBtn";
export const saveSettingsBtnId = "saveSettingsBtn";
export const settingsBtnId = "settingsBtn";
export const resetDesktopLayoutCheckboxId = "resetDesktopLayoutCheckbox";
export const disableColumnResizingCheckboxId = "disableColumnResizingCheckbox";
export const alwaysShowMoreDetailsCheckboxId = "alwaysShowMoreDetailsCheckbox";
export const showHiddenCheckboxId = "showHiddenCheckbox";
export const turnOffAnimationsCheckboxId = "turnOffAnimationsCheckbox";

