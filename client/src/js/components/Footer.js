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
              <a href="https://alvineandersson.se" className="item">alvineandersson.se</a>
            </div>
          </div>

          <div className="seven wide column">
            <h4 className="ui inverted header">Om Sociala Spel</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin velit ac nibh bibendum maximus. Etiam lacinia ligula diam, ut malesuada arcu lobortis vitae. Etiam sodales, ligula nec tristique fringilla, magna quam maximus orci.</p>
          </div>

        </div>
      </div>
    </div>
  )

}

export default Footer
