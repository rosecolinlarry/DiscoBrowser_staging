// scripts.js - All Scripts in one

// #region Global Variables
//#region Constants
const entryCache = new Map();

const allowedWordBarriers = [
  "'",
  '"',
  "\\",
  "//",
  " ",
  ".",
  "!",
  "?",
  "$",
  "#",
  ">",
  "*",
  ":",
  "_",
  "(",
  ")",
  "[",
  "]",
  "--",
  "",
];

const actorSearchInput = $("actorSearch");
const convoCheckboxList = $("convoCheckboxList");
const actorCheckboxList = $("actorCheckboxList");
const selectAllConvos = $("selectAllConvos");
const selectAllActors = $("selectAllActors");
const actorAddToSelectionBtn = $("actorAddToSelection");
const typeFilterBtn = $("typeFilterBtn");
const typeFilterLabel = $("typeFilterLabel");
const typeFilterDropdown = $("typeFilterDropdown");
const typeCheckboxList = $("typeCheckboxList");
const selectAllTypes = $("selectAllTypes");
const searchLoader = $("searchLoader");
const convoListEl = $("convoList");
const convoSearchInput = $("convoSearchInput");
const convoTypeFilterBtns = document.querySelectorAll(
  ".radio-button-group .radio-button",
);

const searchInput = $("search");
const homePageContainer = $("homePageContainer");
const dialogueContent = $("dialogueContent");

// Homepage Loader
const homepageLoader = $("homepageLoader");
const homepageOverlay = $("homepageOverlay");

// Mobile search state
const entryListEl = $("entryList");
const entryListHeaderEl = $("entryListHeader");
const entryDetailsEl = $("entryDetails");
const entryOverviewEl = $("entryOverview");
const currentEntryContainerEl = $("currentEntryContainer");
const moreDetailsEl = $("moreDetails");

// History navigation
const chatLogEl = $("chatLog");
const backBtn = $("backBtn");
const backStatus = $("backStatus");
const convoRootBtn = $("convoRootBtn");

// Sidebar elements
const sidebarOverlay = $("sidebarOverlay");

const convoSection = $("convoSection");
const historySection = $("historySection");

const browserEl = $("browser");

const historySidebarToggle = $("historySidebarToggle");
const historySidebar = $("historySidebar");
const historySidebarClose = $("historySidebarClose");

const convoSidebarToggle = $("convoSidebarToggle");
const convoSidebar = $("convoSidebar");
const convoSidebarClose = $("convoSidebarClose");

// Mobile elements
// Use the single search input for both desktop and mobile to keep state unified
const mobileSearchTrigger = $("mobileSearchTrigger");
const mobileSearchInputWrapper = $("mobileSearchInputWrapper");
// The actual mobile header trigger element (readonly input)
const mobileSearchTriggerEl = mobileSearchTrigger;
const mobileSearchScreen = $("mobileSearchScreen");
const mobileSearchResults = $("mobileSearchResults");
const mobileSearchCount = $("mobileSearchCount");
const mobileClearFilters = $("mobileClearFilters");

const mobileSidebarToggle = $("mobileSidebarToggle");

const mobileSearchBack = $("mobileSearchBack");

// Mobile nav menu buttons
const mobileNavPanel = $("mobileNavPanel");
const mobileNavSidebarClose = $("navSidebarClose");
const mobileNavBtn = $("mobileNavBtn");
const mobileNavHome = $("mobileNavHome");
const mobileNavSettings = $("mobileNavSettings");
const mobileNavSearch = $("mobileNavSearch");

// Tree control elements
const expandAllBtn = $("expandAllBtn");
const collapseAllBtn = $("collapseAllBtn");

// Filter dropdowns

const convoFilterDropdownWrapper = $("convoFilterWrapper"); // Filter Wrapper
const mobileConvoFilter = $("mobileConvoFilter"); // Button
const convoFilterDropdown = $("convoFilterDropdown"); // Checklist
const mobileConvoFilterWrapper = $("mobileConvoFilterWrapper"); // Checklist

const convoFilterLabelWrapper = $("convoFilterLabelWrapper"); // Text Wrapper
const mobileConvoFilterLabelWrapper = $("mobileConvoFilterLabelWrapper"); // Text Wrapper
const convoFilterLabel = $("convoFilterLabel"); // Text

const actorFilterWrapper = $("actorFilterWrapper"); // Filter Wrapper
const mobileActorFilter = $("mobileActorFilter"); // Button
const actorFilterDropdown = $("actorFilterDropdown"); // Checklist
const mobileActorFilterWrapper = $("mobileActorFilterWrapper"); // Checklist

const actorFilterLabelWrapper = $("actorFilterLabelWrapper"); // Text Wrapper
const mobileActorFilterLabelWrapper = $("mobileActorFilterLabelWrapper"); // Test Wrapper
const actorFilterLabel = $("actorFilterLabel"); // Text

const mobileTypeFilter = $("mobileTypeFilter"); // Button
const mobileTypeFilterWrapper = $("mobileTypeFilterWrapper"); // Filter Wrapper
const mobileTypeFilterSheet = $("mobileTypeFilterSheet"); // Checklist

// Search Bar
const searchBtn = $("searchBtn");
const searchClearBtn = $("searchClearBtn");

// Clear filters button
const clearFiltersBtn = $("clearFiltersBtn");

const searchResultLimit = 50;

// Browser Grid
const browserGrid = $("browser");

const wholeWordsCheckbox = $("wholeWordsCheckbox");

const resetDesktopLayoutCheckboxId = "resetDesktopLayoutCheckbox";
const disableColumnResizingCheckboxId = "disableColumnResizingCheckbox";
const alwaysShowMoreDetailsCheckboxId = "alwaysShowMoreDetailsCheckbox";
const showHiddenCheckboxId = "showHiddenCheckbox";
const turnOffAnimationsCheckboxId = "turnOffAnimationsCheckbox";

const settingsModalOverlayId = "settingsModalOverlay";
const settingsModalCloseId = "settingsModalClose";
const restoreDefaultSettingsBtnId = "restoreDefaultSettingsBtn";
const saveSettingsBtnId = "saveSettingsBtn";
const settingsBtnId = "settingsBtn";

const mobileMediaQuery = window.matchMedia("(max-width: 768px)");
const tabletMediaQuery = window.matchMedia(
  "(min-width: 769px) and (max-width: 1024px)",
);
const desktopMediaQuery = window.matchMedia("(min-width: 1025px)");

const defaultColumns = "352px 1fr 280px";
const STORAGE_KEY = "discobrowser_grid_columns";

const SETTINGS_STORAGE_KEY = "discobrowser_settings";

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

//#endregion

let navigationHistory = [];
let currentConvoId = null;
let currentEntryId = null;
let currentAlternateCondition = null;
let currentAlternateLine = null;
let conversationTree = null;
let activeTypeFilter = "all";
let allConvos = [];
let allActors = [];
let selectedConvoIds = new Set();
let selectedActorIds = new Set();
let selectedTypeIds = new Set(["flow", "orb", "task"]); // All types selected by default
let filteredActors = [];

let filteredConvos = [];

// Browser history state tracking
let currentAppState = "home"; // 'home', 'conversation', 'search'
let isHandlingPopState = false;
let isInitialNavigation = true; // Flag to skip history push on initial URL-based navigation

// Search pagination state
let currentSearchOffset = 0;
let currentSearchConvoIds = null;
let currentSearchActorIds = null;
let currentSearchTotal = 0;
let currentSearchFilteredCount = 0; // Count after type filtering
let isLoadingMore = false;

// Keep raw (DB) results so we can apply client-side filters like whole-words without re-querying
let currentSearchRawResults = [];

// Default app settings
let appSettings = {
  resetDesktopLayout: false,
  disableColumnResizing: false,
  showHidden: false,
  turnOffAnimations: false,
  alwaysShowMoreDetails: false,
};
// State for column resizing handlers
let currentpointermoveHandler = null;
let currentStartX = null;
let currentResizeDirection = null; // 'left' or 'right'
let currentInitialCol1 = null;
let currentInitialCol3 = null;

// Track currently open dropdown so we only allow one at a time
let openDropdown = null;

let _db = null;
let SQL = null;

// #endregion

// #region cacheEntry.js

/* Cache helpers */
function cacheEntry(convoId, entryId, payload) {
  entryCache.set(`${convoId}:${entryId}`, payload);
}
function getCachedEntry(convoId, entryId) {
  return entryCache.get(`${convoId}:${entryId}`);
}
function clearCacheForEntry(convoId, entryId) {
  entryCache.delete(`${convoId}:${entryId}`);
}

// #endregion

// #region db.js
// db.js
// Wraps sql.js Database and provides helper methods, search, and simple caching.

async function initDatabase(sqlFactory, path = "db/discobase.sqlite3") {
  SQL = sqlFactory;
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
    const buffer = await res.arrayBuffer();
    _db = new SQL.Database(new Uint8Array(buffer));
  } catch (err) {
    console.error("initDatabase error", err);
    throw err;
  }
}

function run(sql) {
  if (!_db) throw new Error("DB not initialized");
  return _db.exec(sql);
}

/* Minimal safe helper for retrieving rows */
function execRows(sql) {
  const res = run(sql);
  if (!res || !res.length) return [];
  const cols = res[0].columns;
  return res[0].values.map((v) => {
    const o = Object.create(null);
    for (let i = 0; i < cols.length; i++) o[cols[i]] = v[i];
    return o;
  });
}

function execRowsFirstOrDefault(sql) {
  // Remove last character if semicolon
  if (sql?.at(-1) === ";") {
    sql = sql.slice(0, -1);
  }
  sql += " LIMIT 1;";
  const values = execRows(sql);
  if (values && values.length > 0) {
    return values[0];
  }
  return null;
}

/* Prepared statement helper (for repeated queries) */
function prepareAndAll(stmtSql, params = []) {
  if (!_db) throw new Error("DB not initialized");
  const stmt = _db.prepare(stmtSql);
  const out = [];
  try {
    stmt.bind(params);
    while (stmt.step()) {
      const row = stmt.getAsObject();
      out.push(row);
    }
  } finally {
    stmt.free();
  }
  return out;
}

// #region Actors
function getDistinctActors() {
  return execRows(
    `SELECT DISTINCT id, name FROM actors WHERE name IS NOT NULL AND name != '' ORDER BY name;`,
  );
}

function getActorNameById(actorId) {
  if (!actorId || actorId === 0) {
    return "";
  }
  const actor = execRowsFirstOrDefault(
    `SELECT id, name, color
        FROM actors
        WHERE id='${actorId}'`,
  );
  return actor;
}
// #endregion

// #region Conversations
function getConversationById(convoId, showHidden) {
  // Get the conversation's task related fields
  let convoSQL = `SELECT  
      id, title, onUse, overrideDialogueCondition, alternateOrbText
      , checkType, condition, instruction
      , placement, difficulty, description, actor, conversant
      , displayConditionMain, doneConditionMain, cancelConditionMain, taskReward, taskTimed
      , type, isHidden, totalEntries, totalSubtasks
    FROM conversations WHERE `;
  if (!showHidden) {
    convoSQL += "isHidden != 1 AND ";
  }
  convoSQL += `id=${convoId}`;
  if (convoId) {
    return execRowsFirstOrDefault(convoSQL);
  }
}
/* Conversations list */
function getAllConversations(showHidden) {
  let q = `SELECT id, title, type FROM conversations `;
  if (!showHidden) {
    q += `WHERE isHidden != 1 `;
  }
  q += `ORDER BY title;`;
  return execRows(q);
}
// #endregion

// #region Entries
/* Load dentries for a conversation (summary listing) */
function getEntriesForConversation(convoId, showHidden) {
  if (showHidden) {
    return execRows(`
    SELECT id, title, dialoguetext, actor, isHidden
      FROM dentries
      WHERE conversationid=${convoId}
      ORDER BY id;
  `);
  } else {
    return execRows(`
    SELECT id, title, dialoguetext, actor, isHidden
      FROM dentries
      WHERE conversationid=${convoId} AND isHidden != 1
      ORDER BY id;
  `);
  }
}

/* Fetch a single entry row (core fields) */
function getEntry(convoId, entryId) {
  return execRowsFirstOrDefault(
    `SELECT de.id, de.title, de.dialoguetext, de.actor, de.hasCheck,de.hasAlts
    , de.sequence, de.conditionstring, de.userscript, de.isHidden, c.difficulty as difficultypass
          FROM dentries de
        LEFT JOIN checks c ON c.dialogueid = de.id AND c.conversationid = de.conversationid
        LEFT JOIN modifiers m ON m.dialogueid = de.id AND m.conversationid = de.conversationid
        LEFT JOIN alternates a ON a.dialogueid = de.id AND a.conversationid = de.conversationid
          WHERE de.conversationid=${convoId} 
          AND de.id=${entryId}`,
  );
}

/* Fetch alternates for an entry */
function getAlternates(convoId, entryId) {
  return execRows(
    `SELECT conversationid, dialogueid, alternateline, condition 
      FROM alternates 
      WHERE conversationid=${convoId} 
      AND dialogueid=${entryId};`,
  );
}

/* Fetch check(s) for an entry */
function getChecks(convoId, entryId) {
  return execRows(
    `SELECT checktype, difficulty, flagName, forced, a.name
      FROM checks c
	    LEFT JOIN dentries d ON c.dialogueid = d.id AND c.conversationid = d.conversationid
	    LEFT JOIN actors a ON a.articyId = c.skilltype
      WHERE conversationid=${convoId} 
      AND dialogueid=${entryId};`,
  );
}

/* Fetch parents and children dlinks for an entry */
function getParentsChildren(convoId, entryId) {
  const parents = execRows(`
    SELECT originconversationid AS o_convo, origindialogueid AS o_id, priority, isConnector
      FROM dlinks
      WHERE destinationconversationid=${convoId} 
      AND destinationdialogueid=${entryId};
  `);
  const children = execRows(`
    SELECT destinationconversationid AS d_convo, destinationdialogueid AS d_id, priority, isConnector
      FROM dlinks
      WHERE originconversationid=${convoId} 
      AND origindialogueid=${entryId};
  `);
  return { parents, children };
}

/* Fetch destination entries batched (for link lists) */
function getEntriesBulk(pairs = [], showHidden) {
  // pairs = [{convo, id}, ...] -> batch by convo to use IN
  if (!pairs.length) return [];
  const groupByConvoId = new Map();
  for (const p of pairs) {
    const entryIds = groupByConvoId.get(p.convoId) || [];
    entryIds.push(p.entryId);
    groupByConvoId.set(p.convoId, entryIds);
  }
  const results = [];
  for (const [convoId, entryIds] of groupByConvoId.entries()) {
    const entryIdList = entryIds.map((i) => String(i)).join(",");

    let query =
      "SELECT id, title, dialoguetext, actor, isHidden FROM dentries ";
    query += `WHERE conversationId=${convoId} `;
    if (!showHidden) {
      query += `AND isHidden != 1 `;
    }

    query += `AND id IN (${entryIdList});`;

    const rows = execRows(query);

    rows.forEach((r) => {
      results.push({
        convo: convoId,
        id: r.id,
        title: r.title, // Populates Next Dialogue Options title
        dialoguetext: r.dialoguetext,
        actor: r.actor,
      });
    });
  }
  return results;
}
// #endregion

