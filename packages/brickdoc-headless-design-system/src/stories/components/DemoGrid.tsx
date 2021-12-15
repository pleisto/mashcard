import { useState } from 'react'
import { css } from '../../themes'

const styles = css({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '2rem 0',
  justifyContent: 'space-between',
  '&>div': {
    height: '7rem',
    width: '12rem',
    margin: '10px',
    display: 'flex',
    include: ['flexCenter']
  }
})

export const DemoGrid: React.FC = props => {
  const [bg, setBg] = useState('#fff')
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const val = e.target.value
    setBg(val.startsWith('http') ? `url(${val}) center center / cover no-repeat` : val)
  }

  return (
    <div>
      <p>
        <code>Select Background: </code>
        <select name="select" onChange={e => handleChange(e)} defaultValue="#fff">
          <option value="#fff">White</option>
          <option value="#000">Black</option>
          <option value="#d3d3d3">Grey4</option>
          <option value="#2c5bff">Primary</option>
          <option value="https://s3.brickapis.com/design-system/ceramic.44624ad7.jpg">Image / Blur Background</option>
          <option value="https://images.unsplash.com/photo-1553356084-58ef4a67b2a7">Image / Colorful</option>
          <option value="https://s3.brickapis.com/design-system/banner.png">Image / Clear</option>
          <option value="https://images.unsplash.com/photo-1638091986258-0c285a62defd">Image / Deep</option>
        </select>
      </p>
      <article className={styles()} style={{ background: bg }}>
        {props.children}
      </article>
    </div>
  )
}
