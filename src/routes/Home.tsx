import React from 'react'
import Clouds from '../components/Clouds'
import HomeTitleView from '../components/Home/HomeTitleView'
import HomeFormLogic from '../components/Home/HomeFormLogic'

const Home: React.FC = () => (
  <>
    <Clouds />
    {/* There's no *Logic to HomeTitle component */}
    <HomeTitleView />
    <HomeFormLogic />
  </>
)

export default Home

// TODO
// Handle Clouds and Grid