// #region Search
/** Search entry dialogues and conversation dialogues */
function searchDialogues(
  q,
  limit = 1000,
  actorIds = null,
  filterStartInput = true,
  offset = 0,
  conversationIds = null,
  showHidden,
) {
  const raw = (q || "").trim();

  // Extract Variable["..."] / Variable['...'] tokens so internal quotes don't break parsing
  const variableTokens = [];
  const variableTokenRegex = /Variable\[\s*(['"])(.*?)\1\s*\]/g;
  let vmatch;
  while ((vmatch = variableTokenRegex.exec(raw)) !== null) {
    variableTokens.push(vmatch[0]);
  }

  // Extract simple function-like tokens (e.g., CheckItem("x"), HasShirt(), once(1), CheckEquipped('y'))
  const functionTokens = [];
  const functionTokenRegex = /\b[A-Za-z_][A-Za-z0-9_]*\([^)]*\)/g;
  let fmatch;
  while ((fmatch = functionTokenRegex.exec(raw)) !== null) {
    functionTokens.push(fmatch[0]);
  }

  // Remove variable and function tokens from the string we parse for quoted phrases / words
  const processedRaw = raw
    .replace(variableTokenRegex, " ")
    .replace(functionTokenRegex, " ")
    .trim();

  // Parse query for quoted phrases and regular words from the processed raw string
  const quotedPhrases = [];
  const quotedPhrasesRegex = /"([^"]+)"/g;
  let match;
  while ((match = quotedPhrasesRegex.exec(processedRaw)) !== null) {
    quotedPhrases.push(match[1]);
  }

  // Remove quoted phrases from processedRaw to get remaining words
  const remainingText = processedRaw.replace(/"[^\"]+"/g, "").trim();
  const words = remainingText ? remainingText.split(/\s+/) : [];

  // Build WHERE clause - only include text search if query is provided
  let where = "";

  // Helper: escape single quotes
  function esc(s) {
    return s.replace(/'/g, "''");
  }

  // Helper: build conditions for a set of columns using parsed tokens
  function buildConditionsForColumns(columns) {
    const conds = [];

    // quoted phrases
    quotedPhrases.forEach((phrase) => {
      const safe = esc(phrase);
      conds.push(
        `(${columns.map((c) => `${c} LIKE '%${safe}%'`).join(" OR ")})`,
      );
    });

    // variables
    variableTokens.forEach((token) => {
      const safe = esc(token);
      conds.push(
        `(${columns.map((c) => `${c} LIKE '%${safe}%'`).join(" OR ")})`,
      );
    });

    // functions
    functionTokens.forEach((token) => {
      const safe = esc(token);
      conds.push(
        `(${columns.map((c) => `${c} LIKE '%${safe}%'`).join(" OR ")})`,
      );
    });

    // words (wholeWords filtered on front end)
    words.forEach((word) => {
      const safe = esc(word);
      conds.push(
        `(${columns.map((c) => `${c} LIKE '%${safe}%'`).join(" OR ")})`,
      );
    });

    return conds;
  }

  // Build dentries WHERE clause using shared helper
  if (
    quotedPhrases.length > 0 ||
    words.length > 0 ||
    variableTokens.length > 0 ||
    functionTokens.length > 0
  ) {
    const conditions = buildConditionsForColumns(["dialoguetext", "title"]);
    if (conditions.length > 0) {
      where = conditions.join(" AND ");
    }
  }

  // Handle multiple actor IDs
  if (actorIds) {
    if (Array.isArray(actorIds) && actorIds.length > 0) {
      const actorList = actorIds.map((id) => `'${id}'`).join(",");
      const actorFilter = `actor IN (${actorList})`;
      where = where ? `${where} AND ${actorFilter}` : actorFilter;
    } else if (typeof actorIds === "string" || typeof actorIds === "number") {
      // Legacy support for single actor ID
      const actorFilter = `actor='${actorIds}'`;
      where = where ? `${where} AND ${actorFilter}` : actorFilter;
    }
  }

  // Handle multiple conversation IDs
  if (conversationIds) {
    if (Array.isArray(conversationIds) && conversationIds.length > 0) {
      const convoList = conversationIds.map((id) => `'${id}'`).join(",");
      const convoFilter = `conversationid IN (${convoList})`;
      where = where ? `${where} AND ${convoFilter}` : convoFilter;
    }
  }

  // Build filter for start input if needed
  const startFilter = filterStartInput ? `id NOT IN (0, 1)` : "";

  // Combine WHERE clause
  if (startFilter) {
    where = where ? `${where} AND ${startFilter}` : startFilter;
  }

  // Hide hidden dialogues
  if (!showHidden) {
    const hideHiddenFilter = "isHidden != 1";
    where = where ? `${where} AND ${hideHiddenFilter}` : hideHiddenFilter;
  }

  // If still no where clause, default to all (except start input if filtered)
  if (!where) {
    where = "1=1";
  }

  const limitClause = ` LIMIT ${limit} OFFSET ${offset}`;

  // Get total counts first (without limit/offset)
  const dentriesCountSQL = `SELECT COUNT(*) as count FROM dentries WHERE ${where};`;
  const dentriesCount = execRowsFirstOrDefault(dentriesCountSQL)?.count || 0;

  // Search dentries for flow conversations
  const dentriesSQL = `
    SELECT conversationid, id, dialoguetext, title, actor, isHidden 
      FROM dentries 
      WHERE ${where} 
      ORDER BY conversationid, id 
      ${limitClause};`;
  const dentriesResults = execRows(dentriesSQL);

  // Also search dialogues table for orbs and tasks (they use description as dialogue text)
  let dialoguesWhere = "";

  // Build dialogues WHERE clause using shared helper
  if (
    quotedPhrases.length > 0 ||
    words.length > 0 ||
    variableTokens.length > 0 ||
    functionTokens.length > 0
  ) {
    const dialoguesConditions = buildConditionsForColumns([
      "description",
      "title",
    ]);
    if (dialoguesConditions.length > 0) {
      dialoguesWhere = `${dialoguesConditions.join(" AND ")}`;
    }
  }

  // Handle multiple actor IDs for dialogues
  if (actorIds) {
    if (Array.isArray(actorIds) && actorIds.length > 0) {
      const actorList = actorIds.map((id) => `'${id}'`).join(",");
      // For orbs and tasks, check both actor and conversant fields
      // Always include actor/conversant = 0 (unassigned orbs/tasks)
      const actorFilter = `(actor IN (${actorList}, '0') OR conversant IN (${actorList}, '0'))`;
      dialoguesWhere = dialoguesWhere
        ? `${dialoguesWhere} AND ${actorFilter}`
        : actorFilter;
    } else if (typeof actorIds === "string" || typeof actorIds === "number") {
      const actorFilter = `(actor='${actorIds}' OR conversant='${actorIds}' OR actor='0' OR conversant='0')`;
      dialoguesWhere = dialoguesWhere
        ? `${dialoguesWhere} AND ${actorFilter}`
        : actorFilter;
    }
  }

  // Handle conversation IDs for dialogues (orbs/tasks use id as conversationid)
  if (
    conversationIds &&
    Array.isArray(conversationIds) &&
    conversationIds.length > 0
  ) {
    const convoList = conversationIds.map((id) => `'${id}'`).join(",");
    const convoFilter = `id IN (${convoList})`;
    dialoguesWhere = dialoguesWhere
      ? `${dialoguesWhere} AND ${convoFilter}`
      : convoFilter;
  }

  if (!showHidden) {
    const hideHiddenFilter = "isHidden != 1";
    dialoguesWhere = dialoguesWhere
      ? `${dialoguesWhere} AND ${hideHiddenFilter}`
      : hideHiddenFilter;
  }

  // If still no dialoguesWhere, default to all
  if (!dialoguesWhere) {
    dialoguesWhere = "1=1";
  }

  // Get count for dialogues
  const dialoguesCountSQL = `SELECT COUNT(*) as count FROM conversations WHERE ${dialoguesWhere};`;
  const dialoguesCount = execRowsFirstOrDefault(dialoguesCountSQL)?.count || 0;

  const dialoguesSQL = `
    SELECT id as conversationid, null as id, description as dialoguetext, title, actor, isHidden 
      FROM conversations 
      WHERE ${dialoguesWhere} 
      ORDER BY id 
      ${limitClause};`;
  const dialoguesResults = execRows(dialoguesSQL);

  // Also search alternates table for alternate dialogue lines
  let alternatesWhere = "";

  if (
    quotedPhrases.length > 0 ||
    words.length > 0 ||
    variableTokens.length > 0 ||
    functionTokens.length > 0
  ) {
    const alternatesConditions = buildConditionsForColumns(["alternateline"]);
    alternatesWhere = alternatesConditions.join(" AND ");
  }

  // Handle multiple actor IDs for alternates (join with dentries to get actor)
  if (actorIds) {
    if (Array.isArray(actorIds) && actorIds.length > 0) {
      const actorList = actorIds.map((id) => `'${id}'`).join(",");
      const actorFilter = `d.actor IN (${actorList})`;
      alternatesWhere = alternatesWhere
        ? `${alternatesWhere} AND ${actorFilter}`
        : actorFilter;
    } else if (typeof actorIds === "string" || typeof actorIds === "number") {
      const actorFilter = `d.actor='${actorIds}'`;
      alternatesWhere = alternatesWhere
        ? `${alternatesWhere} AND ${actorFilter}`
        : actorFilter;
    }
  }

  // Handle conversation IDs for alternates
  if (
    conversationIds &&
    Array.isArray(conversationIds) &&
    conversationIds.length > 0
  ) {
    const convoList = conversationIds.map((id) => `'${id}'`).join(",");
    const convoFilter = `a.conversationid IN (${convoList})`;
    alternatesWhere = alternatesWhere
      ? `${alternatesWhere} AND ${convoFilter}`
      : convoFilter;
  }

  if (filterStartInput && alternatesWhere) {
    alternatesWhere += ` AND a.dialogueid NOT IN (0, 1)`;
  } else if (filterStartInput) {
    alternatesWhere = `a.dialogueid NOT IN (0, 1)`;
  }

  // Only query alternates if we have search criteria
  let alternatesResults = [];
  let alternatesCount = 0;
  if (alternatesWhere) {
    // Get count for alternates
    const alternatesCountSQL = `
      SELECT COUNT(*) as count FROM alternates a
      JOIN dentries d ON a.conversationid = d.conversationid AND a.dialogueid = d.id
      WHERE ${alternatesWhere};`;
    alternatesCount = execRowsFirstOrDefault(alternatesCountSQL)?.count || 0;

    const alternatesSQL = `
      SELECT a.conversationid, a.dialogueid as id, a.alternateline as dialoguetext, d.title, d.actor, a.condition as alternatecondition
        FROM alternates a
        JOIN dentries d ON a.conversationid = d.conversationid AND a.dialogueid = d.id
        WHERE ${alternatesWhere} 
        ORDER BY a.conversationid, a.dialogueid 
        ${limitClause};`;
    alternatesResults = execRows(alternatesSQL).map((r) => ({
      ...r,
      isAlternate: true,
    }));
  }

  // Calculate total count
  const totalCount = dentriesCount + dialoguesCount + alternatesCount;

  // Combine results
  return {
    results: [...dentriesResults, ...dialoguesResults, ...alternatesResults],
    total: totalCount,
  };
}
// #endregion

// Helper: fetch conversations by type (used for type-only searches with no text)
function getConversationsByType(type, showHidden) {
  if (!type) return [];
  let where = `type='${type}'`;
  if (!showHidden) {
    where += ` AND isHidden != 1`;
  }
  const sql = `SELECT id as conversationid, null as id, description as dialoguetext, title, actor, isHidden FROM conversations WHERE ${where} ORDER BY title;`;
  return execRows(sql);
}
// #endregion

// #region icons.js
// icons.js - Icon template definitions
// This file contains all SVG icon templates used throughout the application

/**
 * Creates and injects icon templates into the DOM
 * Templates are stored in <template> elements for efficient cloning
 */
function injectIconTemplates() {
  const iconTemplatesHTML = `
    <template id="icon-back-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z"/>
        </svg>
    </template>
    <template id="icon-close-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/>
        </svg>
    </template>
    <template id="icon-search-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z"/>
        </svg>
    </template>
    <template id="icon-menu-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M90.67-210.67v-104.66h533.66v104.66H90.67ZM797-262 586-480.67l210.33-218 73.67 75-137 143 137.67 144L797-262ZM90.67-429v-104.67h420V-429h-420Zm0-216.33V-750h533.66v104.67H90.67Z"/>
        </svg>
    </template>
    <template id="icon-home-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M264-216h96v-240h240v240h96v-348L480-726 264-564v348Zm-72 72v-456l288-216 288 216v456H528v-240h-96v240H192Zm288-327Z"/>
        </svg>
    </template>
    <template id="icon-github-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
    </template>
    <template id="icon-undo-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M288-192v-72h288q50 0 85-35t35-85q0-50-35-85t-85-35H330l93 93-51 51-180-180 180-180 51 51-93 93h246q80 0 136 56t56 136q0 80-56 136t-136 56H288Z"/>
        </svg>
    </template>
    <template id="icon-restart-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M444-144q-107-14-179.5-94.5T192-430q0-61 23-113.5t63-91.5l51 51q-30 29-47.5 69T264-430q0 81 51.5 140T444-217v73Zm72 0v-73q77-13 128.5-72.5T696-430q0-90-63-153t-153-63h-7l46 46-51 50-132-132 132-132 51 51-45 45h6q120 0 204 84t84 204q0 111-72.5 192T516-144Z"/>
        </svg>
    </template>
    <template id="icon-arrow-drop-down-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M480-360 280-559.33h400L480-360Z"/>
        </svg>
    </template>
        <template id="icon-arrow-drop-up-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="m280-400 200-200.67L680-400H280Z"/>
        </svg>
    </template>
    <template id="icon-expand-all-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M480-80 240-320l48.33-48.33L480-176.67l191.67-191.66L720-320 480-80ZM288.67-592 240-640l240-240 240 240-48.67 48L480-783.33 288.67-592Z"/>
        </svg>
    </template>
    <template id="icon-collapse-all-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M292-83.33 245.33-130 480-364.67 714.67-130 668-83.33l-188-188-188 188ZM480-596 245.33-830.67 292-877.33l188 188 188-188 46.67 46.66L480-596Z"/>
            </svg>
    </template>
    <template id="icon-chevron-right-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M521.33-480.67 328-674l47.33-47.33L616-480.67 375.33-240 328-287.33l193.33-193.34Z"/>   
        </svg>
    </template>
    <template id="icon-arrow-right-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M400-280v-400l200 200-200 200Z"/>
        </svg>
    </template>
    <template id="icon-settings-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="m382-80-18.67-126.67q-17-6.33-34.83-16.66-17.83-10.34-32.17-21.67L178-192.33 79.33-365l106.34-78.67q-1.67-8.33-2-18.16-.34-9.84-.34-18.17 0-8.33.34-18.17.33-9.83 2-18.16L79.33-595 178-767.67 296.33-715q14.34-11.33 32.34-21.67 18-10.33 34.66-16L382-880h196l18.67 126.67q17 6.33 35.16 16.33 18.17 10 31.84 22L782-767.67 880.67-595l-106.34 77.33q1.67 9 2 18.84.34 9.83.34 18.83 0 9-.34 18.5Q776-452 774-443l106.33 78-98.66 172.67-118-52.67q-14.34 11.33-32 22-17.67 10.67-35 16.33L578-80H382Zm55.33-66.67h85l14-110q32.34-8 60.84-24.5T649-321l103.67 44.33 39.66-70.66L701-415q4.33-16 6.67-32.17Q710-463.33 710-480q0-16.67-2-32.83-2-16.17-7-32.17l91.33-67.67-39.66-70.66L649-638.67q-22.67-25-50.83-41.83-28.17-16.83-61.84-22.83l-13.66-110h-85l-14 110q-33 7.33-61.5 23.83T311-639l-103.67-44.33-39.66 70.66L259-545.33Q254.67-529 252.33-513 250-497 250-480q0 16.67 2.33 32.67 2.34 16 6.67 32.33l-91.33 67.67 39.66 70.66L311-321.33q23.33 23.66 51.83 40.16 28.5 16.5 60.84 24.5l13.66 110Zm43.34-200q55.33 0 94.33-39T614-480q0-55.33-39-94.33t-94.33-39q-55.67 0-94.5 39-38.84 39-38.84 94.33t38.84 94.33q38.83 39 94.5 39ZM480-480Z"/>
        </svg>
    </template>
    <template id="icon-text-select-jump-to-beginning-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
          <path d="M773.33-773.33V-840H840v66.67h-66.67Zm0 653.33v-66.67H840V-120h-66.67ZM610-773.33V-840h66.67v66.67H610ZM610-120v-66.67h66.67V-120H610ZM446.67-773.33V-840h66.66v66.67h-66.66Zm-163.34 0V-840H350v66.67h-66.67Zm0 653.33v-66.67H350V-120h-66.67ZM120-120v-720h66.67v720H120Zm429.33-209.33L398.67-480l150.66-150.67L596-584l-69.67 70.67H840v66.66H526.33L596-376l-46.67 46.67ZM446.67-120v-66.67h66.66V-120h-66.66Z"/>
        </svg>
    </template>
    <template id="icon-left-panel-open-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
          <path d="M516-651.67V-309l172-171-172-171.67Zm-319.33 561q-44.2 0-75.1-30.9-30.9-30.9-30.9-75.1v-566.66q0-44.48 30.9-75.57 30.9-31.1 75.1-31.1h566.66q44.48 0 75.57 31.1 31.1 31.09 31.1 75.57v566.66q0 44.2-31.1 75.1-31.09 30.9-75.57 30.9H196.67Zm121.33-106v-566.66H196.67v566.66H318Zm106.67 0h338.66v-566.66H424.67v566.66Zm-106.67 0H196.67 318Z"/>
        </svg>
    </template>
    <template id="icon-help-template">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>
    </template>
  `;

  // Create a container element and add templates to it
  const container = document.createElement("div");
  container.innerHTML = iconTemplatesHTML;
  document.body.insertBefore(container, document.body.firstChild);
}
function initializeIcons() {
  // Helper function to clone and size an icon template
  function getIcon(templateId, width = "30px", height = "30px") {
    const template = $(templateId);
    const clone = template.content.cloneNode(true);
    const svg = clone.querySelector("svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    return clone;
  }

  // Apply icons for any placeholder with data-icon-template
  const dataPlaceholders = document.querySelectorAll(
    ".icon-placeholder[data-icon-template]",
  );

  dataPlaceholders.forEach((placeholder) => {
    const templateId = placeholder.dataset.iconTemplate;
    if (!templateId) return;
    const iconWidth =
      placeholder.dataset.iconWidth || placeholder.dataset.iconSize || "30px";
    const iconHeight =
      placeholder.dataset.iconHeight ||
      placeholder.dataset.iconSize ||
      iconWidth;
    const iconClone = getIcon(templateId, iconWidth, iconHeight);
    placeholder.replaceWith(...iconClone.childNodes);
  });
}

// #endregion

// #region main.js
// main.js - entry point (use <script type="module"> in index.html)
// Inject templates as soon as the module loads
injectUserSettingsTemplate();
injectIconTemplates();

// #region URL Management
/**
 * Update the URL with route parameters for convo and entry IDs
 */
function updateUrlWithRoute(convoId, entryId = null) {
  // Don't update URL during popstate handling to avoid double updates
  if (isHandlingPopState) return;

  const params = new URLSearchParams();
  if (convoId !== null && convoId !== undefined) {
    params.set("convo", convoId);
  }
  if (entryId !== null && entryId !== undefined) {
    params.set("entry", entryId);
  }

  const queryString = params.toString();
  const url = queryString ? `?${queryString}` : window.location.pathname;
  window.history.replaceState(
    { view: "conversation", convoId, entryId },
    "",
    url,
  );
}

/**
 * Update the URL with search query parameters
 */
function updateUrlWithSearchParams(searchQuery, typeIds) {
  // Don't update URL during popstate handling to avoid double updates
  if (isHandlingPopState) return;

  const params = new URLSearchParams();

  if (searchQuery && searchQuery.trim()) {
    params.set("q", searchQuery.trim());
  }

  if (typeIds && typeIds.size > 0) {
    params.set("types", Array.from(typeIds).join(","));
  }

  const queryString = params.toString();
  const url = queryString ? `?${queryString}` : window.location.pathname;
  window.history.replaceState({ view: "search", query: searchQuery }, "", url);
}

/**
 * Parse route parameters from URL
 * Returns {convoId, entryId}
 */
function getRouteParamsFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const convoId = params.get("convo")
    ? parseInt(params.get("convo"), 10)
    : null;
  const entryId = params.get("entry")
    ? parseInt(params.get("entry"), 10)
    : null;
  return { convoId, entryId };
}

/**
 * Parse search parameters from URL
 * Returns {searchQuery, convoIds, actorIds, typeIds}
 */
function getSearchParamsFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("q") || "";
  const typeIds = params.get("types")
    ? new Set(params.get("types").split(","))
    : new Set();

  return { searchQuery, typeIds };
}

/**
 * Handle initial navigation from URL parameters on page load
 * Allows deep-linking to specific conversations and entries
 */
async function handleInitialUrlNavigation() {
  const { convoId, entryId } = getRouteParamsFromUrl();
  const { searchQuery } = getSearchParamsFromUrl();
  // If there's a search query in the URL, navigate to search
  if (searchQuery) {
    if (searchInput) {
      searchInput.value = searchQuery;
      // Call search directly instead of relying on event
      search(true);
    }
    isInitialNavigation = false;
    return;
  }

  // If there's a convo ID in the URL, navigate to it
  if (convoId !== null) {
    // Check if the conversation exists
    const conversation = getConversationById(convoId);
    if (!conversation) {
      console.warn(`Conversation ${convoId} not found`);
      isInitialNavigation = false;
      return;
    }

    // If there's also an entry ID, navigate to that entry
    if (entryId !== null) {
      const entry = getEntry(convoId, entryId);
      if (!entry) {
        console.warn(`Entry ${entryId} in conversation ${convoId} not found`);
        // Still navigate to the convo root
        await loadEntriesForConversation(convoId, true);
      } else {
        // Navigate to the entry
        await loadEntriesForConversation(convoId, true);
        await navigateToEntry(convoId, entryId, false);
      }
    } else {
      // Just navigate to the conversation
      await loadEntriesForConversation(convoId, true);
      highlightConversationInTree(convoId);
    }
  }

  // Mark initial navigation as complete
  isInitialNavigation = false;
}

// #endregion

function getConversationsForTree() {
  allConvos = getAllConversations(showHidden());
  return allConvos.map((c) => ({
    ...c,
    title: c.title,
  }));
}

function rebuildConversationTree() {
  // Rebuild tree to reflect hidden/title settings
  const convos = getConversationsForTree();
  conversationTree = buildTitleTree(convos);
  renderTree(convoListEl, conversationTree);
  if (currentConvoId !== null) {
    highlightConversationInTree(currentConvoId);
  }
}

function setupMobileNavMenu() {
  mobileNavHome.addEventListener("click", goBackHomeWithBrowserHistory);
  mobileNavSettings.addEventListener("click", openSettings);
  mobileNavSearch.addEventListener("click", openMobileSearchScreen);
}

function updateResizeHandles() {
  const leftHandle = document.querySelector(".resize-handle-left");
  const rightHandle = document.querySelector(".resize-handle-right");

  if (
    disableColumnResizing() ||
    mobileMediaQuery.matches ||
    tabletMediaQuery.matches
  ) {
    if (leftHandle) leftHandle.classList.add("disabled");
    if (rightHandle) rightHandle.classList.add("disabled");
  } else {
    if (leftHandle) leftHandle.classList.remove("disabled");
    if (rightHandle) rightHandle.classList.remove("disabled");
  }
}

function updateHandlePositions() {
  const columns = getStartColumns();
  const col1 = columns[0];
  const col3 = columns[2];
  browserGrid.style.setProperty("--handle-left-pos", `calc(${col1} - 4px)`);
  browserGrid.style.setProperty("--handle-right-pos", `calc(${col3} - 4px)`);
}

async function setUpMediaQueries() {
  desktopMediaQuery.addEventListener("change", handleMediaQueryChange);
  tabletMediaQuery.addEventListener("change", handleMediaQueryChange);
  mobileMediaQuery.addEventListener("change", handleMediaQueryChange);
  await handleMediaQueryChange();
}

async function handleConvoListClick(e) {
  const target = e.target.closest("[data-convo-id]");
  if (target) {
    const convoId = target.dataset.convoId;
    await loadEntriesForConversation(convoId, true);
    return;
  }
  const topLabel = e.target.closest(".label");
  if (topLabel && topLabel.dataset.singleConvo) {
    const convoId = topLabel.dataset.singleConvo;
    await loadEntriesForConversation(convoId, true);
  }
}

async function handleConvLeafClick(e) {
  const convoId = e.detail.convoId;
  await loadEntriesForConversation(convoId, true);
  highlightConversationInTree(convoId);
}

async function handleNavigateToConversationClick(e) {
  const convoId = e.detail.convoId;
  await loadEntriesForConversation(convoId, true);
  highlightConversationInTree(convoId);
}

function updateResizableGrid() {
  if (!browserGrid || !desktopMediaQuery.matches) {
    browserGrid.style.removeProperty("gridTemplateColumns");
  } else {
    initializeResizableGrid();
  }
}

function applySavedColumns(savedColumns) {
  if (savedColumns) {
    try {
      const columns = JSON.parse(savedColumns);
      browserGrid.style.gridTemplateColumns = columns.join(" ");
    } catch (e) {
      console.error("Failed to restore grid columns", e);
      browserGrid.style.gridTemplateColumns = defaultColumns;
    }
  } else {
    // Set default columns on first load / hard refresh
    browserGrid.style.gridTemplateColumns = defaultColumns;
  }
}

// Helper function to update handle positions
function initializeResizableGrid() {
  if (!browserGrid || !desktopMediaQuery.matches) return;

  const convoSection = browserGrid.querySelector(".convo-section");
  const entriesSection = browserGrid.querySelector(".entries-section");
  const historySection = browserGrid.children[2];

  if (!convoSection || !entriesSection || !historySection) return;

  // Store grid column widths in local storage
  const savedColumns = localStorage.getItem(STORAGE_KEY);

  applySavedColumns(savedColumns);

  // Create resize handles
  const leftHandle = document.createElement("div");
  leftHandle.className = "resize-handle resize-handle-left";
  leftHandle.title = "Drag to resize sections";

  const rightHandle = document.createElement("div");
  rightHandle.className = "resize-handle resize-handle-right";
  rightHandle.title = "Drag to resize sections";

  // Append handles to grid
  browserGrid.appendChild(leftHandle);
  browserGrid.appendChild(rightHandle);

  // Initialize handle positions
  updateHandlePositions();

  // Apply disabled state if column resizing is disabled
  if (disableColumnResizing()) {
    leftHandle.classList.add("disabled");
    rightHandle.classList.add("disabled");
  }

  leftHandle.addEventListener("pointerdown", handleLeftHandlePointerDown);
  rightHandle.addEventListener("pointerdown", handleRightHandlePointerDown);
}

