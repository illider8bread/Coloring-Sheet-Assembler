import React from 'react'

function InputPopup({ open }) {
  return (
    <div className="input_popup">
        <div className="popup_option">
            <p className='option_title'>UPLOAD A SAVED IMAGE</p>
            <input id="file_input" type="file" accept=".jpeg, .jpg, .png"/>
        </div>
        <p className="or">OR</p>
        <div className="popup_option">
            <p className='option_title'>PASTE A COPIED IMAGE</p>
            <input id='paste_input' type="text" placeholder='paste image here'/>
        </div>
        <button onClick={()=>{open(false)}}>cancel</button>
    </div>
  )
}

export default InputPopup