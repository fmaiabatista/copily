import React from 'react'
import PropTypes from 'prop-types'
import HomeFormView from './HomeFormView'

const HomeFormLogic: React.FC<HomeFormLogicProps> = ({
  roomKey,
  setRoomKey,
}) => {
  const handleRoomKeyChange = (ev: any) => {
    setRoomKey(ev.target.value && ev.target.value.toLowerCase())
  }

  return (
    <HomeFormView
      isDisabled={!roomKey}
      roomKey={roomKey}
      handleRoomKeyChange={handleRoomKeyChange}
    />
  )
}

export default HomeFormLogic

HomeFormLogic.propTypes = {
  roomKey: PropTypes.string.isRequired,
  setRoomKey: PropTypes.func.isRequired,
}

type HomeFormLogicProps = {
  roomKey: string
  setRoomKey: (roomKey: string) => void
}
