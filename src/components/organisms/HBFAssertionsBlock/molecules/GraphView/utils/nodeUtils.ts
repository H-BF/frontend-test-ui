/* eslint-disable camelcase */
import { CSSProperties } from 'react'
import { Node } from 'reactflow'
import { TAssertion } from 'localTypes/HBFAssertions'
import type {
  TSgAndHandlerTypes,
  TForceDirectedConnection,
  TUniqueSgWithIndex,
  TIpPortTypeStatus,
  TSGTypePortStatus,
  TSGsAndNetworks,
  TSgAndIpPortTypeStatus,
} from '../types'
import { getCoordsByForceDirectedSimulation } from './d3Force'
import { getPositionInCircle } from './positionUtils'

const makeGroupNode = (
  groupType: string,
  sg: string,
  x: number,
  y: number,
  style?: CSSProperties | undefined,
  handleType?: string,
  sourceStatus?: string,
  targetStatus?: string,
): Node => ({
  id: sg,
  data: { label: sg, handleType, sourceStatus, targetStatus },
  position: { x, y },
  className: 'light',
  connectable: false,
  selectable: false,
  type: groupType,
  style,
})

const makeGroupHigLevelNode = (
  sg: string,
  x: number,
  y: number,
  handleType: string,
  sourceStatus?: string,
  targetStatus?: string,
): Node => makeGroupNode('groupHighLevelNode', sg, x, y, undefined, handleType, sourceStatus, targetStatus)

const makeGroupStarNode = (sg: string, x: number, y: number, handleType: string): Node =>
  makeGroupNode('groupStarNode', sg, x, y, undefined, handleType)

const makeGroupPortsNode = (sg: string, xOffset: number, height: number): Node =>
  makeGroupNode('groupProtocolNode', sg, xOffset, 0, { width: 150, height })

const makeGroupNetworksNode = (sg: string, xOffset: number, height: number): Node =>
  makeGroupNode('groupProtocolNode', sg, xOffset, 0, { width: 250, height })

const makeGroupLowLevelNode = (sg: string, xOffset: number, height: number): Node =>
  makeGroupNode('groupProtocolNode', sg, xOffset, 0, { width: 200, height })

const makeSingleNode = (
  type: string,
  id: string,
  label: string,
  x: number,
  y: number,
  parentNode: string,
  status?: string,
  handleType?: string,
): Node => ({
  id,
  data: { label, status, handleType },
  position: { x, y },
  parentNode,
  type,
  selectable: false,
  connectable: false,
})

const makePortNode = (
  type: string,
  group: string,
  port: string,
  x: number,
  y: number,
  status: string,
  handleType: string,
): Node => makeSingleNode(type, `${group}${port}`, `${port}`, x, y, group, status, handleType)

const makeNetworkNode = (group: string, ip: string, status: string, x: number, y: number): Node =>
  makeSingleNode('networkNode', `${ip}`, `${ip}`, x, y, group, status)

const makeLowLevelNode = (
  type: string,
  group: string,
  ip: string,
  port: string,
  x: number,
  y: number,
  status: string,
  handleType: string,
): Node => makeSingleNode(type, `${group}${ip}${port}`, `${ip}:${port}`, x, y, group, status, handleType)

const findIndexBySgInSgHandlerTypesArr = (group: string, arr: TSgAndHandlerTypes[]) =>
  arr.findIndex(el => el.group === group)

const makeUniqueSgArr = (data: TAssertion[]): TSgAndHandlerTypes[] => {
  const result: TSgAndHandlerTypes[] = []
  data.forEach(({ from, to, status }) => {
    const fromIndex = findIndexBySgInSgHandlerTypesArr(from, result)
    const toIndex = findIndexBySgInSgHandlerTypesArr(to, result)
    if (fromIndex === -1) {
      result.push({ group: from, type: 'source', sourceStatus: status })
    } else {
      if (result[fromIndex].type !== 'source') {
        result[fromIndex].type = 'both'
      }
      if (result[fromIndex].sourceStatus !== status) {
        result[fromIndex].sourceStatus = 'both'
      }
    }
    if (toIndex === -1) {
      result.push({ group: to, type: 'target', targetStatus: status })
    } else {
      if (result[toIndex].type !== 'target') {
        result[toIndex].type = 'both'
      }
      if (result[toIndex].targetStatus !== status) {
        result[toIndex].targetStatus = 'both'
      }
    }
  })
  result.forEach((el, index) => {
    if (el.type === 'both') {
      const fromStatuses = data.filter(dataEl => dataEl.from === el.group).map(({ status }) => status)
      const toStatuses = data.filter(dataEl => dataEl.to === el.group).map(({ status }) => status)
      const sizeFrom = new Set(fromStatuses).size
      const sizeTo = new Set(toStatuses).size
      if (sizeFrom > 1) {
        result[index].sourceStatus = 'both'
      } else {
        const fromStatus = fromStatuses[0]
        result[index].sourceStatus = fromStatus
      }
      if (sizeTo > 1) {
        result[index].targetStatus = 'both'
      } else {
        const toStatus = toStatuses[0]
        result[index].targetStatus = toStatus
      }
    }
  })
  return result
}

