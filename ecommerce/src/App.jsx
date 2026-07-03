import {HomePage } from './pages/HomePage'
import { Route, Routes } from 'react-router'
import './App.css'

function App() {

  return (
    <Routes>
       <Route path = "/" element={<HomePage/>}></Route>
        <route path = "checkout" element = {
          <div>
            Test checkout page
          </div>
        }>
          
        </route>
   </Routes>
   )
}

export default App
