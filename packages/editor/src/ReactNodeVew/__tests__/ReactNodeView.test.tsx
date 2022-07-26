import { render, screen } from '@testing-library/react'
import { FC, ReactElement, ReactNode } from 'react'
import { NodePortalStore, ReactNodeView, useNodeContent } from '../ReactNodeView'

describe('ReactNodeView', () => {
  it('renders NodeView component correctly', () => {
    const componentProps = {
      text: 'text'
    }
    const component: FC<typeof componentProps> = props => <div>{props.text}</div>

    let child: ReactNode

    const nodePortalStore: NodePortalStore = {
      set(portal) {
        child = portal.child
      },
      remove: jest.fn()
    }

    // eslint-disable-next-line no-new
    new ReactNodeView({
      component,
      componentProps,
      editorView: {} as any,
      nodePortalStore
    })

    render(child as ReactElement)

    expect(screen.getByText(componentProps.text)).toBeInTheDocument()
  })

  it('renders NodeView component with NodeContent correctly', () => {
    const Component: FC = () => {
      const ref = useNodeContent<HTMLDivElement>()
      return <div ref={ref} />
    }

    const text = 'text'

    let child: ReactNode

    const nodePortalStore: NodePortalStore = {
      set(portal) {
        child = portal.child
      },
      remove: jest.fn()
    }

    const nodeView = new ReactNodeView({
      component: Component,
      componentProps: {},
      editorView: {} as any,
      nodePortalStore
    })

    const textElement = document.createElement('span')
    textElement.innerHTML = text
    nodeView.contentDOM?.append(textElement)

    render(child as ReactElement)

    expect(screen.getByText(text)).toBeInTheDocument()
  })

  it('destroys NodeView correctly', () => {
    const component: FC = () => <div />

    const nodePortalStore: NodePortalStore = {
      set: jest.fn(),
      remove: jest.fn()
    }

    const nodeView = new ReactNodeView({
      component,
      componentProps: {},
      editorView: {} as any,
      nodePortalStore
    })

    nodeView.destroy()

    expect(nodePortalStore.remove).toBeCalled()
  })
})
