import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
import { PostReview } from '../services/review'

const Restaurant = ({ user, authenticated }) => {
  const BASE_URL = 'https://bikini-bottom-reviews.herokuapp.com/api'

  const [restaurants, updateRestaurants] = useState([])
  const [reviews, updateReviews] = useState([])
  const { restaurantId } = useParams()

  useEffect(() => {
    const api = async () => {
      let res = await axios.get(`${BASE_URL}/${restaurantId}`)
      updateRestaurants(res.data)
    }
    api()
  }, [])

  const getReviews = async () => {
    let res = await axios.get(`${BASE_URL}/${restaurantId}`)
    updateReviews(res.data)
  }

  useEffect(() => {
    getReviews()
  }, [])

  const [users, updateUsers] = useState([])

  useEffect(() => {
    const api = async () => {
      let res = await axios.get(`${BASE_URL}/user`)
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

  const initialEditValue = {
    content: ''
  }

  const [editReview, setEditValue] = useState(initialEditValue)

  const handleEditChange = (e) => {
    setEditValue({ ...editReview, [e.target.name]: e.target.value })
  }

  const ref = useRef(null)
  const submitEditRef = useRef(null)
  const editButton = useRef(null)
  const transformEdit = async (content) => {
    setEditValue({ content: content })
    const editButtonRef = editButton.current
    const textarea = ref.current
    const submitEdit = submitEditRef.current
    textarea.className = 'editTextArea'
    textarea.readOnly = false
    submitEdit.className = 'submitEdit'
    editButtonRef.className = 'hiddenButton'
  }

  const handleEditSubmit = async (e, id) => {
    const editButtonRef = editButton.current
    const textarea = ref.current
    const submitEdit = submitEditRef.current
    textarea.readOnly = true
    textarea.className = 'reviewArea'
    submitEdit.className = 'hiddenButton'
    editButtonRef.className = ''
    e.preventDefault()
    await Client.put(`/api/review/${id}`, editReview)
    getReviews()
  }

  return (
    <div className="restaurant">
      {restaurants.map((res) => {
        return (
          <div className="image" key={res.id}>
            <img src={res.image} alt={res.name} />
            <h1>{res.name}</h1>
            <div className="menu">
              <h3>Menu</h3>

              <img src={res.menu} className="menu-details" />
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
                    if (users[i]?.id === res?.userId) {
                      if (users[i]?.id == user?.id) {
                        return (
                          <div className="userReview" key={res.id}>
                            <img src={users[i].profilePic} className="pfp" />
                            <div className="name-pfp">
                              <h5>{users[i].username}</h5>
                              <p>{res.rating} Star</p>
                              <textarea
                                name="content"
                                ref={ref}
                                className="reviewArea"
                                defaultValue={res.content}
                                onChange={handleEditChange}
                                readOnly
                              ></textarea>
                              <br />

                              <button
                                className="deleteButton"
                                onClick={() => handleDelete(res.id)}
                              >
                                Delete
                              </button>
                              <button
                                ref={editButton}
                                onClick={() => transformEdit(res.content)}
                              >
                                Edit
                              </button>
                              <button
                                ref={submitEditRef}
                                className="hiddenButton"
                                onClick={(e) => handleEditSubmit(e, res.id)}
                              >
                                Submit Edits
                              </button>
                            </div>
                          </div>
                        )
                      } else {
                        return user && authenticated ? (
                          <div className="userReview" key={res.id}>
                            <img src={users[i].profilePic} className="pfp" />
                            <div className="name-pfp">
                              <h5>{users[i].username}</h5>
                              <p>{res.rating} Star</p>
                              <p>{res.content}</p>
                            </div>
                          </div>
                        ) : (
                          <h2></h2>
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
  )
}

export default Restaurant
