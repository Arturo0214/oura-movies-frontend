import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify'
import Spinner from "../components/Spinner"
import Navbar from "../components/NavbarDashboard"
import Footer from "../components/Footer"


const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)
  

  return (
    <>
      <>
      <Navbar/>
      </>
      <>
        <section className="container formu">
          <h3 className="register">Welcome {user && user.user.name}</h3>
            <p>Mis Tareas</p>
        </section>
      </>
      <>
      <Footer/>
      </>
    </>
  )
  
}
export default Dashboard