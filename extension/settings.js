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

        storage.setItem('offline-path', path);
    },
};