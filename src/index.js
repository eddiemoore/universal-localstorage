let localStorage
if (typeof window === 'undefined') {
  const LocalStorage = require('node-localstorage').LocalStorage
  localStorage = new LocalStorage('./uls-scratch')
} else if (typeof window.localStorage === 'undefined' ||
  typeof window.sessionStorage === 'undefined') {
  localStorage = require('./rem-localstorage')
} else {
  localStorage = window.localStorage
}
export default localStorage
