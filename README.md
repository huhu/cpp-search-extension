# C/C++ Search Extension

<img align="right" width="280" src="extension/icon.png">

### The ultimate search extension for C/C++.

![Chrome Web Store](https://img.shields.io/chrome-web-store/v/ifpcmhciihicaljnhgobnhoehoabidhd.svg)
![Mozilla Add-on](https://img.shields.io/amo/v/c-c-search-extension?color=%2320123A)
![Microsoft Edge](https://img.shields.io/badge/microsoft--edge-0.1.0-1D4F8C)
[![license-apache](https://img.shields.io/badge/license-Apache-blue.svg)](https://github.com/huhu/cpp-search-extension/blob/master/LICENSE)
[![Discord](https://img.shields.io/discord/711895914494558250?label=chat&logo=discord)](https://discord.gg/xucZNVd)

[https://cpp.extension.sh/](https://cpp.extension.sh/)

## Installation

- [Chrome Web Store](https://chrome.google.com/webstore/detail/cc++-search-extension/ifpcmhciihicaljnhgobnhoehoabidhd)

- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/c-c-search-extension/)

- [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/ffajabficigcddnckikojejmkammkmpe)


## Features

- Search standard library docs
- Offline mode supported
- Builtin commands (`:header` and `:history` etc)

## How to use it
   
Input keyword **cc** in the address bar, press `Space` to activate the search bar. Then enter any word 
you want to search, the extension will response the related search results instantly.

## Contribution

```bash
# Installing jsonnet first if you havn't installed it yet, we employ jsonnet to generate manifest.json
sudo apt update
sudo apt install snapd
sudo snap install jsonnet

$ git clone --recursive https://github.com/huhu/cpp-search-extension
Cloning into 'cpp-search-extension'...
$ cd cpp-search-extension

$ make chrome # For Chrome version

$ make firefox # For Firefox version

$ make edge # For Edge version
```

## Get involved

- You can contact us on Discord Channel: https://discord.gg/xucZNVd
- Or by adding the Wechat ID: `huhu_io`, we'll invite you to our Wechat group.
