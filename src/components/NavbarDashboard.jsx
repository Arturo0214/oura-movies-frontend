import {Link} from 'react-router-dom'
import '../index.css'
import logo from '../assets/logo-2.png'

const NavbarDashboard = () => {

  return (
    <>
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
      <section className="container-fluid justify-content-start">
        <ul>
          <li className="nav oura">
            <Link to="/"> <img src={logo} /></Link>
          </li>
        </ul>
      </section>
      <section className='navbar-nav container-fluid justify-content-end'>
        <ul className="nav-item">
          <li className="nav">
            <Link className="btn gradient-blue" to="/"><strong>Logout</strong></Link>
          </li>
        </ul>
      </section>
    </nav>
    </>
  )
}
export default NavbarDashboard