import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/auth'

const Register = () => {
  const navigate = useNavigate()
  const initialFormValues = {
    username: '',
    email: '',
    profilePic: '',
    password: '',
    confirmPassword: ''
  }
  const [formValues, setFormValues] = useState(initialFormValues)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      email: formValues.email,
      username: formValues.username,
      profilePic: formValues.profilePic,
      password: formValues.password,
      confirmPassword: formValues.password
    })
    setFormValues(initialFormValues)
    navigate('/login')
  }
  return (
    <div className="form">
      <h1>Register to create account</h1>
      <div className="form">
        <form className="register" onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={formValues.email}
              placeholder="email"
              required
            ></input>
            <label>Username </label>
            <input
              type="text"
              onChange={handleChange}
              value={formValues.username}
              placeholder="username"
              name="username"
              required
            />
            <label>Picture </label>
            <input
              type="text"
              onChange={handleChange}
              value={formValues.profilePic}
              placeholder="image"
              name="profilePic"
              required
            />
            {/* {renderErrorMessage("uname")} */}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              onChange={handleChange}
              value={formValues.password}
              placeholder="password"
              name="password"
              required
            />
            <label> Confirm Password </label>
            <input
              type="password"
              onChange={handleChange}
              value={formValues.password}
              placeholder="password"
              name="password"
              required
            />
            {/* {renderErrorMessage("pass")} */}
          </div>
          <div className="button-container">
            <input
              type="submit"
              disabled={!formValues.email || !formValues.password}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
export default Register
