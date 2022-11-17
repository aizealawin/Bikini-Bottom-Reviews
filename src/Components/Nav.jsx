import React from 'react'
import { Link } from 'react-router-dom'
import Sound from 'react-sound'
import blues from '../music/blues.mp3'
import grass from '../music/grass.mp3'
import { useState } from 'react'

const Nav = ({ authenticated, user, handleLogOut}) => {
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav className="navBar">
        <h2>Welcome {user?.email}!</h2>
        <Link to="/"><div><img id='logo'src='https://m.media-amazon.com/images/I/31aIFBPXUCL._AC_SY580_.jpg' /></div></Link>
        <Link id="sign-out" onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    )
  }

  const openOptions = (
  <nav className="navBar">
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

  const  [isPlaying, setIsPlaying] = useState(false);

  return(
<header className="navBar">

  <Link to ="/">
    </Link>
      {authenticated && user ? authenticatedOptions : openOptions}
      <div className='music'>
      <button onClick={() => setIsPlaying(!isPlaying)}>{!isPlaying ? 'Play' : 'Stop'}</button>
      </div>
    <Sound
      url={grass}
      playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
      volume = {10}
      loop = {true}
    />

    </header>
  )
}

export default Nav