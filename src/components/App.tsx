import React, { useState } from 'react'
import './App.css'
import { AnimatePresence, motion } from 'framer-motion'
import addHours from 'date-fns/addHours'
import Clouds from './Clouds'
import TitleHome from './TitleHome'
import Form from './Form'
import TitleRoom from './TitleRoom'
import UserContent from './UserContent'
import { TRoom, TRoomDTO } from '../types'
import db from '../firebase'

const variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: 'spring', bounce: 0.7 },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: { duration: 0.5, ease: 'anticipate' },
  },
}

const EMPTY_ROOM = {
  key: '',
  content: '',
  expiresAt: {
    seconds: 0,
    nanoseconds: 0,
  },
}

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [requestTimeout, setRequestTimeout] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

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
        if (!doc.exists || doc?.data()?.expiresAt < new Date()) {
          return createRoom()
        }

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
        .catch(() => {
          setIsError(true)
          setTimeout(() => setIsError(false), 4000)
        })
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

  return (
    <div className="App">
      <Clouds />

      <AnimatePresence>
        {isError && (
          <motion.div
            className="Error"
            initial="initial"
            animate="animate"
            variants={variants}
            key="error"
            exit="exit"
          >
            <div className="message">
              Oops, an error occured. Please try again 🤷‍♂️
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {page === 1 && (
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
