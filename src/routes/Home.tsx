import React from 'react'
import PropTypes from 'prop-types'
import Clouds from '../components/Clouds'
import HomeTitleView from '../components/Home/HomeTitleView'
import HomeFormLogic from '../components/Home/HomeFormLogic'

const Home: React.FC<HomeProps> = ({ roomKey, setRoomKey }) => (
  <>
    <Clouds />
    {/* There's no *Logic to HomeTitle component */}
    <HomeTitleView />
    <HomeFormLogic roomKey={roomKey} setRoomKey={setRoomKey} />
  </>
)

export default Home

// TODO
// Handle Clouds and Grid

Home.propTypes = {
  roomKey: PropTypes.string.isRequired,
  setRoomKey: PropTypes.func.isRequired,
}

type HomeProps = {
  roomKey: string
  setRoomKey: (roomKey: string) => void
}
