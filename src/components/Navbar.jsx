import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../index.css'
import logo from '../assets/logo-2.png'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import CreateMovie from './CreateMovie'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const isLoginPage = location.pathname === '/login'

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top w-100">
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
          {user ? (
            <div className="nav heading">
              <h3 className="welcome">Welcome, {user && user.name}!</h3>
            </div>
          ) : null}
        </ul>
      </section>
      <section className="navbar-nav container-fluid justify-content-end">
        <ul className="nav">
          {user?.isAdmin && (
            <div>
            <CreateMovie
            isOpen={isModalOpen}
            onRequestClose={handleModalClose}
            />
            <button className="btn gradient-green-2 mx-2" onClick={handleModalOpen}>
              <strong>Add Movie</strong>
            </button>
            </div>
          )}
          <li className="nav">
            {user ? (
              <>
                <button className="btn gradient-blue" onClick={onLogout}>
                  <strong>Log Out</strong>
                </button>
              </>
            ) : (
              <Link
                className="btn gradient-blue"
                to={isLoginPage ? '/' : '/login'}
              >
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