local utils = import 'core/utils.libsonnet';
local icons() = {
  [size]: 'logo.png'
  for size in ['16', '48', '128']
};

local name = 'C/C++ Search Extension';
local version = '0.3.1';
local keyword = 'cc';
local description = 'The ultimate search extension for C/C++';

local browser = std.extVar('browser');
local json = if std.member(['chrome', 'edge'], browser) then
  local manifest_v3 = import 'core/manifest_v3.libsonnet';
  manifest_v3.new(name, keyword, description, version, service_worker='service-worker.js')
else
  local manifest_v2 = import 'core/manifest.libsonnet';
  manifest_v2.new(name, keyword, description, version)
  .addBackgroundScripts(utils.js_files('command', ['help', 'header', 'posix']))
  .addBackgroundScripts(utils.js_files('index', ['std', 'headers', 'posix']))
  .addBackgroundScripts(utils.js_files('search', ['std']))
  .addBackgroundScripts(['settings.js', 'main.js']);

json
.addIcons(icons())
.addPermissions(['storage', 'unlimitedStorage'])
