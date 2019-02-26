import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { fa_joinGame } from '../../actions'
import { connect } from 'react-redux';

class JoinGameForm extends React.Component {

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
    this.props.fa_joinGame(formValues.name, formValues.code);
  }

  render() {
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
        <button className="ui large primary button" type="submit">Gå med i spel</button>
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

// For me it needs to be a connected component, bc i don't pass the onsubmit action from parent.
// I get it from action
export default connect(null, {fa_joinGame})(reduxForm({
  form: 'createGameForm',
  validate: validate
})(JoinGameForm))
