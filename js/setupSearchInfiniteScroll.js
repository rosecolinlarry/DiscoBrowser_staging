import { entryListEl } from "./sharedElements.js";
import { handleInfiniteScroll } from "./handleInfiniteScroll.js";
import { $ } from "./uiHelpers.js";

export function setupSearchInfiniteScroll() {
  mobileSearchScreen.addEventListener("scroll", handleInfiniteScroll);
  entryListEl.addEventListener("scroll", handleInfiniteScroll);
}export const mobileSearchScreen = $("mobileSearchScreen");

