import React, { useEffect, useState } from 'react'
import Clouds from './Clouds'
import TitleHome from './TitleHome'
import Form from './Form'
import TitleRoom from './TitleRoom'
import UserContent from './UserContent'
import './App.css'

const emptyRoom = {
  id: -1,
  key: '',
  content: '',
  createdAt: '',
  expiresAt: '',
}

const App: React.FC = () => {
  const [whichPage, setWhichPage] = useState<number>(1)
  const [isLoaded, setIsLoaded] = useState<boolean>(true)
  const [isSaved, setIsSaved] = useState<boolean>(true)
  const [error, setError] = useState<Error>()
  const [room, setRoom] = useState<TRoom>(emptyRoom)
  const [requestTimeout, setRequestTimeout] = useState<number>()

  const handleRoomSubmit = () => {
    setIsLoaded(false)

    fetch('https://my.api.mockaroo.com/copily/123.json?key=97869d60')
      .then((res) => res.json())
      .then(
        (data) => {
          setRoom(data)
          setWhichPage(2)
        },
        (err) => {
          setError(err)
        }
      )
      .finally(() => {
        setIsLoaded(true)
      })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContentChange = (ev: any) => {
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

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <Clouds />
      {whichPage === 1 && (
        <div className="Page Page1">
          <div className="content-wrapper">
            <TitleHome />
            <Form handleClick={handleRoomSubmit} />
          </div>
        </div>
      )}
      {whichPage === 2 && (
        <div className="Page Page2">
          <div className="content-wrapper">
            <TitleRoom
              roomKey={room.key}
              isSaved={isSaved}
              // Todo: Handle Back To Home
              handleClick={() => setWhichPage(1)}
            />
            <UserContent
              roomContent={room.content}
              handleChange={handleContentChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App

type TRoom = {
  id: number
  key: string
  content: string
  createdAt: string
  expiresAt: string
}
