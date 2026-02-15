import React, { useState } from 'react'
import InputPopup from './InputPopup'
import ImagePreview from './ImagePreview'

function InputManager({  photos, setPhotos }) {
    const [adding, setAdding]= useState(false)
  return (
    <section className="input_manager">
        <div className="previews">
        {photos.length > 0 && photos.map((photo, index)=>(
            <ImagePreview photo={photo} index={index} removeImage={()=>{console.log("remove image was pressed")}}/>
        ))}
        </div>
        {adding && <InputPopup open={setAdding} photos={photos} setPhotos={setPhotos} />}
        <button className="new_input-button"
        onClick={()=> setAdding(true)}>
            + Add New Image
        </button>
    </section>
  )
}

export default InputManager