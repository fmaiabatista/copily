export type TRoomContext = {
  room: TRoom
  isLoading: boolean
  isSaved: boolean
  fetchRoom: () => void
  createRoom: () => void
  updateRoom: (content: string) => void
  handleRoomKeyChange: (ev: any) => void
  handleRoomContentChange: (ev: any) => void
  handleRoomEnter: (ev: any) => void
}

export type TRoomDTO = {
  content: string
  expiresAt: FirebaseTimestamp
}

export type TRoom = TRoomDTO & {
  key: string
}

export type TRoomRouteParams = {
  roomKey: string
}

type FirebaseTimestamp = {
  seconds: number
  nanoseconds: number
}
