import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Video from './Video'

const VideoContainer = ({peers, user}) => {
  const ownVideo = useRef();

  useEffect(() => {
    if(user.stream) {
      ownVideo.current.srcObject = user.stream;
    }
  }, [user.stream]);

  return (
    <div className="video-container">
      {user.stream && (
        <div className="video ownVideo">
          <video height='auto' width='200' muted autoPlay playsInline ref={ownVideo}/>
          <div>{user.user.userName}</div>
        </div>
      )}

      {peers.map((peer, index) => {
        return (
          <Video key={index} peer={peer} />
        );
      })}

    </div>
  )
}

const mapStateToProps = state => {
  return {
    peers: state.game.peers,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  null
)(VideoContainer)
