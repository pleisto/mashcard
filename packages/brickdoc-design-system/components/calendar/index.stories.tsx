import React from 'react'
import { Story } from '@storybook/react'
import { Calendar, CalendarProps, Badge } from '../'

export default {
  title: 'ReactComponents/Calendar',
  component: Calendar,
  argTypes: {
    dateCellRender: {
      description: 'Customize the display of the date cell, the returned content will be appended to the cell',
      table: {
        type: { summary: 'function(date: moment): ReactNode' }
      }
    },
    dateFullCellRender: {
      description: 'Customize the display of the date cell, the returned content will override the cell',
      table: {
        type: { summary: 'function(date: moment): ReactNode' }
      }
    },
    defaultValue: {
      description: 'The date selected by default',
      table: {
        type: { summary: 'Date' }
      }
    },
    disabledDate: {
      description: 'Function that specifies the dates that cannot be selected',
      table: {
        type: { summary: '(currentDate: Date) => boolean' }
      }
    },
    fullscreen: {
      description: 'Whether to display in full-screen',
      defaultValue: true,
      control: {
        type: 'boolean'
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    headerRender: {
      description: 'Render custom header in panel',
      table: {
        type: { summary: 'function(object:{value: moment, type: string, onChange: f(), onTypeChange: f()})' }
      }
    },
    locale: {
      description: "The calendar's locale",
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: 'default locale' }
      }
    },
    mode: {
      description: 'The display mode of the calendar',
      defaultValue: 'month',
      control: {
        type: 'radio',
        options: ['month', 'year']
      }
    },
    monthCellRender: {
      description: 'Customize the display of the month cell, the returned content will be appended to the cell',
      table: {
        type: { summary: 'function(date: Date): ReactNode' }
      }
    },
    monthFullCellRender: {
      description: 'Customize the display of the month cell, the returned content will override the cell',
      table: {
        type: { summary: 'function(date: Date): ReactNode' }
      }
    },
    validRange: {
      description: 'To set valid range',
      table: {
        type: { summary: '[Date, Date]' }
      }
    },
    value: {
      description: 'The current selected date',
      table: {
        type: { summary: 'Date' }
      }
    },
    onChange: {
      description: 'Callback for when date changes',
      table: {
        type: { summary: 'function(date: Date)' }
      }
    },
    onPanelChange: {
      description: 'Callback for when panel changes',
      table: {
        type: { summary: 'function(date: Date, mode: string)' }
      }
    },
    onSelect: {
      description: 'Callback for when a date is selected',
      table: {
        type: { summary: 'function(date: Date)' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
Container for displaying data in calendar form.

#### When To Use
When data is in the form of dates, such as schedules, timetables, prices calendar,
lunar calendar. This component also supports Year/Month switch.
`
      }
    }
  }
}

const Template: Story<CalendarProps<Date>> = args => <Calendar {...args} />
export const Base = Template.bind({})

export const Card: Story<CalendarProps<Date>> = _args => (
  <div style={{ width: '300px', border: '1px solid #f0f0f0', borderRadius: '2px' }}>
    <Calendar fullscreen={false} />
  </div>
)

Card.parameters = {
  docs: {
    description: {
      story: `Nested inside a container element for rendering in limited space.`
    }
  }
}

// events
function getListData(value: Date) {
  let listData
  console.log(value)
  switch (value.getDate()) {
    case 8:
      listData = [
        { type: 'warning', content: 'DEV Q&A' },
        { type: 'success', content: 'Kickoff Meeting' }
      ]
      break
    case 10:
      listData = [
        { type: 'warning', content: '天地玄黄' },
        { type: 'success', content: '宇宙洪荒' },
        { type: 'error', content: '吉光片羽' }
      ]
      break
    case 15:
      listData = [
        { type: 'warning', content: 'warning event' },
        { type: 'error', content: 'error event 4' }
      ]
      break
    default:
  }
  return listData || []
}

function dateCellRender(value: Date) {
  const listData = getListData(value)
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {listData.map(item => (
        <li key={item.content}>
          <Badge
            status={item.type}
            text={<span style={{ width: '100%', overflow: 'hidden', fontSize: '12px', textOverflow: 'ellipsis' }}>{item.content}</span>}
          />
        </li>
      ))}
    </ul>
  )
}

function getMonthData(value: Date) {
  if (value.getMonth() === 8) {
    return 1394
  }
}

function monthCellRender(value: Date) {
  const num = getMonthData(value)
  return num ? (
    <div style={{ fontSize: '28', textAlign: 'center' }}>
      <section style={{ fontSize: '28' }}>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null
}

export const Events: Story<CalendarProps<Date>> = _args => <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />

Events.parameters = {
  docs: {
    description: {
      story: `This component can be rendered by using dateCellRender and monthCellRender with the data you need.`
    }
  }
}
