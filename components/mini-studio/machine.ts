import { ACTIVITIES, ACTIVITY_ORDER, AUTO_RESUME_SECONDS, FURNITURE, START_POSITION } from './config'
import { distance, findPath, isWalkable } from './navigation'
import type { Activity, FurnitureConfig, Point, StudioFrame, StudioSnapshot } from './types'

type Request = { activity: Activity | null; point?: Point }
const turn = (from: number, to: number, factor: number) => from + Math.atan2(Math.sin(to - from), Math.cos(to - from)) * factor

/** One clock and one replaceable request. No per-activity timers or overlapping tweens. */
export class StudioMachine {
  readonly frame: StudioFrame = { position: [...START_POSITION], yaw: 0.35, state: 'waving', stage: 'active', pose: 1, time: 0, elapsed: 0, seatActivity: null, seatBlend: 0, seatLift: 0 }
  private listeners = new Set<() => void>()
  private pending: Request | null = null
  private target: Request = { activity: 'waving' }
  private seat: FurnitureConfig | null = null
  private path: Point[] = []
  private sinceInput = AUTO_RESUME_SECONDS
  private paused = false
  private reduced = false
  private automatic = true
  private notice = ''
  private seatDistance = 1
  private exitBlend = 1
  private exitLift = 0
  private snapshot!: StudioSnapshot

