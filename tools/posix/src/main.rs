use std::collections::HashMap;
use std::error::Error;
use std::path::Path;
use std::{env, fs};

use select::document::Document;
use select::node::Data;
use select::predicate::{And, Attr, Name, Not};

type Result<T> = std::result::Result<T, Box<dyn Error>>;

fn main() -> Result<()> {
    // A path such as:  ~/Downloads/susv4-2018/idx
    // Download from: https://pubs.opengroup.org/onlinepubs/9699919799/download/index.html
    let dir = env::args().nth(1).unwrap();
    let mut map = HashMap::new();
    for entry in fs::read_dir(dir)? {
        let entry = entry?;
        if entry
            .file_name()
            .to_str()
            // Filter i[a-z].html files
            .filter(|p| p.starts_with('i'))
            .is_some()
        {
            let html = fs::read_to_string(entry.path())?;
            let document = Document::from(html.as_str());
            for node in document.find(And(Name("li"), Attr("type", "disc"))) {
                // <li type="disc">
                //   <a href="../functions/fabsf.html">fabsf()</a>
                //   , fabs, fabsl - absolute value function
                // </li>
                if let Some(anchor) = node
                    .first_child()
                    .filter(|n| {
                        n.attr("href")
                            .filter(|attr| attr.starts_with("../functions/"))
                            .is_some()
                    })
                    .map(|n| n.text())
                {
                    // turn:
                    // "mlock(), munlock - lock or unlock a range of process address space (REALTIME)"
                    // to:
                    // "lock or unlock a range of process address space (REALTIME)",
                    if let Some(text) = node
                        .find(Not(Name("a")))
                        // Only filter Data::Text types
                        .filter(|n| matches!(n.data(), Data::Text(_)))
                        .map(|n| n.text())
                        .collect::<String>()
                        .split('-')
                        .last()
                    {
                        map.insert(anchor.trim().replace("()", ""), text.trim().to_string());
                    }
                }
            }
        }
    }

    let contents = serde_json::to_string(&map)?;
    let path = Path::new("posix.js");
    fs::write(path, format!("var posixIndex={};", contents))?;
    Ok(())
}
