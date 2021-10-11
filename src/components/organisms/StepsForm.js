import { ArrowLeftOutlined } from '@ant-design/icons'
import { useState } from 'react'

export const StepsForm = ({ steps = [], onSubmit }) => {
  const [current, setCurrent] = useState(0)
  const [currentData, setCurrentData] = useState({})
  const stepSubmit = (e) => {
    e.preventDefault()
    const replace = {
      ...currentData,
      ...Object.fromEntries(new FormData(e.target)),
    }
    setCurrentData(replace)
    if (current < steps.length - 1) return setCurrent(current + 1)
    if (onSubmit) onSubmit(replace)
  }
  const back = (e) => {
    e.preventDefault()
    if (current > 0) setCurrent(current - 1)
  }
  return (
    <div className="step-forms tabs-sections-container">
      {steps.map((StepComponent, i) => {
        return (
          <form
            key={i}
            className={`step-forms__step${current === i ? ' active' : ''}`}
            onSubmit={stepSubmit}
          >
            <StepComponent currentData={currentData} />
            <div className="buttons-container invert padding margin-t-2">
              <button>
                {i === steps.length - 1 ? 'Completar' : 'Continuar'}
              </button>
              {i > 0 && (
                <button className="only-icon" onClick={back}>
                  <ArrowLeftOutlined />
                </button>
              )}
            </div>
          </form>
        )
      })}
    </div>
  )
}
