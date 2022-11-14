import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const Restaurant = () => {
    const [restaurants, updateRestaurants] = useState([])
    const [reviews, updateReviews] = useState([])
    const { restaurantId } = useParams()
    console.log(restaurantId)

    useEffect(() => {
        const api = async () => {
            let res = await axios.get(`http://localhost:3001/api/restaurant/${restaurantId}`)
            updateRestaurants(res.data)
        }
        api()
    }, [])


    useEffect(() => {
        const api = async () => {
            let res = await axios.get(`http://localhost:3001/api/review/${restaurantId}`)
            updateReviews(res.data)
        }
        api()
    }, [])
    console.log(reviews)


    const [users, updateUsers] = useState([])
    useEffect(() => {
        const api = async () => {
            let res = await axios.get(`http://localhost:3001/api/user`)
            updateUsers(res.data)
        }
        api()
    }, [])
    console.log(users)


    return (
        <div>
            {restaurants.map((res) => {
                return (
                    <div className='image'>
                        <img src={res.image}/>
                            <h1>{res.name}</h1>
                        <div className='menu'>
                            <h3>Menu</h3>
                            <p>{res.menu}</p>
                        </div>
                        <div className='reviews'>
                            <h3>Reviews</h3>
                            {reviews.map((res) => {
                                for (let i =0; i < users.length; i++) {
                                    if (users[i].id === res.userId) {
                                        return (
                                            <div>
                                            <h5>{users[i].username}</h5>
                                            <img src={users[i].profilePic}/>
                                            <p>{res.content}</p>
                                            </div>
                                        )
                                    }
                                }
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Restaurant