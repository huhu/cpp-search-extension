local manifest = import 'core/manifest.libsonnet';
local utils = import 'core/utils.libsonnet';
local icons() = {
  [size]: 'icon.png'
  for size in ['16', '48', '128']
};

local json = manifest.new(
  name='Cpp Search Extension',
  version='0.1',
  keyword='cc',
  description='The ultimate search extension for C/C++',
)
             .addIcons(icons())
             .addBackgroundScripts(utils.js_files('command', ['help']))
             .addBackgroundScripts([
  'main.js',
]);

json
