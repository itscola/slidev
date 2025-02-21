import { resolve } from 'path'
import { slash } from '@antfu/utils'
import WindiCSS, { defaultConfigureFiles } from 'vite-plugin-windicss'
import { ResolvedSlidevOptions, SlidevPluginOptions } from '..'

export function createWindiCSSPlugin(
  { themeRoots, clientRoot, userRoot }: ResolvedSlidevOptions,
  { windicss: windiOptions }: SlidevPluginOptions,
) {
  return WindiCSS(
    {
      configFiles: [
        ...defaultConfigureFiles,
        ...themeRoots.map(i => `${i}/windi.config.ts`),
        resolve(clientRoot, 'windi.config.ts'),
      ],
      onOptionsResolved(config) {
        config.scanOptions.include.push(`!${slash(resolve(userRoot, 'node_modules'))}`)
      },
      ...windiOptions,
    },
    {
      hookOptions: {
        ignoreNodeModules: false,
      },
    },
  )
}