function toggleHomepageLoader(isLoading) {
  toggleElementVisibility(homepageLoader, isLoading);
  toggleElementVisibility(homepageOverlay, isLoading);
}
function getStartColumns() {
  return (browserGrid.style.gridTemplateColumns || defaultColumns)
    .split(" ")
    .map((s) => s.trim());
}
function handlePointerMoveLeft(moveEvent, startX) {
  const deltaX = moveEvent.clientX - currentStartX;
  const initialCol1 = currentInitialCol1 ?? parseFloat(getStartColumns()[0]);
  const initialCol3 = currentInitialCol3 ?? parseFloat(getStartColumns()[2]);
  const col1 = Math.max(200, Math.min(500, initialCol1 + deltaX));
  const newColumns = `${col1}px 1fr ${initialCol3}px`;
  browserGrid.style.gridTemplateColumns = newColumns;
  updateHandlePositions();
}

function handlePointerMoveRight(moveEvent, startX) {
  const deltaX = moveEvent.clientX - currentStartX;
  const initialCol3 = currentInitialCol3 ?? parseFloat(getStartColumns()[2]);
  const initialCol1 = currentInitialCol1 ?? parseFloat(getStartColumns()[0]);
  const col3 = Math.max(200, Math.min(500, initialCol3 - deltaX));
  const newColumns = `${initialCol1}px 1fr ${col3}px`;
  browserGrid.style.gridTemplateColumns = newColumns;
  updateHandlePositions();
}

function handlePointerUp() {
  if (currentpointermoveHandler) {
    document.removeEventListener("pointermove", currentpointermoveHandler);
    currentpointermoveHandler = null;
  }
  currentStartX = null;
  currentResizeDirection = null;
  currentInitialCol1 = null;
  currentInitialCol3 = null;
  const currentColumns = browserGrid.style.gridTemplateColumns;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(currentColumns.split(" ").map((s) => s.trim())),
  );
  document.removeEventListener("pointerup", handlePointerUp);
}

function handleLeftHandlePointerDown(e) {
  if (disableColumnResizing()) return;
  e.preventDefault();
  currentStartX = e.clientX;
  currentResizeDirection = "left";
  const startCols = getStartColumns();
  currentInitialCol1 = parseFloat(startCols[0]);
  currentInitialCol3 = parseFloat(startCols[2]);
  currentpointermoveHandler = (ev) => handlePointerMoveLeft(ev);
  document.addEventListener("pointermove", currentpointermoveHandler);
  document.addEventListener("pointerup", handlePointerUp);
}

function handleRightHandlePointerDown(e) {
  if (disableColumnResizing()) return;
  e.preventDefault();
  currentStartX = e.clientX;
  currentResizeDirection = "right";
  const startCols = getStartColumns();
  currentInitialCol1 = parseFloat(startCols[0]);
  currentInitialCol3 = parseFloat(startCols[2]);
  currentpointermoveHandler = (ev) => handlePointerMoveRight(ev);
  document.addEventListener("pointermove", currentpointermoveHandler);
  document.addEventListener("pointerup", handlePointerUp);
}

async function handleMediaQueryChange() {
  closeAllSidebars();
  closeMobileSearchScreen();
  closeAllModals();
  if (desktopMediaQuery.matches) {
    toggleElementVisibilityBySelector("#historySidebarToggle", false);
    toggleElementVisibilityBySelector("#convoSidebarToggle", false);
    toggleElementVisibilityBySelector(".mobile-container", false);
    browserEl?.prepend(convoSection);
    browserEl?.appendChild(historySection);
  } else if (tabletMediaQuery.matches) {
    toggleElementVisibilityBySelector("#historySidebarToggle", true);
    toggleElementVisibilityBySelector("#convoSidebarToggle", true);
    toggleElementVisibilityBySelector(".mobile-container", false);
    updateResizableGrid();
    historySidebar?.appendChild(historySection);
    convoSidebar?.appendChild(convoSection);
  } else if (mobileMediaQuery.matches) {
    toggleElementVisibilityBySelector("#historySidebarToggle", true);
    toggleElementVisibilityBySelector("#convoSidebarToggle", false);
    toggleElementVisibilityBySelector(".mobile-container", true);
    updateResizableGrid();
    historySidebar?.append(historySection);
    convoSidebar?.appendChild(convoSection);
  }
  moveTypeFilterDropdown();
  moveConvoFilterDropdown();
  await moveActorFilterDropdown();
  moveWholeWordsButton();
  moveClearFiltersBtn();
  moveSearchLoader();
  moveSearchInput();
  applySettings();
}

function moveWholeWordsButton() {
  const el = $("wholeWordsButton");
  const elWrapper = $("wholeWordsButtonWrapper");
  const mobileElWrapper = $("mobileWholeWordsButtonWrapper");
  if (mobileMediaQuery.matches) {
    mobileElWrapper.appendChild(el);
  } else {
    elWrapper.appendChild(el);
  }
}
function moveClearFiltersBtn() {
  const el = $("clearFiltersBtn");
  const elWrapper = $("clearFiltersBtnWrapper");
  const mobileElWrapper = $("mobileClearFiltersBtnWrapper");
  if (mobileMediaQuery.matches) {
    mobileElWrapper.appendChild(el);
  } else {
    elWrapper.appendChild(el);
  }
}
function moveSearchLoader() {
  const el = $("searchLoader");
  const elWrapper = $("searchLoaderWrapper");
  const mobileElWrapper = $("mobileSearchLoaderWrapper");
  if (mobileMediaQuery.matches) {
    mobileElWrapper.appendChild(el);
  } else {
    elWrapper.appendChild(el);
  }
}
function moveSearchInput() {
  const el = $("search");
  const elWrapper = $("searchInputWrapper");
  const mobileElWrapper = mobileSearchInputWrapper;
  const clearButtonElWrapper = document.querySelector(
    ".clear-icon-btn-wrapper.desktop",
  );
  const mobileClearButtonElWrapper = document.querySelector(
    ".clear-icon-btn-wrapper.mobile",
  );
  const searchButtonElWrapper = document.querySelector(
    ".search-icon-btn-wrapper.desktop",
  );
  const mobileSearchButtonElWrapper = document.querySelector(
    ".search-icon-btn-wrapper.mobile",
  );
  if (mobileMediaQuery.matches) {
    mobileElWrapper.appendChild(el);
    mobileClearButtonElWrapper.appendChild(searchClearBtn);
    mobileSearchButtonElWrapper.appendChild(searchBtn);
  } else {
    elWrapper.appendChild(el);
    clearButtonElWrapper.appendChild(searchClearBtn);
    searchButtonElWrapper.appendChild(searchBtn);
  }
}

function moveConvoFilterDropdown() {
  if (mobileMediaQuery.matches) {
    mobileConvoFilterWrapper.appendChild(convoFilterDropdown);
    mobileConvoFilterLabelWrapper.appendChild(convoFilterLabel);
    mobileConvoFilter.addEventListener("click", showMobileConvoFilter);
  } else {
    convoFilterDropdownWrapper.appendChild(convoFilterDropdown);
    convoFilterLabelWrapper.appendChild(convoFilterLabel);
  }
}
async function moveActorFilterDropdown() {
  if (!actorFilterDropdown) {
    await populateActorDropdown();
    return;
  }
  if (mobileMediaQuery.matches) {
    mobileActorFilterWrapper.appendChild(actorFilterDropdown);
    mobileActorFilterLabelWrapper.appendChild(actorFilterLabel);
    mobileActorFilter.addEventListener("click", showMobileActorFilter);
  } else {
    actorFilterWrapper.appendChild(actorFilterDropdown);
    actorFilterLabelWrapper.appendChild(actorFilterLabel);
  }
}
function moveTypeFilterDropdown() {
  const el = $("typeFilterDropdown");
  const elWrapper = $("typeFilterWrapper");
  const mobileElWrapper = $("mobileTypeFilterWrapper");

  const elLabel = $("typeFilterLabel");
  const elLabelWrapper = $("typeFilterDropdownLabelWrapper");
  const mobileElLabelWrapper = $("mobileTypeFilterWrapperLabel");

  if (mobileMediaQuery.matches) {
    mobileElWrapper.appendChild(el);
    mobileElLabelWrapper.appendChild(elLabel);
    mobileTypeFilter.addEventListener("click", showMobileTypeFilter);
  } else {
    elWrapper.appendChild(el);
    elLabelWrapper.appendChild(elLabel);
  }
}

function setUpSidebarToggles() {
  convoSidebarToggle.addEventListener("click", openConversationSection);
  historySidebarToggle.addEventListener("click", openHistorySidebar);
  mobileNavBtn.addEventListener("click", openMobileNavSidebar);
  sidebarOverlay.addEventListener("click", closeAllSidebars);
  sidebarOverlay.addEventListener("click", closeAllModals);
}
function handleConvoTypeFilterButtonClick(e) {
  // Update active state
  const btn = e.target;
  convoTypeFilterBtns.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  // Update active filter
  activeTypeFilter = btn.dataset.type;

  // Apply filter
  filterConversationTree();
}
function setupConversationFilter() {
  // Text search filter
  if (convoSearchInput) {
    convoSearchInput.addEventListener("input", filterConversationTree);
  }

  // Type filter buttons
  convoTypeFilterBtns.forEach((btn) => {
    btn.addEventListener("click", handleConvoTypeFilterButtonClick);
  });

  // Expand/Collapse all buttons
  if (expandAllBtn) {
    expandAllBtn.addEventListener("click", expandAllTreeNodes);
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener("click", collapseAllTreeNodes);
  }
}
function updateTreeControlButtons(enableButtons) {
  if (expandAllBtn) {
    expandAllBtn.disabled = !enableButtons;
  }
  if (collapseAllBtn) {
    collapseAllBtn.disabled = !enableButtons;
  }
}
function setToggleIcon(toggleEl, expanded) {
  if (!toggleEl) return;

  // Only update toggles that are meant to expand/collapse
  if (toggleEl.dataset && toggleEl.dataset.canToggle === "false") return;

  const templateId = "icon-chevron-right-template";
  const template = $(templateId);

  const clone = template.content.cloneNode(true);
  const svg = clone.querySelector("svg");
  if (svg) {
    svg.setAttribute("width", "18px");
    svg.setAttribute("height", "18px");
  }

  toggleEl.innerHTML = "";
  toggleEl.appendChild(clone);

  // Update rotation class for animation
  toggleEl.classList.toggle("toggle-expanded", expanded);
}

function expandAllTreeNodes() {
  const allNodes = convoListEl.querySelectorAll(".node");
  allNodes.forEach((node) => {
    const toggle = node.querySelector(".toggle");
    if (
      toggle &&
      toggle.dataset.canToggle === "true" &&
      !node.classList.contains("expanded")
    ) {
      node.classList.add("expanded");
      setToggleIcon(toggle, true);
    }
  });
}
function collapseAllTreeNodes() {
  const allNodes = convoListEl.querySelectorAll(".node");
  allNodes.forEach((node) => {
    if (node.classList.contains("expanded")) {
      const toggle = node.querySelector(".toggle");
      node.classList.remove("expanded");
      if (toggle && toggle.dataset.canToggle === "true") {
        setToggleIcon(toggle, false);
      }
    }
  });
}
function filterConversationTree() {
  let searchText;
  if (!conversationTree) return;
  searchText = convoSearchInput?.value?.toLowerCase().trim() ?? "";
  // If no text search is active
  if (!searchText) {
    // Show full tree when all types selected
    if (activeTypeFilter === "all") {
      renderTree(convoListEl, conversationTree);
      updateTreeControlButtons(true);
      if (currentConvoId !== null) {
        highlightConversationInTree(currentConvoId);
      }
      return;
    }

    // Build a filtered tree for the selected type
    const { convoTitleById, convoTypeById } = conversationTree;
    const filteredRows = Object.keys(convoTitleById)
      .map((idStr) => {
        const id = Number(idStr);
        return {
          id,
          title: convoTitleById[id],
          type: convoTypeById[id] || "flow",
        };
      })
      .filter((row) => row.type === activeTypeFilter);

    if (filteredRows.length === 0) {
      convoListEl.innerHTML = "(no conversations for selected type)";
      updateTreeControlButtons(false);
      return;
    }

    const filteredTree = buildTitleTree(filteredRows);
    renderTree(convoListEl, filteredTree);
    updateTreeControlButtons(true);
    if (currentConvoId !== null) {
      highlightConversationInTree(currentConvoId);
    }
    return;
  }

  // Get all matching conversation leaves
  const matches = [];
  collectMatchingLeaves(
    conversationTree.root,
    searchText,
    activeTypeFilter,
    matches,
    conversationTree,
  );

  // Clear and render matching results directly as a flat list
  convoListEl.innerHTML = "";
  updateTreeControlButtons(false);

  if (matches.length === 0) {
    const noResults = document.createElement("div");
    noResults.className = "hint-text";
    noResults.textContent = "No matching conversations found.";
    convoListEl.appendChild(noResults);
    return;
  }

  // Render each match as a leaf item
  matches.forEach((match) => {
    const item = createFilteredLeafItem(match, searchText, conversationTree);
    convoListEl.appendChild(item);
  });
}
function collectMatchingLeaves(node, searchText, typeFilter, matches, tree) {
  // Check if this node has conversation IDs
  if (node.convoIds && node.convoIds.length > 0) {
    node.convoIds.forEach((cid) => {
      const convo = getConversationById(cid);
      if (!convo) return;

      // Type filter
      if (typeFilter !== "all" && convo.type !== typeFilter) {
        return;
      }

      // Text filter
      if (searchText) {
        const titleMatch = convo.title.toLowerCase().includes(searchText);
        const idMatch = cid.toString().includes(searchText);
        if (titleMatch || idMatch) {
          matches.push({
            convoId: cid,
            title: convo.title,
            type: convo.type || "flow",
          });
        }
      } else {
        matches.push({
          convoId: cid,
          title: convo.title,
          type: convo.type || "flow",
        });
      }
    });
  }

  // Recursively search children
  if (node.children) {
    for (const child of node.children.values()) {
      collectMatchingLeaves(child, searchText, typeFilter, matches, tree);
    }
  }
}

function handleConvoLabelClick(e) {
  e.stopPropagation();
  e.target.dispatchEvent(
    new CustomEvent("convoLeafClick", {
      detail: { convoId: match?.convoId },
      bubbles: true,
    }),
  );
}
function createFilteredLeafItem(match, searchText, tree) {
  const wrapper = document.createElement("div");
  wrapper.className = "node leaf-result";

  const label = document.createElement("div");
  label.className = "label";
  label.dataset.convoId = match?.convoId;

  // No toggle for leaf items
  const toggle = document.createElement("span");
  toggle.className = "toggle";
  label.appendChild(toggle);

  const titleSpan = document.createElement("span");

  // Highlight matching text (supports quoted phrases and multi-word queries)
  if (searchText) {
    const hasQuotedPhrases = /"[^"]+"/g.test(searchText);
    titleSpan.innerHTML = highlightTerms(
      match?.title || "",
      searchText,
      hasQuotedPhrases,
    );
  } else {
    titleSpan.textContent = match?.title;
  }

  // Append convo ID without overwriting HTML
  const titleText = titleSpan.textContent || match?.title || "";
  if (!titleText.endsWith(` #${label.dataset.convoId}`)) {
    const idNode = document.createTextNode(` #${label.dataset.convoId}`);
    titleSpan.appendChild(idNode);
  }
  label.appendChild(titleSpan);

  // Add type badge
  if (match?.type !== "flow") {
    const badge = document.createElement("span");
    badge.className = `type-badge type-${match?.type}`;
    badge.textContent = match?.type?.toUpperCase();
    label.appendChild(badge);
  }

  // Apply highlight class based on type
  if (match?.type !== "flow") {
    label.classList.add(`highlight-${match?.type}`);
  }

  wrapper.appendChild(label);

  // Click handler to load conversation
  label.addEventListener("click", handleConvoLabelClick);

  return wrapper;
}
async function handleMoreDetailsClicked() {
  if (moreDetailsEl.open) {
    if (currentConvoId && currentEntryId) {
      await showEntryDetails(
        currentConvoId,
        currentEntryId,
        currentAlternateCondition,
        currentAlternateLine,
      );
    } else if (currentConvoId) {
      await showConvoDetails(currentConvoId);
    }
    // Make dialogue options compact when More Details is expanded
    const entryListContainer = entryListEl?.closest(".entry-list");
    if (
      entryListContainer &&
      !entryListContainer.classList.contains("compact")
    ) {
      entryListContainer.setAttribute("data-was-expanded", "true");
      entryListContainer.classList.add("compact");
    }
    if (
      currentEntryContainerEl &&
      !currentEntryContainerEl.classList.contains("expanded")
    ) {
      currentEntryContainerEl.setAttribute("data-was-expanded", "true");
      currentEntryContainerEl.classList.add("expanded");
    }
  } else {
    // Restore original state when More Details is collapsed
    const entryListContainer = entryListEl?.closest(".entry-list");
    if (
      entryListContainer &&
      entryListContainer.getAttribute("data-was-expanded") === "true"
    ) {
      entryListContainer.classList.remove("compact");
      entryListContainer.removeAttribute("data-was-expanded");
    }
    if (
      currentEntryContainerEl &&
      currentEntryContainerEl.getAttribute("data-was-expanded") === "true"
    ) {
      currentEntryContainerEl.classList.remove("expanded");
      currentEntryContainerEl.removeAttribute("data-was-expanded");
    }
  }
}
function handleClickOutsideDropdown(e) {
  if (!openDropdown) return;
  if (!openDropdown.contains(e.target) && e.target !== typeFilterBtn) {
    toggleElementVisibility(openDropdown, false);
    openDropdown = null;
  }
}
function handleDropdownButtonClick(e) {
  e.stopPropagation();

  const filterDropdown =
    e.target.parentElement?.querySelector(".filter-dropdown");
  if (!filterDropdown) return;

  const shouldOpen = filterDropdown.classList.contains("hidden");

  // Close any other open dropdown first
  if (openDropdown && openDropdown !== filterDropdown) {
    toggleElementVisibility(openDropdown, false);
  }

  // Toggle the clicked dropdown
  toggleElementVisibility(filterDropdown, shouldOpen);

  // Update currently open reference
  openDropdown = shouldOpen ? filterDropdown : null;
}
function setUpFilterDropdowns() {
  const dropdownButtons = document.querySelectorAll(".filter-dropdown-button");
  const allDropdowns = document.querySelectorAll(".filter-dropdown");

  // Prevent clicks inside any dropdown from bubbling to document
  allDropdowns.forEach((dd) =>
    dd.addEventListener("click", (ev) => ev.stopPropagation()),
  );

  // Single document-level click handler to close the open dropdown when clicking outside
  document.addEventListener("click", handleClickOutsideDropdown);

  dropdownButtons.forEach((dropdownButton) => {
    dropdownButton.addEventListener("click", handleDropdownButtonClick);
  });
}
// #region Filter Dropdowns

// #region Conversation Filter Dropdown
function handleAddToSelectionButtonClick() {
  selectedConvoIds = new Set(selectedConvoIds);
  const convoFilterSearch = $("convoSearch");
  updateConvoFilterLabel();
  if (mobileMediaQuery.matches) {
    // Mobile: use history to close the mobile filter so history entries remain consistent
    window.history.back();
  } else {
    // Desktop: close the dropdown and apply search
    toggleElementVisibility(convoFilterDropdown, false);
    if (convoFilterSearch.value.trim()) {
      search();
    }
  }
}
function handleSelectAllCheckboxChange(e) {
  if (e.target.checked) {
    // Select all filtered convos
    filteredConvos.forEach((c) => selectedConvoIds.add(c.id));
  } else {
    // Deselect all filtered convos
    filteredConvos.forEach((c) => selectedConvoIds.delete(c.id));
  }
  renderConvoList(filteredConvos);
}

// Render conversation list
function renderConvoList(conversations) {
  const listContainer = $("convoCheckboxList");
  listContainer.innerHTML = "";
  filteredConvos = conversations;

  // Add conversation items
  conversations.forEach((convo) => {
    const label = document.createElement("label");
    label.className = "checkbox-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.convoId = convo.id;
    checkbox.dataset.convoTitle = convo.title;
    checkbox.checked = selectedConvoIds.has(convo.id);

    checkbox.addEventListener("change", (e) =>
      handleFilterCheckboxChange(e, conversations),
    );
    const span = document.createElement("span");
    span.textContent = convo.title;

    label.appendChild(checkbox);
    label.appendChild(span);
    convoCheckboxList.appendChild(label);
  });
}

