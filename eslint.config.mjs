import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import boundaries from 'eslint-plugin-boundaries';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      boundaries,
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },

      'boundaries/elements': [
        {
          type: 'feature',
          pattern: 'features/*',
          capture: ['featureName'],
        },
        {
          type: 'shared',
          pattern: 'shared/*',
        },
        {
          type: 'components',
          pattern: 'components/*',
        },
        {
          type: 'app',
          pattern: 'app/*',
        },
      ],

      'boundaries/ignore': ['**/*.test.ts', '**/*.spec.ts'],
    },

    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',

          policies: [
            {
              from: { element: { type: ['feature', 'app'] } },
              allow: {
                to: { element: { type: ['shared', 'components'] } },
              },
            },

            {
              from: { element: { type: 'app' } },
              allow: {
                to: {
                  element: {
                    type: 'feature',
                    fileInternalPath: ['index.ts', 'components/**', 'api/**'],
                  },
                },
              },
            },

            {
              from: { element: { type: 'feature' } },
              allow: {
                to: {
                  element: {
                    type: 'feature',
                    fileInternalPath: [
                      'index.ts',
                      'api/**',
                      'hooks/**',
                      'components/**',
                      'types/**',
                      'store/**',
                      'schema/**',
                      'utils/**',
                    ],
                    captured: {
                      featureName: '!{{from.element.captured.featureName}}',
                    },
                  },
                },
              },
            },

            {
              from: { element: { type: 'feature' } },
              allow: {
                to: {
                  element: {
                    type: 'feature',
                    captured: {
                      featureName: '{{from.element.captured.featureName}}',
                    },
                  },
                },
              },
            },
          ],
        },
      ],
    },
  },

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
