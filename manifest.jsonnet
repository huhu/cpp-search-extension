local manifest = import 'core/manifest.libsonnet';
local utils = import 'core/utils.libsonnet';
local icons() = {
  [size]: 'logo.png'
  for size in ['16', '48', '128']
};

local json = manifest.new(
  name='C/C++ Search Extension',
  version='0.3.1',
  keyword='cc',
  description='The ultimate search extension for C/C++',
)
             .addIcons(icons())
             .addPermissions(['storage'])
             .addBackgroundScripts(utils.js_files('command', ['help', 'header', 'posix']))
             .addBackgroundScripts(utils.js_files('index', ['std', 'headers', 'posix']))
             .addBackgroundScripts(utils.js_files('search', ['std']))
             .addBackgroundScripts(['settings.js', 'migration.js', 'main.js']);

json
