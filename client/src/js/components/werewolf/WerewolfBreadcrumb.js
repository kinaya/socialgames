import React from 'react'

const WerewolfBreadcrumb = ({step}) => {
  return (
    <div className="breadcrumb">
      <div className={`${step.number === 1 ? 'active' : 'non-active'}`}>1. Rollerna slumpas</div>
      <div className={`${step.number === 2 ? 'active' : 'non-active'}`}>2. Varulvarna vaknar</div>
      <div className={`${step.number === 3 ? 'active' : 'non-active'}`}>3. Siaren vaknar</div>
      <div className={`${step.number === 4 ? 'active' : 'non-active'}`}>4. Tjuven vaknar</div>
      <div className={`${step.number === 5 ? 'active' : 'non-active'}`}>5. Morgon - alla vaknar</div>
    </div>
  )
}

export default WerewolfBreadcrumb
