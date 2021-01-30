const c = new Compat();
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
            content: settings.isOfflineMode && settings.offlineDocPath ? `${settings.offlineDocPath}${doc.path}.html` : `https://${settings.language}.cppreference.com/w/${doc.path}`,
            description: `[${doc.path.startsWith("cpp") ? "C++" : "C"}] ${c.match(c.escape(doc.name))} - ${c.dim(c.escape(doc.description))}`,
        }
    },
    onAppend: (query) => {
        return [{
            content: `https://${settings.language}.cppreference.com/mwiki/index.php?search=${query}`,
            description: `Search C/C++ docs ${c.match(c.escape(query))} on cppreference.com`,
        }];
    },
    afterNavigated: (query, result) => {
        HistoryCommand.record(query, result);
    }
});

omnibox.addPrefixQueryEvent(":", {
    onSearch: (query) => {
        return commandManager.execute(query);
    }
});

omnibox.addNoCacheQueries(":");

let fileNewIssue = "title=Have you found a bug? Did you feel something was missing?&body=Whatever it was, we'd love to hear from you.";
chrome.runtime.setUninstallURL(
    `https://github.com/huhu/cpp-search-extension/issues/new?${encodeURI(fileNewIssue)}`
);