export type TRoomContext = {
  room: TRoomDTO
  isLoading: boolean
  isSaved: boolean
  fetchRoom: () => void
  createRoom: () => void
  updateRoom: (roomKey: string, content: string) => void
  handleRoomContentChange: (roomKey: string, ev: any) => void
  handleRoomInitialize: (ev: any) => void
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
