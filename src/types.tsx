export type TRoomDTO = {
  content: string
  createdAt: FirebaseTimestamp
  expiresAt: FirebaseTimestamp
}

export type TRoom = TRoomDTO & {
  key: string
}

type FirebaseTimestamp = {
  seconds: number
  nanoseconds: number
}
