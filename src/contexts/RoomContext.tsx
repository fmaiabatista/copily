import React, { useState } from 'react'
import PropTypes from 'prop-types'
import addHours from 'date-fns/addHours'
import { TRoomContext, TRoomDTO } from '../types'
import db from '../firebase'

const ROOMS = 'rooms'

const emptyRoom = {
  content: '',
  expiresAt: {
    seconds: 0,
    nanoseconds: 0,
  },
}

const RoomContext = React.createContext<TRoomContext>({
  room: emptyRoom,
  isLoading: false,
  isSaved: true,
  fetchRoom: () => {},
  createRoom: () => {},
  updateRoom: () => {},
  handleRoomContentChange: () => {},
  handleRoomInitialize: () => {},
})

export const RoomProvider: React.FC<RoomContextProps> = ({ children }) => {
  const [room, setRoom] = useState<TRoomDTO>(emptyRoom)
  const [requestTimeout, setRequestTimeout] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [isError, setIsError] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(true)

  const updateRoom = (roomKey = '', content = '') => {
    return db
      .collection(ROOMS)
      .doc(roomKey)
      .set({
        content,
        expiresAt: addHours(new Date(), 1),
      })
  }

  const createRoom = async (roomKey = '') => {
    await updateRoom(roomKey)
    const doc = await db.collection(ROOMS).doc(roomKey).get()

    return doc.data()
  }

  const fetchRoom = (roomKey = '') => {
    return db
      .collection(ROOMS)
      .doc(roomKey)
      .get()
      .then((doc) => {
        if (!doc.exists || doc?.data()?.expiresAt?.toDate() < new Date()) {
          return createRoom(roomKey)
        }

        return doc.data()
      })
  }

  const handleRoomInitialize = (roomKey = '') => {
    if (roomKey) {
      setIsLoading(true)
      fetchRoom(roomKey)
        .then((json) => {
          const { content, expiresAt } = json as TRoomDTO
          setRoom({ ...room, content, expiresAt })
        })
        .catch(() => {
          // setIsError(true)
          // setTimeout(() => setIsError(false), 4000)
        })
        .finally(() => setIsLoading(false))
    }
  }

  const handleRoomContentChange = (roomKey: string, ev: any) => {
    const content = ev.target.value

    setRoom({ ...room, content })
    setIsSaved(false)

    clearTimeout(requestTimeout)
    setRequestTimeout(
      window.setTimeout(() => {
        updateRoom(roomKey, content).then(() => setIsSaved(true))
      }, 1500)
    )
  }

  return (
    <RoomContext.Provider
      value={{
        room,
        isLoading,
        isSaved,
        fetchRoom,
        updateRoom,
        createRoom,
        handleRoomContentChange,
        handleRoomInitialize,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}

RoomProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

type RoomContextProps = {
  children: React.ReactNode
}

export default RoomContext

// TODO
// Handle room enter with params from route
