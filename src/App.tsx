import React from 'react'
import Clouds from './Clouds'
import Title from './Title'
import Form from './Form'
import './App.css'

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <Clouds />
      <div className="Page1">
        <Title />
        <Form />
      </div>
    </div>
  )
}

export default App
