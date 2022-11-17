import React from 'react'

const RestaurantCard = ({name, image}) => {
  return (
    <div>
      <img id='restaurant-card'src={image}/>
      <h5>{name}</h5>
    </div>
  )
}

export default RestaurantCard