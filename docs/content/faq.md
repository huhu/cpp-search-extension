+++
title = "FAQ"
description = "Frequently asked questions"
weight = 2
+++

# Platform

### Any plans to support Safari?

Unfortunately, no. According to MDN's web extension [compatibility chart](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs#omnibox):
Safari doesn't support omnibox API, which is essential to this extension.

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
