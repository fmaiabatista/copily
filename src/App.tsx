import React, { useEffect, useState } from 'react'
import Clouds from './Clouds'
import TitleHome from './TitleHome'
import Form from './Form'
import TitleRoom from './TitleRoom'
import UserContent from './UserContent'
import './App.css'

const App: React.FC = () => {
  const roomName = 'xEam43'
  const isSaved = false
  const [whichPage, setWhichPage] = useState<number>(1)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [error, setError] = useState<error>()
  const [room, setRoom] = useState()

  useEffect(() => {
    fetch('https://my.api.mockaroo.com/copily/123.json?key=97869d60')
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then(
        (result) => {
          setIsLoaded(true)
          setRoom(result)
        },
        (err) => {
          setIsLoaded(true)
          setError(err)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <Clouds />
      {whichPage === 1 && (
        <div className="Page Page1">
          <div className="content-wrapper">
            <TitleHome />
            <Form handleClick={() => setWhichPage(2)} />
          </div>
        </div>
      )}
      {whichPage === 2 && (
        <div className="Page Page2">
          <div className="content-wrapper">
            <TitleRoom
              room={room}
              isSaved={isSaved}
              handleClick={() => setWhichPage(1)}
            />
            <UserContent room={room} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