function handleFilterCheckboxChange(e, conversations) {
  const checkbox = e.target;
  const convoId = checkbox.dataset.convoId;
  if (checkbox.checked) {
    selectedConvoIds.add(convoId);
  } else {
    selectedConvoIds.delete(convoId);
  }

  updateConvoSelectAllState(conversations);
  updateConvoFilterLabel();
  triggerSearch(e);
}
function handleConvoFilterSearchInput(e) {
  const convoFilterSearch = e.target;
  const query = convoFilterSearch.value.toLowerCase().trim();
  if (!query) {
    renderConvoList(allConvos);
    return;
  }

  const filtered = allConvos.filter((c) => {
    return (
      (c.title || "").toLowerCase().includes(query) ||
      c.id.toString().includes(query)
    );
  });

  renderConvoList(filtered);
}
function setupConvoFilter() {
  const convoFilterSearch = $("convoSearch");
  const selectAllCheckbox = $("selectAllConvos");
  const addToSelectionBtn = $("convoAddToSelection");

  // Add to Selection button - apply changes
  if (addToSelectionBtn) {
    addToSelectionBtn.addEventListener(
      "click",
      handleAddToSelectionButtonClick,
    );
  }

  // Select All checkbox
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", handleSelectAllCheckboxChange);
  }

  // Initial render
  if (!allConvos || allConvos.length === 0) {
    allConvos = getConversationsForTree();
  }
  renderConvoList(allConvos);

  // Search filter
  convoFilterSearch.addEventListener("input", handleConvoFilterSearchInput);
}
function updateConvoSelectAllState(conversations) {
  const selectAllCheckbox = $("selectAllConvos");
  if (selectAllCheckbox) {
    const allSelected =
      conversations.length > 0 &&
      conversations.every((c) => selectedConvoIds.has(c.id));
    const someSelected = conversations.some((c) => selectedConvoIds.has(c.id));
    selectAllCheckbox.checked = allSelected;
    selectAllCheckbox.indeterminate = someSelected && !allSelected;
  }
}
function updateConvoFilterLabel() {
  if (
    selectedConvoIds.size === 0 ||
    selectedConvoIds.size === allConvos.length
  ) {
    convoFilterLabel.textContent = "All Conversations";
  } else if (selectedConvoIds.size === 1) {
    const convoId = Array.from(selectedConvoIds)[0];
    const convo = allConvos.find((c) => c.id === convoId);
    convoFilterLabel.textContent = convo ? convo.title : "1 Conversation";
  } else {
    convoFilterLabel.textContent = `${selectedConvoIds.size} Conversations`;
  }
}

// #endregion

// #region Actor Filter Dropdown
function handleSelectAllActorsCheckboxChange(e) {
  const isChecked = e.target.checked;
  const checkboxes = actorCheckboxList.querySelectorAll(
    'input[type="checkbox"]',
  );

  checkboxes.forEach((cb) => {
    const actorId = parseInt(cb.dataset.actorId);
    cb.checked = isChecked;

    if (isChecked) {
      selectedActorIds.add(actorId);
    } else {
      selectedActorIds.delete(actorId);
    }
  });

  updateActorFilterLabel();
  triggerSearch(e);
}
function handleActorAddToSelectionButtonClick(e) {
  const checkboxes = actorCheckboxList.querySelectorAll(
    'input[type="checkbox"]:checked',
  );
  checkboxes.forEach((cb) => {
    selectedActorIds.add(parseInt(cb.dataset.actorId));
  });

  // Clear search and show all with current selection
  actorSearchInput.value = "";
  filterActors(actorSearchInput);
  updateActorFilterLabel();

  if (mobileMediaQuery.matches) {
    // Mobile: close via history so previous view is restored
    window.history.back();
  } else {
    // Desktop: close the dropdown and re-run a reset search
    toggleElementVisibility(actorFilterDropdown, false);
    search(true);
  }
}

function handleActorCheckboxChange(e) {
  const checkbox = e.target;
  const actorId = checkbox.dataset.actorId;
  if (checkbox.checked) {
    selectedActorIds.add(actorId);
  } else {
    selectedActorIds.delete(actorId);
  }
  updateActorSelectAllState();
  updateActorFilterLabel();
  triggerSearch(e);
}
async function populateActorDropdown() {
  allActors = getDistinctActors();
  filteredActors = [...allActors];

  // Search filter
  if (actorSearchInput) {
    actorSearchInput.addEventListener("input", handleActorFilterInput);
  }

  // Select All checkbox
  if (selectAllActors) {
    selectAllActors.addEventListener(
      "change",
      handleSelectAllActorsCheckboxChange,
    );
  }

  // Add to Selection button
  if (actorAddToSelectionBtn) {
    actorAddToSelectionBtn.addEventListener(
      "click",
      handleActorAddToSelectionButtonClick,
    );
  }

  renderActorCheckboxes(allActors);
}
function handleActorFilterInput(e) {
  filterActors(e.target);
}
function filterActors(actorSearchInput) {
  const searchText = actorSearchInput
    ? actorSearchInput.value.toLowerCase().trim()
    : "";

  if (!searchText) {
    filteredActors = [...allActors];
  } else {
    filteredActors = allActors.filter((actor) => {
      return (
        actor.name.toLowerCase().includes(searchText) ||
        actor.id.toString().includes(searchText)
      );
    });
  }

  renderActorCheckboxes(filteredActors);
  updateActorSelectAllState();
}
function renderActorCheckboxes(actors) {
  actorCheckboxList.innerHTML = "";

  actors.forEach((actor) => {
    const label = document.createElement("label");
    label.className = "checkbox-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.actorId = actor.id;
    checkbox.checked = selectedActorIds.has(actor.id);
    checkbox.addEventListener("change", handleActorCheckboxChange);

    const span = document.createElement("span");
    span.textContent = actor.name;

    label.appendChild(checkbox);
    label.appendChild(span);
    actorCheckboxList.appendChild(label);
  });

  updateActorSelectAllState();
}
function updateActorSelectAllState() {
  if (!selectAllActors) return;

  const visibleCheckboxes = actorCheckboxList.querySelectorAll(
    'input[type="checkbox"]',
  );
  const visibleActorIds = Array.from(visibleCheckboxes).map((cb) =>
    parseInt(cb.dataset.actorId),
  );

  const allSelected =
    visibleActorIds.length > 0 &&
    visibleActorIds.every((id) => selectedActorIds.has(id));
  const someSelected = visibleActorIds.some((id) => selectedActorIds.has(id));

  selectAllActors.checked = allSelected;
  selectAllActors.indeterminate = !allSelected && someSelected;
}
function updateActorFilterLabel() {
  if (!actorFilterLabel) return;

  if (
    selectedActorIds.size === 0 ||
    selectedActorIds.size === allActors.length
  ) {
    actorFilterLabel.textContent = "All Actors";
  } else if (selectedActorIds.size === 1) {
    const actorId = Array.from(selectedActorIds)[0];
    const actor = allActors.find((a) => a.id === actorId);
    actorFilterLabel.textContent = actor ? actor.name : "1 Actor";
  } else {
    actorFilterLabel.textContent = `${selectedActorIds.size} Actors`;
  }
}
// #endregion

// #region Conversation Type Filter Dropdown
// Setup type filter
function handleSelectAllConvoTypeChange(e) {
  const isChecked = e.target.checked;
  const checkboxes = typeCheckboxList.querySelectorAll(
    'input[type="checkbox"][data-type]',
  );

  checkboxes.forEach((cb) => {
    const type = cb.dataset.type;
    cb.checked = isChecked;

    if (isChecked) {
      selectedTypeIds.add(type);
    } else {
      selectedTypeIds.delete(type);
    }
  });

  updateTypeFilterLabel();
  triggerSearch(e);
}

function handleConvoTypeCheckboxChange(e) {
  const cb = e.target;
  const type = cb.dataset.type;
  if (cb.checked) {
    selectedTypeIds.add(type);
  } else {
    selectedTypeIds.delete(type);
  }

  updateTypeSelectAllState();
  updateTypeFilterLabel();
  triggerSearch(e);
}
function setupTypeFilter() {
  // Select All checkbox
  selectAllTypes.addEventListener("change", handleSelectAllConvoTypeChange);

  // Individual type checkboxes
  const typeCheckboxes = typeCheckboxList.querySelectorAll(
    'input[type="checkbox"][data-type]',
  );
  typeCheckboxes.forEach((cb) => {
    cb.addEventListener("change", handleConvoTypeCheckboxChange);
  });

  updateTypeFilterLabel();
}

function updateTypeSelectAllState() {
  const typeCheckboxes = typeCheckboxList.querySelectorAll(
    'input[type="checkbox"][data-type]',
  );
  const allTypes = Array.from(typeCheckboxes).map((cb) => cb.dataset.type);

  const allSelected =
    allTypes.length > 0 && allTypes.every((type) => selectedTypeIds.has(type));
  const someSelected = allTypes.some((type) => selectedTypeIds.has(type));

  selectAllTypes.checked = allSelected;
  selectAllTypes.indeterminate = !allSelected && someSelected;
}

function updateTypeFilterLabel() {
  if (selectedTypeIds.size === 0 || selectedTypeIds.size === 3) {
    typeFilterLabel.textContent = "All Types";
  } else if (selectedTypeIds.size === 1) {
    const type = Array.from(selectedTypeIds)[0];
    typeFilterLabel.textContent = type.charAt(0).toUpperCase() + type.slice(1);
  } else {
    typeFilterLabel.textContent = `${selectedTypeIds.size} Types`;
  }
}

// #endregion

// #endregion

function triggerSearch(e) {
  e.preventDefault();

  if (searchInput.value) {
    // Always reset search when filters change to clear old results
    // But only push history state if not already in search view
    const isAlreadySearching = currentAppState === "search";
    if (isAlreadySearching) {
      // Already in search view, manually reset and search without pushing history
      setCurrentSearchOffset(0);
      setCurrentSearchFilteredCount(0);
      entryListEl.innerHTML = "";
      // Prevent pushHistoryState by temporarily marking as handling popstate
      const prevPop = isHandlingPopState;
      isHandlingPopState = true;
      try {
        search(true);
      } finally {
        isHandlingPopState = prevPop;
      }
    } else {
      // First time searching, push history state
      search(true);
    }
  }
}

// #region Sidebars
// #region History Sidebar
function openHistorySidebar() {
  closeAllSidebars();
  toggleElementVisibility(historySidebar, true);
  historySidebarClose.addEventListener("click", closeHistorySidebar);
  toggleElementVisibility(sidebarOverlay, true);
}
function closeHistorySidebar() {
  toggleElementVisibility(historySidebar, false);
  toggleElementVisibility(sidebarOverlay, false);
}
// #endregion

// #region Conversation Tree Sidebar
function openConversationSection() {
  closeAllSidebars();
  toggleElementVisibility(convoSidebar, true);
  convoSidebarClose.addEventListener("click", closeConversationSection);
  toggleElementVisibility(sidebarOverlay, true);
}
function closeConversationSection() {
  toggleElementVisibility(convoSidebar, false);
  toggleElementVisibility(sidebarOverlay, false);
}
// #endregion
// #endregion

function closeMobileSearchScreen() {
  toggleElementVisibility(mobileSearchScreen, false);
  mobileSearchInputWrapper.classList.remove("expanded");

  // Clear mobile search UI state to avoid stale results being visible when closed
  if (mobileSearchResults) {
    mobileSearchResults.innerHTML = "";
  }
  if (mobileSearchCount) {
    toggleElementVisibility(mobileSearchCount, false);
  }
}
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
// Setup clear filters button
function setupClearFiltersBtn() {
  if (!clearFiltersBtn) return;
  clearFiltersBtn.addEventListener("click", handleClearFiltersButtonClick);
}

// Expand and highlight conversation in the conversation tree
function highlightConversationInTree(convoId) {
  // Remove highlight from all labels (both leaf and node labels)
  const allLabels = convoListEl.querySelectorAll(".label.selected");
  allLabels.forEach((label) => {
    label.classList.remove("selected");
  });

  // Find the leaf with data-convo-id
  let leafLabel = convoListEl.querySelector(`[data-convo-id="${convoId}"]`);

  if (leafLabel) {
    // Highlight the leaf label itself and walk up the tree and expand all ancestor nodes
    let node = leafLabel.closest(".node").querySelector(".label");
    node.classList.add("selected");
    node.scrollIntoView();

    // Move up one level
    node = node.parentElement.parentElement.closest(".node");
    while (node) {
      node.classList.add("expanded");
      // Update toggle text
      const toggle = node.querySelector(":scope > .label > .toggle");
      if (toggle) {
        setToggleIcon(toggle, true);
      }

      // Move up one level
      node = node.parentElement?.closest(".node");
    }
  }
}

/* Load entries listing for conversation */
async function loadEntriesForConversation(convoId, resetHistory = false) {
  // If we're coming from home (no current conversation), ensure home state exists
  if (!isHandlingPopState && currentConvoId === null) {
    // Replace current state with home before pushing conversation
    window.history.replaceState({ view: "home" }, "", window.location.pathname);
  }

  // Push browser history state (unless we're handling a popstate event or in initial navigation)
  if (!isHandlingPopState && !isInitialNavigation) {
    pushHistoryState("conversation", { convoId });
  }

  // Close mobile sidebar when conversation is selected
  closeAllSidebars();

  // If switching conversations or resetting, clear the chat log
  if (resetHistory || (currentConvoId !== null && currentConvoId !== convoId)) {
    navigationHistory = [{ convoId, entryId: null }];
    if (chatLogEl) {
      chatLogEl.innerHTML = "";
    }
  } else if (resetHistory) {
    navigationHistory = [{ convoId, entryId: null }];
  }

  toggleElementVisibility(currentEntryContainerEl, true);

  // Hide homepage, show dialogue content
  toggleElementVisibility(homePageContainer, false);
  toggleElementVisibility(dialogueContent, true);

  // Remove search mode styling
  const entryListContainer = entryListEl?.closest(".entry-list");
  if (entryListContainer) entryListContainer.classList.remove("full-height");

  // Reset search state to prevent infinite scroll from loading more search results
  setCurrentSearchOffset(0);
  setCurrentSearchTotal(0);
  setCurrentSearchFilteredCount(0);

  // Update current state for conversation root
  currentConvoId = convoId;
  currentEntryId = null;

  // Update URL with the conversation ID
  updateUrlWithRoute(convoId, null);

  // Disable root button at conversation root
  if (convoRootBtn) {
    convoRootBtn.disabled = true;
  }

  // Update mobile nav buttons (at root, so hide both)
  updateMobileNavButtons();

  // Show conversation metadata instead of entry details
  const conversation = getConversationById(convoId);
  if (conversation) {
    renderConversationOverview(entryOverviewEl, conversation);
  }

  // Make sure current entry container is visible
  toggleElementVisibility(currentEntryContainerEl, true);

  // Auto-open More Details if setting enabled
  if (moreDetailsEl && alwaysShowMoreDetails()) {
    moreDetailsEl.open = true;
    toggleElementVisibility(moreDetailsEl, true);
  }

  // Show details lazily only when expanded
  if (moreDetailsEl && moreDetailsEl.open) {
    if (convoId) {
      await showConvoDetails(convoId);
    }
  }

  // Check conversation type - orbs and tasks often don't have meaningful entries
  entryListHeaderEl.textContent = "Next Dialogue Options";
  entryListEl.innerHTML = "";

  // For flows, remove compact class and expanded class
  entryListEl.classList.remove("compact");
  if (currentEntryContainerEl) {
    currentEntryContainerEl.classList.remove("expanded");
  }

  const rows = getEntriesForConversation(convoId, showHidden());
  const filtered = rows.filter(
    (r) => (r.title || "").toLowerCase() !== "start",
  );
  if (!filtered.length) {
    // No entries - make compact like orbs/tasks
    entryListEl.classList.add("compact");
    const entryList = entryListEl.closest(".entry-list");
    if (entryList) entryList.classList.add("compact");
    if (currentEntryContainerEl) {
      currentEntryContainerEl.classList.add("expanded");
    }
    const message = document.createElement("div");
    message.className = "hint-text";
    message.style.fontStyle = "italic";
    message.style.padding = "12px";
    message.textContent = "(no meaningful entries)";
    entryListEl.appendChild(message);
    return;
  }

  // Has entries - remove compact classes
  entryListEl.classList.remove("compact");
  const entryList = entryListEl.closest(".entry-list");
  if (entryList) entryList.classList.remove("compact");
  if (currentEntryContainerEl) {
    currentEntryContainerEl.classList.remove("expanded");
  }

  filtered.forEach((r) => {
    const entryId = r.id;
    const title = getStringOrDefault(r.title, "(no title)");

    const text = r.dialoguetext || "";
    const el = createCardItem(title, convoId, entryId, text);
    el.addEventListener(
      "click",
      async () => await navigateToEntry(convoId, entryId),
    );
    entryListEl.appendChild(el);
  });
}

// #region Navigation and History Management

// #region Browser History Management
function goBackHomeWithBrowserHistory() {
  // Use browser history to go back to home
  if (currentConvoId !== null || currentAppState !== "home") {
    window.history.pushState({ view: "home" }, "", window.location.pathname);
    goToHomeView();
  }
}

function updateBackButtonState() {
  if (!backBtn) return;
  backBtn.disabled = navigationHistory.length <= 1;
  if (backStatus) {
    if (navigationHistory.length > 1) {
      backStatus.textContent = `(${navigationHistory.length - 1} step${
        navigationHistory.length - 1 !== 1 ? "s" : ""
      })`;
    } else {
      backStatus.textContent = "(none)";
    }
  }
}

async function handleWindowPopStateEvent(e) {
  if (isHandlingPopState) return;
  isHandlingPopState = true;

  const state = event.state;

  // Also check URL parameters on back/forward (for direct navigation or URL changes)
  const { convoId: urlConvoId, entryId: urlEntryId } = getRouteParamsFromUrl();
  const { searchQuery: urlSearchQuery } = getSearchParamsFromUrl();

  // Close mobile-only filter pages by default (only when on mobile)
  if (mobileMediaQuery.matches) {
    toggleElementVisibility(mobileConvoFilterWrapper, false);
    toggleElementVisibility(mobileActorFilterWrapper, false);
  }

  // First priority: check if URL has search params (from direct URL or back button)
  if (urlSearchQuery) {
    // URL has search query - perform search
    if (searchInput) {
      searchInput.value = urlSearchQuery;
      search(true);
    }
  } else if (urlConvoId !== null) {
    // URL has convo params - navigate to conversation/entry
    if (urlEntryId !== null) {
      const entry = getEntry(urlConvoId, urlEntryId);
      if (entry) {
        await loadEntriesForConversation(urlConvoId, false);
        await navigateToEntry(urlConvoId, urlEntryId, false);
      }
    } else {
      await loadEntriesForConversation(urlConvoId, false);
      highlightConversationInTree(urlConvoId);
    }
  } else if (!state || state.view === "home") {
    // Close mobile search and go to home view
    closeMobileSearchScreen();
    goToHomeView();
  } else if (state.view === "search") {
    if (mobileMediaQuery.matches) {
      // Return to mobile search screen; openMobileSearchScreen() will re-run the search
      openMobileSearchScreen();
    } else {
      // Desktop: search is treated as a forward-only action
      goToHomeView();
    }
  } else if (state.view === "mobile-filter") {
    // Only handle mobile-filter on mobile devices
    if (mobileMediaQuery.matches) {
      // Open the specific mobile filter page
      if (state.filter === "convo") {
        toggleElementVisibility(mobileConvoFilterWrapper, true);
      } else if (state.filter === "actor") {
        toggleElementVisibility(mobileActorFilterWrapper, true);
      }
    }
  } else if (state.view === "conversation") {
    if (state.convoId && state.entryId) {
      // Going to a specific entry
      // Determine if we're going backwards or forwards
      const isGoingBack =
        navigationHistory.length > 0 &&
        navigationHistory[navigationHistory.length - 1] &&
        (navigationHistory[navigationHistory.length - 1].convoId !==
          state.convoId ||
          navigationHistory[navigationHistory.length - 1].entryId !==
            state.entryId);

      if (isGoingBack) {
        // Going backwards - remove current entry (non-clickable) and the last clickable entry
        if (chatLogEl && chatLogEl.lastElementChild) {
          chatLogEl.removeChild(chatLogEl.lastElementChild); // Remove current
        }
        if (chatLogEl && chatLogEl.lastElementChild) {
          chatLogEl.removeChild(chatLogEl.lastElementChild); // Remove last clickable
        }
        navigationHistory.pop();
      }

      // Navigate to the entry
      await navigateToEntry(state.convoId, state.entryId, !isGoingBack);
    } else if (state.convoId) {
      // Going to conversation root
      const isGoingBack = navigationHistory.length > 1;

      if (isGoingBack) {
        if (chatLogEl && chatLogEl.lastElementChild) {
          chatLogEl.removeChild(chatLogEl.lastElementChild); // Remove current
        }
        if (chatLogEl && chatLogEl.lastElementChild) {
          chatLogEl.removeChild(chatLogEl.lastElementChild); // Remove last clickable
        }
        navigationHistory.pop();
      }

      await loadEntriesForConversation(state.convoId, false);
    }
  }

  currentAppState = state?.view || "home";

  // Update UI state
  updateBackButtonState();
  if (typeof updateMobileNavButtons === "function") {
    updateMobileNavButtons();
  }

  setTimeout(() => {
    isHandlingPopState = false;
  }, 100);
}
async function setupBrowserHistory() {
  // Handle browser back/forward buttons
  window.addEventListener("popstate", handleWindowPopStateEvent);
}

