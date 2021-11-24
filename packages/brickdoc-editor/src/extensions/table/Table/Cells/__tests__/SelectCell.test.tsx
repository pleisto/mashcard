import { SelectCell } from '../SelectCell'
import { render, screen, fireEvent } from '@testing-library/react'
import { COLOR } from '../../../../helpers/color'

describe('SelectCell', () => {
  const color = COLOR[0].color
  const id = 'id'
  const label = 'label'

  const id2 = 'id2'
  const label2 = 'label2'

  const selectOptions = [
    {
      value: 'id',
      label,
      color
    },
    {
      value: id2,
      label: label2,
      color: COLOR[1].color
    }
  ]

  const props: any = {
    value: id,
    resetActiveStatus: () => {},
    updateActiveStatus: () => {},
    column: {
      id: 'columnId',
      selectOptions
    },
    cell: {
      row: {
        index: 0,
        original: {
          id
        }
      },
      column: {
        id: 'columnId'
      }
    }
  }

  beforeEach(() => {
    props.column.selectOptions = selectOptions.map(item => ({ ...item }))
  })

  it('matches correct snapshot', () => {
    const { container } = render(<SelectCell {...props} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly', () => {
    render(<SelectCell {...props} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText(label)).toBeInTheDocument()
    expect(screen.getByText(label)).toHaveStyle({ color })
  })

  it('turns into editing when click cell', () => {
    render(<SelectCell {...props} />)

    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('turns into tag when click overlay', () => {
    const updateData = jest.fn()
    render(<SelectCell {...props} updateData={updateData} />)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByTestId('table-select-overlay'))

    expect(screen.getByRole('button')).toHaveTextContent(label)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('searches options normally', () => {
    render(<SelectCell {...props} />)

    fireEvent.click(screen.getByRole('button'))
    fireEvent.change(screen.getByRole('combobox'), { target: { value: label2 } })

    const option = screen.getByRole('listitem')
    expect(option).toHaveTextContent(label2)
  })

  it('selects option normally', () => {
    const updateData = jest.fn()
    const setColumns = (fn: Function): void => {
      const newColumns = fn([{ ...props.column, key: props.column.id }])
      props.column = newColumns[0]

      rerender(<SelectCell {...props} updateData={updateData} />)
    }

    const { rerender } = render(<SelectCell {...props} updateData={updateData} setColumns={setColumns} />)

    fireEvent.click(screen.getByRole('button'))

    const elements = screen.getAllByRole('listitem')
    fireEvent.click(elements[elements.length - 1])

    expect(updateData).toBeCalledTimes(1)
    expect(updateData).toBeCalledWith(props.cell.row.original.id, props.cell.column.id, id2)
  })

  it('creates new option if no option match search value', () => {
    const setColumns = (fn: Function): void => {
      const newColumns = fn([{ ...props.column, key: props.column.id }])
      props.column = newColumns[0]

      rerender(<SelectCell {...props} updateData={updateData} />)
    }

    const updateData = jest.fn()
    const newOption = 'new option'

    const { rerender } = render(<SelectCell {...props} updateData={updateData} setColumns={setColumns} />)

    fireEvent.click(screen.getByRole('button'))
    fireEvent.change(screen.getByRole('combobox'), { target: { value: newOption } })

    const elements = screen.getAllByText(newOption)
    fireEvent.click(elements[elements.length - 1])

    expect(updateData).toBeCalledTimes(1)
  })

  describe('Select Option', () => {
    beforeEach(() => {
      props.column.selectOptions = selectOptions.map(item => ({ ...item }))
    })

    it('shows option menu when click menu button', () => {
      render(<SelectCell {...props} />)

      fireEvent.click(screen.getByRole('button'))
      const menuButtons = screen.getAllByRole('button')
      fireEvent.click(menuButtons[0])

      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('changes option name correctly', () => {
      const setColumns = (fn: Function): void => {
        const newColumns = fn([{ ...props.column, key: props.column.id }])
        props.column = newColumns[0]

        rerender(<SelectCell {...props} />)
      }

      const newLabel = 'newLabel'
      const updateData = jest.fn()
      const { rerender } = render(<SelectCell {...props} updateData={updateData} setColumns={setColumns} />)

      fireEvent.click(screen.getByRole('button'))
      const menuButtons = screen.getAllByRole('button')
      fireEvent.click(menuButtons[0])
      fireEvent.change(screen.getByDisplayValue(label), { target: { value: `${newLabel}\n` } })

      const options = screen.getAllByRole('listitem')

      expect(options[0]).toHaveTextContent(newLabel)
    })

    it('delete option which is not current value', () => {
      const setColumns = (fn: Function): void => {
        const newColumns = fn([{ ...props.column, key: props.column.id }])
        props.column = newColumns[0]

        rerender(<SelectCell {...props} />)
      }

      const updateData = jest.fn()
      const batchDeleteDataByValue = jest.fn()
      const { rerender } = render(
        <SelectCell {...props} updateData={updateData} setColumns={setColumns} batchDeleteDataByValue={batchDeleteDataByValue} />
      )

      fireEvent.click(screen.getByRole('button'))
      const menuButtons = screen.getAllByRole('button')
      fireEvent.click(menuButtons[1])
      fireEvent.click(screen.getByText('Delete'))
      fireEvent.click(screen.getAllByText('Delete')[1])

      const options = screen.getAllByRole('listitem')

      expect(options).toHaveLength(1)
      expect(updateData).not.toHaveBeenCalled()
    })

    it('delete option which is current value', () => {
      const setColumns = (fn: Function): void => {
        const newColumns = fn([{ ...props.column, key: props.column.id }])
        props.column = newColumns[0]

        rerender(<SelectCell {...props} updateData={updateData} />)
      }

      const updateData = jest.fn()
      const batchDeleteDataByValue = jest.fn()
      const { rerender } = render(
        <SelectCell {...props} updateData={updateData} setColumns={setColumns} batchDeleteDataByValue={batchDeleteDataByValue} />
      )

      fireEvent.click(screen.getByRole('button'))
      const menuButtons = screen.getAllByRole('button')
      fireEvent.click(menuButtons[0])
      fireEvent.click(screen.getByText('Delete'))
      fireEvent.click(screen.getAllByText('Delete')[1])

      const options = screen.getAllByRole('listitem')
      expect(options).toHaveLength(1)

      fireEvent.click(screen.getByTestId('table-select-overlay'))

      expect(updateData).toBeCalledTimes(1)
      expect(updateData).toBeCalledWith(props.cell.row.original.id, props.cell.column.id, null)
    })

    it('picks color for option', () => {
      const setColumns = (fn: Function): void => {
        const newColumns = fn([{ ...props.column, key: props.column.id }])
        props.column = newColumns[0]

        rerender(<SelectCell {...props} />)
      }

      const updateData = jest.fn()
      const { rerender } = render(<SelectCell {...props} updateData={updateData} setColumns={setColumns} />)

      fireEvent.click(screen.getByRole('button'))
      const menuButtons = screen.getAllByRole('button')
      fireEvent.click(menuButtons[1])
      // random pick item 4
      const newColor = COLOR[4]
      fireEvent.click(screen.getByText(newColor.label))

      expect(screen.getByText(label2)).toHaveStyle({ color: newColor.color })
    })
  })
})
