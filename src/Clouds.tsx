import React from 'react'
import './Clouds.css'
import cloud from './assets/img/cloud.svg'

const Clouds: React.FunctionComponent = () => {
  const qty = 4

  return (
    <div className="Clouds">
      {Array.from(new Array(qty)).map((_: undefined, i: number) => {
        // eslint-disable-next-line react/no-array-index-key
        return <img key={i} className={`cloud-${i}`} src={cloud} alt="cloud" />
      })}
    </div>
  )
}

export default Clouds