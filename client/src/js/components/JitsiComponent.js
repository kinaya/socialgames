import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { startJitsu } from '../actions/userActions'

export const JitsiComponent = ({sharedState, user, width, startJitsu}) => {

  const stopJitsu = () => {
    console.log('stopJitsu')
  }

  useEffect(() => {
    startJitsu(sharedState.game.code, user.user.userName)
    return () => {
      //api.dispose();
      stopJitsu()
    }
  }, [])

  return (
    <div id="jitsi-container" >
      <div id="jitsi-curtain" className={`curtain-${user.curtain}`} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    sharedState: state.sharedState,
    user: state.localState.user
  }
}

export default connect(
  mapStateToProps,
  {startJitsu}
)(JitsiComponent)
