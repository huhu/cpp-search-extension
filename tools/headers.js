// https://en.cppreference.com/w/cpp/header
let headers = [];
for (let node of document.querySelectorAll(".t-dsc-begin .t-dsc")) {
    if (node.querySelectorAll("td").length === 2) {
        let header = {};
        let td = node.querySelectorAll("td")[0];
        let a = td.querySelector("a");
        if (a && !a.title.includes("page does not exist")) {
            header.name = a.text;
            header.path = a.title;
            header.description = node.querySelectorAll("td")[1].textContent.trim();
            headers.push(header);
        }
    }
}
console.log(JSON.stringify(headers));