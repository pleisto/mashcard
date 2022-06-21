import { FC } from 'react'
import { EmptyOrFoundProps, EmptyType } from './constants'

export const EmptyOrFound: FC<EmptyOrFoundProps> = props => {
  const { prefixCls, type } = props

  const hasSearchIcon =
    type === EmptyType.Found ? (
      <>
        <circle
          cx="50.0208"
          cy="30.0208"
          r="7"
          transform="rotate(-45 50.0208 30.0208)"
          stroke="#BFBCC6"
          strokeWidth="3"
        />
        <rect
          x="52.8492"
          y="34.9706"
          width="3"
          height="10"
          rx="1.5"
          transform="rotate(-45 52.8492 34.9706)"
          fill="#BFBCC6"
        />
      </>
    ) : null

  return (
    <svg className={prefixCls} width="108" height="88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter={`url(#a-${props.uid})`}>
        <path
          d="M34.642 32.597A1.23 1.23 0 0 1 35.697 32H72.11c.426 0 .822.22 1.046.582l5.658 9.12c.121.195.185.42.185.649v24.418c0 .68-.551 1.231-1.23 1.231H30.23A1.23 1.23 0 0 1 29 66.77V42.34c0-.222.06-.441.175-.632l5.466-9.11Z"
          fill={`url(#b-${props.uid})`}
        />
      </g>
      <g filter={`url(#c-${props.uid})`}>
        <path
          d="M44.171 43.028A1.23 1.23 0 0 0 42.957 42H30.231c-.68 0-1.231.551-1.231 1.23v23.54c0 .679.551 1.23 1.23 1.23h47.54c.679 0 1.23-.551 1.23-1.23V43a1 1 0 0 0-1-1H65.043a1.23 1.23 0 0 0-1.214 1.028l-.658 3.944A1.23 1.23 0 0 1 61.957 48H46.043a1.23 1.23 0 0 1-1.214-1.028l-.658-3.944Z"
          fill="#fff"
          fillOpacity=".5"
          shapeRendering="crispEdges"
        />
      </g>
      <path fill="#1A2A64" fillOpacity=".05" d="M69 59h5v5h-5z" />
      <path
        d="M31.06 24.493a1.967 1.967 0 1 1 2.284-3.18l7.562 6.663a.96.96 0 0 1-1.115 1.553l-8.73-5.036Z"
        fill={`url(#d-${props.uid})`}
      />
      <path
        d="M39.658 14.761a1.608 1.608 0 1 1 3.038-1.032l3.068 11.72a.742.742 0 0 1-1.402.476l-4.704-11.164Z"
        fill={`url(#e-${props.uid})`}
      />
      <path
        d="M53.71 12.915a1.795 1.795 0 1 1 3.526.635l-3.393 13.37a.826.826 0 0 1-1.623-.293l1.49-13.712Z"
        fill={`url(#f-${props.uid})`}
      />
      {hasSearchIcon}
      <defs>
        <linearGradient
          id={`d-${props.uid}`}
          x1="30.446"
          y1="21.642"
          x2="41.051"
          y2="29.257"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E0E5EE" />
          <stop offset="1" stopColor="#F8F9FB" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`e-${props.uid}`}
          x1="40.623"
          y1="12.614"
          x2="45.285"
          y2="26.34"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E0E5EE" />
          <stop offset="1" stopColor="#F8F9FB" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`f-${props.uid}`}
          x1="55.814"
          y1="11.342"
          x2="52.895"
          y2="27.529"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E0E5EE" />
          <stop offset="1" stopColor="#F8F9FB" stopOpacity="0" />
        </linearGradient>
        <filter
          id={`a-${props.uid}`}
          x="25"
          y="28"
          width="58"
          height="44"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.329167 0 0 0 0 0.329167 0 0 0 0 0.329167 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1168_164" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_1168_164" result="shape" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx=".6" dy=".6" />
          <feGaussianBlur stdDeviation=".25" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />
          <feBlend in2="shape" result="effect2_innerShadow_1168_164" />
        </filter>
        <filter
          id={`c-${props.uid}`}
          x="25"
          y="38.308"
          width="58"
          height="36.692"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation="1.846" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1168_164" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.827451 0 0 0 0 0.827451 0 0 0 0 0.827451 0 0 0 0.4 0" />
          <feBlend in2="effect1_backgroundBlur_1168_164" result="effect2_dropShadow_1168_164" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx=".615" dy=".615" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0" />
          <feBlend in2="effect2_dropShadow_1168_164" result="effect3_dropShadow_1168_164" />
          <feBlend in="SourceGraphic" in2="effect3_dropShadow_1168_164" result="shape" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx=".615" dy=".615" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
          <feBlend in2="shape" result="effect4_innerShadow_1168_164" />
        </filter>
        <radialGradient
          id={`b-${props.uid}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(0 36 -60.1967 0 54 32)"
        >
          <stop stopColor="#EFF2F4" />
          <stop offset=".51" stopColor="#CBD1DB" />
          <stop offset="1" stopColor="#FCFDFF" />
        </radialGradient>
      </defs>
    </svg>
  )
}
