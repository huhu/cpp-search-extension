// Don't use /g mode, otherwise regex.test() would return an alternating result.
// See https://stackoverflow.com/a/2630538/2220110
const REGEX_DOC_PATH_FILE = /(^file:\/\/.*\/reference\/en\/)(.*)/i;
const REGEX_DOC_PATH_HTTP = /(^https?:\/\/.*:\d{2,6}\/en\/)(.*)/i;

const settings = {
    get language() {
        return localStorage.getItem('language');
    },
    set language(value) {
        localStorage.setItem('language', value);
    },
    get isOfflineMode() {
        return JSON.parse(localStorage.getItem('offline-mode')) || false;
    },
    set isOfflineMode(mode) {
        localStorage.setItem('offline-mode', mode);
    },
    get offlineDocPath() {
        return localStorage.getItem('offline-path');
    },
    set offlineDocPath(path) {
        for (let regex of [REGEX_DOC_PATH_FILE, REGEX_DOC_PATH_HTTP]) {
            if (regex.test(path)) {
                // Use regex match rule to eliminate the tail path
                path = path.replace(regex, "$1");
                localStorage.setItem('offline-path', path);
                return;
            }
        }
    },
    // Use regex patterns to check user local doc path validity.
    checkDocPathValidity(path) {
        return REGEX_DOC_PATH_FILE.test(path) || REGEX_DOC_PATH_HTTP.test(path);
    }
};