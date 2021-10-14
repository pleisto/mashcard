import './Color.vars.less'

export const Colors = () => {
  const colorsList: Array<{
    k: string
    v: string
  }> = []
  const colorsArray: JSX.Element[] = []

  /* eslint-disable */
  const allCss = [].slice.call(document.styleSheets).reduce((prev, styleSheet) => {
    if (styleSheet.cssRules) {
      return (
        prev +
        [].slice.call(styleSheet.cssRules).reduce((prev, cssRule) => {
          if (cssRule.selectorText === ':root') {
            let css = cssRule.cssText.split('{')
            css = css[1].replace('}', '').split(';')
            for (let i = 0; i < css.length; i++) {
              const prop = css[i].split(':')
              if (prop.length === 2 && prop[0].indexOf('--') === 1) {
                colorsList.push({
                  k: prop[0],
                  v: prop[1]
                })
              }
            }
          }
        }, '')
      )
    }
  }, '')
  /* eslint-disable */

  Object.keys(colorsList).forEach(name => {
    colorsArray.push(
      <div className="item">
        <div
          style={{
            backgroundColor: colorsList[name].v,
            borderStyle: 'solid',
            borderWidth: '1px',
            display: 'inline-block',
            height: '30px',
            marginRight: '10px',
            width: '30px'
          }}
        />
        <div
          style={{
            display: 'inline-block',
            fontSize: '14px',
            lineHeight: '30px'
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '250px'
            }}
          >
            {colorsList[name].k.split('--')[1]}
          </span>
          <span style={{ userSelect: 'none' }}>{colorsList[name].v}</span>
        </div>
      </div>
    )
  })

  return (
    <ul
      style={{
        display: 'inline-block',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        textAlign: 'left'
      }}
    >
      <li>
        <div className="item">
          <div
            style={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              borderStyle: 'solid',
              borderWidth: '1px',
              display: 'inline-block',
              height: '30px',
              marginRight: '10px',
              width: '30px'
            }}
          />
          <div
            style={{
              display: 'inline-block',
              fontSize: '14px',
              lineHeight: '30px'
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '250px'
              }}
            >
              <span>Token Name</span>
            </span>
            <span style={{ userSelect: 'none' }}>Value</span>
          </div>
        </div>
      </li>
      {colorsArray.map((el, i) => (
        <li key={i} style={{ borderTop: `1px solid rgba(44, 54, 67, 0.2)` }}>
          {el}
        </li>
      ))}
    </ul>
  )
}
