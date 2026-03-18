import { entryListEl } from "./entryListEl.js";
import { handleInfiniteScroll } from "./handleInfiniteScroll.js";
import { mobileSearchScreen } from "./openMobileNavSidebar.js";

export function setupSearchInfiniteScroll() {
  mobileSearchScreen.addEventListener("scroll", handleInfiniteScroll);
  entryListEl.addEventListener("scroll", handleInfiniteScroll);
}
