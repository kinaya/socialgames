import React, {useState, useEffect} from 'react'
//import {SketchField, Tools} from 'react-sketch';

const FakeArtistGamePlay = ({user, word, category, fakeArtist}) => {
  const [amIFake, setAmIFake] = useState(false)

  useEffect(() => {
    if(fakeArtist === user.user.userId) {
      setAmIFake(true)
    }
  }, [])

  return (
    <div className="ui text container center aligned">

      <div className="ui info message">
        <h2 className="ui header">Du <span className="italic">{amIFake ? 'är' : 'är inte'}</span> fake artist!</h2>
        <div><span>Kategori:</span> {category}</div>
        <div><span>Ord:</span> {amIFake ? '?' : word}</div>
      </div>
    </div>
  )
}

export default FakeArtistGamePlay;
