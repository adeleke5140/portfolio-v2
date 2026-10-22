import type { ThemeRegistration } from 'shiki'

/** Shiki theme for MDX code fences. Background comes from `pre` in globals.css (keepBackground: false). */
export const codeTheme: ThemeRegistration = {
  name: 'kenny-light',
  type: 'light',
  colors: {
    'editor.foreground': '#000000',
    'editor.background': '#fcfcfc',
  },
  tokenColors: [
    {
      scope: ['keyword', 'keyword.operator', 'storage'],
      settings: { foreground: '#0066cc' },
    },
    {
      scope: [
        'entity.name.type',
        'entity.name.class',
        'support.type',
        'support.class',
        'support.type.property-name',
        'entity.other.attribute-name',
      ],
      settings: { foreground: '#5b68a6' },
    },
    { scope: ['constant.numeric'], settings: { foreground: '#b37700' } },
    {
      scope: ['constant.language', 'constant.character', 'variable.other.constant'],
      settings: { foreground: '#cc7700' },
    },
    {
      scope: [
        'meta.preprocessor',
        'keyword.control.directive',
        'entity.name.function.preprocessor',
      ],
      settings: { foreground: '#4d8080' },
    },
    { scope: ['string'], settings: { foreground: '#508046' } },
    {
      scope: ['support.function', 'storage.modifier.lifetime'],
      settings: { foreground: '#608000' },
    },
    { scope: ['variable.other.register'], settings: { foreground: '#267180' } },
    { scope: ['comment'], settings: { foreground: '#9da69d' } },
  ],
}
