import { CSSProperties } from 'react'
import { Node, Edge } from 'reactflow'

export type TSimpleFloatingEdge = {
  id: string
  source: string
  target: string
  markerEnd?: string
  style?: CSSProperties
}

export type TSgAndHandlerTypes = {
  group: string
  type: string
  sourceStatus?: string
  targetStatus?: string
}

export type TForceDirectedConnection = {
  source: number
  target: number
}

export type TUniqueSgWithIndex = {
  index: number
  id: string
}

export type TForcedDirectedSimulationResult = {
  id: string
  x: number
  y: number
}[]

export type TSGTypePortStatus = {
  [key: string]: {
    src: {
      port: string
      status: string
    }[]
    dst: {
      port: string
      status: string
    }[]
  }
}

export type TSGsAndNetworks = {
  [key: string]: {
    ip: string
    status: string
  }[]
}

export type TIpPortTypeStatus = {
  ip: string
  port: string
  status: string
}

export type TSgAndIpPortTypeStatus = {
  [key: string]: {
    src: TIpPortTypeStatus[]
    dst: TIpPortTypeStatus[]
  }
}

export type TConnection = {
  from: string
  to: string
  status: string
}

export type TNodesEdgesObj = {
  nodes: Node[]
  edges: Edge[]
}
