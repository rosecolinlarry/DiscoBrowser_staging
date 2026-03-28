// scripts.js - All Scripts in one
import { $, toggleElementVisibility } from "./uiHelpers.js";

// Browser Grid
export const browserGrid = $("browser");
export const defaultColumns = "352px 1fr 280px";
export const defaultMobileColumns = "1fr";
export const STORAGE_KEY = "discobrowser_grid_columns";
export function toggleHomepageLoader(isLoading) {
  // Homepage Loader
  const homepageLoader = $("homepageLoader");
  const homepageOverlay = $("homepageOverlay");
  toggleElementVisibility(homepageLoader, isLoading);
  toggleElementVisibility(homepageOverlay, isLoading);
}