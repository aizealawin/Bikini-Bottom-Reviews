import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({authenticated, user, handleLogOut}) => {
  return(

<nav className="navBar">
  <h2>Welcome {user.email}!</h2>
  <Link to="/">
  <h3>Home</h3>
</Link>
<Link to="/login">
  <h3>Login</h3>
</Link>
<Link to="/register">
  <h3>Register</h3>
</Link>

</nav>

  )
}

export default Nav