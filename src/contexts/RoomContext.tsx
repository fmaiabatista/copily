import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import addHours from 'date-fns/addHours'
import { TRoom, TRoomContext, TRoomDTO } from '../types'
import db from '../firebase'

const emptyRoom = {
  key: '',
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
  handleRoomKeyChange: () => {},
  handleRoomContentChange: () => {},
  handleRoomEnter: () => {},
})

export const RoomProvider: React.FC<RoomContextProps> = ({ children }) => {
  const history = useHistory()
  const [room, setRoom] = useState<TRoom>(emptyRoom)
  const [requestTimeout, setRequestTimeout] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [isError, setIsError] = useState<boolean>(false)
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
        if (!doc.exists || doc?.data()?.expiresAt?.toDate() < new Date()) {
          return createRoom()
        }

        return doc.data()
      })
  }

  const handleRoomKeyChange = (ev: any) => {
    setRoom({ ...room, key: ev.target.value && ev.target.value.toLowerCase() })
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

  const handleRoomEnter = (roomKey = '') => {
    if (roomKey && roomKey.length > 2) {
      setIsLoading(true)
      fetchRoom()
        .then((json) => {
          const { content, expiresAt } = json as TRoomDTO
          setRoom({ ...room, content, expiresAt })
          history.push(`/${roomKey}`)
        })
        .catch(() => {
          // setIsError(true)
          // setTimeout(() => setIsError(false), 4000)
        })
        .finally(() => setIsLoading(false))
    }
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
        handleRoomKeyChange,
        handleRoomContentChange,
        handleRoomEnter,
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