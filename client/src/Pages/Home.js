import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import RestaurantCard from '../Components/RestaurantCard'

const Home = () => {
  const BASE_URL = 'http://localhost:3001/api'

  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    const getRestaurants = async () => {
      const response = await axios.get(`${BASE_URL}/restaurant/`)
      setRestaurants(response?.data)
    }
    getRestaurants()
  }, [])

  return (
    <div>
      <div>
        <h2>Welcome to Bikini Bottom Reviews</h2>
      </div>
      <h4>Here are our premiere restaurants!</h4>
      <div className="container-grid">
        {restaurants.map((result) => (
          <Link to={`/restaurant/${result.id}`} key={result.id}>
            {console.log(result.id)}
            <RestaurantCard name={result.name} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
