import React, { useState } from 'react'
import InputPopup from './InputPopup'

function InputManager({  photos, setPhotos }) {
    const [adding, setAdding]= useState(false)
  return (
    <section className="input_manager">
        {photos.length > 0 && photos.map(()=>(
            
        ))}
        <br/>
        {adding && <InputPopup open={setAdding} photos={photos} setPhotos={setPhotos} />}
        <button className="new_input-button"
        onClick={()=> setAdding(true)}>
            + Add New Image
        </button>
    </section>
  )
}

export default InputManager