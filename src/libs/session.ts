// Session Requirements
import Cookies from "js-cookie";
// Session Types
interface CookieConfig {
  sameSite: "Strict" | "None";
  secure: boolean;
}
// Session Constants
const COOKIES_CONFIGURATION: CookieConfig = {
  sameSite: "Strict",
  secure: process.env.NODE_ENV === "production",
};
// Set Reports Made Function
export function SetReportsMade(reportsDone: number) {
  Cookies.set("reportsMade", `${reportsDone}`, COOKIES_CONFIGURATION);
}
// Get Reports Made Function
export function GetReportsMade() {
  return Cookies.get("reportsMade");
}
// Set Reports Made Date Function
export function SetReportsMadeDate() {
  Cookies.set("reportsMadeDate", `${new Date()}`, COOKIES_CONFIGURATION);
}
// Check one Day has Passed to make more reports
export function CheckOneDayHasPassed() {
  const REPORTS_MADE_DATE = Cookies.get("reportsMadeDate");
  // If Reports Made Date is not defined, it is the first time getting reports made date
  if (REPORTS_MADE_DATE === undefined) {
    return true;
  }
  // Get Reports Made Date as Date
  const DATE = new Date(REPORTS_MADE_DATE);
  // Get Current Date
  const NOW = new Date();
  // Get the difference between current date time and Reports Made Date
  const DIFF = NOW.getTime() - DATE.getTime();
  // Check if one day has passed
  return DIFF >= 24 * 60 * 60 * 1000;
}
// Set Theme Function
export function SetTheme(theme: string) {
  Cookies.set("theme", theme, COOKIES_CONFIGURATION);
}
// Get Theme Function
export function GetTheme() {
  return Cookies.get("theme");
}