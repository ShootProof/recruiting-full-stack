import React from 'react'

import data from '../data/testdata.json'

// NOTE: ESLint will enforce Táve coding standards:
// https://github.com/tave/javascript/  Goodbye semicolons!

function App() {
  return (
    <div>
      <h1>Hello World!</h1>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

export default App
