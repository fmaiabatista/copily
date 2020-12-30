import React, { useState } from 'react'
import './App.css'
import addHours from 'date-fns/addHours'
import Clouds from './Clouds'
import TitleHome from './TitleHome'
import Form from './Form'
import TitleRoom from './TitleRoom'
import UserContent from './UserContent'
import { TRoom, TRoomDTO } from '../types'
import db from '../firebase'

const EMPTY_ROOM = {
  key: '',
  content: '',
  expiresAt: {
    seconds: 0,
    nanoseconds: 0,
  },
}

const App: React.FC = () => {
  // App states
  const [page, setPage] = useState<number>(1)
  const [requestTimeout, setRequestTimeout] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  // Room states
  const [room, setRoom] = useState<TRoom>(EMPTY_ROOM)
  const [isSaved, setIsSaved] = useState<boolean>(true)

  const updateRoom = (content = '') => {
    return db
      .collection('rooms')
      .doc(room.key)
      .set({
        content,
        expiresAt: addHours(new Date(), 1),
      })
  }

  const createRoom = async () => {
    await updateRoom()
    const doc = await db.collection('rooms').doc(room.key).get()

    return doc.data()
  }

  const fetchRoom = () => {
    return db
      .collection('rooms')
      .doc(room.key)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return createRoom()
        }

        // todo - test if doc is expired
        return doc.data()
      })
  }

  const handleRoomKeyChange = (ev: any) => {
    setRoom({ ...room, key: ev.target.value && ev.target.value.toLowerCase() })
  }

  const handleEnterRoom = (ev: any) => {
    ev.preventDefault()

    if (room.key && room.key.length > 2) {
      setIsLoading(true)
      fetchRoom()
        .then((json) => {
          const { content, expiresAt } = json as TRoomDTO
          setRoom({ ...room, content, expiresAt })
          setPage(2)
        })
        .catch((error) => setIsError(error))
        .finally(() => setIsLoading(false))
    }
  }

  const handleRoomContentChange = (ev: any) => {
    const content = ev.target.value

    setRoom({ ...room, content })
    setIsSaved(false)

    clearTimeout(requestTimeout)
    setRequestTimeout(
      window.setTimeout(() => {
        updateRoom(content).then(() => setIsSaved(true))
      }, 1500)
    )
  }

  const handleExitRoom = () => {
    setRoom(EMPTY_ROOM)
    setPage(1)
  }

  // todo - error state
  return (
    <div className="App">
      <Clouds />
      {isError && <div>error</div>}
      {!isError && page === 1 && (
        <div className="Page Page1">
          <div className="content-wrapper">
            <TitleHome />
            <Form
              roomKey={room.key}
              isLoading={isLoading}
              handleChange={handleRoomKeyChange}
              handleSubmit={handleEnterRoom}
            />
          </div>
        </div>
      )}
      {!isError && page === 2 && (
        <div className="Page Page2">
          <div className="content-wrapper">
            <TitleRoom
              roomKey={room.key}
              isSaved={isSaved}
              handleClick={handleExitRoom}
            />
            <UserContent room={room} handleChange={handleRoomContentChange} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
