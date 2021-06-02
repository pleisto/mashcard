import React from "react"

interface ColorsProps{
  colors: {
    [name: string]: string
  }
}

export const Colors: React.FC<ColorsProps> = props=>{
  const colorsArray: JSX.Element[] = []
  Object.keys(props.colors).forEach((name) => {
    if (props.colors[name].startsWith('#') || props.colors[name].startsWith('rgb')) {
      colorsArray.push(
        <div style={{ marginBottom: "5px", marginTop: "5px" }}>
          <div
            style={{
              backgroundColor: props.colors[name],
              borderColor:  (props.colors[name] === '#fff' || props.colors[name] .startsWith("rgba(255, 255, 255")) ?
                'rgba(44, 54, 67, 0.2)':'transparent',
              borderStyle: "solid",
              borderWidth: "1px",
              display: "inline-block",
              height: "30px",
              marginRight: "10px",
              width: "30px"
            }}
          />
          <pre
            style={{
              display: "inline-block",
              fontSize: "14px",
              lineHeight: "30px"
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "250px"
              }}
            >
              <span>{name}</span>
            </span><span style={{ userSelect: "none" }}>{props.colors[name]}</span>
          </pre>
        </div>
      )
    }
  })

  return (

      <ul
        style={{
          display: "inline-block",
          listStyle: "none",
          margin: 0,
          padding: 0,
          textAlign: "left"
        }}
      >
        <li>
          <div style={{ marginBottom: "5px", marginTop: "5px" }}>
            <div
              style={{
                backgroundColor: 'transparent',
                borderColor:  'transparent',
                borderStyle: "solid",
                borderWidth: "1px",
                display: "inline-block",
                height: "30px",
                marginRight: "10px",
                width: "30px"
              }}
            />
            <pre
              style={{
                display: "inline-block",
                fontSize: "14px",
                lineHeight: "30px"
              }}
            >
            <span
              style={{
                display: "inline-block",
                width: "250px"
              }}
            >

            <span>Token Name</span>
            </span>
               <span style={{ userSelect: "none" }}>Value</span>

          </pre>
          </div>
        </li>
        {colorsArray.map((el, i) => (
          <li key={i} style={{ borderTop: `1px solid rgba(44, 54, 67, 0.2)` }}>{el}</li>
        ))}
      </ul>

  )
}
