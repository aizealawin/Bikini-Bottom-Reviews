import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return(

<nav className="navBar">
  
<Link to="/">
  <h3>Home</h3>
</Link>
<Link to="/login">
  <h3>Login</h3>
</Link>
<Link to="/">
  <h3>Register</h3>
</Link>
</nav>

  )
}

export default Nav