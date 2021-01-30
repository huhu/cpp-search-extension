class PosixCommand extends Command {
    constructor(index) {
        super("posix", "Show all POSIX system interfaces.");
        this.items = Object.entries(index).map(([name, description]) => {
            return {name, description};
        });
    }

    onExecute(arg) {
        let results = this.items.sort((a, b) => a.name.localeCompare(b.name));
        if (arg) {
            results = [];
            for (let item of this.items) {
                let index = item.name.toLowerCase().indexOf(arg);
                if (index > -1) {
                    item["matchIndex"] = index;
                    results.push(item);
                }
            }

            results = results.sort((a, b) => {
                if (a.matchIndex === b.matchIndex) {
                    return a.name.length - b.name.length;
                }
                return a.matchIndex - b.matchIndex;
            });
        }
        return results.map(item => {
            return {
                content: `https://pubs.opengroup.org/onlinepubs/9699919799/functions/${item.name}.html`,
                description: `${c.match(c.escape(item.name))} - ${c.dim(c.escape(item.description))}`
            };
        });
    }
}