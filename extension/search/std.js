function StdSearcher(rawIndex) {
    this.index = rawIndex;
    this.docs = Object.keys(this.index);
}

StdSearcher.prototype.search = function (keyword) {
    keyword = keyword.toLowerCase();
    let result = [];
    for (let doc of this.docs) {
        if (doc.length < keyword.length) continue;

        let index = doc.toLowerCase().indexOf(keyword);
        if (index !== -1) {
            result.push({
                name: doc,
                matchIndex: index,
            })
        }
    }

    // Sort the result, the lower matchIndex, the shorter length, the higher rank.
    return result.sort((a, b) => {
        if (a.matchIndex === b.matchIndex) {
            return a.name.length - b.name.length;
        }
        return a.matchIndex - b.matchIndex;
    }).map(item => {
        let [path, description] = this.index[item.name];
        return {
            name: item.name,
            path,
            description,
        }
    });
};