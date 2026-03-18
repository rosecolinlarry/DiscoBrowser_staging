import { handleInfiniteScroll } from "./handleInfiniteScroll.js";
import { mobileSearchScreen, entryListEl } from "./openMobileNavSidebar.js";

export function setupSearchInfiniteScroll() {
  mobileSearchScreen.addEventListener("scroll", handleInfiniteScroll);
  entryListEl.addEventListener("scroll", handleInfiniteScroll);
}
