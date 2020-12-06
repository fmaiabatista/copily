import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import firebase from '../firebase'
import './UserContent.css'
import leaf from '../assets/img/leaf.svg'
import { TRoom } from '../types'

const firestoreDefaultOptions = {
  snapshotListenOptions: { includeMetadataChanges: true },
}

const UserContent: React.FC<UserContentProps> = ({
  roomKey = '',
  roomContent = '',
  loadRoomContent,
  handleChange,
}) => {
  const [data, loading, error] = useDocumentData(
    firebase.firestore().doc(`rooms/${roomKey}`),
    firestoreDefaultOptions
  )

  useEffect(() => {
    console.log(data)
    if (data) {
      loadRoomContent((data as TRoom).content)
    }
  }, [loadRoomContent, data])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="UserContent">
      <textarea
        name="user-content"
        className="user-content"
        placeholder="write to your heart's content"
        cols={28}
        rows={10}
        value={roomContent}
        onChange={handleChange}
      />
      <div className="footer-wrapper">
        <img className="leaf" src={leaf} alt="leaf" />
        <sub>
          our planes are biodegradable and only last 1 hour in nature. your
          content expires after that.
        </sub>
      </div>
    </div>
  )
}

export default UserContent

UserContent.propTypes = {
  roomKey: PropTypes.string.isRequired,
  roomContent: PropTypes.string.isRequired,
  loadRoomContent: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

type UserContentProps = {
  roomKey: string
  roomContent: string
  loadRoomContent: (content: string) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (ev: any) => void
}
