import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import RestaurantCard from '../Components/RestaurantCard'
import Sound from 'react-sound'
import myLeg from '../music/myLeg.mp3'


const Home = () => {
  const BASE_URL = 'https://bikini-bottom-reviews.herokuapp.com/api'

  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    const getRestaurants = async () => {
      const response = await axios.get(`${BASE_URL}/restaurant/`)
      setRestaurants(response?.data)
    }
    getRestaurants()
  }, [])

  const  [isPlaying, setIsPlaying] = useState(false);


  return (
    <div className="homepage">
          <Sound
      url={myLeg}
      playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
      volume = {40}
      loop = {false}
    />
      <div>
        <div>
          <h2 id="home">Welcome to Bikini Bottom Reviews</h2>
        </div>
        <h4>Here are our world class restaurants!</h4>
        <div className="container-grid">
          {restaurants.map((result) => (
            <Link to={`/${result.id}`} key={result.id}>
              <RestaurantCard name={result.name} image={result.image} />
            </Link>
          ))}
        </div>
        <img className='myLeg' src='https://64.media.tumblr.com/59156f76524c7b4314f55064e064d66d/tumblr_mgn8duAC9A1s2ei6lo1_250.png' onClick={() => setIsPlaying(!isPlaying)} />
      </div>
    </div>
  )
}

export default Home
