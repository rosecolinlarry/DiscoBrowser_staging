import { $ } from "./ui.js";
import { defaultColumns, STORAGE_KEY, applySettings } from "./main.js";

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

const DEFAULT_APP_SETTINGS = {
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
  setUpUserSettingsHandlers();
}

function setUpUserSettingsHandlers() {
  const resetDesktopLayoutCheckbox = $(resetDesktopLayoutCheckboxId);

  if(resetDesktopLayoutCheckbox) {
    resetDesktopLayoutCheckbox.addEventListener("change", setResetDesktopLayout)
  }
  const disableColumnResizingCheckbox = $(disableColumnResizingCheckboxId);

  if(disableColumnResizingCheckbox) {
    disableColumnResizingCheckbox.addEventListener("change", setDisableColumnResizing)
  }
  const alwaysShowMoreDetailsCheckbox = $(alwaysShowMoreDetailsCheckboxId);

  if(alwaysShowMoreDetailsCheckbox) {
    alwaysShowMoreDetailsCheckbox.addEventListener("change", setAlwaysShowMoreDetails)
  }
  const showHiddenCheckbox = $(showHiddenCheckboxId);

  if(showHiddenCheckbox) {
    showHiddenCheckbox.addEventListener("change", setShowHidden)
  }
  const turnOffAnimationsCheckbox = $(turnOffAnimationsCheckboxId);

  if(turnOffAnimationsCheckbox) {
    turnOffAnimationsCheckbox.addEventListener("change", setTurnOffAnimations)
  }
}

export function getCurrentUserSettings() {
  // Get settings from checkbox values
  const currentCheckboxValues = {
    resetDesktopLayout: $(resetDesktopLayoutCheckboxId)?.checked ?? false,
    disableColumnResizing: $(disableColumnResizingCheckboxId)?.checked ?? false,
    alwaysShowMoreDetails: $(alwaysShowMoreDetailsCheckboxId)?.checked ?? false,
    showHidden: $(showHiddenCheckboxId)?.checked ?? false,
    turnOffAnimations: $(turnOffAnimationsCheckboxId)?.checked ?? false,
  };
  console.log('getCurrentUserSettings', currentCheckboxValues)
  return currentCheckboxValues;
}
export function updateCurrentUserSettings() {
  // Update settings from checkbox values
  console.log('updateCurrentUserSettings -> Old', appSettings);
  appSettings = getCurrentUserSettings();
  console.log('updateCurrentUserSettings -> New', appSettings);
}

export function setCurrentUserSettings() {
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
  // Update checkbox values to default settings
  appSettings = DEFAULT_APP_SETTINGS;
}

export function loadSettingsFromStorage() {
  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      appSettings = { ...appSettings, ...parsed };
    console.log(`loadSettingsFromStorage`, appSettings)
      return appSettings;
    }
  } catch (e) {
    appSettings = DEFAULT_APP_SETTINGS;
    console.error("Failed to load settings from storage", e);
  }
}

export function saveSettingsToStorage() {
  try {
    console.log(`saveSettingsToStorage`, appSettings)
    
    // Layout reset on save
    const resetDesktopLayoutCheckbox = $(resetDesktopLayoutCheckboxId);
    if(resetDesktopLayoutCheckbox) {
      if(resetDesktopLayout()) {
        const browserGrid = $("browser");
        browserGrid.style.gridTemplateColumns = defaultColumns;
        localStorage.removeItem(STORAGE_KEY);
      }
      resetDesktopLayoutCheckbox.checked = false;
      appSettings.resetDesktopLayout = false;
    }
    
    applySettings();
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(appSettings));
  } catch (e) {
    console.error("Failed to save settings to storage", e);
  }
}

export function resetDesktopLayout() {
  return appSettings?.resetDesktopLayout ?? DEFAULT_APP_SETTINGS?.resetDesktopLayout;
}

export function disableColumnResizing() {
  return appSettings?.disableColumnResizing ?? DEFAULT_APP_SETTINGS?.disableColumnResizing;
}
export function showHidden() {
  return appSettings?.showHidden ?? DEFAULT_APP_SETTINGS?.showHidden;
}
export function turnOffAnimations() {
  return appSettings?.turnOffAnimations ?? DEFAULT_APP_SETTINGS?.turnOffAnimations;
}
export function alwaysShowMoreDetails() {
  return appSettings?.alwaysShowMoreDetails ?? DEFAULT_APP_SETTINGS?.alwaysShowMoreDetails;
}

// TODO KA Reset desktop layout is a little weird because it should really be a button
export function setResetDesktopLayout(e) {
  let value = DEFAULT_APP_SETTINGS.resetDesktopLayout;
  if(e) {
      value = e.target?.checked ?? value;
  }
  appSettings.resetDesktopLayout = value;
}

export function setDisableColumnResizing(e) {
  let value = DEFAULT_APP_SETTINGS.disableColumnResizing;
  if(e) {
      value = e.target?.checked ?? value;
  }
  appSettings.disableColumnResizing = value;
}
export function setShowHidden(e) {
  let value = DEFAULT_APP_SETTINGS.showHidden;
  if(e) {
      value = e.target?.checked ?? value;
  }
  appSettings.showHidden = value;
}
export function setTurnOffAnimations(e) {
  let value = DEFAULT_APP_SETTINGS.turnOffAnimations;
  if(e) {
      value = e.target?.checked ?? value;
  }
  appSettings.turnOffAnimations = value;
}
export function setAlwaysShowMoreDetails(e) {
  let value = DEFAULT_APP_SETTINGS.alwaysShowMoreDetails;
  if(e) {
      value = e.target?.checked ?? value;
  }
  appSettings.alwaysShowMoreDetails = value;
}