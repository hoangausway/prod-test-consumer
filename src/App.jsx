import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
// import Header from 'header/Header'
import SomeComponent from 'somemodulename/SomeComponent'

const App = () => (
  <div>
    {/* <Header /> */}
    <SomeComponent />
    <div>I'm the consumer app</div>
  </div>
)

ReactDOM.render(<App />, document.getElementById('app'))
