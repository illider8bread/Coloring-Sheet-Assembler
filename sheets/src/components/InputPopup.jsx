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

  function handlePaste(event) {
    event.preventDefault();

    const items = (event.clipboardData || window.clipboardData).items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (
        item.kind === "file" &&
        (item.type === "image/jpeg" || item.type === "image/png")
      ) {
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const encodedFile = reader.result;
            setPhotos((photos) => [...photos, encodedFile]);
          };
          reader.readAsDataURL(file);
        }
      }
    }
    open(false);
  }

  function filterInputs(input) {
    const minheight = 360;
    const minwidth = 360;
    getResolution(input)
      .then((resolution) => {
        if 
      });
  }

  function rotateImage(base64Image) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = function () {
        // Create a canvas element
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions to swapped width and height
        canvas.width = img.height;
        canvas.height = img.width;

        // Move to the center of the canvas
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(Math.PI / 2); // Rotate 90 degrees (in radians)
        ctx.drawImage(img, -img.width / 2, -img.height / 2); // Center the image on the canvas

        // Get the new base64 image
        const rotatedBase64 = canvas.toDataURL(); // This will be in PNG format
        resolve(rotatedBase64);
      };

      img.onerror = function () {
        reject("Error loading image");
      };

      img.src = base64Image; // Set the base64 image string here
    });
  }

  function getResolution(input) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = function () {
        const resolution = {
          width: img.width,
          height: img.height,
        };
        resolve(resolution);
      };

      img.onerror = function () {
        reject("error loading image");
      };

      img.src = input;
    });
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
        <input
          id="paste_input"
          type="text"
          placeholder="paste image here"
          onPaste={handlePaste}
        />
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
