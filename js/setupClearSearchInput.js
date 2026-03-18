import {
  searchInput,
  searchBtn,
  searchClearBtn,
  clearFiltersBtn,
  convoCheckboxList,
  selectAllConvos,
  actorCheckboxList,
  selectAllActors,
  typeCheckboxList,
  selectAllTypes,
} from "./scripts.js";
import { mobileSearchTrigger } from "./openMobileNavSidebar.js";
import { mobileMediaQuery } from "./handleMediaQueryChange.js";
import {
  selectedConvoIds,
  selectedActorIds,
  selectedTypeIds,
} from "./filterDropdowns.js";
import {
  getCurrentAppState,
  getIsHandlingPopState,
  setIsHandlingPopState,
} from "./navigation.js";
import { toggleElementVisibility, $ } from "./uiHelpers.js";
import { search } from "./getQueryTokens.js";
import { openMobileSearchScreen } from "./openMobileNavSidebar.js";
import { updateActorFilterLabel } from "./filterDropdowns.js";
import { updateConvoFilterLabel } from "./filterDropdowns.js";
import { updateTypeFilterLabel } from "./filterDropdowns.js";
import {
  setCurrentSearchFilteredCount,
  setCurrentSearchOffset,
} from "./handleInfiniteScroll.js";
import { entryListEl } from "./entryListEl.js";

export function setupClearSearchInput() {
  function handleSearchClearButtonClick(e) {
    // Clear the unified search input and focus it
    if (searchInput) {
      const searchClearBtn = e.target;
      searchInput.value = "";
      searchInput.focus();
      // Change icon back to search icon
      toggleElementVisibility(searchClearBtn, false);
      toggleElementVisibility(searchBtn, true);
    }
  }
  searchClearBtn.addEventListener("click", handleSearchClearButtonClick);
}
// Setup clear filters button

export function setupClearFiltersBtn() {
  if (!clearFiltersBtn) return;
  function handleClearFiltersButtonClick(e) {
    // Reset convo filters
    selectedConvoIds.clear();
    const convoCheckboxes = convoCheckboxList?.querySelectorAll(
      'input[type="checkbox"]',
    );
    convoCheckboxes.forEach((cb) => {
      cb.checked = false;
    });
    selectAllConvos.checked = true;
    selectAllConvos.indeterminate = false;
    updateConvoFilterLabel();

    // Reset actor filters
    selectedActorIds.clear();
    const actorCheckboxes = actorCheckboxList?.querySelectorAll(
      'input[type="checkbox"]',
    );
    actorCheckboxes.forEach((cb) => {
      cb.checked = false;
    });
    selectAllActors.checked = true;
    selectAllActors.indeterminate = false;
    updateActorFilterLabel();

    // Reset type filters - select all
    selectedTypeIds.clear();
    selectedTypeIds.add("flow");
    selectedTypeIds.add("orb");
    selectedTypeIds.add("task");

    const typeCheckboxes = typeCheckboxList?.querySelectorAll(
      'input[type="checkbox"][data-type]',
    );
    typeCheckboxes.forEach((cb) => {
      cb.checked = true;
    });
    selectAllTypes.checked = true;
    selectAllTypes.indeterminate = false;
    updateTypeFilterLabel();

    // Reset whole words checkbox
    const wholeWordsCheckbox = $("wholeWordsCheckbox");
    wholeWordsCheckbox.checked = false;

    // Trigger search with cleared filters
    triggerSearch(e);
  }
  clearFiltersBtn.addEventListener("click", handleClearFiltersButtonClick);
}

export function setUpSearch() {
  function handleSearchInputKeyDown(e) {
    if (e.key === "Enter") {
      search();
    }
  }
  function handleSearchInputClick() {
    // On mobile, clicking the (visible) search input should open the mobile search screen
    if (mobileMediaQuery.matches) {
      openMobileSearchScreen();
    }
  }
  function handleSearchInputEvent(e) {
    // Keep mobile and desktop input unified (single element used)
    // If the mobile header trigger exists, mirror the value for display
    if (mobileSearchTrigger) mobileSearchTrigger.value = e?.target?.value ?? "";
    if (e?.target?.value.length > 0) {
      // Show clear icon
      toggleElementVisibility(searchClearBtn, true);
      toggleElementVisibility(searchBtn, false);
    } else {
      // Show search icon
      toggleElementVisibility(searchClearBtn, false);
      toggleElementVisibility(searchBtn, true);
    }
  }
  searchInput.addEventListener("keydown", handleSearchInputKeyDown);
  searchInput.addEventListener("click", handleSearchInputClick);
  searchInput.addEventListener("input", handleSearchInputEvent);
  searchBtn.addEventListener("click", search);
}

export function triggerSearch(e) {
  e.preventDefault();

  if (searchInput.value) {
    // Always reset search when filters change to clear old results
    // But only push history state if not already in search view
    const isAlreadySearching = getCurrentAppState() === "search";
    if (isAlreadySearching) {
      // Already in search view, manually reset and search without pushing history
      setCurrentSearchOffset(0);
      setCurrentSearchFilteredCount(0);
      entryListEl.innerHTML = "";
      // Prevent pushHistoryState by temporarily marking as handling popstate
      const prevPop = getIsHandlingPopState();
      setIsHandlingPopState(true);
      try {
        search(true);
      } finally {
        setIsHandlingPopState(prevPop);
      }
    } else {
      // First time searching, push history state
      search(true);
    }
  }
}
