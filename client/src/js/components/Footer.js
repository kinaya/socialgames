import React from 'react'

const Footer = () => {

  return (
    <div id="footer" className="ui inverted vertical footer segment">
      <div className="ui container">
        <div className="ui stackable inverted divided equal height stackable grid">

          <div className="three wide column">
            <h4 className="ui inverted header">Resurser</h4>
            <div className="ui inverted link list">
              <a href="https://github.com/kinaya/socialgames" className="item">github.com</a>
              <a href="mailto:hello@socialgames" className="item">hello@socialgames</a>
              <a href="https://alvineandersson.se" className="item">alvineandersson.se</a>
            </div>
          </div>

          <div className="seven wide column">
            <h4 className="ui inverted header">Om SocialGames</h4>
            <p>Blablabla...</p>
          </div>

        </div>
      </div>
    </div>
  )

}

export default Footer
