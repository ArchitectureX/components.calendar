import cx from '@architecturex/utils.cx'
import dates from '@architecturex/utils.dates'
import SVG from '@architecturex/components.svg'
import React, { FC, useEffect, useState } from 'react'

const date = new Date()

type Event = {
  startDate: string
  endDate: string
  title: string
  color?: string
  data?: any
}

type Props = {
  events: Event[]
  dateClick?: any
  t?: any
  splitter?: '-' | '/'
  view?: 'desktop' | 'mobile w-[96%]'
}

let translate = (text: string) => text

const listStyle = 'grid grid-cols-7 m-auto p-0 w-full'

const classes: any = {
  mobile: {
    header: 'flex items-center justify-between py-3 px-5 bg-codGray text-white w-[98%]',
    currentDate: 'text-xl',
    weekdays: 'hidden',
    weekDaysLi: 'py-2 px-3 text-sm',
    dayGrid: 'flex flex-col m-0 p-0 list-none',
    dayGridLi: 'w-full flex items-center justify-between border-b border-l border-r border-gray-800 bg-white py-2 px-2 relative',
    dayTodayPreviousAndNextMonth: 'flex-grow',
    dayGridLiToday: 'bg-blue-700 text-white',
    dayNumber: 'text-base flex-shrink-0 w-8',
    event: 'bg-fire text-white p-5 rounded-md text-sm mr-3 max-w-[calc(100%-40px)] overflow-hidden overflow-ellipsis whitespace-nowrap',
    notPaidDeposit: 'bg-cinnabar text-radical p-3 ml-2 text-center leading-5 text-base text-black',
    past: 'bg-caribbean',
    notPaid: 'bg-cinnabar'
  },
  desktop: {
    header: 'flex items-center justify-between px-5 mb-8 text-center text-base min-h-[10vh] text-white',
    ol: listStyle,
    ul: listStyle,
    li: 'flex items-center justify-center list-none ml-0',
    weekdays: 'mb-4 border-0 font-extrabold no-underline',
    dayGridLi: 'bg-white border-b border-gray-100 w-full custom-height relative',
    dayNumber: 'absolute top-1 right-1 text-sm',
    eventAndNextEvent: 'text-white w-full h-9 leading-9 text-left text-sm mt-[-100px] p-1.5 flex overflow-hidden ellipsis',
    event: 'bg-fire',
    start: 'ml-1',
    past: 'bg-caribbean',
    notPaid: 'bg-cinnabar',
    notPaidDeposit: 'bg-cinnabar text-radical p-3 ml-2 text-center leading-5 text-base text-black',
    nextEvent: 'bg-blue-900',
    dayGridLiToday: 'bg-blue-700 text-white',
    previousMonthDayNumber: 'text-gray-600',
    previousAndLastMonthEvent: 'opacity-50'
  }
}