const findConnectionInForceDirectedConnectionArr = (
  from: number,
  to: number,
  arr: TForceDirectedConnection[],
): boolean => {
  return arr.some(({ source, target }) => source === from && target === to)
}

const replaceGroupNameWithIndex = (name: string, uniqueSgWithIndex: TUniqueSgWithIndex[]) => {
  return uniqueSgWithIndex.find(({ id }) => id === name)?.index
}

const makeConnectionsForForceDirected = (
  data: TAssertion[],
  uniqueSgWithIndex: TUniqueSgWithIndex[],
): TForceDirectedConnection[] => {
  const dataWithIndexInsteadOfStrings = data.map(({ from, to }) => ({
    from: replaceGroupNameWithIndex(from, uniqueSgWithIndex),
    to: replaceGroupNameWithIndex(to, uniqueSgWithIndex),
  }))
  const uniqueConnections: TForceDirectedConnection[] = []
  dataWithIndexInsteadOfStrings.forEach(({ from, to }) => {
    if (from && to && findConnectionInForceDirectedConnectionArr(from, to, uniqueConnections)) {
      uniqueConnections.push({ source: from, target: to })
    }
  })
  return uniqueConnections
}

export const makeHighLevelNodes = async (data: TAssertion[]): Promise<Node[]> => {
  const result: Node[] = []
  const uniqueSgAndTypesArr = makeUniqueSgArr(data)
  const uniqueSgWithIndex = uniqueSgAndTypesArr.map(({ group }, index) => ({ index, id: group }))
  const connections = makeConnectionsForForceDirected(data, uniqueSgWithIndex)
  const coords = await getCoordsByForceDirectedSimulation(uniqueSgWithIndex, connections)
  uniqueSgAndTypesArr.forEach(({ group, type, sourceStatus, targetStatus }, index) => {
    const { x, y } = coords[index]
    result.push(makeGroupHigLevelNode(group, x, y, type, sourceStatus, targetStatus))
  })
  return result
}

export const makeStarNodes = (data: TAssertion[], centerSg: string): Node[] => {
  const result: Node[] = []
  const elWidth = 65
  const elHeight = 65

  const uniqueSgArr = makeUniqueSgArr(data)
  const uniqueSgArrWithoutCenter = uniqueSgArr.filter(({ group }) => group !== centerSg)
  const centerSgType = uniqueSgArr.find(({ group }) => group === centerSg)
  if (centerSgType) {
    result.push(makeGroupStarNode(centerSgType.group, -elWidth / 2, -elHeight / 2, centerSgType.type))
  }

  const totalRoundItems = uniqueSgArrWithoutCenter.length
  let circumference = (elHeight + 200) * totalRoundItems
  circumference = circumference > 1500 ? circumference : 1500
  const radius = Math.ceil(circumference / (2 * Math.PI))
  const step = (2 * Math.PI) / totalRoundItems

  uniqueSgArrWithoutCenter.forEach(({ group, type }, index) => {
    const { x, y } = getPositionInCircle(index, step, radius, elWidth, elHeight)
    result.push(makeGroupStarNode(group, x, y, type))
  })
  return result
}

const findIndexByPortInPortStatusArr = (port: string, arr: { port: string; status: string }[]) =>
  arr.findIndex(el => el.port === port)

const makeNodesObjectBySgPortAndType = (data: TAssertion[], groups: string[]): TSGTypePortStatus => {
  const result: TSGTypePortStatus = {
    [groups[0]]: {
      src: [],
      dst: [],
    },
    [groups[1]]: {
      src: [],
      dst: [],
    },
  }
  groups.forEach(group => {
    data
      .filter(({ from }) => from === group)
      .forEach(({ from, src_port, status }) => {
        const portIndex = findIndexByPortInPortStatusArr(src_port, result[from].src)
        if (portIndex === -1) {
          result[group].src.push({ port: src_port, status })
        } else if (result[group].src[portIndex].status !== status) {
          result[group].src[portIndex].status = 'both'
        }
      })
    data
      .filter(({ to }) => to === group)
      .forEach(({ to, dst_port, status }) => {
        const portIndex = findIndexByPortInPortStatusArr(dst_port, result[to].dst)
        if (portIndex === -1) {
          result[group].dst.push({ port: dst_port, status })
        } else if (result[group].dst[portIndex].status !== status) {
          result[group].dst[portIndex].status = 'both'
        }
      })
  })

  return result
}

