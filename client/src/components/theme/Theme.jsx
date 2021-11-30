import { createTheme } from '@material-ui/core/styles'

const baseTheme = createTheme({
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
})

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    type: 'light'
  },  
})

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    type: 'dark'
  },
})

export { lightTheme, darkTheme }
