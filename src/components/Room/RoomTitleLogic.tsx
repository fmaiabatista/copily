import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import RoomTitleView from './RoomTitleView'
import RoomContext from '../../contexts/RoomContext'
import { TRoomContext } from '../../types'

const RoomTitleLogic: React.FC<RoomTitleLogicProps> = ({ roomKey }) => {
  const { isSaved } = useContext<TRoomContext>(RoomContext)

  return <RoomTitleView roomKey={roomKey} isSaved={isSaved} />
}

export default RoomTitleLogic

RoomTitleLogic.propTypes = {
  roomKey: PropTypes.string.isRequired,
}

type RoomTitleLogicProps = {
  roomKey: string
}
