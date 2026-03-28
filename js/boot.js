import { buildConvoTreeAndRender } from "./conversationTree.js";
import { setupConversationTypesModal } from "./setUpConversationTypesModal.js";
import { injectIconTemplates } from "./iconHelpers.js";
import { loadSqlJs } from "./loadSqlJs.js";
import {
  setupBrowserHistory,
  handleInitialUrlNavigation,
  setUpNavigation,
} from "./navigation.js";
import {
  setUpMobile
} from "./setUpMobile.js";
import { setUpMediaQueries } from "./setUpMediaQueries.js";
import { toggleHomepageLoader } from "./homepageLoader.js";
import { setUpSearch } from "./searchFilters.js";
import { setupClearFiltersBtn } from "./searchFilters.js";
import { setupClearSearchInput } from "./searchFilters.js";
import {
  setUpFilterDropdowns} from "./searchFilters.js";
import { setUpMainHeader } from "./header.js";
import { setupSearchInfiniteScroll } from "./infiniteScroll.js";
import { setUpSidebarToggles } from "./setUpSidebarToggles.js";
import { setUpMoreDetails } from "./showDetailsHelpers.js";
import { initDatabase } from "./sqlHelpers.js";
import { injectUserSettingsTemplate } from "./userSettings.js";
import { injectTemplate } from "./uiHelpers.js";

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

  setUpNavigation();

  // Set up filter dropdowns to open and close
  setUpFilterDropdowns();

  // clear filters button
  setupClearFiltersBtn();

  // Make header clickable to go home
  setUpMainHeader();

  // wire search
  setUpSearch();
  setupClearSearchInput();

  setUpMoreDetails();

  // Setup infinite scroll for search
  setupSearchInfiniteScroll();

  setUpSidebarToggles();

  setUpMobile();

  // Setup browser history handling
  await setupBrowserHistory();

  // Handle direct URL navigation via route/query params
  await handleInitialUrlNavigation();

  // Set up conversation type modal
  await setupConversationTypesModal();

  // Inject homepage HTML
  await injectTemplate("homepage.html", "homePageContainer")

  toggleHomepageLoader(false);
}/* Initialize boot sequence */
boot().catch((err) => console.error("boot error", err));

