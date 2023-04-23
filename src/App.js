import { ThemeProvider as ThemeProviderMui } from '@mui/material/styles'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { ThemeProvider } from './context/ThemeProvider'
import './css/Theme.scss'
import { store } from './redux/store'
import Routes from './routes'
import { theme } from './theme/theme'



export default function App() {
  return (
    <HelmetProvider>
      <ThemeProviderMui theme={theme}>
        <ThemeProvider>
          <Provider store={store}>
            <Routes />
          </Provider>
        </ThemeProvider>
      </ThemeProviderMui>
    </HelmetProvider >
  )
}
