import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import RoomContext from '../../contexts/RoomContext'
import { TRoomContext } from '../../types'
import RoomContentView from './RoomContentView'

const RoomContentLogic: React.FC<RoomContentLogicProps> = ({ roomKey }) => {
  const { isLoading, handleRoomContentChange, room } = useContext<TRoomContext>(
    RoomContext
  )

  const handleChange = (ev: any) => handleRoomContentChange(roomKey, ev)

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <RoomContentView
          roomContent={room.content}
          handleChange={handleChange}
        />
      )}
    </>
  )
}

export default RoomContentLogic

RoomContentLogic.propTypes = {
  roomKey: PropTypes.string.isRequired,
}

type RoomContentLogicProps = {
  roomKey: string
}
