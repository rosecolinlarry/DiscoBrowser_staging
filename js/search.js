import { searchDialogues as getSearchResults } from "./db.js";
import {
  isHandlingPopState,
  pushHistoryState,
  selectedActorIds,
  allActors,
  searchLoader,
  currentEntryContainerEl,
  entryListEl,
  searchResultLimit,
  wholeWordsCheckbox,
  filterResultsByType,
  selectedTypeIds,
  entryListHeaderEl,
  createSearchResultDiv,
  jumpToConversationRoot,
  navigateToEntry,
  highlightConversationInTree,
  closeMobileSearchScreen,
  mobileSearchCount,
  mobileSearchInput,
  mobileSearchLoader,
  mobileSearchResults,
  mobileSearchTrigger,
  mobileWholeWordsCheckbox,
  mobileSelectedConvoIds,
  mobileSelectedTypes,
  setNavigationHistory,
} from "./main.js";
import { $, getParsedIntOrDefault } from "./ui.js";
import { showHidden } from "./userSettings.js";

// Search pagination state
export let currentSearchOffset = 0;
export let currentSearchActorIds = null;
export let currentSearchTotal = 0;
export let currentSearchFilteredCount = 0; // Count after type filtering
export let isLoadingMore = false;

export function setCurrentSearchOffset(value) {
  currentSearchOffset = value;
}
export function setCurrentSearchTotal(value) {
  currentSearchTotal = value;
}
export function setCurrentSearchFilteredCount(value) {
  currentSearchFilteredCount = value;
}
export function setIsLoadingMore(value) {
  isLoadingMore = value;
}
export function setCurrentSearchActorIds(value) {
  currentSearchActorIds = value;
}

// TODO KA make sure this is hidden when not on the search count page
function setSearchCount(value) {
  const searchCounters = document.querySelectorAll(".search-count");
  searchCounters.forEach((element) => {
    element.textContent = value;
    element.style.display = "flex";
  });
}

export function search(resetSearch = true) {
  const searchInput = $("search");
  if (!searchInput) return;

  searchInput.value = searchInput?.value?.trim() ?? "";

  if (resetSearch) {
    // Push browser history state for search view
    if (!isHandlingPopState) {
      pushHistoryState("search", { query: searchInput.value });
    }

    // Starting a new search
    currentSearchOffset = 0;
  }

  // Always update actor IDs from current filter selection (even when re-filtering)
  currentSearchActorIds =
    selectedActorIds.size === 0 || selectedActorIds.size === allActors.length
      ? null
      : Array.from(selectedActorIds);

  if (resetSearch) {
    searchLoader?.classList.remove("hidden");

    // Hide homepage, show dialogue content for search
    const homePageContainer = $("homePageContainer");
    const dialogueContent = $("dialogueContent");

    if (homePageContainer) {
      homePageContainer.style.display = "none";
    }
    if (dialogueContent) {
      dialogueContent.style.display = "flex";
    }

    // Hide current entry and make search take full space
    if (currentEntryContainerEl) currentEntryContainerEl.style.display = "none";
    const entryListContainer = entryListEl?.closest(".entry-list");
    if (entryListContainer) {
      entryListContainer.classList.add("full-height");
      entryListContainer.classList.remove("compact");
    }
    if (entryListEl) {
      entryListEl.classList.remove("compact");
    }

    entryListEl.innerHTML = ""; // This clears both innerHTML and textContent
  }

  if (isLoadingMore) return;
  isLoadingMore = true;

  try {
    const response = getSearchResults(
      searchInput.value,
      searchResultLimit,
      currentSearchActorIds,
      true, // filterStartInput
      currentSearchOffset,
      undefined, // conversationIds
      wholeWordsCheckbox?.checked || false, // wholeWords
      showHidden()
    );

    const { results: res, total } = response;
    currentSearchTotal = total;

    // Filter by conversation type (use helper)
    let filteredResults = filterResultsByType(res, selectedTypeIds);

    if (resetSearch) {
      entryListHeaderEl.textContent = "Search Results";
      entryListEl.innerHTML = "";
      currentSearchFilteredCount = 0;

      if (!filteredResults.length) {
        setSearchCount("(0)");
        entryListEl.innerHTML = "<div>(no matches)</div>";
        return;
      }
    }

    // Update filtered count
    currentSearchFilteredCount += filteredResults.length;

    // Update header with current count
    entryListHeaderEl.textContent = `Search Results`;
    setSearchCount(`(${currentSearchFilteredCount} of ${total})`);

    // Add results to list
    // TODO KA when searching for ALL, immediately apply filter instead of needing to click the search button again
    filteredResults.forEach((r) => {
      const div = createSearchResultDiv(r, searchInput.value);

      div.addEventListener("click", () => {
        const cid = getParsedIntOrDefault(r.conversationid);
        const eid = getParsedIntOrDefault(r.id);

        setNavigationHistory([{ convoId: cid, entryId: null }]);
        const alternateCondition = r.isAlternate ? r.alternatecondition : null;
        const alternateLine = r.isAlternate ? r.dialoguetext : null;

        if (cid && !eid) {
          currentConvoId = cid;
          jumpToConversationRoot();
          return;
        }
        
        // TODO KA hide search result count if not on search result page
        navigateToEntry(cid, eid, true, alternateCondition, alternateLine);
        highlightConversationInTree(cid);
        document.querySelector(".selected")?.scrollIntoView(true);
      });

      entryListEl.appendChild(div);
    });

    // Update offset for next load (based on database results, not filtered)
    currentSearchOffset += res.length;

    // Remove any existing loading indicator
    searchLoader?.classList.add("hidden");

    // Add loading indicator if there are more results in the database and we got results this time
    if (res.length > 0 && currentSearchOffset < currentSearchTotal) {
      searchLoader?.classList.remove("hidden");
    }
  } catch (e) {
    console.error("Search error", e);
    if (resetSearch) {
      entryListEl.textContent = "Search error";
    }
  } finally {
    isLoadingMore = false;
    searchLoader?.classList.add("hidden");
  }
}

