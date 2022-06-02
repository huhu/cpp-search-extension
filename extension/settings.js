// Don't use /g mode, otherwise regex.test() would return an alternating result.
// See https://stackoverflow.com/a/2630538/2220110
const REGEX_DOC_PATH_FILE = /^file:\/\/\/.*/i;
const REGEX_DOC_PATH_HTTP = /(^https?:\/\/.*)(:\d{2,6})?(.*)/i;

const settings = {
    get language() {
        return (async () => {
            return await storage.getItem('language') || 'en';
        })();
    },
    set language(value) {
        storage.setItem('language', value);
    },
    get isOfflineMode() {
        return (async () => {
            return await storage.getItem('offline-mode') || false;
        })();
    },
    set isOfflineMode(mode) {
        storage.setItem('offline-mode', mode);
    },
    get offlineDocPath() {
        return (async () => {
            return await storage.getItem('offline-path');
        })();
    },
    set offlineDocPath(path) {
        if (path.startsWith('/')) {
            path = `file://${path}`;
        }

        if ([REGEX_DOC_PATH_FILE, REGEX_DOC_PATH_HTTP].some(regex => regex.test(path))) {
            storage.setItem('offline-path', path);
        }
    },
    // Use regex patterns to check user local doc path validity.
    checkDocPathValidity(path) {
        if (path.startsWith('/')) {
            path = `file://${path}`;
        }
        return REGEX_DOC_PATH_FILE.test(path) || REGEX_DOC_PATH_HTTP.test(path);
    }
};