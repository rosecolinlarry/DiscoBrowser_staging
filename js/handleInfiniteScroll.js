import { searchLoader } from "./scripts.js";
import { toggleElementVisibility } from "./uiHelpers.js";
import { search } from "./getQueryTokens.js";

export function handleInfiniteScroll(e) {
  // Setup infinite scroll for search results
  // Check if we're near the bottom and have more results to load
  const target = e?.currentTarget;
  const scrollTop = target.scrollTop;
  const scrollHeight = target.scrollHeight;
  const clientHeight = target.clientHeight;

  const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 100;

  if (scrolledToBottom &&
    !isLoadingMore &&
    currentSearchOffset < currentSearchTotal) {
    // Hide search indicator
    toggleElementVisibility(searchLoader, false);
    // Load more results
    search(false);
  }
}// Search pagination state

let currentSearchOffset = 0;
let currentSearchTotal = 0;
let currentSearchFilteredCount = 0; // Count after type filtering

export function setCurrentSearchOffset(value) {
  currentSearchOffset = value;
}

export function getCurrentSearchOffset() {
  return currentSearchOffset;
}

export function incrementCurrentSearchOffset(value) {
  currentSearchOffset += value;
}
export function setCurrentSearchTotal(value) {
  currentSearchTotal = value;
}
export function getCurrentSearchTotal() {
  return currentSearchTotal;
}
export function setCurrentSearchFilteredCount(value) {
  currentSearchFilteredCount = value;
}
export function incrementCurrentSearchFilteredCount(value) {
  currentSearchFilteredCount += value;
}
export function getCurrentSearchFilteredCount() {
  return currentSearchFilteredCount;
}


let currentSearchConvoIds = null;
export function setCurrentSearchConvoIds(value) {
  currentSearchConvoIds = value;
}
export function getCurrentSearchConvoIds() {
  return currentSearchConvoIds;
}
let currentSearchActorIds = null;
export function setCurrentSearchActorIds(value) {
  currentSearchActorIds = value;
}
export function getCurrentSearchActorIds() {
  return currentSearchActorIds;
}
let isLoadingMore = false;
export function setIsLoadingMore(value) {
  isLoadingMore = value;
}
export function getIsLoadingMore() {
  return isLoadingMore;
}