export const makePortsNodes = (data: TAssertion[], groups: string[]): Node[] => {
  const result: Node[] = []

  const sgPortAndType = makeNodesObjectBySgPortAndType(data, groups)

  const srcLength =
    sgPortAndType[groups[0]].src.length > sgPortAndType[groups[1]].dst.length
      ? sgPortAndType[groups[0]].src.length
      : sgPortAndType[groups[1]].dst.length
  const dstLength =
    sgPortAndType[groups[0]].dst.length > sgPortAndType[groups[1]].src.length
      ? sgPortAndType[groups[0]].dst.length
      : sgPortAndType[groups[1]].src.length

  result.push(makeGroupPortsNode(groups[0], 0, 65 + 25 * (srcLength + dstLength)))
  result.push(makeGroupPortsNode(groups[1], 250, 65 + 25 * (srcLength + dstLength)))

  const yPadding = 25
  const yOffset = 50
  sgPortAndType[groups[0]].src.forEach(({ port, status }, index) => {
    result.push(makePortNode('protocolNodeLeft', groups[0], port, 25, yOffset + yPadding * index, status, 'source'))
  })
  sgPortAndType[groups[0]].dst.forEach(({ port, status }, index) => {
    result.push(
      makePortNode('protocolNodeLeft', groups[0], port, 25, yOffset + (srcLength + index) * yPadding, status, 'target'),
    )
  })
  sgPortAndType[groups[1]].src.forEach(({ port, status }, index) => {
    result.push(
      makePortNode(
        'protocolNodeRight',
        groups[1],
        port,
        25,
        yOffset + (srcLength + index) * yPadding,
        status,
        'source',
      ),
    )
  })
  sgPortAndType[groups[1]].dst.forEach(({ port, status }, index) => {
    result.push(makePortNode('protocolNodeRight', groups[1], port, 25, yOffset + yPadding * index, status, 'target'))
  })
  return result
}

const findIndexByIpInIpStatusPairArr = (ip: string, arr: { ip: string; status: string }[]) =>
  arr.findIndex(el => el.ip === ip)

const makeNodesObjectBySgAndNetwork = (data: TAssertion[], groups: string[]): TSGsAndNetworks => {
  const result: TSGsAndNetworks = {
    [groups[0]]: [],
    [groups[1]]: [],
  }
  groups.forEach(group => {
    data
      .filter(({ from }) => from === group)
      .forEach(({ src_ip, status }) => {
        const index = findIndexByIpInIpStatusPairArr(src_ip, result[group])
        if (index === -1) {
          result[group].push({ ip: src_ip, status })
        } else if (result[group][index].status !== 'both' && result[group][index].status !== status) {
          result[group][index].status = 'both'
        }
      })
    data
      .filter(({ to }) => to === group)
      .forEach(({ dst_ip, status }) => {
        const index = findIndexByIpInIpStatusPairArr(dst_ip, result[group])
        if (index === -1) {
          result[group].push({ ip: dst_ip, status })
        } else if (result[group][index].status !== 'both' && result[group][index].status !== status) {
          result[group][index].status = 'both'
        }
      })
  })

  return result
}

export const makeNetworksNodes = (data: TAssertion[], groups: string[]): Node[] => {
  const result: Node[] = []

  const sgPortAndType = makeNodesObjectBySgPortAndType(data, groups)
  const networks = makeNodesObjectBySgAndNetwork(data, groups)

  const srcLength = Math.max(sgPortAndType[groups[0]].src.length, sgPortAndType[groups[1]].dst.length)
  const dstLength = Math.max(sgPortAndType[groups[0]].dst.length, sgPortAndType[groups[1]].src.length)
  const portsLength = 27 * (srcLength + dstLength)
  const networksLength = 50 * Math.max(networks[groups[0]].length, networks[groups[1]].length)
  const groupNodeLength = Math.max(portsLength, networksLength) + 65

  result.push(makeGroupNetworksNode(groups[0], 0, groupNodeLength))
  result.push(makeGroupNetworksNode(groups[1], 300, groupNodeLength))

  networks[groups[0]].forEach(({ ip, status }, index) => {
    result.push(makeNetworkNode(groups[0], ip, status, 25, 50 * (index + 1)))
  })
  networks[groups[1]].forEach(({ ip, status }, index) => {
    result.push(makeNetworkNode(groups[1], ip, status, 100, 50 * (index + 1)))
  })

  const yPadding = 25
  const yOffset = 50
  sgPortAndType[groups[0]].src.forEach(({ port, status }, index) => {
    result.push(makePortNode('protocolNodeLeft', groups[0], port, 125, yOffset + yPadding * index, status, 'source'))
  })
  sgPortAndType[groups[0]].dst.forEach(({ port, status }, index) => {
    result.push(
      makePortNode(
        'protocolNodeLeft',
        groups[0],
        port,
        125,
        yOffset + (srcLength + index) * yPadding,
        status,
        'target',
      ),
    )
  })
  sgPortAndType[groups[1]].src.forEach(({ port, status }, index) => {
    result.push(
      makePortNode(
        'protocolNodeRight',
        groups[1],
        port,
        25,
        yOffset + (srcLength + index) * yPadding,
        status,
        'source',
      ),
    )
  })
  sgPortAndType[groups[1]].dst.forEach(({ port, status }, index) => {
    result.push(makePortNode('protocolNodeRight', groups[1], port, 25, yOffset + yPadding * index, status, 'target'))
  })
  return result
}

