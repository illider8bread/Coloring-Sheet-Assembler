import React from 'react'
import "./Normalize.css"
import "./App.css"
import Pdf from './components/pdf'
import Header from './components/Header'
import InputManager from './components/InputManager'
import UserGuide from './components/UserGuide'

function App() {
  return (
    <div>
      <Header/>
      <section className="user_scrollable">
      <UserGuide/>
      <InputManager/>
      </section>
      {/* <Pdf/> */}
    </div>
  )
}

export default App