import { $ } from "./ui.js";

// Settings state
const SETTINGS_STORAGE_KEY = "discobrowser_settings";

const resetDesktopLayoutCheckboxId = "resetDesktopLayoutCheckbox";
const disableColumnResizingCheckboxId = "disableColumnResizingCheckbox";
const alwaysShowMoreDetailsCheckboxId = "alwaysShowMoreDetailsCheckbox";
const showHiddenCheckboxId = "showHiddenCheckbox";
const turnOffAnimationsCheckboxId = "turnOffAnimationsCheckbox";

const settingsModalCloseId = "settingsModalClose";
const restoreDefaultSettingsBtnId = "restoreDefaultSettingsBtn";
const saveSettingsBtnId = "saveSettingsBtn";

// Default app settings
let appSettings = {
  resetDesktopLayout: false,
  disableColumnResizing: false,
  showHidden: false,
  turnOffAnimations: false,
  alwaysShowMoreDetails: false,
};

const template = `
      <div
        class="modal settings-modal"
        role="dialog"
        aria-labelledby="settingsModalTitle"
        aria-modal="true"
      >
        <div class="modal-header">
          <h3 id="settingsModalTitle">Settings</h3>
          <button
            id="settingsModalClose"
            class="modal-close button-icon"
            aria-label="Close"
          >
            <div
              class="icon-placeholder"
              data-icon-template="icon-close-template"
              data-icon-size="24px"
            ></div>
          </button>
        </div>
        <div class="modal-body settings-body">
          <div class="settings-section">
            <label class="settings-checkbox checkbox-label">
              <input type="checkbox" id="resetDesktopLayoutCheckbox" />
              <span class="checkbox-custom"></span>
              <span class="checkbox-label">Reset desktop layout</span>
            </label>
            <p class="settings-description">
              Resets the layout to the default column sizes and positions.
              (Desktop Only)
            </p>
          </div>
          <div class="settings-section">
            <label class="settings-checkbox checkbox-label">
              <input type="checkbox" id="disableColumnResizingCheckbox" />
              <span class="checkbox-custom"></span>
              <span class="checkbox-label">Disable column resizing</span>
            </label>
            <p class="settings-description">
              Hides and disables the ability to resize columns. (Desktop Only)
            </p>
          </div>
          <div class="settings-section">
            <label class="settings-checkbox checkbox-label">
              <input type="checkbox" id="alwaysShowMoreDetailsCheckbox" />
              <span class="checkbox-custom"></span>
              <span class="checkbox-label">Always show more details</span>
            </label>
            <p class="settings-description">
              Automatically expands the More Details section when viewing
              entries.
            </p>
          </div>
          <div class="settings-section">
            <label class="settings-checkbox checkbox-label">
              <input type="checkbox" id="showHiddenCheckbox" />
              <span class="checkbox-custom"></span>
              <span class="checkbox-label">Show hidden</span>
            </label>
            <p class="settings-description">
              Include conversations and entries marked as hidden.
            </p>
          </div>
          <div class="settings-section">
            <label class="settings-checkbox checkbox-label">
              <input type="checkbox" id="turnOffAnimationsCheckbox" />
              <span class="checkbox-custom"></span>
              <span class="checkbox-label">Turn off animations</span>
            </label>
            <p class="settings-description">
              Disables all animations throughout the application.
            </p>
          </div>
          <div class="settings-actions">
            <button id="restoreDefaultSettingsBtn">
              Restore Default Settings
            </button>
            <button id="saveSettingsBtn">Save Settings</button>
          </div>
        </div>
      </div>
  `;

export function injectUserSettingsTemplate() {
  const container = $("settingsModalOverlay");
  container.innerHTML = template;
}

export function getCurrentUserSettings() {
  // Get settings from checkbox values
  const currentCheckboxValues = {
    resetDesktopLayout: $(resetDesktopLayoutCheckboxId)?.checked ?? false,
    disableColumnResizing: $(disableColumnResizingCheckboxId)?.checked ?? false,
    showHidden: $(alwaysShowMoreDetailsCheckboxId)?.checked ?? false,
    turnOffAnimations: $(showHiddenCheckboxId)?.checked ?? false,
    alwaysShowMoreDetails: $(turnOffAnimationsCheckboxId)?.checked ?? false,
  };
  return currentCheckboxValues;
}
export function updateCurrentUserSettings() {
  // Update settings from checkbox values
  appSettings = getCurrentUserSettings();
}

export function setCurrentUserSettings(appSettings) {
  // Update checkbox values from settings
  if(!appSettings) {
    // Get app settings from storage
    loadSettingsFromStorage();
  }
  const resetDesktopLayoutCheckbox = $(resetDesktopLayoutCheckboxId)
  if(resetDesktopLayoutCheckbox) {
    resetDesktopLayoutCheckbox.checked = appSettings?.resetDesktopLayout;
  }
  const disableColumnResizingCheckbox = $(disableColumnResizingCheckboxId)
  if(disableColumnResizingCheckbox) {
    disableColumnResizingCheckbox.checked = appSettings?.disableColumnResizing;
  }
  const alwaysShowMoreDetailsCheckbox = $(alwaysShowMoreDetailsCheckboxId)
  if(alwaysShowMoreDetailsCheckbox) {
    alwaysShowMoreDetailsCheckbox.checked = appSettings?.alwaysShowMoreDetails;
  }
  const showHiddenCheckbox = $(showHiddenCheckboxId)
  if(showHiddenCheckbox) {
    showHiddenCheckbox.checked = appSettings?.showHidden;
  }
  const turnOffAnimationsCheckbox = $(turnOffAnimationsCheckboxId)
  if(turnOffAnimationsCheckbox) {
    turnOffAnimationsCheckbox.checked = appSettings?.turnOffAnimations;
  }
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
    console.error("Failed to load settings from storage", e);
  }
}

export function saveSettingsToStorage(appSettings) {
  try {
    if(!appSettings) {
      // Get app settings from current checkbox values
      appSettings = getCurrentUserSettings();
      updateCurrentUserSettings();
    }
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(appSettings));
  } catch (e) {
    console.error("Failed to save settings to storage", e);
  }
}