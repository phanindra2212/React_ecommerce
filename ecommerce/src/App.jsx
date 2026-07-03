import {HomePage } from './pages/HomePage'
import { Route, Routes } from 'react-router'
import './App.css'
import { CheckoutPage } from './pages/checkoutPages'

function App() {

  return (
    <Routes>
       <Route path = "/" element={<HomePage/>}></Route>
        <Route path = "checkout" element = {<CheckoutPage/>}>

        </Route>
   </Routes>
   )
}

export default App
