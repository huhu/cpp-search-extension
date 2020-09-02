const c = new Compat();
const cppSearcher = new StdSearcher(searchIndex);
const commandManager = new CommandManager(
    new HelpCommand(),
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
            content: settings.isOfflineMode ? `${settings.offlineDocPath}${doc.path}.html` : `https://en.cppreference.com/w/${doc.path}`,
            description: `[${doc.path.startsWith("cpp") ? "C++" : "C"}] ${c.match(doc.name)} - ${c.dim(c.escape(doc.description))}`,
        }
    },
    onAppend: (query) => {
        return [{
            content: `https://en.cppreference.com/mwiki/index.php?search=${query}`,
            description: `Search C/C++ docs ${c.match(query)} on cppreference.com`,
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