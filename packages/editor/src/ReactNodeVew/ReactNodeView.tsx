import { uuid } from '@mashcard/active-support'
import { EditorView, NodeView } from 'prosemirror-view'
import { ComponentType } from 'react'
import { NodePortal } from '../NodePortal'
import { flushSync } from 'react-dom'
import { NodeViewContainer } from './NodeViewContainer'

export { useNodeContent } from './NodeViewContainer'
export { NodeViewContainer }

/**
 * The store for nodePortals mutation
 */
export interface NodePortalStore {
  /**
   * Adds or update node portal.
   */
  set: (nodePortal: NodePortal) => void
  /**
   * Removes a node portal by id.
   */
  remove: (id: string) => void
}

/**
 * A Prosemirror NodeView rendering view by react component.
 * @param component The react component for NodeView rendering.
 * @param editorView The editor view of current Prosemirror editor state
 * @param nodePortalStore The store for nodePortals mutation
 * @param asContainer Define the tag of react portal container, optional argument.
 */
export class ReactNodeView<ComponentProps = {}> implements NodeView {
  /**
   * Unique id
   */
  public readonly id: string
  /**
   * The store for nodePortals mutation
   */
  public readonly nodePortalStore: NodePortalStore
  /**
   * The react component for NodeView rendering.
   */
  public readonly component: ComponentType<ComponentProps>
  /**
   * The dom container for NodeView
   */
  public readonly container: HTMLElement
  /**
   * The editor view of current Prosemirror editor state
   */
  public readonly editorView: EditorView

  public contentDOM: HTMLElement | null
  public dom: Element

  constructor({
    component,
    componentProps,
    editorView,
    nodePortalStore,
    asContainer
  }: {
    component: ComponentType<ComponentProps>
    componentProps: ComponentProps
    editorView: EditorView
    nodePortalStore: NodePortalStore
    asContainer?: keyof HTMLElementTagNameMap
  }) {
    this.editorView = editorView
    this.container = document.createElement(asContainer ?? 'div')
    this.contentDOM = document.createElement('div')

    this.nodePortalStore = nodePortalStore
    this.id = uuid()
    this.component = component

    // renders react component synchronously when NodeView created.
    flushSync(() => {
      this.renderComponent(componentProps)
    })

    this.dom = this.container
  }

  public destroy(): void {
    this.nodePortalStore.remove(this.id)
    this.contentDOM = null
  }

  /**
   * Used to set current contentDOM. Set it via useRef in react component for example.
   * @param contentDOM The DOM node that should hold the node's content.
   */
  protected readonly setContentDOM = (contentDOM: HTMLElement | null): void => {
    if (contentDOM) {
      contentDOM.append(...Array.from(this.contentDOM?.childNodes ?? []))
    }
    this.contentDOM = contentDOM
  }

  /**
   * Renders the component for updating NodeView's view.
   */
  protected renderComponent(props: ComponentProps): void {
    this.nodePortalStore.set({
      id: this.id,
      container: this.container,
      child: (
        <NodeViewContainer setContentDOM={this.setContentDOM}>
          <this.component {...props} />
        </NodeViewContainer>
      )
    })
  }
}
