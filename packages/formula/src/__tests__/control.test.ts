import { FORMULA_FEATURE_CONTROL } from '../context'
import { makeContext, PageInput } from '../tests'

const namespaceId = '55555555-5555-4444-8888-555555555555'
const testName1 = 'varvarabcvar'

const page: PageInput = {
  pageName: 'Page1',
  pageId: namespaceId,
  variables: [
    { variableName: testName1, definition: '=24' },
    { variableName: 'bar', definition: `=${testName1}` }
  ]
}

describe('Controls', () => {
  it('feature', async () => {
    const noFeatureCtx = await makeContext({ initializeOptions: { domain: 'test', features: [] }, pages: [page] })
    const input = `=Button("Foo", Set(#${namespaceId}.${testName1}, (1 + #${namespaceId}.${testName1})))`
    const { errorMessages: errorMessage1 } = noFeatureCtx.parseDirectly({ definition: input, namespaceId })
    expect(errorMessage1).toEqual([{ message: 'Function Button not found', type: 'deps' }])

    const featureCtx = await makeContext({ initializeOptions: { domain: 'test' }, pages: [page] })
    featureCtx.formulaContext.features = []
    const { errorMessages: errorMessage2 } = featureCtx.parseDirectly({ definition: input, namespaceId })
    expect(errorMessage2).toEqual([{ message: 'Feature formula-controls not enabled', type: 'deps' }])

    featureCtx.formulaContext.features = [FORMULA_FEATURE_CONTROL]
    const { errorMessages: errorMessage3 } = featureCtx.parseDirectly({ definition: input, namespaceId })

    expect(errorMessage3).toEqual([])
  })
})
