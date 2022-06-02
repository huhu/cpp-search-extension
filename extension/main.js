const c = new Compat();
(async () => {
    await migrate();

    // All dynamic setting items. Those items will been updated
    // in chrome.storage.onchange listener callback.
    let language = await settings.language;
    let isOfflineMode = await settings.isOfflineMode;
    let offlineDocPath = await settings.offlineDocPath;
    const cppSearcher = new StdSearcher(searchIndex);
    const commandManager = new CommandManager(
        new HelpCommand(),
        new HeaderCommand(headersIndex),
        new PosixCommand(posixIndex),
        new HistoryCommand(),
    );

    const defaultSuggestion = `The ultimate search extension for C/C++!`;
    const omnibox = new Omnibox(defaultSuggestion, c.omniboxPageSize());

    omnibox.bootstrap({
        onSearch: (query) => {
            return cppSearcher.search(query);
        },
        onFormat: (index, doc) => {
            return {
                content: isOfflineMode && offlineDocPath ? `${offlineDocPath}${doc.path}.html` : `https://${language}.cppreference.com/w/${doc.path}`,
                description: `[${doc.path.startsWith("cpp") ? "C++" : "C"}] ${c.match(c.escape(doc.name))} - ${c.dim(c.escape(doc.description))}`,
            }
        },
        onAppend: (query) => {
            return [{
                content: `https://${language}.cppreference.com/mwiki/index.php?search=${query}`,
                description: `Search C/C++ docs ${c.match(c.escape(query))} on cppreference.com`,
            }];
        },
        afterNavigated: async (query, result) => {
            // Ignore the command history
            if (query && query.startsWith(":")) return;

            await HistoryCommand.record(query, result);
        }
    });

    omnibox.addPrefixQueryEvent(":", {
        onSearch: (query) => {
            return commandManager.execute(query);
        }
    });

    omnibox.addNoCacheQueries(":");

    chrome.storage.onChanged.addListener(changes => {
        if (changes['language']) {
            language = changes['language'].newValue;
        }
        if (changes['offline-mode']) {
            isOfflineMode = changes['offline-mode'].newValue;
        }
        if (changes['offline-path']) {
            offlineDocPath = changes['offline-path'].newValue;
        }
    });
})();

let fileNewIssue = "title=Have you found a bug? Did you feel something was missing?&body=Whatever it was, we'd love to hear from you.";
chrome.runtime.setUninstallURL(
    `https://github.com/huhu/cpp-search-extension/issues/new?${encodeURI(fileNewIssue)}`
);