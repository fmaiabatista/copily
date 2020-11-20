import React from 'react'
import Clouds from './Clouds'
import TitleApp from './TitleApp'
import Form from './Form'
import TitleRoom from './TitleRoom'
import UserContent from './UserContent'
import './App.css'

const App: React.FC = () => {
  const roomName = 'xEam43'
  const isSaved = false

  return (
    <div className="App">
      <Clouds />
      <div className="Page Page1">
        <div className="content-wrapper">
          <TitleApp />
          <Form />
        </div>
      </div>
      <div className="Page Page2">
        <div className="content-wrapper">
          <TitleRoom roomName={roomName} isSaved={isSaved} />
          <UserContent />
        </div>
      </div>
    </div>
  )
}

export default App
