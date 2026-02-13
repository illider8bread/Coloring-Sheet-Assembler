import React, { useState } from 'react'
import InputPopup from './InputPopup'

function InputManager() {
    const [adding, setAdding]= useState(false)
  return (
    <section className="input_manager">
        *map of input image array here*<br/>
        {adding && <InputPopup open={setAdding}/>}
        <button className="new_input-button"
        onClick={()=> setAdding(true)}>
            + Add New Image
        </button>
    </section>
  )
}

export default InputManager