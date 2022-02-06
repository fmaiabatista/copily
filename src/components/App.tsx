import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { RoomProvider } from '../contexts/RoomContext'
import './App.css'
import Home from '../routes/Home'
import Room from '../routes/Room'

const App: React.FC = () => {
  return (
    <RoomProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/:roomKey">
            <Room />
          </Route>
        </Switch>
      </Router>
    </RoomProvider>
  )
}

export default App

// TODO
// Style the grid and double-check animations

/* 

import { AnimatePresence, motion } from 'framer-motion'
import Clouds from './Clouds'

const variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: 'spring', bounce: 0.7 },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: { duration: 0.5, ease: 'anticipate' },
  },
}

<div className="App">
      <Clouds />

      <AnimatePresence>
        {isError && (
          <motion.div
            className="Error"
            initial="initial"
            animate="animate"
            variants={variants}
            key="error"
            exit="exit"
          >
            <div className="message">
              Oops, an error occurred. Please try again 🤷‍♂️
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {page === 1 && (
        <div className="Page Page1">
          <div className="content-wrapper">
            <TitleHome />
            <Form
              roomId={room.key}
              isLoading={isLoading}
              handleChange={handleRoomIdChange}
              handleSubmit={handleEnterRoom}
            />
          </div>
        </div>
      )}

      {page === 2 && (
        <div className="Page Page2">
          <div className="content-wrapper">
            <TitleRoom
              roomId={room.key}
              isSaved={isSaved}
              handleClick={handleExitRoom}
            />
            <UserContent room={room} handleChange={handleRoomContentChange} />
          </div>
        </div>
      )}
    </div>
*/
