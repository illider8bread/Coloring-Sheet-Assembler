import React, { useState } from "react";
import InputPopup from "./InputPopup";
import ImagePreview from "./ImagePreview";

function InputManager({ photos, setPhotos, pdf }) {
  const [adding, setAdding] = useState(false);
  function removeImage(photo) {
    const filteredPhotos = photos.filter((item) => item !== photo);
    setPhotos(filteredPhotos);
  }
  return (
    <section className="input_manager">
      <button className="new_input-button" onClick={() => {setAdding(!adding); pdf(false);}}>
        Add New Images +
      </button>
      <button className="generate_pdf" onClick={()=> pdf(true)}>Generate PDF ⟳</button>
      <button className="reset_all" onClick={()=>{
        setPhotos([]);
        pdf(false)
      }}>RESET</button>
      {adding && (
        <InputPopup open={setAdding} photos={photos} setPhotos={setPhotos} />
      )}
      <div className="previews">
        {photos.length > 0 &&
          photos.map((photo, index) => (
            <ImagePreview
              photo={photo}
              index={index}
              removeImage={(image) => {
                removeImage(image);
              }}
            />
          ))}
      </div>
    </section>
  );
}

export default InputManager;
