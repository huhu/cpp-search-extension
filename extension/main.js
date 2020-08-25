const c = new Compat();
const commandManager = new CommandManager(
    new HelpCommand(),
    new HistoryCommand(),
);

const defaultSuggestion = `The ultimate search extension for C/C++!`;
const omnibox = new Omnibox(defaultSuggestion, c.omniboxPageSize());

omnibox.bootstrap({
    onSearch: (query) => {
    },
    onFormat: (index, doc) => {
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