function pushHistoryState(view, data = {}) {
  if (isHandlingPopState) return;

  const state = { view, ...data };
  currentAppState = view;
  window.history.pushState(state, "", window.location.pathname);
}

function setNavigationHistory(value) {
  navigationHistory = value;
}

/* Jump back to a specific point in history by removing all entries after it */
async function jumpToHistoryPoint(targetIndex) {
  if (targetIndex < 0 || targetIndex >= navigationHistory.length) return;

  // If clicking on the last item, do nothing (it's the current entry)
  if (targetIndex === navigationHistory.length - 1) return;

  // Remove all chat log items after the target (including current entry display)
  if (chatLogEl) {
    const historyItems = chatLogEl.querySelectorAll(".card-item");
    const itemsToRemove = historyItems.length - targetIndex - 1;
    for (let i = 0; i < itemsToRemove; i++) {
      if (historyItems[historyItems.length - 1 - i]) {
        historyItems[historyItems.length - 1 - i].remove();
      }
    }
  }

  // Remove entries from navigation history after the target
  navigationHistory.splice(targetIndex + 1);

  // Get the target entry
  const target = navigationHistory[targetIndex];
  if (target) {
    const cid = target.convoId;
    const eid = target.entryId;

    // Update current state
    currentConvoId = cid;
    currentEntryId = eid;

    // Update URL with the navigation point
    updateUrlWithRoute(cid, eid);

    // Update the UI
    const coreRow = getEntry(currentConvoId, currentEntryId);
    const title = coreRow?.title;
    const dialoguetext = coreRow ? coreRow.dialoguetext : "";

    // Get conversation type
    const conversation = getConversationById(currentConvoId);
    const convoType = conversation?.type || "flow";

    renderCurrentEntry(
      entryOverviewEl,
      cid,
      eid,
      title,
      dialoguetext,
      convoType,
    );

    // Add current entry to history log (non-clickable)
    if (chatLogEl) {
      const currentTitle = parseSpeakerFromTitle(title) || "(no title)";
      appendHistoryItem(
        chatLogEl,
        `${currentTitle} — #${eid}`,
        dialoguetext,
        targetIndex,
        null, // null means non-clickable
        chatLog,
      );
    }

    // Load child options
    loadChildOptions(currentConvoId, currentEntryId);

    // Show details if expanded
    if (moreDetailsEl && moreDetailsEl.open) {
      if (currentConvoId && currentEntryId) {
        await showEntryDetails(currentConvoId, currentEntryId);
      } else if (currentConvoId && !currentEntryId) {
        await showConvoDetails(currentConvoId);
      }
    }
  }

  updateBackButtonState();
}
// #endregion

function goToHomeView() {
  // Clear current conversation
  currentConvoId = null;
  currentEntryId = null;
  navigationHistory = [];

  // Update URL to home (remove params)
  if (!isHandlingPopState) {
    window.history.replaceState({ view: "home" }, "", window.location.pathname);
  }

  // Clear chat log
  if (chatLogEl) {
    chatLogEl.innerHTML = "";
  }

  // Show homepage, hide dialogue content
  toggleElementVisibility(homePageContainer, true);
  toggleElementVisibility(dialogueContent, false);

  // Reset entry list header
  if (entryListHeaderEl) {
    entryListHeaderEl.textContent = "Next Dialogue Options";
  }

  // Clear tree selection
  document.querySelectorAll(".tree-item.selected").forEach((item) => {
    item.classList.remove("selected");
  });

  // Disable mobile back button if visible
  if (backBtn) {
    backBtn.disabled = true;
  }

  // Close mobile search if open
  closeMobileSearchScreen();

  updateBackButtonState();
}

/* Jump to conversation root */
async function jumpToConversationRoot(newConvoId = null) {
  currentConvoId = currentConvoId ?? newConvoId;
  if (currentConvoId === null) return;
  // Clear all entries except the first one (conversation root)
  if (chatLogEl) {
    const historyItems = chatLogEl.querySelectorAll(".card-item");
    historyItems.forEach((item) => item.remove());
  }

  // Reset to just the conversation root
  navigationHistory = [{ convoId: currentConvoId, entryId: null }];

  // Update URL to reflect navigation to conversation root
  updateUrlWithRoute(currentConvoId, null);

  // Load the conversation root
  await loadEntriesForConversation(currentConvoId, false);
  highlightConversationInTree(currentConvoId);
  updateBackButtonState();
}

/* navigateToEntry simplified */
async function navigateToEntry(
  convoId,
  entryId,
  addToHistory = true,
  selectedAlternateCondition = null,
  selectedAlternateLine = null,
) {
  hideSearchCount();
  // Push browser history state (unless we're handling a popstate event or in initial navigation)
  if (!isHandlingPopState && addToHistory && !isInitialNavigation) {
    pushHistoryState("conversation", { convoId, entryId });
  }

  // Check if we're at the same entry AND same alternate view
  const sameEntry = currentConvoId === convoId && currentEntryId === entryId;
  const sameAlternate =
    currentAlternateCondition === selectedAlternateCondition &&
    currentAlternateLine === selectedAlternateLine;

  // If at same entry AND same alternate, only block if trying to add to history
  // This prevents duplicate history entries when clicking the same thing twice
  if (sameEntry && sameAlternate && addToHistory) {
    return;
  }

  // If we're at the same entry (regardless of alternate), don't add to history
  // This allows switching between alternates without cluttering history
  if (sameEntry) {
    addToHistory = false;
  }

  // Hide homepage, show dialogue content (important for mobile when coming from search)
  toggleElementVisibility(homePageContainer, false);
  toggleElementVisibility(dialogueContent, true);
  // Make visible
  toggleElementVisibility(currentEntryContainerEl, true);

  // Auto-open More Details if setting enabled
  if (moreDetailsEl && alwaysShowMoreDetails()) {
    moreDetailsEl.open = true;
    toggleElementVisibility(moreDetailsEl, true);
  }

  // Also restore entry list layout when navigating from search
  const entryListContainer = entryListEl?.closest(".entry-list");
  if (entryListContainer) {
    entryListContainer.classList.remove("full-height");
  }

  // Reset search state to prevent infinite scroll from loading more search results
  setCurrentSearchOffset(0);
  setCurrentSearchTotal(0);
  setCurrentSearchFilteredCount(0);

  // Clear the hint text if present
  if (chatLogEl) {
    if (
      chatLogEl.children.length === 1 &&
      chatLogEl.children[0].textContent &&
      chatLogEl.children[0].textContent.includes("(navigation log")
    )
      chatLogEl.innerHTML = "";
  }

  // Remove the previous "current entry" display if it exists (it will become clickable)
  if (addToHistory && chatLogEl && chatLogEl.lastElementChild) {
    const lastItem = chatLogEl.lastElementChild;
    if (lastItem.classList.contains("current-entry")) {
      // Make it clickable before adding new current entry
      lastItem.classList.remove("current-entry");
      lastItem.style.cursor = "pointer";
      const historyIndex = parseInt(lastItem.dataset.historyIndex);
      lastItem.addEventListener("click", async () => {
        await jumpToHistoryPoint(historyIndex);
      });
    }
  }

  if (addToHistory) navigationHistory.push({ convoId, entryId });
  updateBackButtonState();

  // Render current entry in the overview section
  const coreRow = getEntry(convoId, entryId);
  const title = coreRow ? coreRow.title : `(line ${convoId}:${entryId})`;
  // Use alternate line if provided, otherwise use the original dialogue text
  const dialoguetext =
    selectedAlternateLine || (coreRow ? coreRow.dialoguetext : "");

  // Get conversation type
  const conversation = getConversationById(convoId);
  const convoType = conversation?.type || "flow";

  renderCurrentEntry(
    entryOverviewEl,
    convoId,
    entryId,
    title,
    dialoguetext,
    convoType,
  );

  currentConvoId = convoId;
  currentEntryId = entryId;
  currentAlternateCondition = selectedAlternateCondition;
  currentAlternateLine = selectedAlternateLine;

  // Update URL with both convo and entry IDs
  updateUrlWithRoute(convoId, entryId);

  // Add current entry to history log (non-clickable)
  if (addToHistory && chatLogEl) {
    const currentTitle = parseSpeakerFromTitle(title) || "(no title)";
    appendHistoryItem(
      chatLogEl,
      `${currentTitle} — #${entryId}`,
      dialoguetext,
      navigationHistory.length - 1,
      null, // null means non-clickable
    );
  }

  // Show More Details only if the setting is enabled or it was already open
  if (moreDetailsEl && (alwaysShowMoreDetails() || moreDetailsEl.open)) {
    moreDetailsEl.open = true;
  } else if (moreDetailsEl) {
    // Keep it collapsed when the user hasn't enabled auto-open and didn't leave it open
    moreDetailsEl.open = false;
  }

  // Disable/enable root button
  if (convoRootBtn) {
    convoRootBtn.disabled = currentEntryId === null;
  }

  // Update mobile nav buttons
  updateMobileNavButtons();

  // Load child options
  loadChildOptions(convoId, entryId);

  // Show details lazily only when expanded
  if (moreDetailsEl && moreDetailsEl.open) {
    // Clear cache to force reload when switching between alternate views
    if (sameEntry) {
      clearCacheForEntry(convoId, entryId);
    }
    if (convoId && entryId) {
      await showEntryDetails(
        convoId,
        entryId,
        selectedAlternateCondition,
        selectedAlternateLine,
      );
    } else if (convoId) {
      await showConvoDetails(convoId);
    }
  }
}
// #endregion

// #region Show Details
/* Show convo detais */
async function showConvoDetails(convoId) {
  if (!entryDetailsEl) return;

  const coreRow = getConversationById(convoId, showHidden());

  if (!coreRow) {
    entryDetailsEl.textContent = "(not found)";
  }

  const convoActor = getActorNameById(coreRow.actor);
  const convoConversantActor = getActorNameById(coreRow.conversant);

  let taskDetails = {
    displayConditionMain: coreRow.displayConditionMain,
    doneConditionMain: coreRow.doneConditionMain,
    cancelConditionMain: coreRow.cancelConditionMain,
    taskReward: coreRow.taskReward,
    taskTimed: coreRow.taskTimed,
    totalSubtasks: coreRow.totalSubtasks,
  };

  renderConvoDetails(entryDetailsEl, {
    convoId: coreRow.id,
    conversationTitle: coreRow.title,
    conversationDescription: coreRow.description,
    conversationActorId: coreRow.actor,
    conversationActorName: convoActor.name,
    conversationConversantId: coreRow.conversant,
    conversationConversantName: convoConversantActor.name,
    type: coreRow.type,
    isHidden: coreRow.isHidden,
    totalEntries: coreRow.totalEntries,
    onUse: coreRow.onUse,
    overrideDialogueCondition: coreRow.overrideDialogueCondition,
    alternateOrbText: coreRow.alternateOrbText,
    checkType: coreRow.checkType,
    condition: coreRow.condition,
    instruction: coreRow.instruction,
    placement: coreRow.placement,
    difficulty: coreRow.difficulty,
    totalEntries: coreRow.totalEntries,
    totalSubtasks: coreRow.totalSubtasks,
    taskDetails: taskDetails,
  });
}

/* Show entry details (optimized) */
async function showEntryDetails(
  convoId,
  entryId,
  selectedAlternateCondition = null,
  selectedAlternateLine = null,
) {
  if (!entryDetailsEl) return;

  // Fetch core row early so it can be referenced by cached fallback values
  const coreRow = getEntry(convoId, entryId);

  // Check cache only if viewing the original (no alternate selected)
  if (!selectedAlternateCondition && !selectedAlternateLine) {
    const cached = getCachedEntry(convoId, entryId);
    if (cached) {
      renderEntryDetails(entryDetailsEl, {
        ...cached,
        selectedAlternateCondition: null,
        selectedAlternateLine: null,
        originalDialogueText:
          cached.originalDialogueText || coreRow?.dialoguetext,
        onNavigate: navigateToEntry,
      });
      return;
    }
  }
  if (!coreRow) {
    entryDetailsEl.textContent = "(not found)";
    return;
  }

  // Fetch alternates, checks, parents/children
  const alternates = coreRow.hasalts > 0 ? getAlternates(convoId, entryId) : [];
  const checks = coreRow.hascheck > 0 ? getChecks(convoId, entryId) : [];
  const { parents, children } = getParentsChildren(convoId, entryId);
  // Get conversation data
  const convoRow = getConversationById(convoId) || {};
  // Get actor
  const entryActor = getActorNameById(coreRow.actor);
  const convoActor = getActorNameById(convoRow.actor);
  const convoConversantActor = getActorNameById(convoRow.conversant);
  // Get actor names and colors
  let entryActorName = entryActor?.name;
  let convoActorName = convoActor?.name;
  let convoConversantActorName = convoConversantActor?.name;
  let entryActorColor = entryActor?.color;
  let convoActorColor = convoActor?.color;
  let convoConversantActorColor = convoConversantActor?.color;

  const payload = {
    convoId: convoId,
    entryId: entryId,
    title: coreRow.title,
    actorId: coreRow.actor,
    actorName: entryActorName,
    actorColor: entryActorColor,
    alternates,
    checks,
    parents,
    children,
    conversationTitle: convoRow.title,
    conversationDescription: convoRow.description,
    conversationActorId: convoRow.actor,
    conversationActorName: convoActorName,
    conversationActorColor: convoActorColor,
    conversationConversantId: convoRow.conversant,
    conversationConversantName: convoConversantActorName,
    conversationConversantColor: convoConversantActorColor,
    sequence: coreRow.sequence,
    conditionstring: coreRow.conditionstring,
    userscript: coreRow.userscript,
    difficultypass: coreRow.difficultypass,
    selectedAlternateCondition: selectedAlternateCondition,
    selectedAlternateLine: selectedAlternateLine,
    originalDialogueText: coreRow.dialoguetext,
    isHidden: coreRow.isHidden,
    type: convoRow.type,
    isHidden: convoRow.isHidden,
    totalEntries: convoRow.totalEntries,
    onUse: convoRow.onUse,
    overrideDialogueCondition: convoRow.overrideDialogueCondition,
    alternateOrbText: convoRow.alternateOrbText,
    checkType: convoRow.checkType,
    condition: convoRow.condition,
    instruction: convoRow.instruction,
    placement: convoRow.placement,
    difficulty: convoRow.difficulty,
    totalEntries: convoRow.totalEntries,
    totalSubtasks: convoRow.totalSubtasks,
    onNavigate: navigateToEntry,
  };

  // Only cache the base data without alternate-specific info
  // This prevents stale alternate data from being served from cache
  if (!selectedAlternateCondition && !selectedAlternateLine) {
    const basePayload = { ...payload };
    delete basePayload.selectedAlternateCondition;
    delete basePayload.selectedAlternateLine;
    cacheEntry(convoId, entryId, basePayload);
  }

  renderEntryDetails(entryDetailsEl, payload);
}
// #endregion

// Helper: create a result `div` element for a search result (shared by desktop and mobile)
function createSearchResultDiv(r, query) {
  const hasQuotedPhrases = /"[^"]+"/g.test(query);
  const highlightedTitle = highlightTerms(
    r.title || "",
    query,
    hasQuotedPhrases,
  );
  const highlightedText = highlightTerms(
    r.dialoguetext || "",
    query,
    hasQuotedPhrases,
  );
  const convo = getConversationById(r.conversationid);
  const convoType = convo ? convo.type || "flow" : "flow";
  const div = createCardItem(
    highlightedTitle,
    r.conversationid,
    r.id,
    highlightedText,
    true,
    convoType,
  );
  div.dataset.actor = r.actor;
  div.dataset.isHidden = r.isHidden;
  return div;
}

// Helper: filter a list of results by a set of types (treat 'all' as no-op)
function filterResultsByType(results, typeSet) {
  if (!typeSet || typeSet.has("all") || typeSet.size === 0) return results;
  return results.filter((r) => {
    const convo = getConversationById(r.conversationid);
    const type = convo ? convo.type || "flow" : "flow";
    return typeSet.has(type);
  });
}

function loadChildOptions(convoId, entryId) {
  try {
    entryListHeaderEl.textContent = "Next Dialogue Options";
    entryListEl.innerHTML = "";

    const { children } = getParentsChildren(convoId, entryId);

    const pairs = [];
    for (const c of children)
      pairs.push({ convoId: c.d_convo, entryId: c.d_id });

    const destRows = getEntriesBulk(pairs, showHidden());
    const destMap = new Map(destRows.map((r) => [`${r.convo}:${r.id}`, r]));

    for (const c of children) {
      const dest = destMap.get(`${c.d_convo}:${c.d_id}`);
      if (!dest) continue;
      if ((dest.title || "").toLowerCase() === "start") continue;

      const el = createCardItem(
        dest.title,
        c.d_convo,
        c.d_id,
        dest.dialoguetext,
      );
      el.addEventListener(
        "click",
        async () => await navigateToEntry(c.d_convo, c.d_id),
      );
      entryListEl.appendChild(el);
    }

    if (entryListEl.children.length === 0) {
      // No further options - make compact like orbs/tasks
      entryListEl.classList.add("compact");
      const entryList = entryListEl.closest(".entry-list");
      if (entryList) entryList.classList.add("compact");
      if (currentEntryContainerEl) {
        currentEntryContainerEl.classList.add("expanded");
      }
      const message = document.createElement("div");
      message.className = "hint-text";
      message.style.fontStyle = "italic";
      message.style.padding = "12px";
      message.textContent = "(no further options)";
      entryListEl.appendChild(message);
    }
  } catch (e) {
    console.error("Error loading child links", e);
    entryListEl.textContent = "(error loading next options)";
  }
}

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
function setupClearSearchInput() {
  searchClearBtn.addEventListener("click", handleSearchClearButtonClick);
}

// #region Mobile Setup
function openMobileSearchScreen() {
  // Push browser history state for mobile search
  if (!isHandlingPopState) {
    pushHistoryState("search");
  }
  showSearchCount();
  closeAllSidebars();
  toggleElementVisibility(mobileSearchScreen, true);
  mobileSearchInputWrapper.classList.add("expanded");
  searchInput.focus();

  // On mobile, always re-run the search when opening the mobile search screen
  // to ensure results and counts are restored. Prevent duplicate history pushes
  // by temporarily marking as handling a popstate event while running the search.
  if (mobileMediaQuery.matches) {
    const prevPop = isHandlingPopState;
    isHandlingPopState = true;
    try {
      search(true);
    } finally {
      isHandlingPopState = prevPop;
    }
  } else {
    // No query and no results — make sure counters are hidden
    if (mobileSearchCount) toggleElementVisibility(mobileSearchCount, false);
  }
}

function handleMobileSearchBackClick() {
  // Use browser back to return to previous state
  window.history.back();
  closeMobileSearchScreen();
}

function setupMobileSearch() {
  // Open mobile search screen when the mobile header trigger is clicked
  if (mobileSearchTriggerEl) {
    mobileSearchTriggerEl.addEventListener("click", openMobileSearchScreen);
  }

  // Close mobile search screen
  mobileSearchBack.addEventListener("click", handleMobileSearchBackClick);

  // Setup convo filter screen
  setupConvoActorFilter();

  // Setup actor filter screen
  setupMobileActorFilter();

  // Setup type filter sheet
  setupMobileTypeFilter();
}
async function handleMobileConvoRootButtonClick(e) {
  if (currentConvoId !== null) {
    await loadEntriesForConversation(currentConvoId, false);
    updateMobileNavButtons();
  }
}
function setupMobileSidebar() {
  // Open sidebar
  if (mobileSidebarToggle) {
    mobileSidebarToggle.addEventListener("click", openConversationSection);
  }
  if (convoSidebarToggle) {
    convoSidebarToggle.addEventListener("click", openConversationSection);
  }

  // Mobile back button
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      // Use browser back button instead of manual history management
      window.history.back();
    });
  }

  // Mobile root button
  if (convoRootBtn) {
    convoRootBtn.addEventListener("click", handleMobileConvoRootButtonClick);
  }
}

function openMobileNavSidebar() {
  closeAllSidebars();
  toggleElementVisibility(mobileNavPanel, true);
  toggleElementVisibility(sidebarOverlay, true);
  mobileNavSidebarClose.addEventListener("click", closeMobileNavSidebar);
}

function closeMobileNavSidebar() {
  toggleElementVisibility(mobileNavPanel, false);
  toggleElementVisibility(sidebarOverlay, false);
}
function openModal() {
  const conversationTypesModalOverlay = $("conversationTypesModalOverlay");
  toggleElementVisibility(conversationTypesModalOverlay, true);
}

function closeModal() {
  const conversationTypesModalOverlay = $("conversationTypesModalOverlay");
  conversationTypesModalOverlay.classList.remove("open");
  toggleElementVisibility(conversationTypesModalOverlay, false);
}

