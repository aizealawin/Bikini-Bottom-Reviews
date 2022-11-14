import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const Restaurant = () => {
    const [restaurants, updateRestaurants] = useState([])
    const { restaurantId } = useParams()
    console.log(restaurantId)

    useEffect(() => {
        const api = async () => {
            let res = await axios.get(`http://localhost:3001/api/restaurant/${restaurantId}`)
            updateRestaurants(res.data)
        }
        api()
    }, [])
    console.log(restaurants)


    return (
        <div>
            {restaurants.map((res) => {
                return (
                    <div className='image'>
                        <img src={res.image}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Restaurant