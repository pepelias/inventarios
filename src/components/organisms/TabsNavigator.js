import { useState } from 'react'

export const TabsNavigator = ({ tabs = [], sections = [] }) => {
  const [selected, setSelected] = useState(0)
  const onClick = (index) => () => {
    setSelected(index)
  }
  return (
    <div className="padding-2 tabs-navigator">
      <nav className="tabs-navigator--menu">
        {tabs.map((tab, i) => (
          <button
            className={`tabs-navigator--menu__item ${
              selected === i ? `active` : ''
            }`}
            key={i}
            onClick={onClick(i)}
          >
            {tab}
          </button>
        ))}
      </nav>
      <div className="tabs-navigator--sections">
        {sections.map((Section, i) => (
          <div
            className={`tabs-navigator--sections__item ${
              selected === i ? 'active' : ''
            }`}
            key={i}
          >
            <Section />
          </div>
        ))}
      </div>
    </div>
  )
}
