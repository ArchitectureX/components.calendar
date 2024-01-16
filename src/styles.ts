import cx from '@architecturex/utils.cx'

const listStyle = 'grid grid-cols-7 m-auto p-0 w-full'

export const styles = {
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
  notPaid: 'bg-cinnabar',
  header2: 'flex items-center justify-between px-5 mb-8 text-center text-base min-h-[10vh] text-white',
  ol: listStyle,
  ul: listStyle,
  li: 'flex items-center justify-center list-none ml-0',
  weekdays2: 'mb-4 border-0 font-extrabold no-underline',
  dayGridLi2: 'bg-white border-b border-gray-100 w-full custom-height relative',
  dayNumber2: 'absolute top-1 right-1 text-sm',
  eventAndNextEvent: 'text-white w-full h-9 leading-9 text-left text-sm mt-[-100px] p-1.5 flex overflow-hidden ellipsis',
  event2: 'bg-fire',
  start: 'ml-1',
  past2: 'bg-caribbean',
  notPaid2: 'bg-cinnabar',
  notPaidDeposit2: 'bg-cinnabar text-radical p-3 ml-2 text-center leading-5 text-base text-black',
  nextEvent: 'bg-blue-900',
  dayGridLiToday2: 'bg-blue-700 text-white',
  previousMonthDayNumber: 'text-gray-600',
  previousAndLastMonthEvent: 'opacity-50'
}

export const tailwindClasses = cx.extract(styles)
