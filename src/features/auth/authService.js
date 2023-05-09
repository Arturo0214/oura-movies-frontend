import axios from 'axios'

const API_URL = 'https://aggressive-pear-shoulder-pads.cyclic.app/api'

let user = null
//Registrar un usuario
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData)
  return response.data
}

export function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

export function getCookie(name) {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=-99999999;`
}

// Iniciar sesión como usuario
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData)
  if (response.data) {
    user = response.data
    setCookie('user', JSON.stringify(user), 1)
  }
  return user
}

// Cerrar sesión como usuario
const logout = () => {
  deleteCookie('user')
}

// Verificar si el usuario está autenticado
const isUserLoggedIn = () => {
  const userCookie = getCookie('user')
  return !!userCookie
}
// Verificar si el usuario es administrador
export const isUserAdmin = () => {
  const userCookie = getCookie('user')
  if (userCookie) {
    const user = JSON.parse(userCookie)
    return user.isAdmin === true
  }
  return false
}

const authService = {
  register,
  login,
  logout,
  isUserLoggedIn,
  isUserAdmin
}
  
export default authService