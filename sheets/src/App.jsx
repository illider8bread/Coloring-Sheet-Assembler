import React, {useEffect, useState} from 'react'
import "./Normalize.css"
import "./App.css"
import Pdf from './components/pdf'
import Header from './components/Header'
import InputManager from './components/InputManager'
import UserGuide from './components/UserGuide'

function App() {
  const [photos, setPhotos] = useState([]);
  const [pdf, setPdf] = useState(false);

  function checkImages(){
    const photo = photos[photos.length - 1];

    findResolution(photo)
    .then(
      (dimensions) =>{
        console.log(dimensions)
        const minwidth = 100;
        const minheight = 100;
        const width = dimensions.width;
        const height = dimensions.height;
        // check if width is greater the height (the image is in landscape instead of portrait)
        if (width > height){
          // if the rotated image's width and height are big enough, return their dimensions
          if (minwidth < height && minheight < width){
            return dimensions
            // if not return an error
          } else (
            console.error("Your image isn't big enough")
          )
          // the image is in portrait, or square. return the dimensions
        } else if (width > minwidth && height > minheight) {
          return dimensions
          // the image isn't big enough
        } else {
          console.error("Your image isn't big enough")
        }
        }
    )

  }





  // find original dimensions of the photo
  function findResolution(encodedImage){
    return new Promise ((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // this returns this object as the output of the function
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        })
      }

      img.onerror = () =>{
        reject(new Error("Invalid Base64 image or unsupported format"));
      };

      img.src = encodedImage
    })
  }


  useEffect(()=>{
    if (photos.length > 0){
      checkImages(photos)
    }
    console.log(photos)
  },[photos])
  return (
    <div>
      <Header/>
      <section className="user_scrollable">
      <UserGuide/>
      <InputManager photos={photos} setPhotos={setPhotos} pdf={setPdf}/>
      {pdf && <Pdf/>}
      </section>
    </div>
  )
}

export default App