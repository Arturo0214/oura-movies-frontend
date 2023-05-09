import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../index.css'
import logo from '../assets/logo-2.png'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const isLoginPage = location.pathname === '/login'
  const isDashboardPage = location.pathname === '/dashboard'

  const onLogout = () => {
      dispatch(logout())
      dispatch(reset())
      navigate('/login')
  }

  return (
  <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
        <section className="container-fluid justify-content-start">
          <ul>
            <li className="nav oura">
              {user ? (
                <Link to="/dashboard">
                  <img src={logo} alt="Logo" />
                </Link>
              ) : (
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
              )}
            </li>
          </ul>
          <ul>
          {user ? (<div className='nav heading'>
            <h3 className="welcome">
              Welcome, {user && user.name}!
            </h3>
         </div>)
         : 
          null
         }
          </ul>
        </section>
        <section className="navbar-nav container-fluid justify-content-end">
          <ul className="nav-item">
            <li className="nav">
              {user ? (
                <>
                <button className="btn gradient-blue" onClick={onLogout}>
                  <strong>Log Out</strong>
                </button>
                </>
              ) : (
                <Link className="btn gradient-blue" to={isLoginPage ? '/' : '/login'}>
                  <strong>{isLoginPage ? 'Register' : 'Log In'}</strong>
                </Link>
              )}
            </li>
          </ul>
        </section>
      </nav>
  )
}

export default Navbar