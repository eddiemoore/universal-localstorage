import Storage from "./rem-localstorage";

let localStorage: Storage;
if (typeof window === "undefined") {
  const LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./uls-scratch");
} else if (
  typeof window.localStorage === "undefined" ||
  typeof window.sessionStorage === "undefined"
) {
  // @ts-ignore
  localStorage = new Storage("local");
} else {
  localStorage = window.localStorage;
}
export default localStorage;
