import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline  } from '@mui/material'
import { Provider } from 'react-redux'
import { RootNavigation } from './components/navigation'
import { store } from './services/redux/store'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  // TODO: Implement proper auth state management

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </ThemeProvider>
  )
}

export default App
