import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import mail from '../assets/email.png';
import usuario from '../assets/usuario.png';
import passw1 from '../assets/bloqueado.png';
import passw2 from '../assets/candado.png';
import Swal from 'sweetalert';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = formData; // destructuring

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, error, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate('/login');
    }
    dispatch(reset());
  }, [user, error, isSuccess, isLoading, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Las contraseñas no coinciden');
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
      Swal("Register successful!", "You'll be redirected to login", "success");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <section className="center">
        <div className="formu">
          <h1 className="register">Register</h1>
          <form onSubmit={onSubmit} className="register-group">
            <div className="form-group">
              <label htmlFor="name"><strong>Name:</strong></label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <img src={usuario} alt="Username" />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={name}
                  placeholder="Enter your name"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email"><strong>Email:</strong></label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <img src={mail} alt="Email" />
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Enter your e-mail"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password"><strong>Password:</strong></label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <img src={passw1} alt="Password" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password2"><strong>Confirm password:</strong></label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <img src={passw2} alt="Confirm Password" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  id="password2"
                  value={password2}
                  placeholder="Confirm your password"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="center">
              <button
                type="submit"
                className="btn gradient-green"
              >
                <strong>Submit</strong>
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register