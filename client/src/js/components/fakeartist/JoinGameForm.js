import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { fa_joinGame } from '../../actions'
import { connect } from 'react-redux';

class JoinGameForm extends React.Component {

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
    console.log('onSubmit is called!')
    this.props.fa_joinGame(formValues.name, formValues.code);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="name"
          component={this.renderInput}
          label="Ditt namn"
        />
        <Field
          name="code"
          component={this.renderInput}
          label="Spelkod"
        />
        <button type="submit">Gå med i spel</button>
      </form>
    )
  }
}

// Validate the form. Run by redux-form every time the form changes
// Return an empty object = nothing wrong!
// Return av object with error message = errors!
const validate = (formValues) => {
  const errors = {}
  if(!formValues.name) {
    errors.name = "You must enter a name"
  }
  if(!/^[A-Za-z]+$/i.test(formValues.name)) {
    errors.name = "The name can only contain letters"
  }
  if(!formValues.code) {
    errors.code = "You must enter a game code"
  }
  if(!/^[A-Z0-9]{6}$/i.test(formValues.code)) {
    errors.code = "Wrong format for the game code"
    // TODO: When the game code was wrong?
  }
  return errors;
}

export default connect(null, {fa_joinGame})(reduxForm({
  form: 'createGameForm',
  validate: validate
})(JoinGameForm))
