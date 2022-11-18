import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/auth'

const Login = ({ setUser, toggleAuthenticated }) => {
  let Navigate = useNavigate()
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
    <div className="login">
      <div className="login-form">
        <h1>Login to submit review</h1>

        <div className="form">
          <div className="submit-form">
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label>Email </label>
                <input
                  type="email"
                  onChange={handleChange}
                  name="email"
                  required
                />
              </div>
              <div className="input-container">
                <label>Password </label>
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  required
                />
              </div>
              <div className="button-container">
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
