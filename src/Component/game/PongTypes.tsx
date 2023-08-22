
export type size = {
  w: number,
  h: number,
}

export type Position = {
  x: number,
  y: number,
}

export type paddelPair = {
  rp: number,
  lp: number,
}

export type scorePair = {
  tp: string,
  op: string,
}

export type inviteProp = Partial<{
  id: string,
  speed: string,
}>