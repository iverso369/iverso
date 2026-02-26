import { useState } from 'react'
import './CompanySizeSlider.css'

const LEVELS = [
  'Egyedül',
  'Kis csapat',
  'Több részleg',
  'Komoly szervezet',
] as const

interface CompanySizeSliderProps {
  onChange: (index: number) => void
}

export default function CompanySizeSlider({ onChange }: CompanySizeSliderProps) {
  const [active, setActive] = useState(0)

  const handleSelect = (index: number) => {
    setActive(index)
    onChange(index)
  }

  const fillPercent = (active / (LEVELS.length - 1)) * 100

  return (
    <div className="slider">
      {/* Track */}
      <div className="slider__track-container">
        <div className="slider__track" />
        <div
          className="slider__fill"
          style={{ width: `${fillPercent}%` }}
        />
        <input
          type="range"
          className="slider__input"
          min={0}
          max={LEVELS.length - 1}
          step={1}
          value={active}
          onChange={(e) => handleSelect(Number(e.target.value))}
          aria-label="Vállalkozás mérete"
        />
      </div>

      {/* Labels */}
      <div className="slider__labels">
        {LEVELS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={`slider__label${i === active ? ' slider__label--active' : ''}`}
            onClick={() => handleSelect(i)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
