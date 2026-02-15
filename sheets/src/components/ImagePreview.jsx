import React from 'react'

function ImagePreview({photo, index, removeImage}) {
  return (
    <div className="image_preview" key={index}>
        <button onClick={()=>{removeImage(photo)}}>remove</button>
        <img src={photo} className="preview_image" />
    </div>
  )
}

export default ImagePreview