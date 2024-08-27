+++
title = "C/C++ Search Extension"
sort_by = "weight"
+++

# Search std docs

We built an offline search index for C/C++ std library based on [cppreference.com](https://en.cppreference.com/w/).
Input any keyword in the address bar, you'll get the result instantly. It's blaze-fast!

![GIF](/cpp-search-extension.gif)

# Offline mode

You can download the offline archive from [Cppreference archiven page](https://en.cppreference.com/w/Cppreference:Archives).
To enable the offline mode, you should check the checkbox and input the offline docs path on the popup page.
However, please check the [Caveats](/faq/#caveats) if you are a Firefox user.

![GIF](/offline-mode.gif)

# Command systems

The command system brings a handy set of useful and convenient commands to you. Each command starts with a **:** (colon), followed by the name, and function differently in individual. Those commands including but not limited to:

- `:help` - Show the help messages.
- `:header` - Show all C++ header libraries.
- `:posix` - Show all POSIX [system interfaces](https://pubs.opengroup.org/onlinepubs/9799919799/functions/contents.html).
- `:history` - Show your local search history

![GIF](/commands.png)

# Miscellaneous

## Multi-locale language search

You can configure you prefer locale language for cppreference docs search in the popup page.

## Page down/up easily

You can press `space` after the keyword, then increase or decrease the number of **-** (hyphen) to page down or page up.
