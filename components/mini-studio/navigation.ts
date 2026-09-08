import { FURNITURE, MASCOT_RADIUS, ROOM } from './config'
import type { Point, Rect } from './types'

export const distance = (a: Point, b: Point) => Math.hypot(a[0] - b[0], a[1] - b[1])
const obstacles: Rect[] = FURNITURE.flatMap(item => item.collider ? [item.collider] : [])

export function isWalkable(p: Point, radius = MASCOT_RADIUS): boolean {
  if (!p.every(Number.isFinite)) return false
  if (p[0] < ROOM.minX + radius || p[0] > ROOM.maxX - radius || p[1] < ROOM.minZ + radius || p[1] > ROOM.maxZ - radius) return false
  return obstacles.every(r => p[0] < r.minX - radius || p[0] > r.maxX + radius || p[1] < r.minZ - radius || p[1] > r.maxZ + radius)
}

export function clearSegment(a: Point, b: Point): boolean {
  const samples = Math.max(1, Math.ceil(distance(a, b) / 0.045))
  for (let i = 0; i <= samples; i++) {
    const t = i / samples
    if (!isWalkable([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t])) return false
  }
  return true
}

// Small A* grid, with swept segments and no diagonal corner cutting.
// Only the dedicated dock/exit segment may enter its own seat's footprint.
export function findPath(start: Point, goal: Point): Point[] | null {
  if (!isWalkable(start) || !isWalkable(goal)) return null
  if (clearSegment(start, goal)) return distance(start, goal) < 0.015 ? [] : [goal]
  const step = 0.18
  const nodes: Point[] = []
  const grid = new Map<string, number>()
  for (let x = 0; x <= 32; x++) for (let z = 0; z <= 22; z++) {
    const p: Point = [-2.88 + x * step, -1.98 + z * step]
    if (isWalkable(p)) { grid.set(`${x},${z}`, nodes.length); nodes.push(p) }
  }
  const neighbors: number[][] = nodes.map(() => [])
  for (const [key, index] of grid) {
    const [x, z] = key.split(',').map(Number)
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
      const other = grid.get(`${x + dx},${z + dz}`)
      if (other !== undefined && clearSegment(nodes[index], nodes[other])) neighbors[index].push(other)
    }
  }
  const startId = nodes.length; nodes.push(start); neighbors.push([])
  const goalId = nodes.length; nodes.push(goal); neighbors.push([])
  for (let i = 0; i < startId; i++) {
    if (distance(start, nodes[i]) < 0.5 && clearSegment(start, nodes[i])) neighbors[startId].push(i)
    if (distance(goal, nodes[i]) < 0.5 && clearSegment(goal, nodes[i])) neighbors[i].push(goalId)
  }
  const open = new Set([startId]), previous = new Map<number, number>()
  const cost = new Map([[startId, 0]])
  while (open.size) {
    let current = -1, score = Infinity
    for (const node of open) {
      const candidate = cost.get(node)! + distance(nodes[node], goal)
      if (candidate < score) { current = node; score = candidate }
    }
    if (current === goalId) {
      const path: Point[] = [goal]
      while (previous.has(current)) { current = previous.get(current)!; path.unshift(nodes[current]) }
      const smooth: Point[] = []
      let cursor = 0
      while (cursor < path.length - 1) {
        let next = path.length - 1
        while (next > cursor + 1 && !clearSegment(path[cursor], path[next])) next--
        smooth.push(path[next]); cursor = next
      }
      return smooth
    }
    open.delete(current)
    for (const neighbor of neighbors[current]) {
      const nextCost = cost.get(current)! + distance(nodes[current], nodes[neighbor])
      if (nextCost < (cost.get(neighbor) ?? Infinity)) {
        cost.set(neighbor, nextCost); previous.set(neighbor, current); open.add(neighbor)
      }
    }
  }
  return null
}
