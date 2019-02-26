import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { fa_createGame } from '../../actions'
import { connect } from 'react-redux';

class CreateGameForm extends React.Component {

  renderInput = ({input, label, meta}) => {
    return (
      <div className={`field ${meta.error && meta.touched && 'error'}`}>
        <label>{label}</label>
        <input {...input} />
        {meta.touched && meta.error && (
          <div className="ui error message">
            <div className="header">{meta.error}</div>
          </div>
        )}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.fa_createGame(formValues.name)
  }

  render() {
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="name"
          component={this.renderInput}
          label="Ditt namn"
        />
        <button className="ui large primary button" type="submit">Skapa spel</button>
      </form>
    )
  }
}

// Validate the form
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

export default connect(null, {fa_createGame})(reduxForm({
  form: 'createGameForm',
  validate: validate
})(CreateGameForm))
