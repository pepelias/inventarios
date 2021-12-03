import { ArrowLeftOutlined } from '@ant-design/icons'
import { useState } from 'react'

export const StepsForm = ({
  steps = {},
  handlers = {},
  onSubmit,
  order,
  initialData = {},
  initialStep = 0
}) => {
  if (!order) order = Object.keys(steps)
  const first = order[0]
  const last = order[order.length - 1]
  const middlewares = {}
  const [current, setCurrent] = useState(initialStep)
  const [currentData, setCurrentData] = useState(initialData)

  const stepSubmit = (stepName) => (e) => {
    e.preventDefault()
    let data = Object.fromEntries(new FormData(e.target))
    console.log('En Bruto', data)
    if (middlewares[stepName]) data = middlewares[stepName](data)
    console.log('Middlewares', data)
    const replace = {
      ...currentData,
      ...(handlers[stepName] ? handlers[stepName](data) : data),
    }
    console.log('handlered', replace)
    setCurrentData(replace)
    if (current !== order.length - 1) return setCurrent(current + 1)
    if (onSubmit) onSubmit(replace)
  }

  // Crear middleware
  const middleware = (stepName) => (fnc) => {
    middlewares[stepName] = (data) => fnc(data)
  }

  const back = (e) => {
    e.preventDefault()
    if (current > 0) setCurrent(current - 1)
  }
  return (
    <div className="step-forms tabs-sections-container">
      {order.map((stepName, index) => {
        const StepComponent = steps[stepName]
        return (
          <form
            key={stepName}
            className={`step-forms__step${current === index ? ' active' : ''}`}
            onSubmit={stepSubmit(stepName)}
          >
            <StepComponent
              currentData={currentData}
              submitMiddleware={middleware(stepName)}
            />
            <div className="buttons-container invert padding margin-t-2">
              <button>{stepName === last ? 'Completar' : 'Continuar'}</button>
              {stepName !== first && (
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
