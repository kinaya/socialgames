import React, { useEffect, useRef } from 'react'
import Peer from "simple-peer";

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        /*props.peer.on("stream", stream => {
          ref.current.srcObject = stream;
        })*/
        // todo: whaaat?
        ref.current.srcObject = props.peer.streams[0];
    }, [props.peer]);

    return (
      <div className="video">
        <video height='auto' width='200' playsInline autoPlay ref={ref} />
        <div>{props.peer._id}</div>
      </div>
    );
}

export default Video