function handleConvoTypeModalOverlayClick(e) {
  const modal = $("conversationTypesModalOverlay");
  if (e.target == modal) {
    closeModal();
  }
}
function handleDocumentKeyDownEvent(e) {
  const conversationTypesModalOverlay = $("conversationTypesModalOverlay");
  if (
    e.key === "Escape" &&
    conversationTypesModalOverlay.style.display !== "none"
  ) {
    closeModal();
  }
}
function setupConversationTypesModal() {
  const helpIcon = $("helpIcon");
  const conversationTypeModalOverlay = $("conversationTypesModalOverlay");
  const closeBtn = conversationTypeModalOverlay.querySelector(".modal-close");

  helpIcon.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  conversationTypeModalOverlay.addEventListener(
    "click",
    handleConvoTypeModalOverlayClick,
  );

  // ESC key to close
  document.addEventListener("keydown", handleDocumentKeyDownEvent);
}

function updateMobileNavButtons() {
  if (!backBtn || !convoRootBtn) return;

  // Show back button if we have navigation history OR if we're not on home view
  if (
    navigationHistory.length > 1 ||
    currentConvoId !== null ||
    currentAppState !== "home"
  ) {
    backBtn.disabled = false;
    convoRootBtn.disabled = false;
  } else {
    backBtn.disabled = true;
    convoRootBtn.disabled = true;
  }
}

function closeAllSidebars() {
  const modals = document.querySelectorAll(".sidebar");
  modals.forEach((modal) => toggleElementVisibility(modal, false));
  toggleElementVisibility(sidebarOverlay, false);
}

function closeAllModals() {
  const modals = document.querySelectorAll(".modal-overlay");
  modals.forEach((modal) => toggleElementVisibility(modals, false));
}

function showMobileConvoFilter() {
  // Close the mobile search screen visually and push a history entry for the filter page (mobile only)
  closeMobileSearchScreen();
  if (mobileMediaQuery.matches && !isHandlingPopState) {
    pushHistoryState("mobile-filter", { filter: "convo" });
  }
  toggleElementVisibility(mobileConvoFilterWrapper, true);
}

function showMobileActorFilter() {
  // Close the mobile search screen visually and push a history entry for the filter page (mobile only)
  closeMobileSearchScreen();
  if (mobileMediaQuery.matches && !isHandlingPopState) {
    pushHistoryState("mobile-filter", { filter: "actor" });
  }
  toggleElementVisibility(mobileActorFilterWrapper, true);
}

function showMobileTypeFilter() {
  toggleElementVisibility(mobileTypeFilterSheet, true);
  toggleElementVisibility(typeFilterDropdown, true);
}

function handleMobileConvoFilterBackButtonClick(e) {
  // Use browser back on mobile to return to the previous view so history is kept in sync
  const wrapper = $("mobileConvoFilterWrapper"); // Checklist
  if (mobileMediaQuery.matches) {
    window.history.back();
  } else {
    // Desktop: just close the filter screen and apply changes
    toggleElementVisibility(wrapper, false);
    search(true);
  }
}
function handleMobileConvoFilterWrapperClick(e) {
  // Close when clicking outside the content area (mobile only)
  const wrapper = $("mobileConvoFilterWrapper"); // Checklist
  if (e.target === wrapper) {
    if (mobileMediaQuery.matches) {
      window.history.back();
    } else {
      toggleElementVisibility(wrapper, false);
      search(true);
    }
  }
}
function setupConvoActorFilter() {
  backBtn?.addEventListener("click", handleMobileConvoFilterBackButtonClick);
  mobileConvoFilterWrapper?.addEventListener(
    "click",
    handleMobileConvoFilterWrapperClick,
  );
}
function handleMobileActorFilterBackButtonClick() {
  const wrapper = $("mobileActorFilterWrapper");
  if (mobileMediaQuery.matches) {
    window.history.back();
  } else {
    toggleElementVisibility(e.target, false);
    search(true);
  }
}

function handleMobileActorFilterWrapperClick(e) {
  const wrapper = $("mobileActorFilterWrapper");
  // Close when clicking outside the content area
  if (e.target === wrapper) {
    if (mobileMediaQuery.matches) {
      window.history.back();
    } else {
      toggleElementVisibility(e.target, false);
      search(true);
    }
  }
}
function setupMobileActorFilter() {
  const backBtn = $("mobileActorFilterBack");
  backBtn?.addEventListener("click", handleMobileActorFilterBackButtonClick);
  mobileActorFilterWrapper?.addEventListener(
    "click",
    handleMobileActorFilterWrapperClick,
  );
}
function handleMobileTypeFilterSheetClick(e) {
  const wrapper = $("mobileTypeFilterSheet");
  // Close sheet when clicking outside content
  if (e.target === wrapper) {
    toggleElementVisibility(e.target, false);
    // Apply changes and re-run search with reset
    search(true);
  }
}
function handleMobileConvoTypeButtonClick(e) {
  const mobileTypeFilterSheet = $("mobileTypeFilterSheet");
  // Close sheet
  toggleElementVisibility(mobileTypeFilterSheet, false);
  mobileTypeFilterSheet.classList.remove("active");
  typeFilterDropdown.classList.remove("show");
  // Explicitly run a reset search so mobile results reflect the new selection
  search(true);
}
function setupMobileTypeFilter() {
  // Skip setup if required elements are missing (indicates refactored HTML)
  const applyBtn = $("mobileTypeApply");

  mobileTypeFilterSheet?.addEventListener(
    "click",
    handleMobileTypeFilterSheetClick,
  );

  // Apply button
  applyBtn?.addEventListener("click", () => handleMobileConvoTypeButtonClick);
}
// #endregion

function setUpWholeWordsToggle() {
  const wholeWordsCheckbox = $("wholeWordsCheckbox");
  // Whole-words toggle no longer triggers a DB search; search.js listens for changes
  wholeWordsCheckbox.addEventListener("change", (e) => {
    // Intentionally do not call triggerSearch here - filtering is handled client-side
  });
}

function handleSearchInputKeyDown(e) {
  if (e.key === "Enter") {
    search();
  }
}

function handleSearchInputClick(e) {
  // On mobile, clicking the (visible) search input should open the mobile search screen
  if (mobileMediaQuery.matches) {
    openMobileSearchScreen();
  }
}
function handleSearchButtonClick(e) {
  search();
}
function handleSearchInputEvent(e) {
  // Keep mobile and desktop input unified (single element used)
  // If the mobile header trigger exists, mirror the value for display
  if (mobileSearchTriggerEl)
    mobileSearchTriggerEl.value = e?.target?.value ?? "";
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

function setUpSearch() {
  searchInput.addEventListener("keydown", handleSearchInputKeyDown);
  searchInput.addEventListener("click", handleSearchInputClick);
  searchInput.addEventListener("input", handleSearchInputEvent);
  searchBtn.addEventListener("click", handleSearchButtonClick);
}

function setUpMainHeader() {
  const headerTitle = document.querySelector("h1");
  if (headerTitle) {
    headerTitle.style.cursor = "pointer";
    headerTitle.addEventListener("click", goBackHomeWithBrowserHistory);
  }
}

async function handleConvoRootButtonClick(e) {
  if (currentConvoId !== null) {
    await jumpToConversationRoot();
  }
}
function handleHistoryBackButtonClick(e) {
  // Use browser back button instead of manual history management
  window.history.back();
}

async function boot() {
  toggleHomepageLoader(true);
  // Initialize icons when DOM is ready
  document.addEventListener("DOMContentLoaded", initializeIcons);
  document.addEventListener("DOMContentLoaded", initializeUserSettings);
  // Load settings from localStorage
  applySettings();

  await setUpMediaQueries();

  const SQL = await loadSqlJs();
  await initDatabase(SQL, "db/discobase.sqlite3");

  // load conversations & populate actor dropdown
  allConvos = getConversationsForTree();

  // Build tree and render (includes all types: flow, orb, task)
  conversationTree = buildTitleTree(allConvos);
  renderTree(convoListEl, conversationTree);

  // Set up conversation filter
  setupConversationFilter();
  // Set up conversation list events

  convoListEl.addEventListener(
    "click",
    async (e) => await handleConvoListClick(e),
  );
  // Handle custom convoLeafClick events from tree builder
  convoListEl.addEventListener(
    "convoLeafClick",
    async (e) => await handleConvLeafClick(e),
  );

  // Handle navigateToConversation events from history dividers
  chatLogEl.addEventListener(
    "navigateToConversation",
    async (e) => await handleNavigateToConversationClick(e),
  );

  // Set up filter dropdowns to open and close
  setUpFilterDropdowns();

  // conversation filter dropdown
  setupConvoFilter();

  // actor filter dropdown
  await populateActorDropdown();

  // type filter dropdown
  setupTypeFilter();

  // clear filters button
  setupClearFiltersBtn();

  // Make header clickable to go home
  setUpMainHeader();

  // wire search
  setUpSearch();

  // Whole words toggle - trigger search when changed
  setUpWholeWordsToggle();

  // Desktop History Buttons
  backBtn?.addEventListener("click", handleHistoryBackButtonClick);
  convoRootBtn?.addEventListener("click", handleConvoRootButtonClick);

  updateBackButtonState();

  if (moreDetailsEl) {
    moreDetailsEl.addEventListener("toggle", handleMoreDetailsClicked);
  }

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

  // Initialize resizable grid
  initializeResizableGrid();
  toggleHomepageLoader(false);
}

/* Initialize boot sequence */
boot().catch((err) => console.error("boot error", err));

// #endregion

// #region search.js
// Helper: tokenize query into quoted phrases and words (approximate DB parsing)
function getQueryTokens(rawQuery) {
  const quotedPhrases = [];
  const quotedRegex = /"([^"]+)"/g;
  let qmatch;
  while ((qmatch = quotedRegex.exec(rawQuery)) !== null) {
    quotedPhrases.push(qmatch[1]);
  }

  const remaining = rawQuery.replace(/"[^"]+"/g, "").trim();
  const words = remaining ? remaining.split(/\s+/) : [];
  return { quotedPhrases, words };
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesWholeWords(result, tokens) {
  const hay = `${result.dialoguetext || ""} ${
    result.title || ""
  }`.toLowerCase();

  for (const phrase of tokens.quotedPhrases) {
    if (!hay.includes(phrase.toLowerCase())) return false;
  }

  for (const w of tokens.words) {
    const wtrim = w.trim();
    if (!wtrim) continue;
    const re = new RegExp(`\\b${escapeRegExp(wtrim.toLowerCase())}\\b`, "i");
    if (!re.test(hay)) return false;
  }

  return true;
}

// Filter results by type and whole-words (if enabled); for mobile, convo filtering and mobile type set are used
function filterAndMatchResults(results, rawQuery, { useMobile = false } = {}) {
  const tokens = getQueryTokens(rawQuery || "");

  let typeSet = selectedTypeIds;

  let filtered = filterResultsByType(results, typeSet);

  if (selectedConvoIds && selectedConvoIds.size > 0) {
    filtered = filtered.filter((r) => selectedConvoIds.has(r.conversationid));
  }

  if (wholeWordsCheckbox.checked && rawQuery) {
    filtered = filtered.filter((r) => matchesWholeWords(r, tokens));
  }

  return filtered;
}

async function handleDesktopSearchResultClick(e) {
  const result = e.currentTarget;
  const cid = result.getAttribute("data-convo-id");
  const eid = result.getAttribute("data-id");
  const isAlternate = result.getAttribute("data-is-alternate");
  const alternatecondition = result.getAttribute("data-alternate-condition");
  const dialoguetext = result.getAttribute("data-dialogue-text");
  const alternateCondition = isAlternate ? alternatecondition : null;
  const alternateLine = isAlternate ? dialoguetext : null;

  setNavigationHistory([{ convoId: cid, entryId: null }]);
  if (cid && !eid) {
    await jumpToConversationRoot(cid);
  } else {
    await navigateToEntry(cid, eid, true, alternateCondition, alternateLine);
  }

  highlightConversationInTree(cid);
  if (mobileMediaQuery.matches) {
    closeMobileSearchScreen();
  } else {
    document.querySelector(".selected")?.scrollIntoView(true);
  }
}
async function handleWholeWordsCheckboxChange(e) {
  // Preserve the total count computed by the last DB search — whole-words
  // filtering should only affect the filtered count, not the underlying total
  // number of results available from the database.
  const prevTotal = currentSearchTotal;
  applyFiltersToCurrentResults(mobileMediaQuery.matches);
  if (prevTotal > 0 && currentSearchTotal === 0) {
    setCurrentSearchTotal(prevTotal);
  }
}

function applyFiltersToCurrentResults(useMobile = false) {
  const rawQuery = searchInput?.value ?? "";

  const filtered = filterAndMatchResults(currentSearchRawResults, rawQuery, {
    useMobile,
  });

  if (useMobile) {
    if (!mobileSearchResults) return;
    mobileSearchResults.innerHTML = "";
    if (!filtered.length) {
      mobileSearchResults.innerHTML =
        '<div class="mobile-search-prompt">No results found</div>';
      toggleElementVisibility(mobileSearchCount, false);
      return;
    }
    filtered.forEach((r) => {
      const div = createSearchResultDiv(r, rawQuery);
      div.addEventListener("click", handleDesktopSearchResultClick(e));
      mobileSearchResults.appendChild(div);
    });

    // Update search count UI: prefer DB total unless a client-only filter (whole-words) is active
    if (wholeWordsCheckbox.checked && rawQuery) {
      setSearchCount(`Search Results (${filtered.length})`);
    } else {
      setSearchCount(`Search Results (${currentSearchTotal})`);
    }
    return;
  }

  // Desktop: re-render full list
  entryListEl.innerHTML = "";
  currentSearchFilteredCount = filtered.length;
  if (!filtered.length) {
    setSearchCount("(0)");
    entryListEl.innerHTML = "<div>(no matches)</div>";
    return;
  }

  entryListHeaderEl.textContent = `Search Results`;
  // If a client-only filter (whole-words) is active and there's a query,
  // show the client-side filtered total; otherwise show the DB total.
  if (wholeWordsCheckbox.checked && rawQuery) {
    setSearchCount(`(${filtered.length})`);
  } else {
    setSearchCount(`(${currentSearchTotal})`);
  }

  filtered.forEach((r) => {
    const div = createSearchResultDiv(r, rawQuery);
    div.addEventListener("click", handleDesktopSearchResultClick);

    entryListEl.appendChild(div);
  });

  // Update URL with search params
  updateUrlWithSearchParams(rawQuery, selectedTypeIds);
}

// Listen for whole-words toggle and re-filter existing results (do not re-run DB search)
wholeWordsCheckbox.addEventListener("change", handleWholeWordsCheckboxChange);

function setCurrentSearchOffset(value) {
  currentSearchOffset = value;
}
function setCurrentSearchTotal(value) {
  currentSearchTotal = value;
}
function setCurrentSearchFilteredCount(value) {
  currentSearchFilteredCount = value;
}
function setIsLoadingMore(value) {
  isLoadingMore = value;
}
function setCurrentSearchConvoIds(value) {
  currentSearchConvoIds = value;
}
function setCurrentSearchActorIds(value) {
  currentSearchActorIds = value;
}

function setSearchCount(value) {
  const searchCounters = document.querySelectorAll(".search-count");
  searchCounters.forEach((element) => {
    element.textContent = value;
    toggleElementVisibility(element, true);
  });
}

function showSearchCount() {
  const searchCounters = document.querySelectorAll(".search-count");
  searchCounters.forEach((element) => {
    toggleElementVisibility(element, true);
  });
}

function hideSearchCount() {
  const searchCounters = document.querySelectorAll(".search-count");
  searchCounters.forEach((element) => {
    toggleElementVisibility(element, false);
  });
}

function search(resetSearch = true) {
  window.dataLayer = window.dataLayer || [];

  if (mobileMediaQuery.matches) {
    performMobileSearch(resetSearch);
    return;
  }

  searchInput.value = searchInput?.value?.trim() ?? "";
  if (resetSearch) {
    // Push browser history state for search view
    if (!isHandlingPopState) {
      pushHistoryState("search", { query: searchInput.value });
    }

    // Starting a new search
    currentSearchOffset = 0;
  }

  // Always update convo IDs from current filter selection (even when re-filtering)
  currentSearchConvoIds =
    selectedConvoIds.size === 0 || selectedConvoIds.size === allConvos.length
      ? null
      : Array.from(selectedConvoIds);

  // Always update actor IDs from current filter selection (even when re-filtering)
  currentSearchActorIds =
    selectedActorIds.size === 0 || selectedActorIds.size === allActors.length
      ? null
      : Array.from(selectedActorIds);

  if (resetSearch) {
    toggleElementVisibility(searchLoader, true);

    // Hide homepage, show dialogue content for search
    toggleElementVisibility(homePageContainer, false);
    toggleElementVisibility(dialogueContent, true);

    // Hide current entry and make search take full space
    toggleElementVisibility(currentEntryContainerEl, false);
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

  window.dataLayer.push({
    event: "virtualSearch",
    searchTerm: searchInput.value,
    resetSearch: resetSearch,
    currentSearchOffset: currentSearchOffset,
    selectedActorIds: selectedActorIds,
    selectedConvoIds: selectedConvoIds,
  });

  if (isLoadingMore) return;
  isLoadingMore = true;

  try {
    const response = searchDialogues(
      searchInput.value,
      searchResultLimit,
      currentSearchActorIds,
      true, // filterStartInput
      currentSearchOffset,
      currentSearchConvoIds, // conversationIds
      showHidden(),
    );

    const { results: res, total } = response;
    currentSearchTotal = total;

    // Append to raw results (clear if a new search)
    if (resetSearch) {
      currentSearchRawResults = [...res];
    } else {
      currentSearchRawResults = [...currentSearchRawResults, ...res];
    }

    // Helper: escape regex tokens
    function escapeRegExp(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    // Parse query into quoted phrases and remaining words (approximation of DB parsing)
    const rawQuery = searchInput.value || "";
    const quotedPhrases = [];
    const quotedRegex = /"([^"]+)"/g;
    let qmatch;
    while ((qmatch = quotedRegex.exec(rawQuery)) !== null) {
      quotedPhrases.push(qmatch[1]);
    }

    const remaining = rawQuery.replace(/"[^"]+"/g, "").trim();
    const words = remaining ? remaining.split(/\s+/) : [];

    // Filter a list of results by type and whole-words (if enabled)
    function filterAndMatch(results) {
      let filtered = filterResultsByType(results, selectedTypeIds);

      if (wholeWordsCheckbox.checked && rawQuery) {
        filtered = filtered.filter((r) => {
          const hay = `${r.dialoguetext || ""} ${r.title || ""}`.toLowerCase();

          // All quoted phrases must exist as substrings
          for (const phrase of quotedPhrases) {
            if (!hay.includes(phrase.toLowerCase())) return false;
          }

          // All words must be matched as whole words using \b
          for (const w of words) {
            const wtrim = w.trim();
            if (!wtrim) continue;
            const re = new RegExp(
              `\\b${escapeRegExp(wtrim.toLowerCase())}\\b`,
              "i",
            );
            if (!re.test(hay)) return false;
          }

          return true;
        });
      }

      return filtered;
    }

    // When starting a new search, reset UI and counts
    if (resetSearch) {
      entryListHeaderEl.textContent = "Search Results";
      entryListEl.innerHTML = "";
      currentSearchFilteredCount = 0;

      const initialFiltered = filterAndMatch(currentSearchRawResults);
      if (!initialFiltered.length) {
        setSearchCount("(0)");
        entryListEl.innerHTML = "<div>(no matches)</div>";
        // Update URL with search params even if no results
        updateUrlWithSearchParams(searchInput.value, selectedTypeIds);
        return;
      }

      // Update filtered count (used internally) but display DB total or client-filtered total
      currentSearchFilteredCount += initialFiltered.length;
      entryListHeaderEl.textContent = `Search Results`;
      if (wholeWordsCheckbox.checked && rawQuery) {
        setSearchCount(`(${initialFiltered.length})`);
      } else {
        setSearchCount(`(${currentSearchTotal})`);
      }

      // Render initial set
      initialFiltered.forEach((r) => {
        const div = createSearchResultDiv(r, rawQuery);
        // Add data attributes

        div.addEventListener("click", handleDesktopSearchResultClick);

        entryListEl.appendChild(div);
      });

      // Update URL with search params
      updateUrlWithSearchParams(searchInput.value, selectedTypeIds);
    } else {
      // Pagination: filter only the newly fetched items and append them
      const newFiltered = filterAndMatch(res);

      // Update filtered count
      currentSearchFilteredCount += newFiltered.length;
      entryListHeaderEl.textContent = `Search Results`;
      // Show DB total for pagination
      setSearchCount(`(${total})`);

      newFiltered.forEach((r) => {
        const div = createSearchResultDiv(r, rawQuery);
        div.addEventListener("click", handleDesktopSearchResultClick);

        entryListEl.appendChild(div);
      });
    }

    // Update offset for next load (based on database results, not filtered)
    currentSearchOffset += res.length;

    // Remove any existing loading indicator
    toggleElementVisibility(searchLoader, false);

    // Add loading indicator if there are more results in the database and we got results this time
    if (res.length > 0 && currentSearchOffset < currentSearchTotal) {
      toggleElementVisibility(searchLoader, true);
    }
  } catch (e) {
    console.error("Search error", e);
    if (resetSearch) {
      entryListEl.textContent = "Search error";
    }
  } finally {
    isLoadingMore = false;
    toggleElementVisibility(searchLoader, false);
  }
}