const Calendar: FC<Props> = ({ events, dateClick, t, splitter = '-', view = 'desktop' }) => {
  date.setDate(1)

  const styles = classes[view]

  if (t) {
    translate = t
  }

  const [firstDayIndex, setFirstDayIndex] = useState(date.getDay())
  const [currentMonth, setCurrentMonth] = useState<any>(date.getMonth())
  const [currentYear, setCurrentYear] = useState(date.getFullYear())
  const [days, setDays] = useState<any>([])
  const [lastDay, setLastDay] = useState(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  )
  const [previousLastDay, setPreviousLastDay] = useState(
    new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  )
  const [lastDayIndex, setLastDayIndex] = useState(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay()
  )
  const [nextDays, setNextDays] = useState(7 - lastDayIndex)

  const handleDayClick = (existingEvent: any) => {
    if (dateClick) {
      return dateClick(existingEvent)
    }

    return dateClick()
  }

  const renderEvents = ({
    day,
    isToday = false,
    isPreviousMonth = false,
    isNextMonth = false,
    currentDate,
    existingEvents
  }: {
    day: number
    isToday?: boolean
    isPreviousMonth?: boolean
    isNextMonth?: boolean
    currentDate: string
    existingEvents: Event[]
  }) => {
    const className = isNextMonth
      ? 'nextMonth flex-grow'
      : isPreviousMonth
        ? 'previousMonth flex-grow'
        : isToday
          ? 'today flex-grow'
          : 'day flex-grow'

    return (
      <li
        className={className}
        onClick={() => handleDayClick(existingEvents)}
        id={currentDate}
        key={currentDate}
      >
        <span className="dayNumber text-lg flex-shrink w-8">{day}</span>

        {existingEvents.map((event: Event, i: number) => {
          const today = new Date().getTime()
          const currentDateTime = new Date(currentDate).getTime()
          const eventStartDateTime = new Date(event.startDate).getTime()
          const eventEndDateTime = new Date(event.endDate).getTime()
          const isStartDate = currentDateTime === eventStartDateTime
          const nowDateTime = today - (today % 86400000)
          const isPastDate = nowDateTime > eventEndDateTime
          const isDepositPaid = event.data && event.data.fileName !== ''

          return (
            <div
              className={cx.join(
                'event',
                styles.event,
                `event${i + 1}`,
                isStartDate ? 'start ml-1' : '',
                isPastDate ? 'past bg-salem' : '',
                !isDepositPaid && event.data.deposit && isPastDate ? 'notPaid bg-cinnabar' : ''
              )}
              style={event.color ? { background: event.color } : {}}
              key={`event-${i}`}
              title={`${event.title} From: ${event.startDate} To: ${event.endDate}`}
            >
              {isStartDate ? (
                <>
                  <b className="leading-[45px] bg-blue-900 inline-block h-15 mt-[-5px] mr-1.25 pl-2.5 pr-2.5 ml-[-5px]">
                    ❯
                  </b>{' '}
                  {event.title}{' '}
                  {!isDepositPaid && event.data.deposit && isPastDate ? (
                    <div className={cx.join('notPaidDeposit', styles.notPaidDeposit)}>
                      $
                    </div>
                  ) : (
                    ''
                  )}
                </>
              ) : (
                ''
              )}
            </div>
          )
        })}
      </li>
    )
  }

  const renderDay = (className: string, currentDate: string, day: number) => (
    <li
      className={className}
      onClick={() => handleDayClick(currentDate)}
      id={currentDate}
      key={currentDate}
    >
      <span className="dayNumber">{day}</span>
    </li>
  )

  const renderDays = () => {
    const daysArr = []

    // Previous month
    for (let h = firstDayIndex; h > 0; h -= 1) {
      const currentDay = previousLastDay - h + 1
      const month = currentMonth
      let fullYear = month === -1 ? currentYear - 1 : currentYear
      let twoDigitsMonth = dates.getTwoDigitsMonth(month === -1 ? 12 : month)
      const twoDigitsDay = dates.getTwoDigitsDay(currentDay)

      if (twoDigitsMonth === '00') {
        fullYear -= 1
        twoDigitsMonth = '12'
      }

      const currentDate: string = `${fullYear}${splitter}${twoDigitsMonth}${splitter}${twoDigitsDay}`
      const initialDate = new Date(currentDate).getTime()
      const existingEvents = dates.getExistingEvents(events, initialDate)

      if (existingEvents.length > 0) {
        daysArr.push(
          renderEvents({ day: currentDay, currentDate, isPreviousMonth: true, existingEvents })
        )
      } else {
        daysArr.push(renderDay('previousMonth', currentDate, currentDay))
      }
    }

    // Current month
    for (let i = 1; i <= lastDay; i += 1) {
      const isToday = dates.getIsToday(date, i)

      const currentDate: string = `${currentYear}${splitter}${dates.getTwoDigitsMonth(
        currentMonth + 1
      )}${splitter}${dates.getTwoDigitsDay(i)}`

      const initialDate = new Date(currentDate).getTime()
      const existingEvents = dates.getExistingEvents(events, initialDate)

      if (existingEvents.length > 0) {
        daysArr.push(renderEvents({ day: i, currentDate, isToday, existingEvents }))
      } else {
        daysArr.push(renderDay(isToday ? 'today' : 'day', currentDate, i))
      }
    }

    // Next month
    for (let j = 1; j < nextDays; j += 1) {
      const month = currentMonth + 2
      const currentDate: string = `${
        month === 13 ? currentYear + 1 : currentYear
      }${splitter}${dates.getTwoDigitsMonth(
        month === 13 ? 1 : month
      )}${splitter}${dates.getTwoDigitsDay(j)}`

      const initialDate = new Date(currentDate).getTime()
      const existingEvents = dates.getExistingEvents(events, initialDate)

      if (existingEvents.length > 0) {
        daysArr.push(renderEvents({ day: j, currentDate, isNextMonth: true, existingEvents }))
      } else {
        daysArr.push(renderDay('nextMonth', currentDate, j))
      }
    }

    setDays(daysArr)
  }

  const updateStates = ({ year, month, firstDay, last, prevLastDay, lastIndex }: any) => {
    setCurrentYear(year)
    setCurrentMonth(month)
    setFirstDayIndex(firstDay)
    setLastDay(last)
    setPreviousLastDay(prevLastDay)
    setNextDays(7 - lastIndex)
    setLastDayIndex(lastIndex)

    date.setDate(1)
    renderDays()
  }

  const handlePreviousMonth = () => {
    const prevMonth = date.getMonth() - 1
    const isPrevYear = prevMonth === -1
    const prevYear = isPrevYear ? date.getFullYear() - 1 : date.getFullYear()

    date.setMonth(isPrevYear ? 11 : prevMonth)
    date.setFullYear(prevYear)

    updateStates({
      year: prevYear,
      month: prevMonth === -1 ? 11 : prevMonth,
      firstDay: date.getDay(),
      last: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
      prevLastDay: new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
      lastIndex: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay()
    })
  }

  const handleNextMonth = () => {
    const nextMonth = date.getMonth() + 1
    const isNextYear = nextMonth === 12
    const nextYear = isNextYear ? date.getFullYear() + 1 : date.getFullYear()

    date.setMonth(isNextYear ? 0 : nextMonth)
    date.setFullYear(nextYear)

    updateStates({
      year: nextYear,
      month: nextMonth === 12 ? 0 : nextMonth,
      firstDay: date.getDay(),
      last: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
      prevLastDay: new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
      lastIndex: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay()
    })
  }

  useEffect(() => {
    renderDays()
  }, [currentMonth])

  // For Server Side Rendering
  if (days.length === 0) {
    renderDays()
  }

  return (
    <div className={cx.join('calendar', view)}>
      <header className="flex items-center ">
        <SVG.Arrow direction="left" onClick={handlePreviousMonth} size={80} />
        <div className="currentDate">
          <h2 className="text-xl">
            {translate(dates.months[currentMonth].toLowerCase())} {currentYear}
          </h2>
        </div>
        <SVG.Arrow direction="right" onClick={handleNextMonth} size={80} />
      </header>

      <ul className="weekdays hidden">
        {dates.days.map((day: string) => {
          const translatedDay = translate(day.toLowerCase())
          return (
            <li key={day} title={translatedDay}>
              {translatedDay[0]}
            </li>
          )
        })}
      </ul>

      <ol className="dayGrid flex flex-col m-0 p-0 list-none">{days}</ol>
    </div>
  )
}

export default Calendar
