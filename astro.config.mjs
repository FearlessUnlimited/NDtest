import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

export default defineConfig({
  site: 'https://nexilisdogmata.com',
  // same URLs as the WordPress site (/%postname%/, /category/padre/hija/)
  trailingSlash: 'always',
  markdown: {
    processor: satteri({
      features: {
        // the migrated text already carries WordPress typography (« », “ ”, —)
        smartPunctuation: false,
        gfm: {
          footnotes: {
            label: 'Referencias',
            backContent: '↩',
            backLabel: 'Volver a la referencia {reference}',
          },
        },
      },
    }),
  },
});
