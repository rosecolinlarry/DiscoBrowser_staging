// scripts.js - All Scripts in one
import { boot } from "./boot.js";
import { $, toggleElementVisibility } from "./uiHelpers.js";

export const entryCache = new Map();
export const actorSearchInput = $("actorSearch");
export const convoCheckboxList = $("convoCheckboxList");
export const actorCheckboxList = $("actorCheckboxList");
export const selectAllConvos = $("selectAllConvos");
export const selectAllActors = $("selectAllActors");
export const actorAddToSelectionBtn = $("actorAddToSelection");
export const typeFilterLabel = $("typeFilterLabel");
export const typeFilterDropdown = $("typeFilterDropdown");
export const typeCheckboxList = $("typeCheckboxList");
export const selectAllTypes = $("selectAllTypes");
export const searchLoader = $("searchLoader");
export const convoListEl = $("convoList");
export const convoSearchInput = $("convoSearchInput");
export const convoTypeFilterBtns = document.querySelectorAll(
  ".radio-button-group .radio-button",
);

export const searchInput = $("search");
export const homePageContainer = $("homePageContainer");
export const dialogueContent = $("dialogueContent");

// Tree control elements
export const expandAllBtn = $("expandAllBtn");
export const collapseAllBtn = $("collapseAllBtn");

// Search Bar
export const searchBtn = $("searchBtn");
export const searchClearBtn = $("searchClearBtn");

// Clear filters button
export const clearFiltersBtn = $("clearFiltersBtn");

export const searchResultLimit = 50;

// Browser Grid

export const browserGrid = $("browser");

export const defaultColumns = "352px 1fr 280px";
export const defaultMobileColumns = "1fr";
export const STORAGE_KEY = "discobrowser_grid_columns";

export const SETTINGS_STORAGE_KEY = "discobrowser_settings";

export const DEFAULT_APP_SETTINGS = {
  resetDesktopLayout: false,
  disableColumnResizing: false,
  showHidden: false,
  turnOffAnimations: false,
  alwaysShowMoreDetails: false,
};

// Keep raw (DB) results so we can apply client-side filters like whole-words without re-querying
let currentSearchRawResults = [];
export function setCurrentSearchRawResults(value) {
  currentSearchRawResults = value;
}
export function getCurrentSearchRawResults() {
  return currentSearchRawResults ;
}

// Track currently open dropdown so we only allow one at a time
let openDropdown = null;
export function setOpenDropdown(value) {
  openDropdown = value;
}
export function getOpenDropdown() {
  return openDropdown;
}

//#endregion

export function toggleHomepageLoader(isLoading) {
  // Homepage Loader
  const homepageLoader = $("homepageLoader");
  const homepageOverlay = $("homepageOverlay");
  toggleElementVisibility(homepageLoader, isLoading);
  toggleElementVisibility(homepageOverlay, isLoading);
}

// #endregion

/* Initialize boot sequence */
boot().catch((err) => console.error("boot error", err));

// #endregion
