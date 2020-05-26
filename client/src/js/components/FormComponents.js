import React from 'react'

export const TextComponent = ({input, label, meta}) => {
  return (
    <div className={`field ${meta.error && meta.touched && 'error'}`}>
      <label>{label}</label>
      <input {...input} />
      {meta.touched && meta.error && (
        <div className="error message">
          <div>{meta.error}</div>
        </div>
      )}
    </div>
  )
}

export const CheckboxComponent = ({input, label, meta, ...rest}) => (
  <div className={`formField ${input.name}`}>
    <label>
      <input checked={input.value} className="filled-in" type="checkbox" {...input} {...rest} />
      <span>{label}</span>
    </label>
  </div>
)

export const RadioComponent = ({ label, input, meta, ...rest }) => (
  <input type="radio" {...input} {...rest} />
)