  constructor(private random: () => number = Math.random) { this.publish() }
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener) } }
  getSnapshot = () => this.snapshot

  private publish() {
    const f = this.frame
    this.snapshot = {
      state: f.state, activity: this.pending?.activity ?? this.target.activity,
      stage: f.stage, paused: this.paused, reduced: this.reduced, automatic: this.automatic,
      status: this.paused ? 'Animasi dijeda.' : this.notice ||
        (f.stage === 'release' ? 'Sebentar, beres-beres dulu…' :
          f.stage === 'align' || f.stage === 'dock' ? 'Cari posisi yang nyaman…' :
            f.state === 'walking' ? 'Jalan dulu ke sana…' :
              f.state === 'idle' ? 'Siap bantu ide berikutnya.' : ACTIVITIES[f.state].status),
    }
    this.listeners.forEach(listener => listener())
  }

  interact() { this.sinceInput = 0; this.automatic = false; this.publish() }

  setPaused(value: boolean) {
    this.paused = value
    if (!value && this.pending && this.reduced) this.applyStill(this.pending)
    this.publish()
  }

  setReduced(value: boolean) {
    if (this.reduced === value) return
    this.reduced = value; this.sinceInput = 0; this.automatic = false
    if (value) {
      // Freeze in a complete, valid pose even when the OS preference changes mid-route.
      if (this.frame.stage !== 'active') this.applyStill(this.pending ?? this.target)
      this.frame.elapsed = 0
    }
    this.publish()
  }

  request(activity: Activity) { this.enqueue({ activity }, true) }
  direct(point: Point) {
    this.interact()
    if (!isWalkable(point)) { this.notice = 'Pilih lantai kosong yang lebih lapang, ya.'; this.publish(); return false }
    this.enqueue({ activity: null, point }, true)
    return true
  }

  private furniture(request: Request): FurnitureConfig | undefined {
    return request.activity ? FURNITURE.find(item => item.id === ACTIVITIES[request.activity!].furniture) : undefined
  }

  private enqueue(request: Request, manual: boolean) {
    if (manual) { this.sinceInput = 0; this.automatic = false }
    this.notice = ''
    this.pending = request // Latest input wins, including while releasing or leaving a seat.
    if (this.reduced && !this.paused) this.applyStill(request)
    this.publish()
  }

  private applyStill(request: Request) {
    const furniture = this.furniture(request)
    const position = request.point ?? furniture?.dock ?? furniture?.destination ?? START_POSITION
    this.frame.position = [...position]
    this.frame.yaw = furniture?.yaw ?? 0.35
    this.frame.state = request.activity ?? 'idle'; this.frame.stage = 'active'
    this.frame.pose = 1; this.frame.elapsed = 0
    this.target = request; this.pending = null
    this.seat = furniture?.dock ? furniture : null
    this.frame.seatActivity = this.seat ? request.activity as 'coding' | 'sleeping' : null
    this.frame.seatBlend = this.seat ? 1 : 0; this.frame.seatLift = 0
  }

  private plan() {
    const request = this.pending ?? this.target
    this.target = request; this.pending = null
    const goal = request.point ?? this.furniture(request)?.destination ?? START_POSITION
    const path = findPath(this.frame.position, goal)
    if (!path) {
      this.frame.state = 'idle'; this.frame.stage = 'active'; this.target = { activity: null }
      this.notice = 'Jalurnya belum bisa dilewati. Pilih titik lain, ya.'; this.publish(); return
    }
    this.path = path; this.frame.state = 'walking'; this.frame.stage = 'travel'
    this.publish()
  }

  private move(dt: number, backwards = false): boolean {
    const next = this.path[0]
    if (!next) return true
    const f = this.frame, d = distance(f.position, next)
    if (d < 0.018) { f.position = [...next]; this.path.shift(); return !this.path.length }
    const speed = Math.min(dt * 0.9, d)
    const dx = (next[0] - f.position[0]) / d, dz = (next[1] - f.position[1]) / d
    if (!backwards) f.yaw = turn(f.yaw, Math.atan2(dx, dz), Math.min(1, dt * 9))
    f.position[0] += dx * speed; f.position[1] += dz * speed
    return false
  }

  step(delta: number) {
    if (this.paused || this.reduced) return
    const dt = Math.min(Math.max(delta, 0), 0.05), f = this.frame
    f.time += dt; this.sinceInput += dt
    if (this.pending && !['release', 'exit'].includes(f.stage)) {
      // A dock interruption returns along that same seat's reserved entry corridor.
      f.stage = 'release'; this.publish()
    }
    if (f.stage === 'release') {
      f.pose = Math.max(0, f.pose - dt * 2.8)
      if (f.pose === 0) {
        if (this.seat) {
          this.path = [this.seat.destination]; this.seatDistance = Math.max(0.01, distance(f.position, this.seat.destination))
          this.exitBlend = f.seatBlend; this.exitLift = f.seatLift
          f.state = 'walking'; f.stage = 'exit'; this.publish()
        }
        else this.plan()
      }
      return
    }
    if (f.stage === 'exit') {
      const done = this.move(dt, true)
      const progress = 1 - Math.min(1, distance(f.position, this.seat!.destination) / this.seatDistance)
      f.seatBlend = this.exitBlend * (1 - progress)
      f.seatLift = this.exitLift * (1 - progress) + Math.sin(progress * Math.PI) * 0.54
      if (done) { this.seat = null; f.seatActivity = null; f.seatBlend = 0; f.seatLift = 0; this.plan() }
      return
    }
    if (f.stage === 'travel') {
      if (this.move(dt)) {
        const furniture = this.furniture(this.target)
        if (furniture?.dock) {
          this.seat = furniture; this.path = [furniture.dock]
          this.seatDistance = Math.max(0.01, distance(f.position, furniture.dock))
          f.seatActivity = this.target.activity as 'coding' | 'sleeping'; f.stage = 'dock'
        }
        else f.stage = 'align'
        this.publish()
      }
      return
    }
    if (f.stage === 'dock') {
      const done = this.move(dt)
      const progress = 1 - Math.min(1, distance(f.position, this.seat!.dock!) / this.seatDistance)
      f.seatBlend = progress; f.seatLift = Math.sin(progress * Math.PI) * 0.54
      if (done) { f.seatBlend = 1; f.seatLift = 0; f.stage = 'align'; this.publish() }
      return
    }
    if (f.stage === 'align') {
      const yaw = this.furniture(this.target)?.yaw ?? 0.35
      f.yaw = turn(f.yaw, yaw, Math.min(1, dt * 7))
      if (Math.abs(Math.atan2(Math.sin(f.yaw - yaw), Math.cos(f.yaw - yaw))) < 0.03) {
        f.state = this.target.activity ?? 'idle'; f.stage = 'active'; f.elapsed = 0; this.publish()
      }
      return
    }
    f.pose = Math.min(1, f.pose + dt * 2.2); f.elapsed += dt
    const duration = f.state === 'idle' || f.state === 'walking' ? 6 : ACTIVITIES[f.state].duration
    if (this.sinceInput >= AUTO_RESUME_SECONDS && f.elapsed > duration) {
      const choices = ACTIVITY_ORDER.filter(activity => activity !== this.target.activity)
      let choice = this.random() * choices.reduce((sum, activity) => sum + ACTIVITIES[activity].weight, 0)
      const activity = choices.find(item => (choice -= ACTIVITIES[item].weight) < 0) ?? 'coding'
      this.automatic = true; this.enqueue({ activity }, false)
    }
  }
}
