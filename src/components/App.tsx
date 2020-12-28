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
  createdAt: {
    seconds: 0,
    nanoseconds: 0,
  },
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
        createdAt: new Date(),
        expiresAt: addHours(new Date(), 1),
      })
  }

  const createRoom = async () => {
    // console.log('creating room')
    await updateRoom()

    // console.log('created room, now will retrieve it')
    const doc = await db.collection('rooms').doc(room.key).get()

    return doc.data()
  }

  const fetchRoom = () => {
    // console.log('will fetch room')

    return new Promise((resolve, reject) => {
      // console.log('fetching room')
      db.collection('rooms')
        .doc(room.key)
        .get()
        .then((doc) => {
          // doc exists
          if (doc.exists) {
            // console.log('exists, retrieving data')
            // todo - test if doc is expired
            return doc.data()
          }

          // console.log('doesnt exist, will create room')
          // doc doesnt exist or is expired - create new
          return createRoom()
        })
        .then((json) => {
          // console.log(json)
          resolve(json)
        })
        .catch((error) => {
          setIsError(error)
          reject(error)
        })
        .finally(() => setIsLoading(false))
    })
  }

  const handleRoomKeyChange = (ev: any) => {
    setRoom({ ...room, key: ev.target.value })
  }

  const handleEnterRoom = () => {
    // todo - create error message for when room key is empty
    if (room.key) {
      fetchRoom().then((data) => {
        // console.log('received room')
        const { content, createdAt, expiresAt } = data as TRoomDTO
        setRoom({ ...room, content, createdAt, expiresAt })
        setPage(2)
      })
    }
  }

  const handleRoomContentChange = (ev: any) => {
    const content = ev.target.value

    // write to local state
    setRoom({ ...room, content })
    setIsSaved(false)

    clearTimeout(requestTimeout)

    // wait timeout to update the database and saved state
    setRequestTimeout(
      window.setTimeout(() => {
        // update database
        updateRoom(content).then(() => setIsSaved(true))
      }, 1500)
    )
  }

  const handleExitRoom = () => {
    setRoom(EMPTY_ROOM)
    setPage(1)
  }

  // todo - add kb a11y for Enter key
  // todo - error & loading states
  return (
    <div className="App">
      <Clouds />
      {isError && <div>error</div>}
      {isLoading && <div>loading</div>}
      {page === 1 && (
        <div className="Page Page1">
          <div className="content-wrapper">
            <TitleHome />
            <Form
              roomKey={room.key}
              handleChange={handleRoomKeyChange}
              handleClick={handleEnterRoom}
            />
          </div>
        </div>
      )}
      {page === 2 && (
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
