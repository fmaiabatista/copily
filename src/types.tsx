export type TRoomContext = {
  roomKey: string
  room: TRoomDTO
  isLoading: boolean
  isSaved: boolean
  fetchRoom: () => void
  createRoom: () => void
  updateRoom: (key: string, content: string) => void
  handleRoomContentChange: (key: string, ev: any) => void
  handleRoomInitialize: (ev: any) => void
  setKey: (key: string) => void
}

export type TRoomDTO = {
  content: string
  expiresAt: FirebaseTimestamp
}

export type TRoomRouteParams = {
  roomKey: string
}

type FirebaseTimestamp = {
  seconds: number
  nanoseconds: number
}
