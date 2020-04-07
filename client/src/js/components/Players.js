import React from 'react'
import { connect } from 'react-redux'

const Players = ({users}) => {
  return (
    <div className="ui container left aligned">
      <h4 className="ui top attached block header">Spelare</h4>
      {users.length > 0 &&
        users.map((user, i) => { return (
          <div key={i} className="ui attached segment">{user.userName}</div>
        )})
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.game.users
  }
}

export default connect(mapStateToProps, null)(Players);
