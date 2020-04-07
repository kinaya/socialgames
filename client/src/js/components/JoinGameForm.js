import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { joinGame } from '../actions/userActions'
import { connect } from 'react-redux';
import { TextComponent } from './FormComponents'

const JoinGameForm = ({handleSubmit, joinGame}) => {

  return (
    <form className="ui form error" onSubmit={handleSubmit((formValues) => joinGame(formValues.name, formValues.code))}>
      <Field
        name="name"
        component={TextComponent}
        label="Ditt namn"
      />
      <Field
        name="code"
        component={TextComponent}
        label="Spelkod"
      />
      <button className="ui large primary button" type="submit">Gå med</button>
    </form>
  )

}

const validate = (formValues) => {
  const errors = {}
  if(!formValues.name) {
    errors.name = "Du måste ange ett namn"
  }
  if(!/^[A-Za-z]+$/i.test(formValues.name)) {
    errors.name = "Du kan bara ha bokstäver i namnet"
  }
  if(!formValues.code) {
    errors.code = "Du måste ange en spelkod"
  }
  if(!/^[A-Z0-9]{6}$/i.test(formValues.code)) {
    errors.code = "Spelkoden har fel format"
  }
  return errors;
}

export default connect(null, {joinGame})(reduxForm({
  form: 'createGameForm',
  validate: validate
})(JoinGameForm))
