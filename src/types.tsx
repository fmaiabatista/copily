export type TRoomDTO = {
  content: string
  expiresAt: FirebaseTimestamp
}

export type TRoom = TRoomDTO & {
  key: string
}

type FirebaseTimestamp = {
  seconds: number
  nanoseconds: number
}
