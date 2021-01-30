+++
title = "FAQ"
description = "Frequently asked questions"
weight = 2
+++

# Platform

### Any plans to support Safari?

Unfortunately, no. According to MDN's web extension [compatibility chart](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs#omnibox):
Safari doesn't support omnibox API, which is essential to this extension.

# Permissions

### Why does the extension require reading browser history permission?

The sole permission required by the extension is [tabs](https://developer.chrome.com/extensions/tabs), which gives accessing browser tabs information capability.
We use this permission to open the search result in the `current tab` or `new tab` for the sole purpose. Feel free to check our [Privacy Policy](/privacy/) for more information.

# Caveats

### Why local `file:` doc not work properly on Firefox?

For security reasons, in Firefox, `file:` URLs is an unprivileged URL, accessing to those unprivileged URLs are prohibited. 
See the [MDN documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/create) for more detail.

### Any workaround to support offline mode on Firefox?

Sure. A good choice is use http server! For example using python **http.server** module:

```sh
$ cd ~/Downloads/html-book-20200913/reference
$ python -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

Then set `http://0.0.0.0:8000/en` as your local doc path.
