import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="form">
      <h1>Login to submit review</h1>
      <div className="form">
        <form>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="username" required />
            {/* {renderErrorMessage("uname")} */}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="password" required />
            {/* {renderErrorMessage("pass")} */}
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login
