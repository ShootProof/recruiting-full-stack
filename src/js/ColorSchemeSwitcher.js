import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import AppContext from './AppContext'


function ColorSchemeSwitcher({ updateChangedColorScheme }) {
  const { isDarkMode } = useContext(AppContext)

  // set theme on body if non-null.
  const body = document.getElementsByTagName('body')[0]
  body.classList.remove('theme-light-mode', 'theme-dark-mode')

  if (isDarkMode !== null) {
    if (isDarkMode) {
      body.classList.add('theme-dark-mode')
    }
    else {
      body.classList.add('theme-light-mode')
    }
  }

  // set visibility to hidden rather than display none. this prevents:
  // (1) flash of incorrect setting within select box before settings loaded from server
  // (2) page elements jumping around when setting is loaded after element set to display: none
  return (
    <div className="component-color-scheme-switcher">
      <label htmlFor="colorScheme">
        Color Scheme Switcher:
        <br />
        <select
          name="colorScheme"
          value={isDarkMode ? 'darkMode' : 'lightMode'}
          onChange={e => updateChangedColorScheme(e.target.value)}
          style={{ visibility: isDarkMode === null ? 'hidden' : 'visible' }}
        >
          <option value="">-- select --</option>
          <option value="lightMode">Light Mode</option>
          <option value="darkMode">Dark Mode</option>
        </select>
      </label>
    </div>
  )
}

ColorSchemeSwitcher.propTypes = {
  updateChangedColorScheme: PropTypes.func.isRequired,
}


export default ColorSchemeSwitcher
