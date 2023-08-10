export enum Type {
  leadingEnd = 1,
  scene,
  theMasses,
  rests,
}

export enum TypeZH {
  设备感知 = Type.leadingEnd,
  巡航发现 = Type.scene,
  群众举报 = Type.theMasses,
  监管推送 = Type.rests,
}
