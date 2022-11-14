import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Restaurant from './Pages/Restaurant'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Nav from './Components/Nav'
import './Styles/App.css'

function App() {
  return (
    <div className="App">
      <header className="nav">
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:restaurantId" element={<Restaurant />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
