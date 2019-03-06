import React from 'react'
import { Link } from 'react-router-dom'
import { sga_logout } from '../actions'
import { connect } from 'react-redux';

const Header = ({authenticated, sga_logout}) => {

  let renderOutput = ''
  if(authenticated) {
    const gameCode = sessionStorage.getItem('gameCode')
    const userName = sessionStorage.getItem('userName')
    const userId = sessionStorage.getItem('userId')

    renderOutput = (
/*      <div className="site-header ui inverted stackable menu">
        <div className="item">
          <Link id="logo" to={{pathname: `/${gameCode}`}} ><span>Social</span> <span>Games</span></Link>
        </div>
        <div className="right menu">
          <div className="item">
            <span>Namn: {userName}</span>
            <span>Spelkod: {gameCode}</span>
          </div>
          <div className="item">
            <button className="ui inverted button" onClick={() => sga_logout()}>Lämna spelet</button>
          </div>
        </div>
      </div>*/
      <div className="site-header">
        <Link id="logo" to={{pathname: `/${gameCode}`}} ><span>Social</span><span>Games</span></Link>
        <div><span>Namn:</span>{userName}</div>
        <div><span>Spelkod:</span>{gameCode}</div>
        <button className="ui inverted button" onClick={() => sga_logout()}>Lämna spelet</button>
      </div>
    )
  } else {
    renderOutput = (
      <div className="site-header">
        <Link id="logo" to='/'><span>Social</span><span>Games</span></Link>
      </div>
    )
  }

  return renderOutput

}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  }
}

export default connect(
  mapStateToProps,
  { sga_logout }
)(Header)
