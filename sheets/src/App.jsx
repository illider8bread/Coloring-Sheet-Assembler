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

  function checkImages() {
    if (typeof photos[photos.length-1] !== "string"){
      console.log('all values are updated already ')
      return
    }
    const photo = photos[photos.length - 1];
    console.log(photo);
    findResolution(photo)
      .then((dimensions) => {
        // returns an object with the newest image, encoded in base64, the images dimensions, and the image's original orientation
        const minwidth = 100;
        const minheight = 100;
        const width = dimensions.width;
        const height = dimensions.height;
        if (width > height) {
          if (minwidth < height && minheight < width) {
            return {
              photo: photo,
              dimensions: dimensions,
              orientation: "landscape",
            };
          } else console.error("Your image isn't big enough");
        } else if (width > minwidth && height > minheight) {
          return {
            photo: photo,
            dimensions: dimensions,
            orientation: "portrait",
          };
        } else {
          console.error("Your image isn't big enough");
        }
      })
      .then((photoMetaData) => {
        if (photoMetaData.orientation === "landscape") {
          //rotate the image 90 degrees
        } else {
          console.log("no rotation occured");
        }
        // return photoMetaData
      });
  }

  // find original dimensions of the photo
  function findResolution(encodedImage) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // this returns this object as the output of the function
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
