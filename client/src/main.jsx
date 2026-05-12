import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SiteLoader from './components/SiteLoader'
import './index.css'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*JSON translation async */}
    <Suspense fallback={<SiteLoader fullScreen label="Načítám / Loading..." />}>
      <App />
    </Suspense>
  </React.StrictMode>,
)