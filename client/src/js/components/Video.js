import React, { useEffect, useRef } from 'react'
import Peer from "simple-peer";

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
      // What is this and when is it called?
      props.peer.peer.on("stream", stream => {
        ref.current.srcObject = stream;
      })
      //ref.current.srcObject = props.peer.streams[0];
    }, [props.peer.peer]);

    return (
      <div className="video">
        <video height='auto' width='200' playsInline autoPlay ref={ref} />
        <div>{props.peer._id}</div>
      </div>
    );
}

export default Video
