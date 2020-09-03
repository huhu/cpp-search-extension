class HeaderCommand extends Command {
    constructor(index) {
        super("header", "Show all C++ Standard Library headers.");
        this.headers = index;
    }

    onExecute(arg) {
        let results = this.headers;
        if (arg) {
            results = [];
            for (let header of this.headers) {
                let index = header.name.toLowerCase().indexOf(arg);
                if (index > -1) {
                    header["matchIndex"] = index;
                    results.push(header);
                }
            }

            results = results.sort((a, b) => {
                if (a.matchIndex === b.matchIndex) {
                    return a.name.length - b.name.length;
                }
                return a.matchIndex - b.matchIndex;
            });
        }
        return results.map(header => {
            return {
                content: settings.isOfflineMode ? `${settings.offlineDocPath}${header.path}.html` : `https://en.cppreference.com/w/${header.path}`,
                description: `${c.match(c.escape(header.name))} - ${c.dim(c.escape(header.description))}`
            }
        });
    }
}