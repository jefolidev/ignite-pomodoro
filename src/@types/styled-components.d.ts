/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'styled-components'

import { defaultTheme } from '../styles/themes/default'

type ThemeProps = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeProps {}
}
