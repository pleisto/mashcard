import { createTheme } from 'vite-pages-theme-doc'

export default createTheme({
  topNavs: [
    {
      label: 'Github',
      href: 'https://github.com/brickdoc/brickdoc',
      icon: '⭐'
    }
  ],
  logo: <div style={{ marginLeft: 40, fontSize: '20px' }}>Brickdoc Design</div>
})
