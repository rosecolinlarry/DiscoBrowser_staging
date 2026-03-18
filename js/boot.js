import { buildConvoTreeAndRender } from "./conversationTree.js";
import { setupConversationTypesModal } from "./closeAllSidebars.js";
import { injectIconTemplates } from "./iconHelpers.js";
import { loadSqlJs } from "./loadSqlJs.js";
import {
  setupBrowserHistory,
  handleInitialUrlNavigation,
  setUpChatNavigation,
} from "./navigation.js";
import {
  setupMobileSidebar,
  setupMobileSearch,
  setupMobileNavMenu,
} from "./openMobileNavSidebar.js";
import { setUpMediaQueries } from "./handleMediaQueryChange.js";
import { toggleHomepageLoader } from "./scripts.js";
import {
  setupClearFiltersBtn,
  setUpSearch,
  setupClearSearchInput,
} from "./setupClearSearchInput.js";
import {
  setUpFilterDropdowns,
  setupConvoFilter,
  populateActorDropdown,
  setupTypeFilter,
  setUpMainHeader,
  updateConvoFilterLabel,
} from "./setUpFilterDropdowns.js";
import { setupSearchInfiniteScroll } from "./setupSearchInfiniteScroll.js";
import { setUpSidebarToggles } from "./setUpSidebarToggles.js";
import { setUpMoreDetails } from "./showConvoDetails.js";
import { initDatabase } from "./sqlHelpers.js";
import { injectUserSettingsTemplate } from "./userSettings.js";

// main.js - entry point (use <script type="module"> in index.html)

export async function boot() {
  toggleHomepageLoader(true);
  await injectUserSettingsTemplate();
  await injectIconTemplates();
  await setUpMediaQueries();

  const SQL = await loadSqlJs();
  await initDatabase(SQL, "db/discobase.sqlite3");

  // Build tree and render (includes all types: flow, orb, task)
  buildConvoTreeAndRender();
  setUpChatNavigation();

  // Set up filter dropdowns to open and close
  setUpFilterDropdowns();

  // conversation filter dropdown
  setupConvoFilter();

  // actor filter dropdown
  populateActorDropdown();

  // type filter dropdown
  setupTypeFilter();

  // clear filters button
  setupClearFiltersBtn();

  // Make header clickable to go home
  setUpMainHeader();

  // wire search
  setUpSearch();

  setUpMoreDetails();
  // Setup infinite scroll for search
  setupSearchInfiniteScroll();

  // Setup mobile sidebar
  setupMobileSidebar();
  setUpSidebarToggles();

  // Setup mobile search
  setupMobileSearch();
  setupClearSearchInput();

  // Set up mobile side menu
  setupMobileNavMenu();

  // Initialize mobile filter labels
  updateConvoFilterLabel();

  // Setup browser history handling
  await setupBrowserHistory();

  // Handle direct URL navigation via route/query params
  await handleInitialUrlNavigation();

  // Set up conversation type modal
  setupConversationTypesModal();

  toggleHomepageLoader(false);
}
