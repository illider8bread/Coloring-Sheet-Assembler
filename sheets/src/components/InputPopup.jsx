import React from "react";

function InputPopup({ open, setPhotos }) {
  function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const encodedFile = reader.result;
        setPhotos((photos) => [...photos, encodedFile]); // Use callback function
      };
    }
    open(false); // Ensure this is only called once the file is processed
  }

  function handlePaste(event){
    event.preventDefault();

    const items = (event.clipboardData || window.clipboardData).items;

    for (let i=0; i<items.length; i++){
        const item = items[i];
        
        if (item.kind === 'file' && (item.type === 'image/jpeg' || item.type === "image/png")){
            const file = item.getAsFile();
            if (file){
                const reader = new FileReader();
                reader.onloadend = ()=> {
                    const encodedFile = reader.result
                    setPhotos((photos) => [...photos, encodedFile]);
                }
                reader.readAsDataURL(file); 
            }
        }
    }
    open(false)
    
  }

  return (
    <div className="input_popup">
      <div className="popup_option">
        <p className="option_title">UPLOAD A SAVED IMAGE</p>
        <input
          id="file_input"
          type="file"
          accept=".jpeg, .jpg, .png"
          onChange={handleFileUpload}
        />
      </div>
      <p className="or">OR</p>
      <div className="popup_option">
        <p className="option_title">PASTE A COPIED IMAGE</p>
        <input id="paste_input" type="text" placeholder="paste image here"  onPaste={handlePaste} />
      </div>
      <button
        onClick={() => {
          open(false);
        }}
      >
        cancel
      </button>
    </div>
  );
}

export default InputPopup;