export function performMobileSearch(resetSearch = true) {
  const searchInput = $("search");
  if (!searchInput) return;
  searchInput.value = searchInput.value?.trim();
  mobileSearchTrigger.value = searchInput.value;
  if (resetSearch) {
    // Starting a new search
    // Always update actor IDs from current filter selection (even when re-filtering)
    currentSearchActorIds =
      selectedActorIds.size === 0 || selectedActorIds.size === allActors.length
        ? null
        : Array.from(selectedActorIds);
    currentSearchOffset = 0;
    mobileSearchLoader?.classList.remove("hidden");
    if (mobileSearchResults) {
      mobileSearchResults.innerHTML = "";
    }
  }

  if (isLoadingMore) return;
  isLoadingMore = true;

  try {
    const response = getSearchResults(
      searchInput.value,
      searchResultLimit,
      currentSearchActorIds,
      true,
      currentSearchOffset,
      undefined, // conversationIds
      mobileWholeWordsCheckbox?.checked || false, // wholeWords
      showHidden()
    );
    const { results, total } = response;
    currentSearchTotal = total;

    // Filter by conversations if selected
    let filteredResults = results;
    if (mobileSelectedConvoIds.size > 0) {
      filteredResults = results.filter((r) =>
        mobileSelectedConvoIds.has(r.conversationid)
      );
    }

    // Filter by type (use helper)
    filteredResults = filterResultsByType(filteredResults, mobileSelectedTypes);

    mobileSearchLoader?.classList.add("hidden");

    if (resetSearch) {
      currentSearchFilteredCount = 0;
    }

    if (resetSearch && filteredResults.length === 0) {
      mobileSearchResults.innerHTML =
        '<div class="mobile-search-prompt">No results found</div>';
      if (mobileSearchCount) {
        mobileSearchCount.style.display = "none";
      }
      return;
    }

    // Update filtered count
    currentSearchFilteredCount += filteredResults.length;

    // Update header with current count
    setSearchCount(`Search Results (${currentSearchFilteredCount} of ${total})`);

    filteredResults.forEach((r) => {
      const div = createSearchResultDiv(r, searchInput.value);

      div.addEventListener("click", () => {
        const cid = getParsedIntOrDefault(r.conversationid);
        const eid = getParsedIntOrDefault(r.id);

        const alternateCondition = r.isAlternate ? r.alternatecondition : null;
        const alternateLine = r.isAlternate ? r.dialoguetext : null;
        if (cid && !eid) {
          currentConvoId = cid;
          jumpToConversationRoot();
        } else {
          navigateToEntry(cid, eid, true, alternateCondition, alternateLine);
        }

        // Close mobile search and return to main view
        closeMobileSearchScreen();
      });

      mobileSearchResults.appendChild(div);
    });

    // Update offset for next load (based on database results, not filtered)
    currentSearchOffset += results.length;

    // Remove any existing loading indicator
    mobileSearchLoader?.classList.add("hidden");

    // Add loading indicator if there are more results in the database and we got results this time
    if (results.length > 0 && currentSearchOffset < currentSearchTotal) {
      mobileSearchLoader?.classList.remove("hidden");
    }
  } catch (e) {
    console.error("Mobile search error:", e);
    mobileSearchLoader?.classList.add("hidden");
    if (resetSearch) {
      mobileSearchResults.innerHTML =
        '<div class="mobile-search-prompt">Error performing search</div>';
    }
  } finally {
    isLoadingMore = false;
    mobileSearchLoader?.classList.add("hidden");
  }
}
