import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { fa_createGame } from '../../actions'
import { connect } from 'react-redux';

class CreateGameForm extends React.Component {

  renderInput = ({input, label, meta}) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} />
        {meta.touched && meta.error && meta.error}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.fa_createGame(formValues.name)
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="name"
          component={this.renderInput}
          label="Ditt namn"
        />
        <button type="submit">Skapa spel</button>
      </form>
    )
  }
}

// Validate the form
const validate = (formValues) => {
  const errors = {}
  if(!formValues.name) {
    errors.name = "You must enter a name"
  }
  if(!/^[A-Za-z]+$/i.test(formValues.name)) {
    errors.name = "The name can only contain letters"
  }
  return errors;
}

export default connect(null, {fa_createGame})(reduxForm({
  form: 'createGameForm',
  validate: validate
})(CreateGameForm))