function performMobileSearch(resetSearch = true) {
  if (!mobileMediaQuery.matches) return;
  if (!searchInput) return;
  searchInput.value = searchInput.value?.trim();
  mobileSearchTrigger.value = searchInput.value;
  if (resetSearch) {
    // Starting a new search
    // Always update convo IDs from current filter selection (even when re-filtering)
    currentSearchConvoIds =
      selectedConvoIds.size === 0 || selectedConvoIds.size === allConvos.length
        ? null
        : Array.from(selectedConvoIds);
    // Always update actor IDs from current filter selection (even when re-filtering)
    currentSearchActorIds =
      selectedActorIds.size === 0 || selectedActorIds.size === allActors.length
        ? null
        : Array.from(selectedActorIds);
    currentSearchOffset = 0;
    toggleElementVisibility(searchLoader, true);
    if (mobileSearchResults) {
      mobileSearchResults.innerHTML = "";
    }
  }

  window.dataLayer.push({
    event: "virtualSearch",
    searchTerm: searchInput.value,
    resetSearch: resetSearch,
    currentSearchOffset: currentSearchOffset,
    selectedActorIds: selectedActorIds,
    selectedConvoIds: selectedConvoIds,
  });

  if (isLoadingMore) return;
  isLoadingMore = true;

  try {
    // Always query without whole-word restriction at DB layer; we'll filter client-side
    let response;
    const rawQuery = searchInput.value?.trim() ?? "";
    if (
      !rawQuery &&
      selectedTypeIds &&
      selectedTypeIds.size === 1 &&
      (Array.from(selectedTypeIds)[0] === "task" ||
        Array.from(selectedTypeIds)[0] === "orb")
    ) {
      const type = Array.from(selectedTypeIds)[0];
      const convos = getConversationsByType(type, showHidden());
      response = { results: convos, total: convos.length };
    } else {
      response = searchDialogues(
        searchInput.value,
        searchResultLimit,
        currentSearchActorIds,
        true, // filterStartInput
        currentSearchOffset,
        currentSearchConvoIds, // conversationIds
        showHidden(),
      );
    }
    const { results, total } = response;
    // Ensure global total reflects DB/query results for mobile as well
    setCurrentSearchTotal(total);
    // Append to raw results
    if (resetSearch) {
      currentSearchRawResults = [...results];
    } else {
      currentSearchRawResults = [...currentSearchRawResults, ...results];
    }

    toggleElementVisibility(searchLoader, false);

    if (resetSearch) {
      currentSearchFilteredCount = 0;
    }

    // Filter newly fetched results and append (for pagination) or render all (for reset)
    if (resetSearch) {
      const initialFiltered = filterAndMatchResults(
        currentSearchRawResults,
        searchInput.value,
        { useMobile: true },
      );
      if (initialFiltered.length === 0) {
        mobileSearchResults.innerHTML =
          '<div class="mobile-search-prompt">No results found</div>';
        toggleElementVisibility(mobileSearchCount, false);
        return;
      }

      // Render initial set
      mobileSearchResults.innerHTML = "";
      initialFiltered.forEach((r) => {
        const div = createSearchResultDiv(r, searchInput.value);
        div.addEventListener("click", handleDesktopSearchResultClick);

        mobileSearchResults.appendChild(div);
      });

      currentSearchFilteredCount = initialFiltered.length;
    } else {
      // Pagination: filter only the newly fetched items and append them
      const newFiltered = filterAndMatchResults(results, searchInput.value, {
        useMobile: true,
      });

      // Update filtered count
      currentSearchFilteredCount += newFiltered.length;

      newFiltered.forEach((r) => {
        const div = createSearchResultDiv(r, searchInput.value);
        div.addEventListener("click", handleDesktopSearchResultClick);

        mobileSearchResults.appendChild(div);
      });
    }

    // Update header with current count: prefer DB total unless client-only whole-words filter is active
    if (wholeWordsCheckbox.checked && (searchInput.value || "").trim()) {
      setSearchCount(`Search Results (${currentSearchFilteredCount})`);
    } else {
      setSearchCount(`Search Results (${total})`);
    }

    // Update offset for next load (based on database results, not filtered)
    currentSearchOffset += results.length;

    // Update URL with search params (on initial search)
    if (resetSearch) {
      updateUrlWithSearchParams(searchInput.value, selectedTypeIds);
    }

    // Add loading indicator if there are more results in the database and we got results this time
    if (results.length > 0 && currentSearchOffset < currentSearchTotal) {
      toggleElementVisibility(searchLoader, true);
    }
  } catch (e) {
    console.error("Mobile search error:", e);
    if (resetSearch) {
      mobileSearchResults.innerHTML =
        '<div class="mobile-search-prompt">Error performing search</div>';
    }
  } finally {
    // Remove any existing loading indicator
    isLoadingMore = false;
    toggleElementVisibility(searchLoader, false);
  }
}

// #endregion

// #region setupSearchInfiniteScrolls.js
// Search pagination state

// Setup infinite scroll for search results
function handleInfiniteScroll(e) {
  // Check if we're near the bottom and have more results to load
  const target = e?.currentTarget;
  const scrollTop = target.scrollTop;
  const scrollHeight = target.scrollHeight;
  const clientHeight = target.clientHeight;

  const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 100;

  if (
    scrolledToBottom &&
    !isLoadingMore &&
    currentSearchOffset < currentSearchTotal
  ) {
    // Hide search indicator
    toggleElementVisibility(searchLoader, false);
    // Load more results
    search(false);
  }
}
function setupSearchInfiniteScroll() {
  mobileSearchScreen.addEventListener("scroll", handleInfiniteScroll);
  entryListEl.addEventListener("scroll", handleInfiniteScroll);
}

// #endregion

// #region sqlLoader.js
// sqlLoader.js
// Loads sql.js and returns an init function that resolves to a SQL factory.

async function loadSqlJs({
  vendorPath = "./vendor/sql-wasm/sql-wasm.js",
  localPath = "./node_modules/sql.js/dist/sql-wasm.js",
  cdn = "https://cdn.jsdelivr.net/npm/sql.js@1.8.0/dist/sql-wasm.js",
} = {}) {
  let useVendor = false;
  let useLocal = false;

  if (typeof initSqlJs === "undefined") {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.head.appendChild(s);
      });

    try {
      await loadScript(vendorPath);
      useVendor = true;
    } catch (_) {
      try {
        await loadScript(localPath);
        useLocal = true;
      } catch (err) {
        await loadScript(cdn);
      }
    }
  }

  const SQL = await initSqlJs({
    locateFile: (file) =>
      useVendor
        ? `./vendor/sql-wasm/${file}`
        : useLocal
          ? `./node_modules/sql.js/dist/${file}`
          : `https://cdn.jsdelivr.net/npm/sql.js@1.8.0/dist/${file}`,
  });

  return SQL;
}
// #endregion

// #region treeBuilder.js
// treeBuilder.js (lazy + iterative rendering + simple virtualization)

function buildTitleTree(rows) {
  const root = { children: new Map(), convoIds: [] };
  const convoTitleById = Object.create(null);
  const convoTypeById = Object.create(null);
  rows.forEach((r) => {
    const id = r.id;
    const raw = (r.title || `(id ${id})`).trim();
    convoTitleById[id] = raw;
    convoTypeById[id] = r.type || "flow";
    const parts = raw.split("/").map((p) => p.trim());
    if (!parts.length) parts.push(raw);
    let node = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!node.children.has(part))
        node.children.set(part, { children: new Map(), convoIds: [] });
      node = node.children.get(part);
      if (i === parts.length - 1) node.convoIds.push(id);
    }
  });
  // compute sizes iteratively using a stack
  collapseTree(root);
  computeSizesIterative(root);
  return { root, convoTitleById, convoTypeById };
}

function collapseTree(root) {
  // iterate each top-level key
  for (const [key, child] of [...root.children.entries()]) {
    const collapsed = collapseNode(child, key);
    // If collapse changed the node, update the parent map
    if (collapsed.newKey !== key) {
      root.children.delete(key);
      root.children.set(collapsed.newKey, collapsed.node);
    }
  }
}

function collapseNode(node, key) {
  let current = node;
  let currentKey = key;

  // collapse chain: keep collapsing while this node has:
  // - either: 1 child + no convoIds (intermediate node)
  // - or: 1 convoId + no children (leaf node that's an only child)
  while (
    (current.children.size === 1 && current.convoIds.length === 0) ||
    (current.convoIds.length === 1 && current.children.size === 0)
  ) {
    // case 1: has one child node, no leaves
    if (current.children.size === 1 && current.convoIds.length === 0) {
      const [childKey, childNode] = current.children.entries().next().value;
      current = childNode;
      currentKey = currentKey + " / " + childKey;
    }
    // case 2: has one leaf (convoId), no children - just append to key and stop
    else if (current.convoIds.length === 1 && current.children.size === 0) {
      currentKey = currentKey + " #" + current.convoIds[0];
      break;
    }
  }

  // recursively collapse deeper children
  for (const [childKey, childNode] of [...current.children.entries()]) {
    const collapsed = collapseNode(childNode, childKey);
    if (collapsed.newKey !== childKey) {
      current.children.delete(childKey);
      current.children.set(collapsed.newKey, collapsed.node);
    }
  }

  return { node: current, newKey: currentKey };
}

function computeSizesIterative(root) {
  // Post-order traversal using stack
  const stack = [{ node: root, visited: false }];
  while (stack.length) {
    const top = stack.pop();
    if (!top.visited) {
      stack.push({ node: top.node, visited: true });
      for (const child of top.node.children.values()) {
        stack.push({ node: child, visited: false });
      }
    } else {
      let count = (top.node.convoIds && top.node.convoIds.length) || 0;
      for (const child of top.node.children.values()) {
        count += child._subtreeSize || 0;
      }
      top.node._subtreeSize = count;
    }
  }
}

// #region Render Tree Helpers

// Helper function to collect all types in a subtree
function collectTypesInSubtree(nodeObj) {
  const types = new Set();

  // Add types from direct convoIds
  if (nodeObj.convoIds && nodeObj.convoIds.length > 0) {
    nodeObj.convoIds.forEach((id) => {
      const type = window._convoTypeById[id] || "flow";
      types.add(type);
    });
  }

  // Recursively collect from children
  if (nodeObj.children && nodeObj.children.size > 0) {
    for (const childNode of nodeObj.children.values()) {
      const childTypes = collectTypesInSubtree(childNode);
      childTypes.forEach((t) => types.add(t));
    }
  }

  return types;
}

// Helper function to get the dominant/primary type for highlighting
function getDominantType(typesSet) {
  // Priority order: orb > task > flow
  if (typesSet.has("orb")) return "orb";
  if (typesSet.has("task")) return "task";
  return "flow";
}

function makeNodeElement(name, nodeObj) {
  const wrapper = document.createElement("div");
  wrapper.className = "node"; // Not expanded by default

  const label = document.createElement("div");
  label.className = "label";

  // Check if this node contains a collapsed conversation leaf
  const hasCollapsedLeaf =
    nodeObj.children.size === 0 && nodeObj.convoIds.length === 1;

  const toggle = document.createElement("span");
  toggle.className = "toggle";
  const shouldShowToggle = nodeObj._subtreeSize > 1 && !hasCollapsedLeaf;
  toggle.dataset.canToggle = shouldShowToggle ? "true" : "false";
  if (shouldShowToggle) {
    setToggleIcon(toggle, false);
  }
  label.appendChild(toggle);

  const titleSpan = document.createElement("span");
  titleSpan.className = "tree-title";
  titleSpan.textContent = name;
  titleSpan.title = name;
  label.appendChild(titleSpan);

  // Determine the type(s) for this node and apply highlighting
  let dominantType = "flow";

  // Add type badge only for collapsed leaf nodes (actual conversations)
  if (hasCollapsedLeaf && nodeObj.convoIds.length === 1) {
    // For collapsed leaf nodes, show the single conversation type
    const convoId = nodeObj.convoIds[0];
    const convoType = window._convoTypeById[convoId] || "flow";
    dominantType = convoType;

    if (convoType !== "flow") {
      const badge = document.createElement("span");
      badge.className = `type-badge type-${convoType}`;
      badge.textContent = convoType.toUpperCase();
      label.appendChild(badge);
    }
  } else if (nodeObj.children.size > 0 || nodeObj.convoIds.length > 1) {
    // For parent nodes, determine dominant type for highlighting but don't show badges
    const typesInSubtree = collectTypesInSubtree(nodeObj);
    dominantType = getDominantType(typesInSubtree);
  }

  // Apply highlight class to label based on dominant type
  if (dominantType !== "flow") {
    label.classList.add(`highlight-${dominantType}`);
  }

  wrapper.appendChild(label);

  const childrenContainer = document.createElement("div");
  childrenContainer.className = "children";
  wrapper.appendChild(childrenContainer);

  // store a reference
  wrapper._nodeObj = nodeObj;
  wrapper._childrenRendered = false;

  // Render children immediately but keep collapsed
  renderChildrenInto(nodeObj, childrenContainer, window._convoTitleById);
  wrapper._childrenRendered = true;

  // click handler: navigate if leaf, or toggle expand
  // TODO KA Convert to handler function
  label.addEventListener("click", (ev) => {
    ev.stopPropagation();

    // if this is a collapsed leaf (has single convoId, no children)
    if (hasCollapsedLeaf) {
      label.dispatchEvent(
        new CustomEvent("convoLeafClick", {
          detail: { convoId: nodeObj.convoIds[0] },
          bubbles: true,
        }),
      );
      return;
    }

    // if this node's subtree is a single conversation, dispatch event
    const total = nodeObj._subtreeSize || 0;
    if (total === 1 && nodeObj.convoIds.length === 1) {
      label.dispatchEvent(
        new CustomEvent("convoLeafClick", {
          detail: { convoId: nodeObj.convoIds[0] },
          bubbles: true,
        }),
      );
      return;
    }

    // For non-leaf nodes, toggle expand/collapse
    const isExpanded = wrapper.classList.toggle("expanded");
    setToggleIcon(toggle, isExpanded);
  });

  return wrapper;
}

