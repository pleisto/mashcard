import { Skeleton, Space } from '../../../components'

const Base = () => (
  <>
    <Skeleton avatar paragraph={{ rows: 4 }} />
    <br />
    <br />
    <Skeleton active />
    <br />
    <br />
    <Skeleton loading={true}>
      <div>
        <h4>《知行录》</h4>
        <p>
          先生游南镇，一友指岩中花树问曰：「天下无心外之物，如此花树，在深山中自开自落，于我心亦何相关？」
          先生曰：「你未看此花时，此花与汝心同归于寂。你来看此花时，则此花颜色一时明白起来。便知此花不在你的心外。」
        </p>
      </div>
    </Skeleton>
    <br />
    <br />
    <Space>
      <Skeleton.Button />
      <Skeleton.Button />
      <Skeleton.Avatar />
      <Skeleton.Input style={{ width: 200 }} />
    </Space>
  </>
)
export default Base
