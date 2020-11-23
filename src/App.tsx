import React, { useState } from 'react'
import Clouds from './Clouds'
import TitleApp from './TitleApp'
import Form from './Form'
import TitleRoom from './TitleRoom'
import UserContent from './UserContent'
import './App.css'

const App: React.FC = () => {
  const roomName = 'xEam43'
  const isSaved = false
  const [whichPage, setWhichPage] = useState(1)

  return (
    <div className="App">
      <Clouds />
      {whichPage === 1 && (
        <div className="Page Page1">
          <div className="content-wrapper">
            <TitleApp />
            <Form handleClick={() => setWhichPage(2)} />
          </div>
        </div>
      )}
      {whichPage === 2 && (
        <div className="Page Page2">
          <div className="content-wrapper">
            <TitleRoom
              roomName={roomName}
              isSaved={isSaved}
              handleClick={() => setWhichPage(1)}
            />
            <UserContent />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
