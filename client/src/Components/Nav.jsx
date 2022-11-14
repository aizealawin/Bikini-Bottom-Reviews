import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return(

<nav className="navBar">
<Link to="/">
  <h1>Home</h1>
</Link>
<Link to="/">
  <h1>Login</h1>
</Link>
<Link to="/">
  <h1>Register</h1>
</Link>
</nav>

  )
}

export default Nav