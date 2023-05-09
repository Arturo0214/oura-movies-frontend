import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import {Routes, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {


  return (
    <>
      <div className="container">
      <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='*' element={<h3>Page not found 404</h3>}/> 
      </Routes>
      </div>
    <ToastContainer/>
    </>
  )
}

export default App
