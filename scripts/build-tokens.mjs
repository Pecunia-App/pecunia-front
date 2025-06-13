import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';

const configs = [
  {
    name: 'scss_dark',
    source: ['tokens/import/colors.dark.json'],
    destination: '_variables-dark.scss'
  },
  {
    name: 'scss_light',
    source: ['tokens/import/colors.light.json'],
    destination: '_variables-light.scss'
  },
  {
    name: 'scss_desktop',
    source: ['tokens/import/size.desktop.json'],
    destination: '_variables-desktop.scss'
  },
  {
    name: 'scss_mobile',
    source: ['tokens/import/size.mobile.json'],
    destination: '_variables-mobile.scss'
  }
];

for (const { name, source, destination } of configs) {
  const sd = new StyleDictionary({
    include: ['tokens/import/primitives.json'],
    source,
    platforms: {
      [name]: {
        transformGroup: transformGroups.scss,
        buildPath: 'src/styles/tokens/',
        files: [
          {
            destination,
            format: formats.scssVariables,
            filter: token =>
              !['color', 'spacing', 'border radius', 'typo'].includes(token.path[0])
          }
        ]
      }
    }
  });

  console.log(`\n🔧 Building tokens for: ${name}`);
  await sd.buildAllPlatforms();
}