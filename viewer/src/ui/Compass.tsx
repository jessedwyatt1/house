import { useCompassHeading } from './useCompassHeading.ts'

const CARDINALS = [
  { label: 'N', angle: 0, major: true },
  { label: 'E', angle: 90, major: false },
  { label: 'S', angle: 180, major: false },
  { label: 'W', angle: 270, major: false },
] as const

export function Compass() {
  const headingDeg = useCompassHeading()

  return (
    <div className="compass" aria-label="Map compass — north is up on the site">
      <div className="compass__ring">
        <div
          className="compass__dial"
          style={{ transform: `rotate(${-headingDeg}deg)` }}
        >
          {CARDINALS.map(({ label, angle, major }) => (
            <span
              key={label}
              className={`compass__label${major ? ' compass__label--north' : ''}`}
              style={{ transform: `rotate(${angle}deg) translateY(-22px)` }}
            >
              {label}
            </span>
          ))}
          <span className="compass__tick compass__tick--north" />
          <span className="compass__tick compass__tick--east" />
          <span className="compass__tick compass__tick--south" />
          <span className="compass__tick compass__tick--west" />
        </div>
        <span className="compass__center" />
      </div>
    </div>
  )
}
