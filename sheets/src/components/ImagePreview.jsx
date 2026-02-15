import React from 'react'

function ImagePreview({photo, index, removeImage}) {
  return (
    <div className="preview_container" key={index}>
        <img src={photo} className="preview_image" />
        <button onClick={()=>{removeImage(photo)}}>remove</button>
    </div>
  )
}

export default ImagePreview