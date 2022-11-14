import { Route, Routes } from 'react-router-dom'

import './Styles/App.css'


function App() {
  return <div className="App">
    <header className='nav'>
      <Nav  />
    </header>
    <main>
      <Routes>
        <Route path = "/" element={ <Home /> }/>
        <Route path = "/:restaurantId" element={ <Restaurant/> } />
        <Route path = "/register" element = { <Register/> } />
        <Route path = "/login" element = {<Login />} />
        
      </Routes>
    </main>
  </div>
}

export default App
