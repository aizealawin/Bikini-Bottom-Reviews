import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { SignInUser } from '../services/auth'

const Login = ({ setUser, toggleAuthenticated }) => {
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ email: '', password: '' })
    setUser(payload)
    toggleAuthenticated(true)
    Navigate('/')
  }
  return (
    <body className="login">
      <div className="login-form">
        <h1>Login to submit review</h1>

        <div className="form">
          <form onSubmit={handleSubmit} />

          <div className="submit-form">
            <form>
              <div className="input-container">
                <label>Username </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="username"
                  required
                />
                {/* {renderErrorMessage("uname")} */}
              </div>
              <div className="input-container">
                <label>Password </label>
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  required
                />
                {/* {renderErrorMessage("pass")} */}
              </div>
              <div className="button-container">
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  )
}
export default Login
