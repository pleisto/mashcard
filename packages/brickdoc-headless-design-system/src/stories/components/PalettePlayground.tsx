import { useState } from 'react'
import { SketchPicker } from 'react-color'
import { css } from '../../themes'
import { generatePalette } from '../../utilities'

const toolbar = css({
  display: 'flex',
  verticalAlign: 'middle',
  lineHeight: '2rem',
  alignItems: 'center',
  '&>button': {
    marginLeft: '.5rem',
    width: '4rem',
    height: '1.5rem',
    borderRadius: '2px'
  }
})

const picker = css({
  zIndex: '1000'
})

const styles = css({
  display: 'flex',
  margin: '2rem',
  alignItems: 'center',
  '&>section': {
    boxSize: '1.5em',
    border: '1px solid #333',
    marginRight: '1em'
  }
})

export const PalettePlayground: React.FC = props => {
  const [color, setColor] = useState('#36282b')
  const handleChange = (color): void => {
    setColor(color.hex)
  }

  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <div className={toolbar()}>
        <SketchPicker className={picker()} color={color} onChange={handleChange} />
      </div>
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        {Object.entries(generatePalette('color', color)).map(i => (
          <li className={styles()} key={i[0]}>
            <section style={{ backgroundColor: i[1] }} />
            <div>
              <strong>{i[0]}</strong>
              <br /> <code>{i[1]}</code>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
