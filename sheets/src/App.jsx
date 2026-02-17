import React, { useEffect, useState } from "react";
import "./Normalize.css";
import "./App.css";
import Pdf from "./components/pdf";
import Header from "./components/Header";
import InputManager from "./components/InputManager";
import UserGuide from "./components/UserGuide";

function App() {
  const [photos, setPhotos] = useState([]);
  const [pdf, setPdf] = useState(false);
  
  // Rotate image function
  const rotateImageToPortrait = (base64Image) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64Image;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (img.width > img.height) {
          canvas.width = img.height;
          canvas.height = img.width;
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(Math.PI / 2);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        }

        const newBase64Image = canvas.toDataURL('image/jpeg');
        resolve(newBase64Image);
      };

      img.onerror = (error) => {
        reject('Error loading image: ' + error);
      };
    });
  };

  function checkImages() {
    if (typeof photos[photos.length - 1] !== "string") {
      console.log('all values are updated already');
      return;
    }
    const photo = photos[photos.length - 1];
    console.log(photo);
    findResolution(photo)
      .then((dimensions) => {
        const minwidth = 100;
        const minheight = 100;
        const width = dimensions.width;
        const height = dimensions.height;
        if (width > height) {
          if (minwidth < height && minheight < width) {
            return { photo, dimensions, orientation: "landscape" };
          } else console.error("Your image isn't big enough");
        } else if (width > minwidth && height > minheight) {
          return { photo, dimensions, orientation: "portrait" };
        } else {
          console.error("Your image isn't big enough");
        }
      })
      .then((photoMetaData) => {
        if (photoMetaData && photoMetaData.orientation === "landscape") {
          // Rotate the image 90 degrees
          rotateImageToPortrait(photoMetaData.photo)
            .then(newBase64Image => {
              // Replace the last photo with the new base64 image
              const updatedPhotos = [...photos];
              updatedPhotos[updatedPhotos.length - 1] = newBase64Image;
              setPhotos(updatedPhotos);
              console.log("Image rotated and updated.");
            })
            .catch(err => console.error(err));
        } else {
          console.log("no rotation occurred");
        }
      });
  }

  function findResolution(encodedImage) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };

      img.onerror = () => {
        reject(new Error("Invalid Base64 image or unsupported format"));
      };

      img.src = encodedImage;
    });
  }

  useEffect(() => {
    if (photos.length > 0) {
      checkImages(photos);
    }
    console.log(photos);
  }, [photos]);

  return (
    <div>
      <Header />
      <section className="user_scrollable">
        <UserGuide />
        <InputManager photos={photos} setPhotos={setPhotos} pdf={setPdf} />
        {pdf && <Pdf />}
      </section>
    </div>
  );
}

export default App;
