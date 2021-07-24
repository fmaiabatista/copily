import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import addHours from 'date-fns/addHours'
import HomeFormView from './HomeFormView'
import db from '../../firebase'
import { TRoom, TRoomDTO } from '../../types'

const HomeFormLogic: React.FC = () => {
  const [room, setRoom] = useState<TRoom>(EMPTY_ROOM)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const history = useHistory()
  // const [isError, setIsError] = useState<boolean>(false)

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

  const handleRoomIdChange = (ev: any) =>
    setRoom({ ...room, key: ev.target.value && ev.target.value.toLowerCase() })

  const handleEnterRoom = (ev: any) => {
    ev.preventDefault()

    if (room.key && room.key.length > 2) {
      setIsLoading(true)
      fetchRoom()
        .then((json) => {
          const { content, expiresAt } = json as TRoomDTO
          setRoom({ ...room, content, expiresAt })
          setIsLoading(false)
          history.push(`/${room.key}`)
        })
        .catch(() => {
          setIsLoading(false)
          // setIsError(true)
          // setTimeout(() => setIsError(false), 4000)
        })
    }
  }

  return (
    <HomeFormView
      roomId={room.key}
      isLoading={isLoading}
      handleChange={handleRoomIdChange}
      handleSubmit={handleEnterRoom}
    />
  )
}

export default HomeFormLogic
