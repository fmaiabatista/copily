import React from 'react'
import Clouds from '../components/Clouds'
import RoomTitleLogic from '../components/Room/RoomTitleLogic'
import RoomContentLogic from '../components/Room/RoomContentLogic'

const Room: React.FC = () => (
  <>
    <Clouds />
    <RoomTitleLogic />
    <RoomContentLogic />
  </>
)

export default Room

// TODO
// Handle room enter logic (load from DB)
//   Use param to fetch, then once loaded, update context info
// Handle Clouds and Grid
