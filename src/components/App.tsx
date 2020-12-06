import React, { useCallback, useState } from 'react'
import Clouds from './Clouds'
import TitleHome from './TitleHome'
import Form from './Form'
import TitleRoom from './TitleRoom'
import UserContent from './UserContent'
import './App.css'
import { TRoom } from '../types'

const emptyRoom = {
  content: '',
  createdAt: '',
  expiresAt: '',
}

const App: React.FC = () => {
  const [whichPage, setWhichPage] = useState<number>(1)
  const [isSaved, setIsSaved] = useState<boolean>(true)

  const [roomKey, setRoomKey] = useState<string>('')
  const [room, setRoom] = useState<TRoom>(emptyRoom)

  const [requestTimeout, setRequestTimeout] = useState<number>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRoomKeyChange = (ev: any) => {
    setRoomKey(ev.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRoomContentChange = (ev: any) => {
    setRoom({ ...room, content: ev.target.value })
    setIsSaved(false)

    clearTimeout(requestTimeout)

    setRequestTimeout(
      window.setTimeout(() => {
        console.log("i'll make a call here")
        setIsSaved(true)
      }, 1500)
    )
  }

  const foo = useCallback((content) => setRoom((r) => ({ ...r, content })), [])

  return (
    <div className="App">
      <Clouds />
      {whichPage === 1 && (
        <div className="Page Page1">
          <div className="content-wrapper">
            <TitleHome />
            <Form
              roomKey={roomKey}
              handleChange={handleRoomKeyChange}
              handleClick={() => setWhichPage(2)}
            />
          </div>
        </div>
      )}
      {whichPage === 2 && (
        <div className="Page Page2">
          <div className="content-wrapper">
            <TitleRoom
              roomKey={roomKey}
              isSaved={isSaved}
              // Todo: Handle Back To Home
              handleClick={() => setWhichPage(1)}
            />
            <UserContent
              roomKey={roomKey}
              roomContent={room.content}
              loadRoomContent={foo}
              handleChange={handleRoomContentChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
