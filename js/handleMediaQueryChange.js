import { browserGrid, defaultColumns, defaultMobileColumns, searchClearBtn, searchBtn, STORAGE_KEY } from "./scripts.js";
import { historySidebar, convoSidebar } from "./openMobileNavSidebar.js";
import { resetDesktopLayoutCheckboxId } from "./userSettings.js";
import { setUpResizableColumns } from "./resizableColumns.js";
import { applySettings } from "./userSettings.js";
import { $, toggleElementVisibilityBySelector } from "./uiHelpers.js";
import { closeAllSidebars, closeAllModals } from "./closeAllSidebars.js";
import { closeMobileSearchScreen } from "./openMobileNavSidebar.js";
import { appSettings } from "./userSettings.js";

  function moveWholeWordsButton() {
    moveElementsById(
      "wholeWordsButton",
      "wholeWordsButtonWrapper",
      "mobileWholeWordsButtonWrapper"
    );
  }
  function moveClearFiltersBtn() {
    moveElementsById(
      "clearFiltersBtn",
      "clearFiltersBtnWrapper",
      "mobileClearFiltersBtnWrapper"
    );
  }
  function moveSearchLoader() {
    moveElementsById(
      "searchLoader",
      "searchLoaderWrapper",
      "mobileSearchLoaderWrapper"
    );
  }
  function moveSearchInput() {
    const clearButtonElWrapper = document.querySelector(
      ".clear-icon-btn-wrapper.desktop"
    );
    const mobileClearButtonElWrapper = document.querySelector(
      ".clear-icon-btn-wrapper.mobile"
    );
    const searchButtonElWrapper = document.querySelector(
      ".search-icon-btn-wrapper.desktop"
    );
    const mobileSearchButtonElWrapper = document.querySelector(
      ".search-icon-btn-wrapper.mobile"
    );
    moveElementsById(
      "search",
      "searchInputWrapper",
      "mobileSearchInputWrapper"
    );
    moveElements(
      searchClearBtn,
      clearButtonElWrapper,
      mobileClearButtonElWrapper
    );
    moveElements(searchBtn, searchButtonElWrapper, mobileSearchButtonElWrapper);
  }
  function moveConvoFilterDropdown() {
    moveElementsById(
      "convoFilterDropdown",
      "convoFilterWrapper",
      "mobileConvoFilterWrapper"
    );
    moveElementsById(
      "convoFilterLabel",
      "convoFilterLabelWrapper",
      "mobileConvoFilterLabelWrapper"
    );
  }
  function moveActorFilterDropdown() {
    moveElementsById(
      "actorFilterDropdown",
      "actorFilterWrapper",
      "mobileActorFilterWrapper"
    );
    moveElementsById(
      "actorFilterLabel",
      "actorFilterLabelWrapper",
      "mobileActorFilterLabelWrapper"
    );
  }
  function moveTypeFilterDropdown() {
    moveElementsById(
      "typeFilterDropdown",
      "typeFilterWrapper",
      "mobileTypeFilterWrapper"
    );
    moveElementsById(
      "typeFilterLabel",
      "typeFilterDropdownLabelWrapper",
      "mobileTypeFilterWrapperLabel"
    );
  }
  function moveElementsById(
    elId,
    srcElWrapperId,
    destElWrapperId,
    mediaQuery = mobileMediaQuery
  ) {
    // Move elements when media query changes
    const el = $(elId);
    const srcElWrapper = $(srcElWrapperId);
    const destElWrapper = $(destElWrapperId);
    moveElements(el, srcElWrapper, destElWrapper, mediaQuery);
  }
  function moveElements(
    el,
    srcElWrapper,
    destElWrapper,
    mediaQuery = mobileMediaQuery
  ) {
    // Move elements when media query changes
    if (mediaQuery?.matches) {
      destElWrapper?.appendChild(el);
    } else {
      srcElWrapper?.appendChild(el);
    }
  }

export async function handleMediaQueryChange() {
  const historySection = $("historySection");
  const convoSection = $("convoSection");
  closeAllSidebars();
  closeMobileSearchScreen();
  closeAllModals();
  if (desktopMediaQuery.matches) {
    toggleElementVisibilityBySelector("#historySidebarToggle", false);
    toggleElementVisibilityBySelector("#convoSidebarToggle", false);
    toggleElementVisibilityBySelector(".mobile-container", false);
    browserGrid.style.gridTemplateColumns = defaultColumns;
    setUpResizableColumns();
    const browserEl = $("browser");
    browserEl?.prepend(convoSection);
    browserEl?.appendChild(historySection);
  } else if (tabletMediaQuery.matches) {
    toggleElementVisibilityBySelector("#historySidebarToggle", true);
    toggleElementVisibilityBySelector("#convoSidebarToggle", true);
    toggleElementVisibilityBySelector(".mobile-container", false);
    browserGrid.style.gridTemplateColumns = defaultMobileColumns;
    toggleElementVisibilityBySelector(".resize-handle", false);
    historySidebar?.appendChild(historySection);
    convoSidebar?.appendChild(convoSection);
  } else if (mobileMediaQuery.matches) {
    toggleElementVisibilityBySelector("#historySidebarToggle", true);
    toggleElementVisibilityBySelector("#convoSidebarToggle", false);
    toggleElementVisibilityBySelector(".mobile-container", true);
    browserGrid.style.gridTemplateColumns = defaultMobileColumns;
    toggleElementVisibilityBySelector(".resize-handle", false);
    historySidebar?.append(historySection);
    convoSidebar?.appendChild(convoSection);
  }
  moveTypeFilterDropdown();
  moveConvoFilterDropdown();
  moveActorFilterDropdown();
  moveWholeWordsButton();
  moveClearFiltersBtn();
  moveSearchLoader();
  moveSearchInput();
  applySettings();
}

export function updateDesktopLayout() {
  const resetDesktopLayoutCheckbox = $(resetDesktopLayoutCheckboxId);
  // Layout resets on save
  if (resetDesktopLayoutCheckbox) {
    if (appSettings?.resetDesktopLayout) {
      const browserGrid = $("browser");
      browserGrid.style.gridTemplateColumns = defaultColumns;
      localStorage.removeItem(STORAGE_KEY);
    }
    resetDesktopLayoutCheckbox.checked = false;
    appSettings.resetDesktopLayout = false;
  }
}
export const mobileMediaQuery = window.matchMedia("(max-width: 768px)");
export const tabletMediaQuery = window.matchMedia(
  "(min-width: 769px) and (max-width: 1024px)"
);
export const desktopMediaQuery = window.matchMedia("(min-width: 1025px)");
export async function setUpMediaQueries() {
  desktopMediaQuery.addEventListener("change", handleMediaQueryChange);
  tabletMediaQuery.addEventListener("change", handleMediaQueryChange);
  mobileMediaQuery.addEventListener("change", handleMediaQueryChange);
  await handleMediaQueryChange();
}

