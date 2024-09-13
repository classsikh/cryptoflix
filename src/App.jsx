import React from "react"
import { BrowserRouter, Route, Routes  } from "react-router-dom"
import Header from "./components/Header"
import Homepage from "./pages/Homepage"
import CoinPage from "./pages/CoinPage"
import "./index.css" 
import UserAlert from "./components/alert"


function App() {
 

  return (
    <BrowserRouter>
    
        <div className="App">
          <Header/>
          <Routes>
          <Route path="/" 
          Component={Homepage} />
          <Route path="/coins/:id" Component={CoinPage} />
          </Routes>
        </div>
        <UserAlert/>
    </BrowserRouter>
   
  )
}

export default App
