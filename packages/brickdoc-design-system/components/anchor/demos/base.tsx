import { Anchor } from '../../../components'
const AnchorLink = Anchor.Link
const Base = () => (
  <Anchor affix={false} bounds={5} offsetTop={0} onChange={() => {}} onClick={() => {}}>
    <AnchorLink href="javascript:;console.log(1)" title="Basic demo" />
    <AnchorLink href="javascript:;console.log(2)" title="Static demo" />
    <AnchorLink href="javascript:;console.log(3)" title="API">
      <AnchorLink href="javascript:;console.log(4)" title="Anchor Props" />
      <AnchorLink href="javascript:;console.log(5)" title="Link Props" />
    </AnchorLink>
  </Anchor>
)
export default Base
