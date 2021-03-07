import React, { useState, useEffect, createContext } from 'react'

import AppContext from './AppContext'
import ColorSchemeSwitcher from './ColorSchemeSwitcher'
import PhotoTree from './PhotoTree'


function App() {
  const webserviceUrl = 'http://localhost:8000/webservice.php'
  const [isDarkMode, setIsDarkMode] = useState(null)

  // set dark mode setting.
  function initializeColorSchemeSwitcher() {
    fetch(`${webserviceUrl}?action=getSetting&name=dark_mode`)
      .then(response => response.json())
      .then(setIsDarkMode)
      // .catch(app/component-specific handler as appropriate)
  }

  // get dark mode setting.
  function updateChangedColorScheme(darkModeVal) {
    const darkModeParamVal = darkModeVal === 'darkMode' ? 1 : 0

    fetch(`${webserviceUrl}?action=setSetting&name=dark_mode&value=${darkModeParamVal}`)
    setIsDarkMode(!!darkModeParamVal)
  }

  useEffect(initializeColorSchemeSwitcher, [])

  return (
    <AppContext.Provider
      value={{ webserviceUrl, isDarkMode }}
    >
      <div className="component-app">
        <ColorSchemeSwitcher updateChangedColorScheme={updateChangedColorScheme} />
        <br />
        <PhotoTree />
      </div>
    </AppContext.Provider>
  )
}


export default App