const findIndexByIpAndPortPairInArr = (ip: string, port: string, arr: TIpPortTypeStatus[]) => {
  return arr.findIndex(el => el.ip === ip && el.port === port)
}

const makeNodesObjectByUniqueIpAndPort = (data: TAssertion[], groups: string[]): TSgAndIpPortTypeStatus => {
  const result: TSgAndIpPortTypeStatus = {
    [groups[0]]: {
      src: [],
      dst: [],
    },
    [groups[1]]: {
      src: [],
      dst: [],
    },
  }
  groups.forEach(group => {
    data
      .filter(({ from }) => from === group)
      .forEach(({ from, src_ip, src_port, status }) => {
        const portIndex = findIndexByIpAndPortPairInArr(src_ip, src_port, result[from].src)
        if (portIndex === -1) {
          result[group].src.push({ ip: src_ip, port: src_port, status })
        } else if (result[group].src[portIndex].status !== status) {
          result[group].src[portIndex].status = 'both'
        }
      })
    data
      .filter(({ to }) => to === group)
      .forEach(({ to, dst_ip, dst_port, status }) => {
        const portIndex = findIndexByIpAndPortPairInArr(dst_ip, dst_port, result[to].dst)
        if (portIndex === -1) {
          result[group].dst.push({ ip: dst_ip, port: dst_port, status })
        } else if (result[group].dst[portIndex].status !== status) {
          result[group].dst[portIndex].status = 'both'
        }
      })
  })

  return result
}

export const makeLowLevelNodes = (data: TAssertion[], groups: string[]): Node[] => {
  const result: Node[] = []
  const ipPortsByGroups = makeNodesObjectByUniqueIpAndPort(data, groups)
  const srcLength = Math.max(ipPortsByGroups[groups[0]].src.length, ipPortsByGroups[groups[1]].dst.length)
  const dstLength = Math.max(ipPortsByGroups[groups[0]].dst.length, ipPortsByGroups[groups[1]].src.length)
  const groupNodeLength = 30 * (srcLength + dstLength) + 65

  result.push(makeGroupLowLevelNode(groups[0], 0, groupNodeLength))
  result.push(makeGroupLowLevelNode(groups[1], 300, groupNodeLength))

  const yPadding = 30
  const yOffset = 50
  ipPortsByGroups[groups[0]].src.forEach(({ ip, port, status }, index) => {
    result.push(
      makeLowLevelNode('ipAndProtocolNodeLeft', groups[0], ip, port, 25, yOffset + yPadding * index, status, 'source'),
    )
  })
  ipPortsByGroups[groups[0]].dst.forEach(({ ip, port, status }, index) => {
    result.push(
      makeLowLevelNode(
        'ipAndProtocolNodeLeft',
        groups[0],
        ip,
        port,
        25,
        yOffset + (srcLength + index) * yPadding,
        status,
        'target',
      ),
    )
  })
  ipPortsByGroups[groups[1]].src.forEach(({ ip, port, status }, index) => {
    result.push(
      makeLowLevelNode(
        'ipAndProtocolNodeRight',
        groups[1],
        ip,
        port,
        25,
        yOffset + (srcLength + index) * yPadding,
        status,
        'source',
      ),
    )
  })
  ipPortsByGroups[groups[1]].dst.forEach(({ ip, port, status }, index) => {
    result.push(
      makeLowLevelNode('ipAndProtocolNodeRight', groups[1], ip, port, 25, yOffset + yPadding * index, status, 'target'),
    )
  })
  return result
}
