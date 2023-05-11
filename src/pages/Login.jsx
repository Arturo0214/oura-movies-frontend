import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from "../components/Spinner"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import mail from "../assets/email.png"
import pass from "../assets/candado.png"
import Swal from 'sweetalert'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { isLoading, isSuccess, error, message } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData
  
  useEffect(() => {
    if (error) {
      toast.error(message)
    } else if (isSuccess) {
      navigate('/dashboard')
    } else {
      dispatch(reset())
    }
  }, [error, isSuccess, message])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password} = formData // Incluimos la selección del usuario
    dispatch(login({ email, password})) // Enviamos la selección del usuario a través de la acción login()
    Swal("Login succesful!", "Redirectioning to Dashboard!", "success")
  }
  
  if (isLoading) {
    return <Spinner/>
  }  
  return (
    <>
      <>
        <Navbar/>
      </>
      <>
        <section className='container formu-2'>
          <h1 className="login">
            Login
          </h1>
          <br />
        <section className='form'>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
              <label><strong>Email:</strong></label>
              <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <img src={mail}/>
                </span>
              </div>
                <input 
                className="form-control" 
                type="text" 
                name='email' 
                id="email" 
                value={email} 
                placeholder='Enter your Email' 
                onChange={onChange}/>
            </div>
            </div>
            <br/>
            <div className="form-group">
            <label><strong>Password:</strong></label>
              <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <img src={pass}/>
                </span>
              </div>
              <input 
              className="form-control" 
              type="password" 
              name='password' 
              id="password" 
              value={password} 
              placeholder='Enter your password' 
              onChange={onChange}/>
            </div>
            </div>
            <br />
            <div className="center">
              <button type='submit'className="btn gradient-green">
                <strong>Log In</strong>
              </button>
            </div>
            </form>
            </section>
        </section>
      </>
      <>
        <Footer/>
      </>
    </>
  )
}

export default Login