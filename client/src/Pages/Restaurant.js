import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
import { PostReview } from '../services/review'

const Restaurant = ({ user, authenticated }) => {
  let Navigate = useNavigate()
  const [restaurants, updateRestaurants] = useState([])
  const [reviews, updateReviews] = useState([])
  const { restaurantId } = useParams()

  useEffect(() => {
    const api = async () => {
      let res = await axios.get(
        `http://localhost:3001/api/restaurant/${restaurantId}`
      )
      updateRestaurants(res.data)
    }
    api()
  }, [])

  const getReviews = async () => {
    let res = await axios.get(
      `http://localhost:3001/api/review/${restaurantId}`
    )
    updateReviews(res.data)
  }

  useEffect(() => {
    getReviews()
  }, [])

  const [users, updateUsers] = useState([])

  useEffect(() => {
    const api = async () => {
      let res = await axios.get(`http://localhost:3001/api/user`)
      updateUsers(res.data)
    }
    api()
  }, [])

  const initialValues = {
    restaurantId: parseInt(restaurantId),
    userId: parseInt(user?.id),
    content: '',
    rating: ''
  }

  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newData = {
      restaurantId: parseInt(formValues.restaurantId),
      userId: parseInt(formValues.userId),
      ...formValues
    }
    const payload = await PostReview(formValues)
    getReviews()
  }

  const handleDelete = async (id) => {
    await Client.delete(`/api/review/${id}`)
    getReviews()
  }

  return user && authenticated ? (
    <div className="restaurant">
      {restaurants.map((res) => {
        return (
          <div className="image" key={res.id}>
            <img src={res.image} alt={res.name} />
            <h1>{res.name}</h1>
            <div className="menu">
              <h3>Menu</h3>
              <p className="menu-details">{res.menu}</p>
            </div>
            <div className="reviews">
              <h3>Reviews</h3>
              <div className="addReview">
                <h4>Add Review:</h4>
                <input
                  type="text"
                  name="content"
                  onChange={handleChange}
                  value={formValues.content}
                  placeholder="Review Comments"
                  required
                ></input>
                <select
                  name="rating"
                  onChange={handleChange}
                  value={formValues.rating}
                >
                  <option value="default" hidden>
                    Rating
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button onClick={handleSubmit}>Submit</button>
              </div>
              <div className="mappedReviews">
                {reviews.map((res) => {
                  for (let i = 0; i < users.length; i++) {
                    if (users[i].id === res.userId) {
                      console.log(users[i].id, user.id)
                      if (users[i].id == user.id) {
                        return (
                          <div className="userReview" key={res.id}>
                            <img src={users[i].profilePic} className="pfp" />
                            <div className="name-pfp">
                              <h5>{users[i].username}</h5>
                              <p>{res.content}</p>
                              <button onClick={() => handleDelete(res.id)}>
                                Delete
                              </button>
                            </div>
                          </div>
                        )
                      } else {
                      return (
                        <div className="userReview" key={res.id}>
                          <img src={users[i].profilePic} className="pfp" />
                          <div className="name-pfp">
                            <h5>{users[i].username}</h5>
                            <p>{res.content}</p>
                          </div>
                        </div>
                      )
                    }
                    }
                  }
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  ) : (
    <div className="protected">
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => Navigate('/login')}>Sign In</button>
    </div>
  )
}

export default Restaurant
