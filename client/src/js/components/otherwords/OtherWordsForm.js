import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { CheckboxComponent, RadioComponent } from '../FormComponents'

const OtherWordsForm = ({startGameLocal}) => {

  return (
    <div className="ui form">

      <h4 className="ui dividing header">Förbjudna ord</h4>
        <Field
          name="forbidden"
          component={CheckboxComponent}
          label="Spela med förbjudna ord"
          id="forbidden"
        />

      <h4 className="ui dividing header">Timer</h4>
      <p><label><Field name="timer" component={RadioComponent} type="radio" value='0' />Ingen timer</label></p>
      <p><label><Field name="timer" component={RadioComponent} type="radio" value='60'/>60 sekunder</label></p>
      <p><label><Field name="timer" component={RadioComponent} type="radio" value='30' />30 sekunder</label></p>

    </div>
  )
}

export default reduxForm({
  form: 'otherWordsForm',
  initialValues: {
    'forbidden': true,
    'timer': '60'
  }
})(OtherWordsForm);