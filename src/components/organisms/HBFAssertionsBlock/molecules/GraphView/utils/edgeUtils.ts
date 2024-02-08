/* eslint-disable camelcase */
import { Edge, MarkerType } from 'reactflow'
import { TAssertion } from 'localTypes/HBFAssertions'
import type { TConnection } from '../types'

const getEdgeColor = (status: string) => {
  if (status === 'pass') {
    return '#90ee93'
  }
  if (status === 'fail') {
    return '#ee9090'
  }
  return '#eedd90'
}

const findIndexOfSgConnectionInArr = (from: string, to: string, arr: TConnection[]): number => {
  return arr.findIndex(el => el.from === from && el.to === to)
}

const makeUniqueSgConnectionArr = (data: TAssertion[]): TConnection[] => {
  const uniqueConnections: TConnection[] = []
  const connections: TConnection[] = data.map(({ from, to, status }) => ({
    from,
    to,
    status,
  }))
  connections.forEach(el => {
    const connectionIndex = findIndexOfSgConnectionInArr(el.from, el.to, uniqueConnections)
    if (connectionIndex === -1) {
      uniqueConnections.push(el)
    } else if (uniqueConnections[connectionIndex].status !== el.status) {
      uniqueConnections[connectionIndex].status = 'both'
    }
  })
  return uniqueConnections
}

const makeEdges = (data: TAssertion[], edgeType: string, cursor = 'initial'): Edge[] => {
  return makeUniqueSgConnectionArr(data).map(({ from, to, status }) => ({
    id: from + to,
    source: `${from}`,
    target: `${to}`,
    style: { stroke: getEdgeColor(status), cursor },
    selectable: false,
    type: edgeType,
    markerEnd: {
      type: MarkerType.Arrow,
    },
    interactionWidth: 15,
  }))
}

export const makeDefaultEdges = (data: TAssertion[]): Edge[] => makeEdges(data, 'default')

export const makeFloatingEdges = (data: TAssertion[]): Edge[] => makeEdges(data, 'floating', 'pointer')

export const makeSmartEdges = (data: TAssertion[]): Edge[] => makeEdges(data, 'smart', 'pointer')

const findIndexOfPortsConnectionInArr = (source: string, target: string, arr: Edge[]): number => {
  return arr.findIndex(el => el.source === source && el.target === target)
}

export const makePortsEdges = (data: TAssertion[]): Edge[] => {
  const connections: Edge[] = []
  data.forEach(({ uuid, from, to, src_port, dst_port, status }) => {
    const connectionIndex = findIndexOfPortsConnectionInArr(`${from}${src_port}`, `${to}${dst_port}`, connections)
    const statusColor = status === 'pass' ? '#90ee939c' : '#ee90909c'
    if (connectionIndex === -1) {
      connections.push({
        id: uuid,
        source: `${from}${src_port}`,
        target: `${to}${dst_port}`,
        style: { stroke: statusColor },
        type: 'default',
        markerEnd: {
          type: MarkerType.Arrow,
        },
      })
    } else {
      const connectionStyle = connections[connectionIndex].style
      if (connectionStyle && connectionStyle.stroke && connectionStyle.stroke !== statusColor) {
        connectionStyle.stroke = '#eedd909c'
      }
    }
  })
  return connections
}

export const makeLowLevelEdges = (data: TAssertion[], isSmart = false): Edge[] => {
  return data.map(({ uuid, from, to, src_ip, src_port, dst_ip, dst_port, status }) => ({
    id: uuid,
    source: `${from}${src_ip}${src_port}`,
    target: `${to}${dst_ip}${dst_port}`,
    style: { stroke: status === 'pass' ? '#90ee939c' : '#ee90909c' },
    selectable: false,
    type: isSmart ? 'smart' : 'default',
    markerEnd: {
      type: MarkerType.Arrow,
    },
  }))
}
