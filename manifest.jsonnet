local manifest = import 'core/manifest.libsonnet';
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
             .addBackgroundScripts([
  'main.js',
]);

json
