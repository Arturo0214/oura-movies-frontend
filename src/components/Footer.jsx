import React from 'react'
import '../index.css'
import { useSelector } from 'react-redux'

const Footer = () => {
  const { user } = useSelector((state) => state.auth)

  const footerClassName = user ? 'footer-2' : 'footer'

  return (
    <footer className={`bg-light text-center text-dark fixed-bottom  w-100`}>
        <section className={footerClassName}>
          <a>
            <strong>Oura Movies</strong>
          </a>
          <br />
          <a>All Rights Reserved © {new Date().getFullYear()}</a>
          <br />
          <a>Privacy</a>
          <br />
          <a>Terms of Use</a>
          <br />
          <a>Contact Us</a>
          <br />
          <a>Help Center</a>
        </section>
    </footer>
  )
}

export default Footer