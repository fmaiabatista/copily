import React from 'react'

const EMPTY_ROOM = {
  key: '',
  content: '',
  expiresAt: {
    seconds: 0,
    nanoseconds: 0,
  },
}

const RoomContext = React.createContext(EMPTY_ROOM)

export default RoomContext