// Helper to extract final segment from full title path
function getLastSegment(fullTitle) {
  // Check if the title ends with #<id> pattern
  const hashMatch = fullTitle.match(/(.*?)\s*#(\d+)$/);
  if (hashMatch) {
    // Return just the #id part
    return `#${hashMatch[2]}`;
  }

  // Otherwise use the old logic
  const parts = fullTitle
    .split("/")
    .map((p) => p.trim())
    .filter(Boolean);
  return parts[parts.length - 1] || fullTitle;
}

function renderChildrenInto(nodeObj, containerEl, titleMap) {
  containerEl.innerHTML = "";
  const frag = document.createDocumentFragment();

  // Render all conversation leaves
  if (nodeObj.convoIds && nodeObj.convoIds.length) {
    const convos = nodeObj.convoIds;
    for (let i = 0; i < convos.length; i++) {
      const cid = convos[i];
      const leaf = document.createElement("div");
      leaf.className = "leaf";
      const leafLabel = document.createElement("div");
      leafLabel.className = "label";
      leafLabel.setAttribute("data-convo-id", String(cid));
      leafLabel.dataset.singleConvo = cid;
      leafLabel.dataset.convoId = cid;
      leafLabel.style.cursor = "pointer";
      const fullTitle = titleMap[cid] || `(id ${cid})`;
      const finalSegment = getLastSegment(fullTitle);

      // Wrap title text in a span for ellipsis overflow
      const titleSpan = document.createElement("span");
      titleSpan.className = "tree-title";
      titleSpan.textContent = finalSegment;
      if (!titleSpan.textContent.endsWith(` #${cid}`)) {
        titleSpan.textContent += ` #${cid}`;
      }
      leafLabel.appendChild(titleSpan);

      // Add type badge and highlight for conversation leaves
      const convoType = window._convoTypeById[cid] || "flow";
      if (convoType !== "flow") {
        const badge = document.createElement("span");
        badge.className = `type-badge type-${convoType}`;
        badge.textContent = convoType.toUpperCase();
        leafLabel.appendChild(badge);

        // Add highlight class
        leafLabel.classList.add(`highlight-${convoType}`);
      }

      leaf.appendChild(leafLabel);
      frag.appendChild(leaf);
    }
  }

  // Render all child nodes
  const keys = Array.from(nodeObj.children.keys()).sort((a, b) =>
    a.localeCompare(b),
  );
  for (const k of keys) {
    const childNode = nodeObj.children.get(k);
    const nodeEl = makeNodeElement(k, childNode);
    frag.appendChild(nodeEl);
  }

  containerEl.appendChild(frag);
}

// #endregion

function renderTree(container, rootObj, opts = {}) {
  container.innerHTML = "";
  container.classList.add("tree");
  const { root, convoTitleById, convoTypeById } = rootObj;

  // Store the tree structure globally so other parts of the app can use it
  window._treeRoot = root;
  window._convoTitleById = convoTitleById;
  window._convoTypeById = convoTypeById;
  window._treeContainer = container;

  // top-level render: create node elements
  const topKeys = Array.from(root.children.keys()).sort((a, b) =>
    a.localeCompare(b),
  );
  const topFrag = document.createDocumentFragment();
  for (const k of topKeys) {
    const nodeElem = makeNodeElement(k, root.children.get(k));
    topFrag.appendChild(nodeElem);
  }
  container.appendChild(topFrag);

  return container;
}

// #endregion

// #region ui.js
// ui.js
// DOM helpers and UI wiring (history, chat log, entry render helpers)

function $(sel) {
  return document.getElementById(sel);
}

// Make external links open in new tabs
function processExternalLinks(element) {
  const links = element.querySelectorAll("a[href]");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    // Check if it's an external link (starts with http/https and not #)
    if (
      href &&
      (href.startsWith("http://") || href.startsWith("https://")) &&
      !href.startsWith("#")
    ) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
}

function createCardItem(
  titleText,
  convoId,
  entryId,
  contentText,
  allowHtml = false,
  convoType = null,
) {
  // Result card id in title
  let titleId = "";
  if (convoId && entryId) {
    titleId = `${entryId}.`;
  } else if (convoId) {
    titleId = `${convoId}.`;
  }
  titleText = parseSpeakerFromTitle(getStringOrDefault(titleText));
  titleText = `${titleId} ${titleText}`;
  contentText = getStringOrDefault(contentText);
  // Build a richer card/result item structure
  const el = document.createElement("div");
  el.className = "result-item card card-item";
  el.style.cursor = "pointer";

  // Header (title + meta)
  const header = document.createElement("div");
  header.className = "result-header card-header";

  const titleDiv = document.createElement("div");
  titleDiv.className = "result-title card-title";
  const titleSpan = document.createElement("span");
  if (allowHtml) titleSpan.innerHTML = titleText;
  else titleSpan.textContent = titleText;
  titleDiv.appendChild(titleSpan);

  const metaDiv = document.createElement("div");
  metaDiv.className = "result-meta card-meta";
  const idSpan = document.createElement("span");
  idSpan.classList.add("muted-text", "small-text");
  idSpan.textContent = `${convoId}`;
  // Muted text in top right corner of card. Includes both convo and entry id
  if (entryId) {
    idSpan.textContent += `:${entryId}`;
  }
  metaDiv.appendChild(idSpan);

  // Type badge (if non-flow)
  if (convoType && convoType !== "flow") {
    const badge = document.createElement("span");
    badge.className = `type-badge type-${convoType}`;
    badge.textContent = convoType.toUpperCase();
    metaDiv.appendChild(badge);
  }

  header.appendChild(titleDiv);
  header.appendChild(metaDiv);

  const body = document.createElement("div");
  body.className = "result-snippet card-body";
  if (allowHtml) {
    body.innerHTML = contentText;
    processExternalLinks(body);
  } else {
    body.textContent = contentText;
  }

  el.appendChild(header);
  el.appendChild(body);

  el.dataset.convoId = convoId;
  el.dataset.id = entryId;
  el.dataset.dialogueText = contentText;
  el.dataset.title = titleText;
  return el;
}

/* #region Visibility helpers */
function toggleElementVisibility(el, showElement) {
  if (el instanceof NodeList) {
    el.forEach((element) => {
      toggleElementVisibility(element, showElement);
    });
    return;
  }

  if (showElement) {
    el.classList.remove("hidden");
  } else {
    el.classList.add("hidden");
  }
  if (el.classList.contains("sidebar")) {
    if (showElement) {
      el.classList.add("open");
    } else {
      el.classList.remove("open");
    }
  }
}

function toggleElementVisibilityBySelector(selector, showElement) {
  const el = document.querySelector(selector);
  toggleElementVisibility(el, showElement);
}

/* #endregion */

/* Chat log/history helpers */
function resetChatLog(chatLogEl) {
  if (!chatLogEl) return;
  chatLogEl.innerHTML = "";
  const hint = document.createElement("div");
  hint.className = "hint-text";
  hint.textContent = "(navigation log - select a conversation to begin)";
  chatLogEl.appendChild(hint);
}

function appendHistoryItem(chatLogEl, title, text, historyIndex, onClick) {
  const item = document.createElement("div");
  item.className = "card-item history-item";

  // If no onClick handler, this is the current (non-clickable) entry
  if (!onClick) {
    item.classList.add("current-entry");
    item.style.cursor = "default";
  } else {
    item.style.cursor = "pointer";
  }

  item.dataset.historyIndex = historyIndex;

  const titleDiv = document.createElement("div");
  titleDiv.className = "card-title";
  titleDiv.innerHTML = `<span>${title}</span>`;

  const textDiv = document.createElement("div");
  textDiv.className = "card-text";
  textDiv.textContent = getStringOrDefault(text);

  item.appendChild(titleDiv);
  item.appendChild(textDiv);

  if (onClick) item.addEventListener("click", onClick);
  chatLogEl.appendChild(item);
  chatLogEl.scrollTop = chatLogEl.scrollHeight;

  return item;
}

function renderCurrentEntry(
  entryOverviewEl,
  convoId,
  entryId,
  title,
  dialoguetext,
  convoType = "flow",
) {
  dialoguetext = getStringOrDefault(dialoguetext, "<i>No dialogue.</i>");
  title = getStringOrDefault(parseSpeakerFromTitle(title), "Untitled");
  const typeBadge =
    convoType !== "flow"
      ? `<span class="type-badge type-${convoType}">${convoType.toUpperCase()}</span>`
      : "";

  entryOverviewEl.innerHTML = "";
  entryOverviewEl.className = "entry-item current-item";

  entryOverviewEl.innerHTML = `
    <div class="card-meta">
      <div class="dialogue-id">Conversation #${convoId} > Entry #${entryId}</div>
      ${typeBadge}
    </div>
    <div class="card-header">
      <div class="card-title dialogue-title">${title}</div>
    </div>
    <div class="card-body dialogue-text">${dialoguetext}</div>`;
  processExternalLinks(entryOverviewEl);
}

function renderConversationOverview(entryOverviewEl, conversation) {
  entryOverviewEl.innerHTML = "";
  entryOverviewEl.className = "entry-item current-item";

  const title = getStringOrDefault(conversation.title, "(no title)");
  const description = getStringOrDefault(
    conversation.description,
    "<i>No conversation description.</i>",
  );
  const convoType = conversation.type || "flow";
  const typeBadge =
    convoType !== "flow"
      ? `<span class="type-badge type-${convoType}">${convoType.toUpperCase()}</span>`
      : "";

  entryOverviewEl.innerHTML = `
    <div class="card-meta">
      <div class="conversation-id">Conversation #${conversation.id}</div>
      ${typeBadge}
    </div>
    <div class="card-header">
      <div class="card-title conversation-title">${title}</div>
    </div>
    <div class="card-body">
      <div class="conversation-description">${description}</div>
    </div>`;
  processExternalLinks(entryOverviewEl);
}

function parseSpeakerFromTitle(title) {
  if (!title) return "";
  const splitTitle = title.split(":");
  if (
    splitTitle.length > 1 &&
    !title.startsWith("Jump to") &&
    !title.startsWith("NewspaperEndgame")
  )
    return splitTitle[0].trim();
  return title;
}

function renderConvoDetails(containerEl, data) {
  containerEl.innerHTML = "";
  const wrapper = document.createElement("div");
  wrapper.appendChild(createConvoTable(data));
  if (data.type == "task") {
    wrapper.appendChild(createTaskTable(data.taskDetails));
  }
  containerEl.appendChild(wrapper);
}

function renderEntryDetails(containerEl, data) {
  containerEl.innerHTML = "";
  const wrapper = document.createElement("div");

  wrapper.appendChild(createEntryTable(data));
  if (data?.checks?.length) wrapper.appendChild(createChecksList(data.checks));
  if (data?.parents?.length)
    wrapper.appendChild(createParentsList(data.parents, data));
  if (data?.children.length)
    wrapper.appendChild(createChildrenList(data.children, data));
  wrapper.appendChild(createConvoTable(data));

  // If viewing an alternate, show original line; otherwise show alternates list
  if (data.selectedAlternateCondition && data.originalDialogueText) {
    wrapper.appendChild(createOriginalLineSection(data));
  } else if (data?.alternates.length) {
    wrapper.appendChild(createAlternatesList(data.alternates, data));
  }

  wrapper.appendChild(createMetaTable(data));

  containerEl.appendChild(wrapper);
}

function createAlternatesList(alternates, data) {
  const section = createDetailsSectionHeader("Alternates");
  const list = document.createElement("div");
  list.className = "details-list";
  if (alternates && alternates.length) {
    alternates.forEach((a) => {
      const item = document.createElement("div");
      item.className = "details-item";

      // Create clickable link for the alternate
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = a.alternateline;
      // TODO KA Convert to handler function
      link.addEventListener("click", async (e) => {
        e.preventDefault();
        if (data.onNavigate) {
          // Don't add to history when switching to alternate view
          await data.onNavigate(
            a.conversationid,
            a.dialogueid,
            false,
            a.condition,
            a.alternateline,
          );
        }
      });

      item.appendChild(link);
      const conditionSpan = document.createElement("span");
      conditionSpan.textContent = ` (condition: ${a.condition})`;
      item.appendChild(conditionSpan);
      list.appendChild(item);
    });
    section.appendChild(list);
  } else {
    section.append(createPlaceholderItem());
  }

  return section;
}

function createOriginalLineSection(data) {
  const section = createDetailsSectionHeader("Original Line");
  const list = document.createElement("div");
  list.className = "details-list";

  const item = document.createElement("div");
  item.className = "details-item";

  // Create clickable link to view the original
  const link = document.createElement("a");
  link.href = "#";
  link.textContent = data.originalDialogueText;
  // TODO KA Convert to handler function
  link.addEventListener("click", async (e) => {
    e.preventDefault();
    if (data.onNavigate) {
      // Don't add to history when switching back to original view
      await data.onNavigate(data.convoId, data.entryId, false, null, null);
    }
  });

  item.appendChild(link);
  list.appendChild(item);
  section.appendChild(list);

  return section;
}

function createChecksList(checks) {
  const section = createDetailsSectionHeader("Checks");
  const list = document.createElement("div");
  list.className = "details-list";
  if (checks && checks.length) {
    checks.forEach((check) => {
      const item = document.createElement("div");
      item.className = "details-item";
      const checkText = document.createElement("span");
      checkText.textContent = getStringOrDefault(check);
      item.appendChild(checkText);
    });
    list.appendChild(item);
  } else {
    section.append(createPlaceholderItem());
  }
  return section;
}

function createParentsList(parents, data) {
  // Parents
  const section = createDetailsSectionHeader("Parents");
  const list = document.createElement("div");
  list.className = "details-list";
  if (parents && parents.length) {
    parents.forEach((p) => {
      const item = document.createElement("div");
      item.className = "details-item";
      const a = document.createElement("a");
      a.textContent = `${p.o_convo}:${p.o_id}`;
      a.href = "#";
      a.dataset.convo = p.o_convo;
      a.dataset.id = p.o_id;
      // TODO KA Convert to handler function
      a.addEventListener("click", async (e) => {
        e.preventDefault();
        if (data.onNavigate) await data.onNavigate(p.o_convo, p.o_id);
      });
      item.appendChild(a);
      const meta = document.createElement("span");
      meta.textContent = ` (priority: ${p.priority}, connector: ${p.isConnector})`;
      item.appendChild(meta);
      list.appendChild(item);
    });
    section.appendChild(list);
  } else {
    section.appendChild(createPlaceholderItem());
  }
  return section;
}

function createChildrenList(children, data) {
  const section = createDetailsSectionHeader("Children");
  const list = document.createElement("div");
  list.className = "details-list";
  if (children && children.length) {
    children.forEach((c) => {
      const item = document.createElement("div");
      item.className = "details-item";
      const a = document.createElement("a");
      a.textContent = `${c.d_convo}:${c.d_id}`;
      a.href = "#";
      a.dataset.convo = c.d_convo;
      a.dataset.id = c.d_id;
      // TODO KA Convert to handler function
      a.addEventListener("click", async (e) => {
        e.preventDefault();
        if (data.onNavigate) await data.onNavigate(c.d_convo, c.d_id);
      });
      item.appendChild(a);
      const meta = document.createElement("span");
      meta.textContent = ` (priority: ${c.priority}, connector: ${c.isConnector})`;
      item.appendChild(meta);
      list.appendChild(item);
    });
    section.appendChild(list);
  } else {
    section.appendChild(createPlaceholderItem());
  }
  return section;
}

function createEntryTable(data) {
  const tableDiv = createDetailsSectionHeader("Entry");
  const rows = [
    ["Entry Id", data.entryId],
    ["Entry Title", data.title],
    ["Entry Actor Id", data.actorId],
    ["Entry Actor Name", data.actorName],
    ["Entry Is Hidden", data.isHidden ? "Hidden" : "Visible"],
  ];

  tableDiv.appendChild(buildTable(rows));
  return tableDiv;
}

function createConvoTable(data) {
  const section = createDetailsSectionHeader("Conversation");
  const rows = [
    ["Conversation Id", data.convoId],
    ["Conversation Title", data.conversationTitle],
    ["Description", data.conversationDescription],
    ["Actor Id", data.conversationActorId],
    ["Actor name", data.conversationActorName],
    ["Conversant Id", data.conversationConversantId],
    ["Conversant name", data.conversationConversantName],
    ["Conversation Type", data.type],
    ["Conversation Is Hidden", data.isHidden ? "Hidden" : "Visible"],
    ["On Use", data.onUse],
    ["Override Dialogue Condition", data.overrideDialogueCondition],
    ["Alternate Orb Text", data.alternateOrbText],
    ["Check Type", data.checkType],
    ["Conversation Condition", data.condition],
    ["Instruction", data.instruction],
    ["Orb Placement", data.placement],
    ["Difficulty", data.difficulty],
    ["Total Entries", data.totalEntries],
  ];

  section.appendChild(buildTable(rows));
  return section;
}

function createTaskTable(data) {
  const section = createDetailsSectionHeader("Task Details");

  const rows = [
    ["Display Condition", data.displayConditionMain],
    ["Done Condition", data.doneConditionMain],
    ["Cancel Condition", data.cancelConditionMain],
    ["Reward", data.taskReward],
    ["Is Timed", data.taskTimed ? "Timed" : "Not Timed"],
    ["Total Subtasks", data.totalSubtasks],
  ];

  section.appendChild(buildTable(rows));
  return section;
}

function createMetaTable(data) {
  const section = createDetailsSectionHeader("Meta");

  // Combine entry condition and alternate condition if both exist
  let combinedCondition = data.conditionstring || "";
  if (data.selectedAlternateCondition) {
    if (combinedCondition) {
      combinedCondition = `${combinedCondition} AND ${data.selectedAlternateCondition}`;
    } else {
      combinedCondition = data.selectedAlternateCondition;
    }
  }

  const rows = [
    ["Sequence", data.sequence],
    ["Condition", combinedCondition],
    ["Userscript", data.userscript],
    ["Difficulty", data.difficultypass],
  ];

  section.appendChild(buildTable(rows));

  return section;
}

function createDetailsSectionHeader(sectionTitle) {
  const sectionHeader = document.createElement("div");
  sectionHeader.innerHTML = `<div class="details-section-header">${sectionTitle}</div>`;
  return sectionHeader;
}

function createPlaceholderItem() {
  const item = document.createElement("span");
  item.classList = "details-item details-item-placeholder";
  item.textContent = "(none)";
  return item;
}

function buildTable(rows, hideNone = true) {
  const t = document.createElement("table");
  t.className = "details-table";
  rows.forEach(([label, value]) => {
    if (hideNone && !value) {
      return;
    }
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td = document.createElement("td");
    th.textContent = getStringOrDefault(label, "(none)");
    td.textContent = getStringOrDefault(value, "(none)");
    tr.appendChild(th);
    tr.appendChild(td);
    t.appendChild(tr);
  });
  return t;
}

function getStringOrDefault(str, defaultValue = "") {
  if (str === null || str === undefined || str === 0) {
    return defaultValue;
  }
  if (String(str)?.trim() === "") {
    return defaultValue;
  }
  return str;
}

function escapeHtml(s) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}

function highlightTerms(text, query, hasQuotedPhrases = false) {
  if (!text || !query) return escapeHtml(text || "");

  const trimmedQuery = query.trim();

  // If query has quoted phrases, extract them and remaining words
  if (hasQuotedPhrases) {
    // Extract all quoted phrases
    const quotedPhrases = [];
    const quotedPhrasesRegex = /"([^"]+)"/g;
    let match;
    while ((match = quotedPhrasesRegex.exec(trimmedQuery)) !== null) {
      quotedPhrases.push(match[1]);
    }

    // Remove quoted phrases from query to get remaining words
    const remainingText = trimmedQuery.replace(/"[^"]+"/g, "").trim();
    const words = remainingText
      ? remainingText.split(/\s+/).filter((w) => w.length >= 3)
      : [];

    // Combine phrases and words for highlighting
    const allTerms = [...quotedPhrases, ...words];

    if (allTerms.length === 0) return escapeHtml(text);

    // Escape terms for regex - sort by length (longest first) to match longer phrases first
    const escaped = allTerms
      .sort((a, b) => b.length - a.length)
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

    // Create regex to match any term
    const re = new RegExp("(" + escaped.join("|") + ")", "gi");

    // Split text by matches
    const parts = text.split(re);

    // Escape HTML and wrap matches in <mark> tags
    return parts
      .map((part) => {
        // Check if this part matches any of the terms (case-insensitive)
        const isMatch = allTerms.some(
          (term) => part.toLowerCase() === term.toLowerCase(),
        );
        if (isMatch) {
          return (
            "<mark class='highlighted-term'>" + escapeHtml(part) + "</mark>"
          );
        }
        return escapeHtml(part);
      })
      .join("");
  }

  // For multi-word searches without quotes, split and highlight each word individually
  const terms = trimmedQuery.split(/\s+/);

  if (!terms.length) return escapeHtml(text);

  // Escape terms for regex
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  // Regex: match any term (case-insensitive)
  const re = new RegExp("(" + escaped.join("|") + ")", "gi");

  // Split text by matches to preserve both matched and unmatched parts
  const parts = text.split(re);

  // Escape HTML and wrap matches in <mark> tags
  return parts
    .map((part, i) => {
      // Check if this part matches any of the search terms (case-insensitive)
      const isMatch = terms.some(
        (term) => part.toLowerCase() === term.toLowerCase(),
      );
      if (isMatch) {
        return "<mark class='highlighted-term'>" + escapeHtml(part) + "</mark>";
      }
      return escapeHtml(part);
    })
    .join("");
}

// #endregion

// #region userSettings.js
// Settings state
// #region Exported Set Up Helpers
function injectUserSettingsTemplate() {
  // Create container if it does not exist
  let container = $(settingsModalOverlayId);
  if (!container) {
    container = document.createElement("div");
    container.className = "modal-overlay hidden";
    container.id = settingsModalOverlayId;
    document.body.appendChild(container);
  }
  container.innerHTML = template;
}
function initializeUserSettings() {
  loadSettingsFromStorage();
  applySettings();
  setUpCheckboxHandlers();
  setupSettingsModal();
  setUpSaveButton();
  setUpRestoreDefaultSettingsButton();
}

function applySettings() {
  // Apply animations toggle
  updateAnimationsToggle();
  updateHandlePositions();
  updateResizeHandles();
  // Apply column resizing toggle - handled in initializeResizableGrid
  // Apply show hidden toggle - handled when building tree
  // Apply reset desktop layout - this is a one-time action, not persistent
}
function setUpCheckboxHandlers() {
  const resetDesktopLayoutCheckbox = $(resetDesktopLayoutCheckboxId);

  if (resetDesktopLayoutCheckbox) {
    resetDesktopLayoutCheckbox.addEventListener(
      "change",
      handleResetDesktopLayoutChange,
    );
  }
  const disableColumnResizingCheckbox = $(disableColumnResizingCheckboxId);

  if (disableColumnResizingCheckbox) {
    disableColumnResizingCheckbox.addEventListener(
      "change",
      handleDisableColumnResizingChange,
    );
  }
  const alwaysShowMoreDetailsCheckbox = $(alwaysShowMoreDetailsCheckboxId);

  if (alwaysShowMoreDetailsCheckbox) {
    alwaysShowMoreDetailsCheckbox.addEventListener(
      "change",
      handleAlwaysShowMoreDetailsChange,
    );
  }
  const showHiddenCheckbox = $(showHiddenCheckboxId);

  if (showHiddenCheckbox) {
    showHiddenCheckbox.addEventListener("change", handleShowHiddenChange);
  }
  const turnOffAnimationsCheckbox = $(turnOffAnimationsCheckboxId);

  if (turnOffAnimationsCheckbox) {
    turnOffAnimationsCheckbox.addEventListener(
      "change",
      handleTurnOffAnimationsChange,
    );
  }
}

function setUpSaveButton() {
  // Handle save settings
  const saveSettingsBtn = $(saveSettingsBtnId);
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener("click", handleSaveSettingsButtonClick);
  }
}

function setupSettingsModal() {
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

  // Close modal when clicking overlay
  if (settingsModalOverlay) {
    // TODO KA Convert to handler function
    settingsModalOverlay.addEventListener("click", (e) => {
      if (e.target === settingsModalOverlay) {
        toggleElementVisibility(settingsModalOverlay, false);
      }
    });
  }
}

// #endregion

// #region Exported Getters
function disableColumnResizing() {
  return (
    appSettings?.disableColumnResizing ??
    DEFAULT_APP_SETTINGS.disableColumnResizing
  );
}

function alwaysShowMoreDetails() {
  return (
    appSettings?.alwaysShowMoreDetails ??
    DEFAULT_APP_SETTINGS.alwaysShowMoreDetails
  );
}

function showHidden() {
  return appSettings?.showHidden ?? DEFAULT_APP_SETTINGS.showHidden;
}
// #endregion

// #region Manage App Setting States
function updateCurrentUserSettings() {
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
function resetCurrentUserSettings() {
  // Update app setting values to default settings
  appSettings = DEFAULT_APP_SETTINGS;
  setCurrentUserSettings();
}
function loadSettingsFromStorage() {
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
function saveSettingsToStorage() {
  try {
    updateDesktopLayout();

    applySettings();
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(appSettings));
  } catch (e) {
    console.error("Failed to save settings to storage", e);
  }
}

// #endregion

// #region Update UI
function updateDesktopLayout() {
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

function updateAnimationsToggle() {
  if (appSettings?.turnOffAnimations) {
    document.body.classList.add("animations-disabled");
  } else {
    document.body.classList.remove("animations-disabled");
  }
}
// #endregion
// #region Handlers
function handleResetDesktopLayoutChange(e) {
  // Reset desktop layout should be unchecked once the layout is reset (upon save)
  let value = DEFAULT_APP_SETTINGS.resetDesktopLayout;
  if (e) {
    value = e.target?.checked ?? value;
  }
  appSettings.resetDesktopLayout = value;
}
function handleDisableColumnResizingChange(e) {
  let value = DEFAULT_APP_SETTINGS.disableColumnResizing;
  if (e) {
    value = e.target?.checked ?? value;
  }
  appSettings.disableColumnResizing = value;
}
function handleShowHiddenChange(e) {
  let value = DEFAULT_APP_SETTINGS.showHidden;
  if (e) {
    value = e.target?.checked ?? value;
  }
  appSettings.showHidden = value;
}
function handleTurnOffAnimationsChange(e) {
  let value = DEFAULT_APP_SETTINGS.turnOffAnimations;
  if (e) {
    value = e.target?.checked ?? value;
  }
  appSettings.turnOffAnimations = value;
}
function handleAlwaysShowMoreDetailsChange(e) {
  let value = DEFAULT_APP_SETTINGS.alwaysShowMoreDetails;
  if (e) {
    value = e.target?.checked ?? value;
  }
  appSettings.alwaysShowMoreDetails = value;
}
function setUpRestoreDefaultSettingsButton() {
  // Restore default settings and updates checkbox values.
  const restoreDefaultSettingsBtn = $(restoreDefaultSettingsBtnId);
  if (restoreDefaultSettingsBtn) {
    restoreDefaultSettingsBtn.addEventListener(
      "click",
      resetCurrentUserSettings,
    );
  }
}
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

function openSettings(e) {
  setCurrentUserSettings();
  const settingsModalOverlay = $(settingsModalOverlayId);
  if (settingsModalOverlay) {
    toggleElementVisibility(settingsModalOverlay, true);
  }
}
// #endregion
// #endregion
