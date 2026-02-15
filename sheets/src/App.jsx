import React, {useEffect, useState} from 'react'
import "./Normalize.css"
import "./App.css"
import Pdf from './components/pdf'
import Header from './components/Header'
import InputManager from './components/InputManager'
import UserGuide from './components/UserGuide'

function App() {
  const [photos, setPhotos] = useState([]);

  function checkPhotos(){
    
  }


  useEffect(()=>{
    console.log(photos)
  },[photos])
  return (
    <div>
      <Header/>
      <section className="user_scrollable">
      <UserGuide/>
      <InputManager photos={photos} setPhotos={setPhotos} />
      </section>
      {/* <Pdf/> */}
    </div>
  )
}

export default App