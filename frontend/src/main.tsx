import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './context/AppContext.tsx'
import { SearchContextProvider } from './context/SearchContext.tsx'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry : 0
    },
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
        <App />
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
