import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { newGame } from '../actions/userActions'
import { connect } from 'react-redux';
import { TextComponent } from './FormComponents'

const NewGameForm = ({newGame, handleSubmit}) => {

  return (
    <form onSubmit={handleSubmit((formValues) => newGame(formValues.name))}>
      <Field
        name="name"
        component={TextComponent}
        label="Ditt namn"
      />
      <button type="submit">Skapa</button>
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
  return errors;
}

export default connect(null, {newGame})(reduxForm({
  form: 'NewGameForm',
  validate: validate
})(NewGameForm))
