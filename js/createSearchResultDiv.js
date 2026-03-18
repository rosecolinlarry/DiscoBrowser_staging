import { highlightTerms, createCardItem } from "./uiHelpers.js";
import { getConversationById } from "./sqlHelpers.js";

// Create a result `div` element for a search result (shared by desktop and mobile)
export function createSearchResultDiv(r, query) {
  const hasQuotedPhrases = /"[^"]+"/g.test(query);
  const highlightedTitle = highlightTerms(
    r.title || "",
    query,
    hasQuotedPhrases
  );
  const highlightedText = highlightTerms(
    r.dialoguetext || "",
    query,
    hasQuotedPhrases
  );
  const convo = getConversationById(r.conversationid);
  const convoType = convo ? convo.type || "flow" : "flow";
  const div = createCardItem(
    highlightedTitle,
    r.conversationid,
    r.id,
    highlightedText,
    true,
    convoType
  );
  div.dataset.actor = r.actor;
  div.dataset.dialogueText = r.dialoguetext;
  div.dataset.isHidden = r.isHidden;
  div.dataset.title = r.title;
  div.dataset.isAlternate = r.isAlternate === true;
  div.dataset.alternateCondition = r.alternatecondition;
  return div;
}
