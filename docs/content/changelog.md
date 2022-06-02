+++
title = "Changelog"
description = "Changelog"
weight = 3
+++

# v0.3 - 2022-06-02

- Migrate from `localStorage` to `chrome.storage` API. This will need `storage` permission.
- Remove offline doc path validation. Fixes {{ issue(id=8) }}.

# v0.2 - 2021-01-31

- Support multi-locale language cppreference docs search
- New command:
  - `:posix` - Show all POSIX [system interfaces](https://pubs.opengroup.org/onlinepubs/9699919799/functions/contents.html)
- Improve user experience of offline doc path configuration, thanks to the PR ([#3](https://github.com/huhu/cpp-search-extension/pull/3)) from [@knewbie](https://github.com/knewbie).

# v0.1 - 2020-09-30

First release version! 🎉🥳🥳

- Search C/C++ standard library docs
- Offline mode supported
- Command systems:
    - `:help` command to show all help messages
    - `:header` command to show all C++ header libraries
    - `:history` command to show your local search history


