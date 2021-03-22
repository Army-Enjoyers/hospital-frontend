import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
})

export const defaultTheme = extendTheme({
  breakpoints: breakpoints,
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.2rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.15rem',
    '5xl': '2.5rem',
    '6xl': '4rem',
  },
  colors: {
    blue: {
      200: '#5B6EA3',
    },
    gray: {
      50: '#F6F6F6',
    },
    green: {
      50: '#2CA52A',
    },
    red: {
      50: '#FF6B6B',
    },
  },
  fonts: {
    body: 'Montserrat, sans-serif',
    heading: 'Montserrat, sans-serif',
    mono: 'Montserrat, sans-serif',
  },
  lineHeights: {
    normal: '140%',
  },
})
