import test from 'node:test'
import assert from 'node:assert/strict'
import { ACTIVITY_ORDER, FURNITURE, START_POSITION } from '../config'
import { clearSegment, distance, findPath, isWalkable } from '../navigation'
import { StudioMachine } from '../machine'
import type { Activity, Point } from '../types'

function arrive(machine: StudioMachine, activity: Activity) {
  machine.request(activity)
  const stages = new Set<string>()
  for (let i = 0; i < 1500; i++) {
    const previous: Point = [...machine.frame.position]
    machine.step(1 / 60)
    const f = machine.frame
    stages.add(f.stage)
    assert.ok(distance(previous, f.position) <= 0.026, 'normal motion must never teleport')
    if (f.stage === 'travel') assert.ok(isWalkable(f.position), `blocked floor at ${f.position}`)
    if (f.stage === 'active' && f.state === activity && f.pose >= 0.99) return stages
  }
  assert.fail(`Did not arrive at ${activity}: ${JSON.stringify(machine.getSnapshot())}`)
}

test('every activity is reachable, with all route segments clear of furniture', () => {
  const points = [START_POSITION, ...FURNITURE.map(item => item.destination)]
  for (const start of points) for (const target of points) {
    assert.ok(isWalkable(target), `unreachable destination: ${target}`)
    const path = findPath(start, target)
    assert.notEqual(path, null, `no path between ${start} and ${target}`)
    let previous = start
    for (const point of path!) { assert.ok(clearSegment(previous, point)); previous = point }
  }
})

test('all 25 activity transitions finish, without teleporting or crossing obstacles', () => {
  for (const from of ACTIVITY_ORDER) for (const to of ACTIVITY_ORDER) {
    const machine = new StudioMachine(() => 0)
    arrive(machine, from)
    const stages = arrive(machine, to)
    if (from !== to) assert.ok(stages.has('release'), `${from} must finish before ${to}`)
  }
})

test('latest input wins during sleep exit and during chair docking', () => {
  const machine = new StudioMachine(() => 0)
  arrive(machine, 'sleeping')
  machine.request('coding'); machine.step(0.04)
  machine.request('reviewing'); machine.step(0.04)
  arrive(machine, 'waving')
  assert.equal(machine.frame.state, 'waving')
  machine.request('coding')
  for (let i = 0; i < 1000 && machine.frame.stage !== 'dock'; i++) machine.step(1 / 60)
  assert.equal(machine.frame.stage, 'dock')
  for (let i = 0; i < 18; i++) machine.step(1 / 60)
  const start = [...machine.frame.position] as const
  machine.request('eating')
  assert.deepEqual(machine.frame.position, start)
  arrive(machine, 'reviewing')
  assert.equal(machine.frame.state, 'reviewing')
})

test('pause freezes the clock and pose; requests queue until resume', () => {
  const machine = new StudioMachine()
  arrive(machine, 'sleeping')
  machine.setPaused(true)
  const before = JSON.stringify(machine.frame)
  machine.request('coding'); machine.request('waving')
  for (let i = 0; i < 500; i++) machine.step(0.05)
  assert.equal(JSON.stringify(machine.frame), before)
  machine.setPaused(false)
  for (let i = 0; i < 1200; i++) {
    machine.step(1 / 60)
    if (machine.frame.stage === 'active' && machine.frame.state === 'waving') break
  }
  assert.equal(machine.frame.state, 'waving')
})

test('reduced motion stops autoplay and allows a still pose for each explicit activity', () => {
  const machine = new StudioMachine()
  machine.setReduced(true)
  for (const activity of ACTIVITY_ORDER) {
    machine.request(activity)
    const before = JSON.stringify(machine.frame)
    for (let i = 0; i < 2500; i++) machine.step(0.05)
    assert.equal(JSON.stringify(machine.frame), before)
    assert.equal(machine.frame.state, activity)
    assert.equal(machine.getSnapshot().automatic, false)
  }
})

test('manual activity has priority for 32 seconds, then weighted autoplay can resume', () => {
  const machine = new StudioMachine(() => 0)
  arrive(machine, 'waving')
  for (let i = 0; i < 28 * 60; i++) machine.step(1 / 60)
  assert.equal(machine.getSnapshot().automatic, false)
  for (let i = 0; i < 10 * 60; i++) machine.step(1 / 60)
  assert.equal(machine.getSnapshot().automatic, true)
  assert.equal(machine.getSnapshot().activity, 'coding')
})

test('direct mode rejects blocked, nonfinite, and outside-floor destinations', () => {
  const machine = new StudioMachine()
  for (const point of [[50, 50], [NaN, 1], [Infinity, 0], [-1.4, -1.4], [1.6, -1.1]] as const) {
    const before = [...machine.frame.position]
    assert.equal(machine.direct(point), false)
    assert.deepEqual(machine.frame.position, before)
  }
  assert.equal(machine.direct([-1.8, 1.5]), true)
  for (let i = 0; i < 800; i++) machine.step(1 / 60)
  assert.ok(distance(machine.frame.position, [-1.8, 1.5]) < 0.03)
})
